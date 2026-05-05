'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface FormData {
  proposerName: string
  proposerEmail: string
  proposerRelation: 'self' | 'other'
  guestName?: string
  guestEmail?: string
  guestRole: string
  guestInstitution: string
  discipline: string
  topicTitle: string
  topicSummary: string
  publicRelevance: string
  links?: string
  availability?: string
  honeypot: string
}

const ROLES = [
  { label: 'PhD Candidate', value: 'phd-candidate' },
  { label: 'Postdoctoral Researcher', value: 'postdoc' },
  { label: 'Lecturer / Assistant Professor', value: 'lecturer' },
  { label: 'Associate Professor', value: 'associate-professor' },
  { label: 'Professor', value: 'professor' },
  { label: 'Research Fellow', value: 'fellow' },
  { label: 'Independent Researcher', value: 'independent' },
]

function inputClass(hasError: boolean) {
  return (
    'w-full px-3.5 py-2.5 text-sm border rounded-sm bg-background transition-colors ' +
    'focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple ' +
    (hasError ? 'border-destructive' : 'border-border')
  )
}

interface FieldProps {
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}

function Field({ label, error, hint, required, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

export function ProposalForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { proposerRelation: 'self', honeypot: '' },
  })

  const isNominating = watch('proposerRelation') === 'other'

  const onSubmit = async (data: FormData) => {
    setServerError(null)
    try {
      const res = await fetch('/api/propose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error((body as { message?: string }).message || 'Submission failed. Please try again.')
      }
      setSubmitted(true)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'An unexpected error occurred.')
    }
  }

  if (submitted) {
    return (
      <div className="border border-border rounded-sm p-10 text-center">
        <div className="text-4xl mb-4" aria-hidden="true">&#10003;</div>
        <h2 className="font-fraunces text-2xl mb-3">Proposal Received</h2>
        <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
          Thank you for your proposal. We have received it and will review it carefully. If your
          research is a strong fit, we will be in touch within a few weeks.
        </p>
        <p className="text-sm text-muted-foreground mt-6 italic">
         , The Solomon Atah Podcast Editorial Team
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {/* Honeypot */}
      <input
        type="text"
        {...register('honeypot')}
        className="hidden"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Section 1: Proposer */}
      <fieldset className="space-y-5">
        <legend className="font-fraunces text-xl mb-4 pb-2 border-b border-border w-full">
          Your Details
        </legend>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Your Name" error={errors.proposerName?.message} required>
            <input
              {...register('proposerName', { required: 'Please enter your name.' })}
              type="text"
              placeholder="Dr. Jane Smith"
              className={inputClass(!!errors.proposerName)}
            />
          </Field>
          <Field label="Your Email" error={errors.proposerEmail?.message} required>
            <input
              {...register('proposerEmail', {
                required: 'Please enter your email.',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email.' },
              })}
              type="email"
              placeholder="jane@university.ac"
              className={inputClass(!!errors.proposerEmail)}
            />
          </Field>
        </div>

        <Field label="You are proposing..." error={errors.proposerRelation?.message} required>
          <div className="flex gap-6">
            {[
              { value: 'self', label: 'Myself as a guest' },
              { value: 'other', label: 'Another scholar' },
            ].map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  {...register('proposerRelation')}
                  type="radio"
                  value={opt.value}
                  className="accent-purple"
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            ))}
          </div>
        </Field>
      </fieldset>

      {/* Section 2: Nominated scholar */}
      {isNominating && (
        <fieldset className="space-y-5">
          <legend className="font-fraunces text-xl mb-4 pb-2 border-b border-border w-full">
            Scholar Being Nominated
          </legend>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Scholar Name" error={errors.guestName?.message}>
              <input
                {...register('guestName')}
                type="text"
                placeholder="Prof. Amara Diallo"
                className={inputClass(!!errors.guestName)}
              />
            </Field>
            <Field label="Scholar Email" error={errors.guestEmail?.message}>
              <input
                {...register('guestEmail')}
                type="email"
                placeholder="amara@university.edu"
                className={inputClass(!!errors.guestEmail)}
              />
            </Field>
          </div>
        </fieldset>
      )}

      {/* Section 3: Academic position */}
      <fieldset className="space-y-5">
        <legend className="font-fraunces text-xl mb-4 pb-2 border-b border-border w-full">
          Academic Position
        </legend>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Position" error={errors.guestRole?.message} required>
            <select
              {...register('guestRole', { required: 'Please select a position.' })}
              className={inputClass(!!errors.guestRole)}
            >
              <option value="">Select a position...</option>
              {ROLES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Institution / Affiliation" error={errors.guestInstitution?.message} required>
            <input
              {...register('guestInstitution', { required: 'Please enter an institution.' })}
              type="text"
              placeholder="University of Cape Town"
              className={inputClass(!!errors.guestInstitution)}
            />
          </Field>
        </div>

        <Field label="Discipline / Field" error={errors.discipline?.message} required>
          <input
            {...register('discipline', { required: 'Please enter a discipline.' })}
            type="text"
            placeholder="e.g. Political Economy, International Law, Public Health"
            className={inputClass(!!errors.discipline)}
          />
        </Field>
      </fieldset>

      {/* Section 4: The proposal */}
      <fieldset className="space-y-5">
        <legend className="font-fraunces text-xl mb-4 pb-2 border-b border-border w-full">
          The Proposal
        </legend>

        <Field label="Proposed Conversation Title" error={errors.topicTitle?.message} required>
          <input
            {...register('topicTitle', { required: 'Please enter a proposed title.', minLength: { value: 5, message: 'Please enter a more descriptive title.' } })}
            type="text"
            placeholder='e.g. "Structural Adjustment and the Long Shadow of the IMF in Sub-Saharan Africa"'
            className={inputClass(!!errors.topicTitle)}
          />
        </Field>

        <Field
          label="Research Abstract"
          error={errors.topicSummary?.message}
          hint="150-600 characters. What is the argument? What is the evidence? What are the stakes?"
          required
        >
          <textarea
            {...register('topicSummary', {
              required: 'Please describe your research.',
              minLength: { value: 100, message: 'Please write at least 100 characters.' },
              maxLength: { value: 600, message: 'Maximum 600 characters.' },
            })}
            rows={5}
            placeholder="Describe your research in plain language. What is the central argument? What evidence supports it? What does it challenge?"
            className={inputClass(!!errors.topicSummary)}
          />
        </Field>

        <Field
          label="Why does this matter publicly?"
          error={errors.publicRelevance?.message}
          hint="80-400 characters. Why should a globally curious, non-specialist audience care?"
          required
        >
          <textarea
            {...register('publicRelevance', {
              required: 'Please explain the public relevance.',
              minLength: { value: 80, message: 'Please write at least 80 characters.' },
              maxLength: { value: 400, message: 'Maximum 400 characters.' },
            })}
            rows={4}
            placeholder="What policy, social, ethical, or intellectual questions does this research speak to?"
            className={inputClass(!!errors.publicRelevance)}
          />
        </Field>

        <Field
          label="Published work / Google Scholar / ORCID"
          error={errors.links?.message}
          hint="Paste links one per line, papers, ORCID profile, Google Scholar page."
        >
          <textarea
            {...register('links')}
            rows={3}
            placeholder={
              'https://scholar.google.com/...\nhttps://orcid.org/...'
            }
            className={inputClass(!!errors.links)}
          />
        </Field>

        <Field
          label="Availability"
          error={errors.availability?.message}
          hint="Rough availability for a recorded conversation (timezone, weeks ahead, any constraints)."
        >
          <textarea
            {...register('availability')}
            rows={2}
            placeholder="e.g. Available weekday evenings (GMT+2) from mid-May onwards."
            className={inputClass(!!errors.availability)}
          />
        </Field>
      </fieldset>

      {serverError && (
        <div className="p-4 border border-destructive/50 bg-destructive/5 rounded-sm text-sm text-destructive">
          {serverError}
        </div>
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-purple text-white font-medium rounded-sm hover:bg-purple/90 disabled:opacity-60 transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
        </button>
        <p className="text-xs text-muted-foreground mt-3">
          We review all proposals personally. We aim to respond within two to four weeks.
        </p>
      </div>
    </form>
  )
}
