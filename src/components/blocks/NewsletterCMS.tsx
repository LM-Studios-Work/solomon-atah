'use client';

import React, { useState } from 'react';
import { Newsletter, NewsletterBlock, BlockType } from '@/types/newsletter';
import { NewsletterBlockRenderer } from './NewsletterBlockRenderer';
import sampleNewsletters from '@/data/newsletters.json';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  Edit3,
  Columns,
  Save,
  CheckCircle2,
  AlertCircle,
  Copy,
  Sparkles,
  Layers,
  FileText,
  List,
  Quote as QuoteIcon,
  Image as ImageIcon,
  HelpCircle,
  Link as LinkIcon,
  Code
} from 'lucide-react';

interface Props {
  initialData?: Newsletter | null;
  allNewsletters?: Newsletter[];
}

export function NewsletterCMS({ initialData, allNewsletters = [] }: Props) {
  // Default issue template or loaded data
  const defaultIssue: Newsletter = initialData || {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'new-issue',
    slug: 'new-newsletter-issue',
    title: '',
    subtitle: 'The Solomon Atah Podcast | Monthly Newsletter',
    issue_number: 8,
    type: 'newsletter',
    status: 'published',
    published_at: new Date().toISOString(),
    excerpt: '',
    tags: ['Scholarship', 'Academic Infrastructure'],
    blocks: [
      {
        id: 'block-1',
        type: 'paragraph',
        text: 'Write your opening newsletter paragraph here. Use **bold words** for emphasis.',
      },
    ],
  };

  const [newsletter, setNewsletter] = useState<Newsletter>(defaultIssue);
  const [viewMode, setViewMode] = useState<'split' | 'editor' | 'preview'>('split');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Auto-generate slug from title if slug hasn't been manually customized
  const handleTitleChange = (newTitle: string) => {
    const generatedSlug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setNewsletter((prev) => ({
      ...prev,
      title: newTitle,
      slug: prev.slug === 'new-newsletter-issue' || prev.slug === '' ? generatedSlug : prev.slug,
    }));
  };

  // Block management
  const addBlock = (type: BlockType) => {
    const id = `b-${Date.now()}`;
    let newBlock: NewsletterBlock;

    switch (type) {
      case 'heading':
        newBlock = { id, type: 'heading', level: 2, text: 'New Section Heading' };
        break;
      case 'paragraph':
        newBlock = { id, type: 'paragraph', text: 'Enter paragraph text here...' };
        break;
      case 'list':
        newBlock = {
          id,
          type: 'list',
          style: 'bullet',
          items: ['First key takeaway point', 'Second key takeaway point'],
        };
        break;
      case 'quote':
        newBlock = {
          id,
          type: 'quote',
          text: 'Enter a notable quote or core takeaway here.',
          attribution: 'The Solomon Atah Podcast',
        };
        break;
      case 'callout':
        newBlock = {
          id,
          type: 'callout',
          variant: 'gold',
          title: 'Key Insight',
          text: 'Important highlight or call-to-action message.',
        };
        break;
      case 'image':
        newBlock = {
          id,
          type: 'image',
          url: '/company%20resources/logo%20solomon%20atah%20main%20company.jpeg',
          alt: 'Newsletter graphic',
          caption: 'Editorial photo caption',
        };
        break;
      case 'divider':
        newBlock = { id, type: 'divider' };
        break;
      default:
        return;
    }

    setNewsletter((prev) => ({
      ...prev,
      blocks: [...prev.blocks, newBlock],
    }));
  };

  const updateBlock = (index: number, updatedBlock: NewsletterBlock) => {
    setNewsletter((prev) => {
      const nextBlocks = [...prev.blocks];
      nextBlocks[index] = updatedBlock;
      return { ...prev, blocks: nextBlocks };
    });
  };

  const removeBlock = (index: number) => {
    setNewsletter((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((_, i) => i !== index),
    }));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === newsletter.blocks.length - 1)
    ) {
      return;
    }

    setNewsletter((prev) => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const nextBlocks = [...prev.blocks];
      const temp = nextBlocks[index];
      nextBlocks[index] = nextBlocks[targetIndex];
      nextBlocks[targetIndex] = temp;
      return { ...prev, blocks: nextBlocks };
    });
  };

  const loadJulyTemplate = () => {
    if (sampleNewsletters && sampleNewsletters.length > 0) {
      setNewsletter({
        ...(sampleNewsletters[0] as Newsletter),
        id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'new-issue',
        title: 'Copy of ' + sampleNewsletters[0].title,
        slug: 'copy-of-' + sampleNewsletters[0].slug
      });
      setSaveStatus('success');
      setStatusMessage('Loaded template successfully!');
      setTimeout(() => setSaveStatus('idle'), 3500);
    }
  };

  const loadIssue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId === 'new') {
      setNewsletter(defaultIssue);
      return;
    }
    const issue = allNewsletters.find((n) => n.id === selectedId || n.slug === selectedId);
    if (issue) {
      setNewsletter(issue);
    }
  };

  const handleDelete = async () => {
    if (!newsletter.id || newsletter.id === 'new-issue') {
      setStatusMessage('Cannot delete an unsaved draft.');
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
      return;
    }

    if (!confirm('Are you sure you want to delete this newsletter? This cannot be undone.')) {
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`/api/newsletters?id=${newsletter.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSaveStatus('success');
        setStatusMessage('Newsletter deleted successfully!');
        setTimeout(() => {
          setSaveStatus('idle');
          window.location.reload(); 
        }, 1500);
      } else {
        throw new Error('Failed to delete');
      }
    } catch (err: any) {
      setSaveStatus('error');
      setStatusMessage(err.message || 'Error deleting newsletter.');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const response = await fetch('/api/newsletters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsletter),
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
      setStatusMessage(err.message || 'Error saving newsletter.');
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar Library */}
      <aside className="w-full md:w-64 lg:w-72 md:shrink-0 border-r border-border/60 bg-muted/10 md:min-h-screen flex flex-col">
        <div className="p-5 border-b border-border/60 sticky top-0 md:top-[72px] z-30 bg-muted/50 backdrop-blur">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Issue Library
          </h2>
          <button
            type="button"
            onClick={() => {
              setNewsletter(defaultIssue);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-2 px-3 rounded-lg bg-gold hover:bg-gold-400 text-gold-foreground text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Issue</span>
          </button>
        </div>
        <div className="p-3 space-y-1 overflow-y-auto max-h-[40vh] md:max-h-[calc(100vh-160px)] md:sticky md:top-[160px]">
          {allNewsletters.map((n) => (
            <button
              key={n.id}
              onClick={() => {
                const issue = allNewsletters.find((i) => i.id === n.id);
                if (issue) {
                  setNewsletter(issue);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors flex items-start gap-2.5 ${
                newsletter.id === n.id
                  ? 'bg-card border border-gold/40 shadow-sm text-foreground font-medium'
                  : 'hover:bg-card border border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <FileText className={`w-4 h-4 shrink-0 mt-0.5 ${newsletter.id === n.id ? 'text-gold' : ''}`} />
              <span className="line-clamp-2 leading-relaxed">{n.title}</span>
            </button>
          ))}
          {allNewsletters.length === 0 && (
            <div className="p-4 text-center text-xs text-muted-foreground italic border border-dashed border-border/50 rounded-lg mt-2">
              No past issues found.
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
              <span>Newsletter Block Studio</span>
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border">
              {newsletter.blocks.length} Blocks
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


            {/* Quick Template Button */}
            <button
              type="button"
              onClick={loadJulyTemplate}
              className="text-xs px-3 py-1.5 rounded-lg border border-gold/40 text-gold hover:bg-gold/10 transition-colors flex items-center gap-1.5 font-medium"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load template</span>
            </button>
            
            {/* Delete Button */}
            {newsletter.id && newsletter.id !== 'new-issue' && (
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
              disabled={isSaving || !newsletter.title}
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
                  <span>Issue Settings & Metadata</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Issue Title *
                    </label>
                    <input
                      type="text"
                      value={newsletter.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Research Deserves More Than Publication..."
                      className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">
                        Subtitle / Series
                      </label>
                      <input
                        type="text"
                        value={newsletter.subtitle || ''}
                        onChange={(e) =>
                          setNewsletter((prev) => ({ ...prev, subtitle: e.target.value }))
                        }
                        placeholder="e.g. The Solomon Atah Podcast | July Newsletter"
                        className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">
                        Issue Number
                      </label>
                      <input
                        type="number"
                        value={newsletter.issue_number || 1}
                        onChange={(e) =>
                          setNewsletter((prev) => ({
                            ...prev,
                            issue_number: parseInt(e.target.value) || 1,
                          }))
                        }
                        className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        value={newsletter.slug}
                        onChange={(e) =>
                          setNewsletter((prev) => ({ ...prev, slug: e.target.value }))
                        }
                        className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground text-xs font-mono focus:outline-none focus:ring-1 focus:ring-gold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1">
                        Publication Status
                      </label>
                      <select
                        value={newsletter.status}
                        onChange={(e) =>
                          setNewsletter((prev) => ({
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
                      Short Excerpt / Email Preview Line
                    </label>
                    <textarea
                      rows={2}
                      value={newsletter.excerpt || ''}
                      onChange={(e) =>
                        setNewsletter((prev) => ({ ...prev, excerpt: e.target.value }))
                      }
                      placeholder="Brief 1-2 sentence teaser for cards and email inboxes..."
                      className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                  </div>
                </div>
              </div>

              {/* Block List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>Newsletter Blocks ({newsletter.blocks.length})</span>
                  </h3>
                  <span className="text-[11px] text-muted-foreground italic">
                    Tip: Use **text** for bold, *text* for italic
                  </span>
                </div>

                {newsletter.blocks.map((block, idx) => (
                  <div
                    key={block.id || idx}
                    className="p-5 rounded-xl border border-border bg-card shadow-sm hover:border-gold/30 transition-all space-y-3"
                  >
                    {/* Block header */}
                    <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          #{idx + 1}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wide text-gold">
                          {block.type}
                        </span>
                        {block.type === 'heading' && (
                          <span className="text-[10px] font-mono text-muted-foreground">
                            (H{block.level})
                          </span>
                        )}
                        {block.type === 'list' && (
                          <span className="text-[10px] font-mono text-muted-foreground">
                            ({block.style} - {block.items.length} items)
                          </span>
                        )}
                      </div>

                      {/* Reorder / Delete Actions */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveBlock(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-20"
                          title="Move Block Up"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveBlock(idx, 'down')}
                          disabled={idx === newsletter.blocks.length - 1}
                          className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground disabled:opacity-20"
                          title="Move Block Down"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeBlock(idx)}
                          className="p-1 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors ml-1"
                          title="Delete Block"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Block Body Form Fields */}
                    {block.type === 'heading' && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <label className="text-[11px] font-medium text-muted-foreground">
                            Level:
                          </label>
                          <div className="flex gap-2">
                            {([2, 3, 4] as const).map((lvl) => (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => updateBlock(idx, { ...block, level: lvl })}
                                className={`px-2.5 py-0.5 rounded text-xs font-mono ${
                                  block.level === lvl
                                    ? 'bg-gold text-gold-foreground font-bold'
                                    : 'bg-muted text-muted-foreground hover:text-foreground'
                                }`}
                              >
                                H{lvl}
                              </button>
                            ))}
                          </div>
                        </div>
                        <input
                          type="text"
                          value={block.text}
                          onChange={(e) =>
                            updateBlock(idx, { ...block, text: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground text-sm font-fraunces font-light"
                          placeholder="Heading title..."
                        />
                      </div>
                    )}

                    {block.type === 'paragraph' && (
                      <div>
                        <textarea
                          rows={4}
                          value={block.text}
                          onChange={(e) =>
                            updateBlock(idx, { ...block, text: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground text-sm leading-relaxed"
                          placeholder="Write paragraph content here..."
                        />
                      </div>
                    )}

                    {block.type === 'list' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                updateBlock(idx, { ...block, style: 'bullet' })
                              }
                              className={`px-2 py-1 rounded text-xs ${
                                block.style === 'bullet'
                                  ? 'bg-gold text-gold-foreground font-semibold'
                                  : 'bg-muted text-muted-foreground'
                              }`}
                            >
                              • Bullet Points
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                updateBlock(idx, { ...block, style: 'numbered' })
                              }
                              className={`px-2 py-1 rounded text-xs ${
                                block.style === 'numbered'
                                  ? 'bg-gold text-gold-foreground font-semibold'
                                  : 'bg-muted text-muted-foreground'
                              }`}
                            >
                              1. Numbered
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              updateBlock(idx, {
                                ...block,
                                items: [...block.items, 'New bullet item point...'],
                              })
                            }
                            className="text-xs text-gold hover:underline flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Item</span>
                          </button>
                        </div>

                        {block.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-start gap-2">
                            <span className="font-mono text-xs text-gold mt-2 shrink-0">
                              {block.style === 'numbered' ? `${itemIdx + 1}.` : '•'}
                            </span>
                            <textarea
                              rows={2}
                              value={item}
                              onChange={(e) => {
                                const nextItems = [...block.items];
                                nextItems[itemIdx] = e.target.value;
                                updateBlock(idx, { ...block, items: nextItems });
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-background border border-input text-foreground text-xs leading-relaxed"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const nextItems = block.items.filter((_, i) => i !== itemIdx);
                                updateBlock(idx, { ...block, items: nextItems });
                              }}
                              className="p-1 rounded text-muted-foreground hover:text-red-500 mt-1"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {block.type === 'quote' && (
                      <div className="space-y-2">
                        <textarea
                          rows={3}
                          value={block.text}
                          onChange={(e) =>
                            updateBlock(idx, { ...block, text: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground text-sm font-fraunces italic"
                          placeholder="Editorial quote..."
                        />
                        <input
                          type="text"
                          value={block.attribution || ''}
                          onChange={(e) =>
                            updateBlock(idx, { ...block, attribution: e.target.value })
                          }
                          className="w-full px-3 py-1.5 rounded-md bg-background border border-input text-foreground text-xs"
                          placeholder="Attribution / Citation author (e.g. The Solomon Atah Podcast)"
                        />
                      </div>
                    )}

                    {block.type === 'callout' && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <label className="text-[11px] font-medium text-muted-foreground">
                            Theme:
                          </label>
                          <div className="flex gap-2">
                            {(['gold', 'purple', 'subtle'] as const).map((v) => (
                              <button
                                key={v}
                                type="button"
                                onClick={() => updateBlock(idx, { ...block, variant: v })}
                                className={`px-2.5 py-0.5 rounded text-xs capitalize ${
                                  block.variant === v
                                    ? 'bg-gold text-gold-foreground font-semibold'
                                    : 'bg-muted text-muted-foreground'
                                }`}
                              >
                                {v}
                              </button>
                            ))}
                          </div>
                        </div>
                        <input
                          type="text"
                          value={block.title || ''}
                          onChange={(e) =>
                            updateBlock(idx, { ...block, title: e.target.value })
                          }
                          className="w-full px-3 py-1.5 rounded-md bg-background border border-input text-foreground text-xs font-semibold"
                          placeholder="Callout title (e.g. The Translational and Visibility Gap)..."
                        />
                        <textarea
                          rows={2}
                          value={block.text}
                          onChange={(e) =>
                            updateBlock(idx, { ...block, text: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-md bg-background border border-input text-foreground text-xs"
                          placeholder="Callout explanation body..."
                        />
                      </div>
                    )}

                    {block.type === 'image' && (
                      <div className="space-y-2">
                        <div>
                          <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                            Image URL / Asset Path
                          </label>
                          <input
                            type="text"
                            value={block.url}
                            onChange={(e) =>
                              updateBlock(idx, { ...block, url: e.target.value })
                            }
                            className="w-full px-3 py-1.5 rounded-md bg-background border border-input text-foreground text-xs font-mono"
                            placeholder="https://... or /company resources/..."
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-muted-foreground mb-1">
                            Caption
                          </label>
                          <input
                            type="text"
                            value={block.caption || ''}
                            onChange={(e) =>
                              updateBlock(idx, { ...block, caption: e.target.value })
                            }
                            className="w-full px-3 py-1.5 rounded-md bg-background border border-input text-foreground text-xs"
                            placeholder="Optional photo caption..."
                          />
                        </div>
                      </div>
                    )}

                    {block.type === 'divider' && (
                      <div className="py-2 text-center text-xs text-muted-foreground italic border border-dashed border-border rounded">
                        ✦ ✦ ✦ Divider Line ✦ ✦ ✦
                      </div>
                    )}
                  </div>
                ))}

                {/* Add Block Selector Toolbar */}
                <div className="p-6 rounded-xl border-2 border-dashed border-border/80 bg-card/40 text-center space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Insert New Block
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => addBlock('heading')}
                      className="px-3 py-2 rounded-lg bg-card border border-border hover:border-gold text-xs font-medium text-foreground hover:text-gold transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5 text-gold" />
                      <span>Heading</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock('paragraph')}
                      className="px-3 py-2 rounded-lg bg-card border border-border hover:border-gold text-xs font-medium text-foreground hover:text-gold transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5 text-gold" />
                      <span>Paragraph</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock('list')}
                      className="px-3 py-2 rounded-lg bg-card border border-border hover:border-gold text-xs font-medium text-foreground hover:text-gold transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <List className="w-3.5 h-3.5 text-gold" />
                      <span>Bullet List</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock('quote')}
                      className="px-3 py-2 rounded-lg bg-card border border-border hover:border-gold text-xs font-medium text-foreground hover:text-gold transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <QuoteIcon className="w-3.5 h-3.5 text-gold" />
                      <span>Quote</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock('callout')}
                      className="px-3 py-2 rounded-lg bg-card border border-border hover:border-gold text-xs font-medium text-foreground hover:text-gold transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-gold" />
                      <span>Callout Box</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock('image')}
                      className="px-3 py-2 rounded-lg bg-card border border-border hover:border-gold text-xs font-medium text-foreground hover:text-gold transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-gold" />
                      <span>Image</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => addBlock('divider')}
                      className="px-3 py-2 rounded-lg bg-card border border-border hover:border-gold text-xs font-medium text-foreground hover:text-gold transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Code className="w-3.5 h-3.5 text-gold" />
                      <span>Divider</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PREVIEW COLUMN */}
          {(viewMode === 'preview' || viewMode === 'split') && (
            <div className="space-y-6">
              <div className="p-6 md:p-10 rounded-2xl border border-border bg-card shadow-md">
                <div className="border-b border-border/80 pb-8 mb-8">
                  {/* Subtitle / Series */}
                  {newsletter.subtitle && (
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-3">
                      {newsletter.subtitle}
                    </p>
                  )}

                  {/* Issue title */}
                  <h1 className="font-fraunces text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-foreground mb-4">
                    {newsletter.title || 'Untitled Newsletter Issue'}
                  </h1>

                  {/* Excerpt */}
                  {newsletter.excerpt && (
                    <p className="text-lg text-muted-foreground leading-relaxed italic">
                      {newsletter.excerpt}
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-6 text-xs text-muted-foreground">
                    {newsletter.issue_number && (
                      <span className="font-mono font-bold text-gold px-2.5 py-0.5 rounded bg-gold/10 border border-gold/30">
                        ISSUE #{String(newsletter.issue_number).padStart(3, '0')}
                      </span>
                    )}
                    <span>•</span>
                    <span>{new Date(newsletter.published_at).toLocaleDateString('en-ZA', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>

                {/* Render blocks */}
                <NewsletterBlockRenderer blocks={newsletter.blocks} />
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
