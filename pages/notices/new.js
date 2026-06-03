import Layout from '../../components/Layout'
import NoticeForm from '../../components/NoticeForm'
import Link from 'next/link'

export default function NewNoticePage() {
  return (
    <Layout title="New Notice">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-stone-400 mb-6">
          <Link href="/" className="hover:text-stone-600 transition-colors">
            Notice Board
          </Link>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-stone-600 font-medium">New Notice</span>
        </nav>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mb-6">
            Create Notice
          </h1>
          <NoticeForm />
        </div>
      </div>
    </Layout>
  )
}
