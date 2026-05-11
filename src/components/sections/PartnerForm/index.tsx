const FORM_ENDPOINT = 'https://formsubmit.co/podcast@solomonatah.com'

const PARTNERSHIP_TYPES = [
  'Institutional Sponsorship',
  'Research Collaboration',
  'Media Partnership',
  'Speaking Engagement',
  'Grant / Funding Inquiry',
  'Academic Partnership',
  'Other',
]

const BUDGETS = [
  'Under $1,000',
  '$1,000-$5,000',
  '$5,000-$20,000',
  '$20,000-$50,000',
  'Over $50,000',
  'Not applicable / TBD',
]

function inputClass() {
  return 'w-full px-3.5 py-2.5 text-sm border rounded-sm bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple border-border'
}

function Label({ children, required = false }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium">
      {children}
      {required && <span className="text-destructive ml-1">*</span>}
    </label>
  )
}

export function PartnerForm() {
  return (
    <form action={FORM_ENDPOINT} method="POST" className="space-y-6">
      <input type="hidden" name="_subject" value="New partnership enquiry from solomonatah.com" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://solomonatah.com/partner" />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} aria-hidden="true" />

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label required>Organisation</Label>
          <input name="organisation" type="text" required placeholder="Africa Policy Foundation" className={inputClass()} />
        </div>
        <div className="space-y-1.5">
          <Label required>Contact Person</Label>
          <input name="contact_name" type="text" required placeholder="Dr. Amara Diallo" className={inputClass()} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label required>Email</Label>
          <input name="email" type="email" required placeholder="amara@foundation.org" className={inputClass()} />
        </div>
        <div className="space-y-1.5">
          <Label>Job Title</Label>
          <input name="job_title" type="text" placeholder="Director of Research" className={inputClass()} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label required>Nature of Inquiry</Label>
          <select name="partnership_type" required className={inputClass()}>
            <option value="">Select...</option>
            {PARTNERSHIP_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label>Indicative Budget</Label>
          <select name="budget" className={inputClass()}>
            <option value="">Select if applicable...</option>
            {BUDGETS.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label required>Message</Label>
        <textarea
          name="message"
          required
          minLength={50}
          rows={6}
          placeholder="Describe the nature of the partnership you have in mind and what you hope to achieve."
          className={`${inputClass()} resize-y`}
        />
      </div>

      <button type="submit" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-purple text-white font-medium rounded-sm hover:bg-purple/90 transition-colors">
        Send Inquiry
      </button>
    </form>
  )
}
