'use client';

import React, { useState } from 'react';
import { Blog } from '@/types/blog';
import {
  Trash2,
  Eye,
  Edit3,
  Columns,
  Save,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  FileText,
  Plus
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Props {
  initialData?: Blog | null;
  allBlogs?: Blog[];
}

export function BlogCMS({ initialData, allBlogs = [] }: Props) {
  // Default article template
  const defaultPost: Blog = initialData || {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'new-post',
    slug: 'new-blog-post',
    title: '',
    subtitle: '',
    status: 'published',
    published_at: new Date().toISOString(),
    excerpt: '',
    content: 'Start writing your article here...\n\nUse double newlines for paragraphs.',
    tags: ['Article'],
  };

  const [blog, setBlog] = useState<Blog>(defaultPost);
  const [viewMode, setViewMode] = useState<'split' | 'editor' | 'preview'>('split');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Auto-generate slug from title
  const handleTitleChange = (newTitle: string) => {
    const generatedSlug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setBlog((prev) => ({
      ...prev,
      title: newTitle,
      slug: prev.slug === 'new-blog-post' || prev.slug === '' ? generatedSlug : prev.slug,
    }));
  };

  const handleDelete = async () => {
    if (!blog.id || blog.id === 'new-post') {
      setStatusMessage('Cannot delete an unsaved draft.');
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
      return;
    }

    if (!confirm('Are you sure you want to delete this article? This cannot be undone.')) {
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`/api/blogs?id=${blog.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSaveStatus('success');
        setStatusMessage('Article deleted successfully!');
        setTimeout(() => {
          setSaveStatus('idle');
          window.location.reload();
        }, 1500);
      } else {
        throw new Error('Failed to delete');
      }
    } catch (err: any) {
      setSaveStatus('error');
      setStatusMessage(err.message || 'Error deleting article.');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog),
      });

      const result = await response.json();

      if (response.ok) {
        setSaveStatus('success');
        setStatusMessage(
          result.source === 'supabase'
            ? 'Published directly to Supabase database!'
            : 'Saved successfully! (Active in local & Supabase-ready pipeline)'
        );
      } else {
        throw new Error(result.error || 'Failed to save');
      }
    } catch (err: any) {
      setSaveStatus('error');
      setStatusMessage(err.message || 'Error saving article.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus('idle'), 5000);
    }
  };

  const calculateReadingTime = (text: string) => {
    if (!text) return 2;
    const totalWords = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(totalWords / 200));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar Library */}
      <aside className="w-full md:w-64 lg:w-72 md:shrink-0 border-r border-border/60 bg-muted/10 md:min-h-screen flex flex-col">
        <div className="p-5 border-b border-border/60 sticky top-0 md:top-[72px] z-30 bg-muted/50 backdrop-blur">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Article Library
          </h2>
          <button
            type="button"
            onClick={() => {
              setBlog(defaultPost);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-2 px-3 rounded-lg bg-gold hover:bg-gold-400 text-gold-foreground text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </button>
        </div>
        <div className="p-3 space-y-1 overflow-y-auto max-h-[40vh] md:max-h-[calc(100vh-160px)] md:sticky md:top-[160px]">
          {allBlogs.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                const post = allBlogs.find((i) => i.id === b.id);
                if (post) {
                  setBlog(post);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors flex items-start gap-2.5 ${
                blog.id === b.id
                  ? 'bg-card border border-gold/40 shadow-sm text-foreground font-medium'
                  : 'hover:bg-card border border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <FileText className={`w-4 h-4 shrink-0 mt-0.5 ${blog.id === b.id ? 'text-gold' : ''}`} />
              <span className="line-clamp-2 leading-relaxed">{b.title}</span>
            </button>
          ))}
          {allBlogs.length === 0 && (
            <div className="p-4 text-center text-xs text-muted-foreground italic border border-dashed border-border/50 rounded-lg mt-2">
              No past articles found.
            </div>
          )}
        </div>
      </aside>

      {/* Main CMS Editor Area */}
      <div className="flex-1 min-w-0 pb-24">
        {/* Top sticky control bar */}
        <div className="sticky top-[72px] z-40 bg-card/95 backdrop-blur border-b border-border py-3 px-4 sm:px-6 lg:px-8 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-fraunces text-xl font-light text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <span>Blog Writing Studio</span>
              </span>
            </div>

            <div className="flex items-center flex-wrap gap-2">
              {/* View switchers */}
              <div className="bg-muted p-1 rounded-lg flex items-center border border-border text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('editor')}
                  className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                    viewMode === 'editor'
                      ? 'bg-card text-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editor</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('split')}
                  className={`hidden md:flex px-3 py-1.5 rounded-md items-center gap-1.5 transition-all ${
                    viewMode === 'split'
                      ? 'bg-card text-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span>Split View</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('preview')}
                  className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                    viewMode === 'preview'
                      ? 'bg-card text-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Preview</span>
                </button>
              </div>

              {/* Delete Button */}
              {blog.id && blog.id !== 'new-post' && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isSaving}
                  className="text-xs px-3 py-1.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-1.5 font-medium shadow-sm disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              )}

              {/* Save & Publish */}
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving || !blog.title}
                className="text-xs px-4 py-1.5 rounded-lg bg-gold hover:bg-gold-400 text-gold-foreground font-semibold transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSaving ? 'Publishing...' : 'Save & Publish'}</span>
              </button>
            </div>
          </div>

          {/* Feedback Alert */}
          {saveStatus !== 'idle' && (
            <div className="max-w-7xl mx-auto mt-2">
              <div
                className={`p-2.5 rounded-md text-xs flex items-center justify-between gap-2 ${
                  saveStatus === 'success'
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                    : 'bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  {saveStatus === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{statusMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSaveStatus('idle')}
                  className="opacity-70 hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div
            className={`grid gap-8 ${
              viewMode === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'
            }`}
          >
            {/* EDITOR COLUMN */}
            {(viewMode === 'editor' || viewMode === 'split') && (
              <div className="space-y-6">
                {/* Metadata Card */}
                <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gold flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Article Settings</span>
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={blog.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="e.g. Rethinking Academic Publishing"
                        className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                          Subtitle
                        </label>
                        <input
                          type="text"
                          value={blog.subtitle || ''}
                          onChange={(e) =>
                            setBlog((prev) => ({ ...prev, subtitle: e.target.value }))
                          }
                          placeholder="e.g. A deep dive into modern platforms"
                          className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                          URL Slug
                        </label>
                        <input
                          type="text"
                          value={blog.slug}
                          onChange={(e) =>
                            setBlog((prev) => ({ ...prev, slug: e.target.value }))
                          }
                          className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground text-xs font-mono focus:outline-none focus:ring-1 focus:ring-gold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                       <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                          Publication Status
                        </label>
                        <select
                          value={blog.status}
                          onChange={(e) =>
                            setBlog((prev) => ({
                              ...prev,
                              status: e.target.value as 'draft' | 'published',
                            }))
                          }
                          className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-gold"
                        >
                          <option value="published">Published (Public)</option>
                          <option value="draft">Draft (Private)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">
                        Short Excerpt
                      </label>
                      <textarea
                        rows={2}
                        value={blog.excerpt || ''}
                        onChange={(e) =>
                          setBlog((prev) => ({ ...prev, excerpt: e.target.value }))
                        }
                        placeholder="Brief 1-2 sentence teaser for cards..."
                        className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Editor */}
                <div className="p-6 rounded-xl border border-border bg-card shadow-sm space-y-4">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gold flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>Article Content</span>
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    Write your article content here. Separate paragraphs with double newlines (Press Enter twice).
                  </p>
                  <textarea
                    rows={20}
                    value={blog.content}
                    onChange={(e) =>
                      setBlog((prev) => ({ ...prev, content: e.target.value }))
                    }
                    className="w-full px-4 py-3 rounded-md bg-background border border-input text-foreground text-sm font-sans leading-relaxed focus:outline-none focus:ring-1 focus:ring-gold whitespace-pre-wrap resize-y"
                    placeholder="Write your full article here..."
                  />
                </div>
              </div>
            )}

            {/* PREVIEW COLUMN */}
            {(viewMode === 'preview' || viewMode === 'split') && (
              <div
                className={`sticky top-[150px] overflow-y-auto ${
                  viewMode === 'preview' ? 'max-w-4xl mx-auto w-full' : 'max-h-[calc(100vh-170px)]'
                }`}
              >
                <div className="bg-background border border-border rounded-xl shadow-lg overflow-hidden flex flex-col">
                  {/* Preview Browser Header */}
                  <div className="bg-muted px-4 py-2 border-b border-border flex items-center gap-2 shrink-0">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80"></div>
                    </div>
                    <div className="mx-auto flex-1 text-center">
                      <div className="inline-flex px-3 py-1 bg-background rounded-md text-[10px] font-mono text-muted-foreground border border-border/50">
                        solomonatah.com/blog/{blog.slug}
                      </div>
                    </div>
                  </div>

                  {/* Rendered Output (Simulating the Blog Post Page) */}
                  <div className="p-8 lg:p-12 overflow-y-auto flex-1">
                    <article className="max-w-3xl mx-auto">
                      <header className="mb-14 pb-10 border-b border-border">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          {blog.subtitle && (
                            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                              {blog.subtitle}
                            </span>
                          )}
                        </div>
                        <h1 className="font-fraunces text-3xl sm:text-4xl md:text-5xl font-light text-foreground leading-[1.15] mb-6">
                          {blog.title || 'Untitled Article'}
                        </h1>
                        {blog.excerpt && (
                          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            {blog.excerpt}
                          </p>
                        )}
                        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground pt-4 border-t border-border/40">
                          <div className="flex items-center gap-4 font-medium">
                            <time dateTime={blog.published_at}>
                              {formatDate(blog.published_at)}
                            </time>
                            <span className="text-border">•</span>
                            <span>{calculateReadingTime(blog.content)} min read</span>
                          </div>
                        </div>
                      </header>
                      
                      <div className="my-10 text-foreground">
                        {blog.content.split('\n\n').filter(Boolean).map((paragraph, index) => (
                          <p key={index} className="text-base sm:text-lg leading-relaxed mb-6 whitespace-pre-line">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
