const ENQUIRY_TYPES = [
  { label: 'Podcast Enquiry', value: 'Podcast Enquiry' },
  { label: 'Research Collaboration', value: 'Research Collaboration' },
  { label: 'Academic Website Services', value: 'Academic Website Services' },
  { label: 'Film / Production', value: 'Film / Production' },
  { label: 'Donation / Partnership', value: 'Donation / Partnership' },
  { label: 'Information Enquiry', value: 'Information Enquiry' },
]

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

export function ContactForm() {
  return (
    <form
      action="https://formsubmit.co/podcast@solomonatah.com"
      method="POST"
      className="border border-border bg-card p-7 shadow-[0_12px_28px_rgba(0,0,0,0.04)]"
    >
      <input type="hidden" name="_subject" value="New contact enquiry from solomonatah.com" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://solomonatah.com/contact" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" id="name" required>
          <input id="name" name="name" type="text" required className={inputClass()} />
        </Field>
        <Field label="Email Address" id="email" required>
          <input id="email" name="email" type="email" required className={inputClass()} />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Organisation / Institution" id="organisation">
          <input id="organisation" name="organisation" type="text" className={inputClass()} />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Enquiry Type" id="enquiry_type" required>
          <select id="enquiry_type" name="enquiry_type" required className={inputClass()}>
            <option value="">Select a category</option>
            {ENQUIRY_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message" id="message" required>
          <textarea id="message" name="message" rows={6} required className={`${inputClass()} resize-y`} />
        </Field>
      </div>

      <input type="text" name="_honey" className="hidden" aria-hidden="true" tabIndex={-1} />

      <button
        type="submit"
        className="mt-6 rounded-sm bg-purple px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-800"
      >
        Send Message
      </button>
    </form>
  )
}
