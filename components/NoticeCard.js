import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

const CATEGORY_STYLES = {
  Exam: 'bg-purple-100 text-purple-700 border border-purple-200',
  Event: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  General: 'bg-stone-100 text-stone-600 border border-stone-200',
}

export default function NoticeCard({ notice, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const res = await fetch(`/api/notices/${notice.id}`, { method: 'DELETE' })
      if (res.ok) {
        onDelete(notice.id)
      } else {
        // API returned an error — reset so user isn't stuck
        setDeleting(false)
        setShowConfirm(false)
      }
    } catch {
      setDeleting(false)
      setShowConfirm(false)
    }
  }

  const formattedDate = new Date(notice.publishDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <article
      className={`relative bg-white rounded-2xl border transition-all duration-200 hover:shadow-lg overflow-hidden group ${
        notice.priority === 'Urgent'
          ? 'border-red-200 shadow-sm shadow-red-100'
          : 'border-stone-200 shadow-sm'
      }`}
    >
      {/* Urgent accent bar */}
      {notice.priority === 'Urgent' && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500" />
      )}

      {/* Image */}
      {notice.imageUrl && (
        <div className="w-full h-44 overflow-hidden bg-stone-100 relative">
          <Image
            src={notice.imageUrl}
            alt={notice.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        </div>
      )}

      <div className="p-5">
        {/* Badges row */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {notice.priority === 'Urgent' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-600 text-white">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Urgent
            </span>
          )}
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_STYLES[notice.category]}`}>
            {notice.category}
          </span>
          <span className="ml-auto text-xs text-stone-400 font-medium">{formattedDate}</span>
        </div>

        {/* Title */}
        <h2 className="font-display text-lg font-bold text-stone-900 mb-2 leading-snug">
          {notice.title}
        </h2>

        {/* Body */}
        <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">{notice.body}</p>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-stone-100">
          <button
            onClick={() => router.push(`/notices/${notice.id}/edit`)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-accent border border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>

      {/* Delete confirmation overlay */}
      {showConfirm && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="font-display text-base font-bold text-stone-900 text-center mb-1">Delete this notice?</p>
          <p className="text-xs text-stone-500 text-center mb-5">This action cannot be undone.</p>
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 text-sm font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-60"
            >
              {deleting ? 'Deleting…' : 'Yes, delete'}
            </button>
          </div>
        </div>
      )}
    </article>
  )
}
