import { useState } from 'react'
import { useRouter } from 'next/router'

const INITIAL = {
  title: '',
  body: '',
  category: 'General',
  priority: 'Normal',
  publishDate: '',
  imageUrl: '',
}

export default function NoticeForm({ initialData = null }) {
  const isEdit = !!initialData
  const router = useRouter()

  const toDateInput = (val) => {
    if (!val) return ''
    const d = new Date(val)
    if (isNaN(d)) return ''
    return d.toISOString().split('T')[0]
  }

  const [form, setForm] = useState(
    initialData
      ? {
          title: initialData.title || '',
          body: initialData.body || '',
          category: initialData.category || 'General',
          priority: initialData.priority || 'Normal',
          publishDate: toDateInput(initialData.publishDate),
          imageUrl: initialData.imageUrl || '',
        }
      : INITIAL
  )
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((e) => ({ ...e, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setServerError('')

    const url = isEdit ? `/api/notices/${initialData.id}` : '/api/notices'
    const method = isEdit ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          imageUrl: form.imageUrl.trim() || null,
        }),
      })

      const data = await res.json()

      if (res.status === 422) {
        setErrors(data.errors || {})
        setSubmitting(false)
        return
      }

      if (!res.ok) {
        setServerError(data.error || 'Something went wrong. Please try again.')
        setSubmitting(false)
        return
      }

      router.push('/')
    } catch {
      setServerError('Network error. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {serverError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          {serverError}
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1.5">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter notice title"
          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white transition-colors outline-none focus:ring-2 focus:ring-blue-100 ${
            errors.title
              ? 'border-red-400 focus:border-red-400'
              : 'border-stone-200 focus:border-blue-400'
          }`}
        />
        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
      </div>

      {/* Body */}
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1.5">
          Body <span className="text-red-500">*</span>
        </label>
        <textarea
          name="body"
          value={form.body}
          onChange={handleChange}
          placeholder="Write the notice content…"
          rows={5}
          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white transition-colors outline-none focus:ring-2 focus:ring-blue-100 resize-none ${
            errors.body
              ? 'border-red-400 focus:border-red-400'
              : 'border-stone-200 focus:border-blue-400'
          }`}
        />
        {errors.body && <p className="mt-1 text-xs text-red-600">{errors.body}</p>}
      </div>

      {/* Category + Priority row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1.5">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
          >
            <option value="General">General</option>
            <option value="Exam">Exam</option>
            <option value="Event">Event</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 mb-1.5">Priority</label>
          <div className="flex gap-3 pt-2">
            {['Normal', 'Urgent'].map((p) => (
              <label key={p} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priority"
                  value={p}
                  checked={form.priority === p}
                  onChange={handleChange}
                  className="accent-blue-600"
                />
                <span
                  className={`text-sm font-medium ${
                    p === 'Urgent' ? 'text-red-600' : 'text-stone-700'
                  }`}
                >
                  {p}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Publish Date */}
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1.5">
          Publish Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="publishDate"
          value={form.publishDate}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white transition-colors outline-none focus:ring-2 focus:ring-blue-100 ${
            errors.publishDate
              ? 'border-red-400 focus:border-red-400'
              : 'border-stone-200 focus:border-blue-400'
          }`}
        />
        {errors.publishDate && <p className="mt-1 text-xs text-red-600">{errors.publishDate}</p>}
      </div>

      {/* Image URL (bonus) */}
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-1.5">
          Image URL{' '}
          <span className="text-xs font-normal text-stone-400 ml-1">optional</span>
        </label>
        <input
          type="url"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-3 rounded-xl border border-stone-200 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-colors"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 sm:flex-none sm:px-8 py-3 bg-stone-900 hover:bg-stone-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60"
        >
          {submitting ? (isEdit ? 'Saving…' : 'Creating…') : isEdit ? 'Save Changes' : 'Create Notice'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/')}
          className="flex-1 sm:flex-none sm:px-6 py-3 border border-stone-200 text-stone-600 hover:bg-stone-50 text-sm font-medium rounded-xl transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
