'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  orgName: string
  contactName: string
  contactEmail: string
  contactTitle: string
  partnershipType: string
  budget: string
  message: string
  honeypot: string
}

const PARTNERSHIP_TYPES = [
  { label: 'Institutional Sponsorship', value: 'sponsorship' },
  { label: 'Research Collaboration', value: 'research' },
  { label: 'Media Partnership', value: 'media' },
  { label: 'Speaking Engagement', value: 'speaking' },
  { label: 'Grant / Funding Inquiry', value: 'grant' },
  { label: 'Academic Partnership', value: 'academic' },
  { label: 'Other', value: 'other' },
]

const BUDGETS = [
  { label: 'Under $1,000', value: 'under-1k' },
  { label: '$1,000–$5,000', value: '1k-5k' },
  { label: '$5,000–$20,000', value: '5k-20k' },
  { label: '$20,000–$50,000', value: '20k-50k' },
  { label: 'Over $50,000', value: 'over-50k' },
  { label: 'Not applicable / TBD', value: 'na' },
]

export function PartnerForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ defaultValues: { honeypot: '' } })

  const onSubmit = async (data: FormData) => {
    setServerError(null)
    try {
      const res = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Submission failed. Please try again.')
      setSubmitted(true)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'An unexpected error occurred.')
    }
  }

  if (submitted) {
    return (
      <div className="border border-border rounded-sm p-10 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h2 className="font-fraunces text-2xl mb-3">Inquiry Received</h2>
        <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
          Thank you for your interest. We have received your inquiry and will be in touch shortly.
        </p>
      </div>
    )
  }

  const inputClass = (hasError: boolean) =>
    `w-full px-3.5 py-2.5 text-sm border rounded-sm bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple ${hasError ? 'border-destructive' : 'border-border'}`

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} aria-hidden />

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Organisation <span className="text-destructive">*</span></label>
          <input {...register('orgName', { required: 'Required' })} type="text" placeholder="Africa Policy Foundation" className={inputClass(!!errors.orgName)} />
          {errors.orgName && <p className="text-xs text-destructive">{errors.orgName.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Contact Person <span className="text-destructive">*</span></label>
          <input {...register('contactName', { required: 'Required' })} type="text" placeholder="Dr. Amara Diallo" className={inputClass(!!errors.contactName)} />
          {errors.contactName && <p className="text-xs text-destructive">{errors.contactName.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Email <span className="text-destructive">*</span></label>
          <input {...register('contactEmail', { required: 'Required' })} type="email" placeholder="amara@foundation.org" className={inputClass(!!errors.contactEmail)} />
          {errors.contactEmail && <p className="text-xs text-destructive">{errors.contactEmail.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Job Title</label>
          <input {...register('contactTitle')} type="text" placeholder="Director of Research" className={inputClass(false)} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Nature of Inquiry <span className="text-destructive">*</span></label>
          <select {...register('partnershipType', { required: 'Required' })} className={inputClass(!!errors.partnershipType)}>
            <option value="">Select…</option>
            {PARTNERSHIP_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          {errors.partnershipType && <p className="text-xs text-destructive">{errors.partnershipType.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Indicative Budget</label>
          <select {...register('budget')} className={inputClass(false)}>
            <option value="">Select if applicable…</option>
            {BUDGETS.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium">Message <span className="text-destructive">*</span></label>
        <textarea {...register('message', { required: 'Required', minLength: { value: 50, message: 'Please write at least 50 characters.' } })} rows={6} placeholder="Describe the nature of the partnership you have in mind and what you hope to achieve." className={inputClass(!!errors.message)} />
        {errors.message && <p className="text-xs text-destructive">{errors.message.message}</p>}
      </div>

      {serverError && (
        <div className="p-4 border border-destructive/50 bg-destructive/5 rounded-sm text-sm text-destructive">
          {serverError}
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-purple text-white font-medium rounded-sm hover:bg-purple/90 disabled:opacity-60 transition-colors">
        {isSubmitting ? 'Submitting…' : 'Send Inquiry'}
      </button>
    </form>
  )
}
