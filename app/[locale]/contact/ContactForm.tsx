'use client'

import { useState } from 'react'
import type { Dictionary } from '@/core/lib/get-dictionary'

interface ContactFormProps {
  dict: Dictionary
}

export function ContactForm({ dict }: ContactFormProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 500))
      setSubmitted(true)
      setFormState({ name: '', email: '', phone: '', projectType: '', budget: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {dict.contact.form.name}
        </label>
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
          placeholder={dict.contact.form.namePlaceholder}
          required
          className="w-full px-4 py-3 bg-secondary/10 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {dict.contact.form.email}
        </label>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder={dict.contact.form.emailPlaceholder}
          required
          className="w-full px-4 py-3 bg-secondary/10 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {dict.contact.form.phone}
        </label>
        <input
          type="tel"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          placeholder={dict.contact.form.phonePlaceholder}
          className="w-full px-4 py-3 bg-secondary/10 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Project Type */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {dict.contact.form.projectType}
        </label>
        <select
          name="projectType"
          value={formState.projectType}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-secondary/10 border border-border text-foreground focus:outline-none focus:border-accent transition-colors"
        >
          <option value="">{dict.contact.form.projectTypePlaceholder}</option>
          {dict.contact.projectTypes.map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {dict.contact.form.budget}
        </label>
        <select
          name="budget"
          value={formState.budget}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-secondary/10 border border-border text-foreground focus:outline-none focus:border-accent transition-colors"
        >
          <option value="">{dict.contact.form.budgetPlaceholder}</option>
          {dict.contact.budgets.map((budget, idx) => (
            <option key={idx} value={budget}>{budget}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          {dict.contact.form.message}
        </label>
        <textarea
          name="message"
          value={formState.message}
          onChange={handleChange}
          placeholder={dict.contact.form.messagePlaceholder}
          required
          rows={6}
          className="w-full px-4 py-3 bg-secondary/10 border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-8 py-3 bg-foreground text-background hover:bg-accent hover:text-foreground transition-all duration-300 text-sm font-medium disabled:opacity-50"
      >
        {isLoading ? dict.contact.form.submitting : dict.contact.form.submit}
      </button>

      {submitted && (
        <div className="p-4 bg-accent/20 text-foreground text-sm text-center rounded">
          {dict.contact.form.success}
        </div>
      )}
    </form>
  )
}
