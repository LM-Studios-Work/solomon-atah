'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { buildCitationAPA, buildCitationMLA, buildCitationChicago } from '@/lib/utils'

interface CitationBlockProps {
  guestName: string
  hostName?: string
  title: string
  podcastName?: string
  publishedAt: string | Date
  url: string
}

const HOST = 'Solomon Atah'
const PODCAST = 'The Solomon Atah Podcast'

export function CitationBlock({
  guestName,
  hostName = HOST,
  title,
  podcastName = PODCAST,
  publishedAt,
  url,
}: CitationBlockProps) {
  const [format, setFormat] = useState<'apa' | 'mla' | 'chicago'>('apa')
  const [copied, setCopied] = useState(false)

  const params = { guestName, hostName, title, podcastName, publishedAt, url }

  const citations = {
    apa: buildCitationAPA(params),
    mla: buildCitationMLA(params),
    chicago: buildCitationChicago(params),
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(citations[format])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border border-border rounded-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <h3 className="text-sm font-semibold">How to cite this conversation</h3>
        <div className="flex gap-1">
          {(['apa', 'mla', 'chicago'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                format === f
                  ? 'bg-purple text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Citation text */}
      <div className="p-4">
        <p
          className="text-sm leading-relaxed text-muted-foreground font-mono break-words"
          dangerouslySetInnerHTML={{
            __html: citations[format]
              .replace(/\*(.*?)\*/g, '<em>$1</em>'),
          }}
        />
      </div>

      {/* Copy button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-600" />
              <span>Copied to clipboard</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy citation</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
