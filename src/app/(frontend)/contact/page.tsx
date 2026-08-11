import type { Metadata } from 'next'
import { Mail, MessageSquareText, Podcast, Search } from 'lucide-react'
import { ContactForm } from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contact, Solomon Atah Pty Ltd',
  description:
    'Get in touch with Solomon Atah Pty Ltd for podcast, research, and general information enquiries.',
}

const CONTACT_CATEGORIES = [
  {
    title: 'Podcast Enquiries',
    description:
      'Podcast appearances, episode enquiries, interview requests, and archive questions.',
    email: 'podcast@solomonatah.com',
    icon: Podcast,
  },
  {
    title: 'Research Collaborations',
    description:
      'Research partnerships, advisory roles, NinTA Research commissions, and academic consulting enquiries.',
    email: 'research@solomonatah.com',
    icon: Search,
  },
  {
    title: 'Information Enquiries',
    description:
      'Questions about the archive, publishing, film projects, partnerships, or general company work.',
    email: 'info@solomonatah.com',
    icon: Mail,
  },
]

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="border-b border-border bg-purple text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Contact
          </p>
          <h1 className="mb-6 font-fraunces text-5xl font-light leading-tight md:text-7xl">
            Get in Touch
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/78 md:text-lg">
            Reach the right person directly. Choose the enquiry path that fits, or use the form
            and the message will be routed internally.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mb-10 flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Enquiry Paths
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {CONTACT_CATEGORIES.map((cat) => {
              const Icon = cat.icon

              return (
                <article key={cat.title} className="border border-border bg-card p-7 shadow-[0_12px_28px_rgba(0,0,0,0.04)]">
                  <Icon className="mb-6 h-9 w-9 text-gold" strokeWidth={1.35} />
                  <h2 className="mb-3 font-fraunces text-2xl font-light">{cat.title}</h2>
                  <p className="mb-6 text-sm leading-7 text-muted-foreground">{cat.description}</p>
                  <a href={`mailto:${cat.email}`} className="text-sm font-medium text-purple hover:underline">
                    {cat.email}
                  </a>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:py-20 lg:px-8">
          <div>
            <MessageSquareText className="mb-6 h-10 w-10 text-gold" strokeWidth={1.35} />
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Send a Message
            </p>
            <h2 className="mb-4 font-fraunces text-4xl font-light">General Contact Form</h2>
            <p className="text-sm leading-7 text-muted-foreground md:text-base">
              Use this form for anything that does not fit neatly into a category. Keep the
              message specific so it can be routed quickly.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  )
}

