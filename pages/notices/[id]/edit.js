import Layout from '../../../components/Layout'
import NoticeForm from '../../../components/NoticeForm'
import Link from 'next/link'
import prisma from '../../../lib/prisma'

export default function EditNoticePage({ notice }) {
  if (!notice) {
    return (
      <Layout title="Not Found">
        <div className="text-center py-20">
          <p className="font-display text-xl font-bold text-stone-700 mb-2">Notice not found</p>
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            Back to board
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Edit Notice">
      <div className="max-w-2xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-stone-400 mb-6">
          <Link href="/" className="hover:text-stone-600 transition-colors">
            Notice Board
          </Link>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-stone-600 font-medium">Edit Notice</span>
        </nav>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mb-6">
            Edit Notice
          </h1>
          <NoticeForm initialData={notice} />
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const id = parseInt(params.id, 10)
  if (isNaN(id)) return { notFound: true }

  try {
    const notice = await prisma.notice.findUnique({ where: { id } })
    if (!notice) return { notFound: true }

    return {
      props: {
        notice: JSON.parse(JSON.stringify(notice)),
      },
    }
  } catch {
    return { notFound: true }
  }
}
