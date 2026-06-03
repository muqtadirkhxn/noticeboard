import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import NoticeCard from '../components/NoticeCard'
import prisma from '../lib/prisma'

export default function Home({ initialNotices }) {
  const [notices, setNotices] = useState(initialNotices)
  const [filter, setFilter] = useState('All')

  const handleDelete = (id) => {
    setNotices((prev) => prev.filter((n) => n.id !== id))
  }

  const categories = ['All', 'Exam', 'Event', 'General']

  // DB already returns Urgent-first (via Prisma orderBy). We just filter here — no re-sorting.
  const displayed =
    filter === 'All'
      ? notices
      : notices.filter((n) => n.category === filter)

  const urgentCount = notices.filter((n) => n.priority === 'Urgent').length

  return (
    <Layout title="All Notices">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mb-1">
              Notice Board
            </h1>
            <p className="text-stone-500 text-sm">
              {notices.length} {notices.length === 1 ? 'notice' : 'notices'}
              {urgentCount > 0 && (
                <span className="ml-2 inline-flex items-center gap-1 text-red-600 font-medium">
                  · {urgentCount} urgent
                </span>
              )}
            </p>
          </div>

          <Link
            href="/notices/new"
            className="sm:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-900 text-white text-sm font-semibold rounded-xl"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            Add Notice
          </Link>
        </div>

        {/* Category filter tabs */}
        <div className="flex gap-2 mt-5 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === cat
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notice grid */}
      {displayed.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="font-display text-xl font-bold text-stone-700 mb-1">No notices yet</p>
          <p className="text-stone-400 text-sm mb-6">
            {filter !== 'All' ? `No ${filter} notices found.` : 'Create your first notice to get started.'}
          </p>
          {filter === 'All' && (
            <Link
              href="/notices/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white text-sm font-semibold rounded-xl hover:bg-stone-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Add Notice
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((notice) => (
            <NoticeCard key={notice.id} notice={notice} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </Layout>
  )
}

export async function getServerSideProps() {
  try {
    // Urgent-first ordering done in the DB via Prisma orderBy — not in the browser.
    // 'Urgent' > 'Normal' alphabetically → priority:'desc' gives Urgent first.
    const notices = await prisma.notice.findMany({
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' },
      ],
    })

    return {
      props: {
        initialNotices: JSON.parse(JSON.stringify(notices)),
      },
    }
  } catch {
    return { props: { initialNotices: [] } }
  }
}
