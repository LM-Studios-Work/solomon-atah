'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { BOOKS, HOODIES, PODCAST_MERCH, PRODUCTS, type Product, type ProductStatus } from '@/lib/products'

const FORM_ENDPOINT = 'https://formsubmit.co/podcast@solomonatah.com'

const STATUS_STYLES: Record<ProductStatus, string> = {
  'Coming Soon': 'text-muted-foreground border-border',
  'Pre-Order': 'text-gold border-gold/30',
  Available: 'text-purple border-purple/30',
}

function inputClass() {
  return 'w-full rounded-sm border border-border bg-background px-4 py-3 text-sm focus:border-purple focus:outline-none focus:ring-2 focus:ring-purple/20'
}

function Field({
  label,
  id,
  children,
  required = false,
}: {
  label: string
  id: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>
      {children}
    </div>
  )
}

export function MerchandisePageContent() {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].slug)
  const selected = PRODUCTS.find((product) => product.slug === selectedProduct) || PRODUCTS[0]

  useEffect(() => {
    const requestedProduct = new URLSearchParams(window.location.search).get('product')

    if (requestedProduct && PRODUCTS.some((product) => product.slug === requestedProduct)) {
      setSelectedProduct(requestedProduct)
    }
  }, [])

  function selectProduct(product: Product) {
    setSelectedProduct(product.slug)
    window.setTimeout(() => {
      document.getElementById('merchandise-enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  return (
    <div className="bg-background text-foreground">
      <section className="border-b border-border bg-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-4">
            Solomon Atah Pty Ltd
          </p>
          <h1 className="font-fraunces text-5xl md:text-7xl font-light leading-tight mb-6">
            Merchandise &amp; Books
          </h1>
          <p className="text-base md:text-lg text-white/78 leading-relaxed max-w-2xl">
            Branded apparel and books from The Solomon Atah Podcast and Solomon Atah Pty Ltd.
            Every item is an extension of the intellectual identity of the brand.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
              Podcast Merchandise
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {PODCAST_MERCH.map((item) => (
              <div key={item.name} className="border border-border bg-card rounded-sm overflow-hidden hover:border-purple/30 transition-colors shadow-[0_12px_28px_rgba(0,0,0,0.04)]">
                <div className="relative aspect-square bg-muted/30 flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">Image coming soon</p>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-medium text-sm leading-snug">{item.name}</p>
                    <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_STYLES[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2 mb-4">{item.description}</p>
                  <button type="button" onClick={() => selectProduct(item)} className="text-sm text-purple hover:underline font-medium">
                    Pre-order interest
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
              Branded Apparel
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOODIES.map((item) => (
              <div
                key={item.name}
                className="border border-border bg-card rounded-sm overflow-hidden hover:border-purple/30 transition-colors group shadow-[0_12px_28px_rgba(0,0,0,0.04)]"
              >
                <div className="relative aspect-[3/4] bg-muted/30">
                  <Image
                    src={item.image || ''}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-fraunces text-base leading-snug">{item.tagline}</p>
                    <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_STYLES[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <button type="button" onClick={() => selectProduct(item)} className="text-sm text-purple hover:underline font-medium">
                    Order enquiry
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10 max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                Special Edition Books
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <h2 className="font-fraunces text-4xl font-light mb-4">Books from Solomon Atah</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-7">
              Published works presented as durable intellectual objects: books, arguments, and
              frameworks connected to the wider research and publishing house.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {BOOKS.map((book) => (
              <article key={book.name} className="group">
                <div className="relative mb-5 aspect-[2/3] overflow-hidden rounded-sm bg-muted/30 shadow-[0_18px_32px_rgba(0,0,0,0.12)]">
                  <div className="absolute inset-0 bg-muted/30" />
                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={book.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
                      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Cover coming soon
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="font-fraunces text-xl font-light leading-snug">{book.name}</h3>
                  <span className={`shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full border ${STATUS_STYLES[book.status]}`}>
                    {book.status}
                  </span>
                </div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.08em] text-gold">
                  {book.subtitle}
                </p>
                <p className="text-sm text-muted-foreground leading-6 mb-4">
                  {book.description}
                </p>
                <button type="button" onClick={() => selectProduct(book)} className="text-sm text-purple hover:underline font-medium">
                  Order title
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="merchandise-enquiry" className="border-b border-border bg-background scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1fr]">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
                Product Enquiry
              </p>
              <h2 className="font-fraunces text-4xl font-light mb-4">Send your interest</h2>
              <p className="text-sm md:text-base text-muted-foreground leading-7">
                Select a merchandise item or book, then send your contact details and any sizing,
                quantity, shipping, or availability questions.
              </p>
              <div className="mt-6 border border-border bg-card p-5 rounded-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground mb-2">
                  Current selection
                </p>
                <p className="font-fraunces text-xl">{selected.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">{selected.category} / {selected.status}</p>
              </div>
            </div>

            <form action={FORM_ENDPOINT} method="POST" className="border border-border bg-card p-6 md:p-7 shadow-[0_12px_28px_rgba(0,0,0,0.04)]">
              <input type="hidden" name="_subject" value={`Merchandise and books enquiry: ${selected.name}`} />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://solomonatah.com/merchandise" />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} aria-hidden="true" />
              <input type="hidden" name="product" value={selected.name} />
              <input type="hidden" name="product_category" value={selected.category} />
              <input type="hidden" name="product_status" value={selected.status} />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" id="merch_name" required>
                  <input id="merch_name" name="name" type="text" required className={inputClass()} />
                </Field>
                <Field label="Email Address" id="merch_email" required>
                  <input id="merch_email" name="email" type="email" required className={inputClass()} />
                </Field>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Interested In" id="merch_product" required>
                  <select
                    id="merch_product"
                    name="product_key"
                    required
                    value={selectedProduct}
                    onChange={(event) => setSelectedProduct(event.target.value)}
                    className={inputClass()}
                  >
                    {PRODUCTS.map((product) => (
                      <option key={product.slug} value={product.slug}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Quantity / Size" id="merch_quantity">
                  <input id="merch_quantity" name="quantity_or_size" type="text" placeholder="e.g. 1, medium hoodie" className={inputClass()} />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Message" id="merch_message" required>
                  <textarea
                    id="merch_message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us what you would like to order, where it should ship, or what you need to know."
                    className={`${inputClass()} resize-y`}
                  />
                </Field>
              </div>

              <button type="submit" className="mt-6 rounded-sm bg-purple px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-purple/90">
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
              Stay Updated
            </p>
            <h2 className="font-fraunces text-3xl font-light mb-4">
              New titles and drops incoming
            </h2>
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              Leave your email to be notified when new merchandise and book editions launch.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" action={FORM_ENDPOINT} method="POST">
              <input type="hidden" name="_subject" value="New newsletter signup enquiry from solomonatah.com" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://solomonatah.com/merchandise" />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} aria-hidden="true" />
              <input type="hidden" name="enquiry_type" value="Newsletter Signup" />
              <input type="hidden" name="message" value="Please add this email to newsletter and launch updates." />
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 text-sm border border-white/20 rounded-sm bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-white text-purple text-sm font-medium rounded-sm hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                Notify Me
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
