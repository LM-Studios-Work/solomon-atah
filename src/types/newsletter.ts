export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'list'
  | 'quote'
  | 'callout'
  | 'image'
  | 'divider';

export interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading';
  level: 2 | 3 | 4;
  text: string;
}

export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph';
  text: string;
}

export interface ListBlock extends BaseBlock {
  type: 'list';
  style: 'bullet' | 'numbered';
  items: string[];
}

export interface QuoteBlock extends BaseBlock {
  type: 'quote';
  text: string;
  attribution?: string;
}

export interface CalloutBlock extends BaseBlock {
  type: 'callout';
  title?: string;
  text: string;
  variant?: 'gold' | 'purple' | 'subtle';
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  url: string;
  alt?: string;
  caption?: string;
}

export interface DividerBlock extends BaseBlock {
  type: 'divider';
}

export type NewsletterBlock =
  | HeadingBlock
  | ParagraphBlock
  | ListBlock
  | QuoteBlock
  | CalloutBlock
  | ImageBlock
  | DividerBlock;

export interface Newsletter {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  issue_number?: number | null;
  type: 'newsletter' | 'essay' | 'briefing' | 'dispatch';
  status: 'draft' | 'published' | 'archived';
  published_at: string;
  cover_image_url?: string | null;
  excerpt?: string | null;
  blocks: NewsletterBlock[];
  tags?: string[];
  created_at?: string;
  updated_at?: string;
}
