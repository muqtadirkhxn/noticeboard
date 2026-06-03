import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Layout({ children, title = 'Notice Board' }) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{title} · Reno Notice Board</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Fonts are loaded globally via pages/_document.js */}
      </Head>

      <div className="min-h-screen bg-cream font-body">
        {/* Header */}
        <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <span className="font-display text-lg font-bold text-stone-900 group-hover:text-stone-700 transition-colors">
                Notice Board
              </span>
            </Link>

            {router.pathname !== '/notices/new' && (
              <Link
                href="/notices/new"
                className="flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-700 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">New Notice</span>
                <span className="sm:hidden">New</span>
              </Link>
            )}
          </div>
        </header>

        {/* Main */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-stone-200 mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-stone-400">
            Notice Board · Built with Next.js, Prisma & Supabase
          </div>
        </footer>
      </div>
    </>
  )
}
