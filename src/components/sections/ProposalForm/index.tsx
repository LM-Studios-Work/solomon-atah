'use client'

import { useState } from 'react'

const FORM_ENDPOINT = 'https://formsubmit.co/podcast@solomonatah.com'

const ROLES = [
  'PhD Candidate',
  'Postdoctoral Researcher',
  'Lecturer / Assistant Professor',
  'Associate Professor',
  'Professor',
  'Research Fellow',
  'Independent Researcher',
]

function inputClass() {
  return 'w-full px-3.5 py-2.5 text-sm border rounded-sm bg-background transition-colors focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple border-border'
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
    </div>
  )
}

export function ProposalForm() {
  const [proposerRelation, setProposerRelation] = useState('self')
  const isNominating = proposerRelation === 'other'

  return (
    <form action={FORM_ENDPOINT} method="POST" className="space-y-8">
      <input type="hidden" name="_subject" value="New conversation proposal from solomonatah.com" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://solomonatah.com/propose" />
      <input type="text" name="_honey" className="hidden" tabIndex={-1} aria-hidden="true" />

      <fieldset className="space-y-5">
        <legend className="font-fraunces text-xl mb-4 pb-2 border-b border-border w-full">
          Your Details
        </legend>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Your Name" required>
            <input name="proposer_name" type="text" required placeholder="Dr. Jane Smith" className={inputClass()} />
          </Field>
          <Field label="Your Email" required>
            <input name="email" type="email" required placeholder="jane@university.ac" className={inputClass()} />
          </Field>
        </div>

        <Field label="You are proposing..." required>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {[
              { value: 'self', label: 'Myself as a guest' },
              { value: 'other', label: 'Another scholar' },
            ].map((option) => (
              <label key={option.value} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="proposer_relation"
                  value={option.label}
                  checked={proposerRelation === option.value}
                  onChange={() => setProposerRelation(option.value)}
                  className="accent-purple"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </Field>
      </fieldset>

      {isNominating && (
        <fieldset className="space-y-5">
          <legend className="font-fraunces text-xl mb-4 pb-2 border-b border-border w-full">
            Scholar Being Nominated
          </legend>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Scholar Name">
              <input name="scholar_name" type="text" placeholder="Prof. Amara Diallo" className={inputClass()} />
            </Field>
            <Field label="Scholar Email">
              <input name="scholar_email" type="email" placeholder="amara@university.edu" className={inputClass()} />
            </Field>
          </div>
        </fieldset>
      )}

      <fieldset className="space-y-5">
        <legend className="font-fraunces text-xl mb-4 pb-2 border-b border-border w-full">
          Academic Position
        </legend>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Position" required>
            <select name="position" required className={inputClass()}>
              <option value="">Select a position...</option>
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Institution / Affiliation" required>
            <input name="institution" type="text" required placeholder="University of Cape Town" className={inputClass()} />
          </Field>
        </div>

        <Field label="Discipline / Field" required>
          <input name="discipline" type="text" required placeholder="e.g. Political Economy, International Law, Public Health" className={inputClass()} />
        </Field>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="font-fraunces text-xl mb-4 pb-2 border-b border-border w-full">
          The Proposal
        </legend>

        <Field label="Proposed Conversation Title" required>
          <input
            name="topic_title"
            type="text"
            required
            minLength={5}
            placeholder='e.g. "Structural Adjustment and the Long Shadow of the IMF in Sub-Saharan Africa"'
            className={inputClass()}
          />
        </Field>

        <Field
          label="Research Abstract"
          hint="150-600 characters. What is the argument? What is the evidence? What are the stakes?"
          required
        >
          <textarea
            name="research_abstract"
            required
            minLength={100}
            maxLength={600}
            rows={5}
            placeholder="Describe your research in plain language. What is the central argument? What evidence supports it? What does it challenge?"
            className={`${inputClass()} resize-y`}
          />
        </Field>

        <Field
          label="Why does this matter publicly?"
          hint="80-400 characters. Why should a globally curious, non-specialist audience care?"
          required
        >
          <textarea
            name="public_relevance"
            required
            minLength={80}
            maxLength={400}
            rows={4}
            placeholder="What policy, social, ethical, or intellectual questions does this research speak to?"
            className={`${inputClass()} resize-y`}
          />
        </Field>

        <Field
          label="Published work / Google Scholar / ORCID"
          hint="Paste links one per line, papers, ORCID profile, Google Scholar page."
        >
          <textarea
            name="links"
            rows={3}
            placeholder={'https://scholar.google.com/...\nhttps://orcid.org/...'}
            className={`${inputClass()} resize-y`}
          />
        </Field>

        <Field
          label="Availability"
          hint="Rough availability for a recorded conversation (timezone, weeks ahead, any constraints)."
        >
          <textarea
            name="availability"
            rows={2}
            placeholder="e.g. Available weekday evenings (GMT+2) from mid-May onwards."
            className={`${inputClass()} resize-y`}
          />
        </Field>
      </fieldset>

      <div className="pt-4">
        <button type="submit" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-purple text-white font-medium rounded-sm hover:bg-purple/90 transition-colors">
          Submit Proposal
        </button>
        <p className="text-xs text-muted-foreground mt-3">
          We review all proposals personally. We aim to respond within two to four weeks.
        </p>
      </div>
    </form>
  )
}
