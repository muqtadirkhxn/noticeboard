import prisma from '../../../lib/prisma'

function isValidDate(dateStr) {
  if (!dateStr) return false
  const d = new Date(dateStr)
  return d instanceof Date && !isNaN(d)
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Urgent-first ordering done entirely in the DB via Prisma orderBy — not in the browser.
      // 'Urgent' > 'Normal' alphabetically, so priority:'desc' puts Urgent first.
      const notices = await prisma.notice.findMany({
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'desc' },
        ],
      })
      return res.status(200).json(notices)
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch notices' })
    }
  }

  if (req.method === 'POST') {
    const { title, body, category, priority, publishDate, imageUrl } = req.body

    const errors = {}
    if (!title || !title.trim()) errors.title = 'Title is required'
    if (!body || !body.trim()) errors.body = 'Body is required'
    if (!publishDate || !isValidDate(publishDate)) errors.publishDate = 'A valid date is required'
    if (category && !['Exam', 'Event', 'General'].includes(category))
      errors.category = 'Invalid category'
    if (priority && !['Normal', 'Urgent'].includes(priority))
      errors.priority = 'Invalid priority'

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ errors })
    }

    try {
      const notice = await prisma.notice.create({
        data: {
          title: title.trim(),
          body: body.trim(),
          category: category || 'General',
          priority: priority || 'Normal',
          publishDate: new Date(publishDate),
          imageUrl: imageUrl || null,
        },
      })
      return res.status(201).json(notice)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Failed to create notice' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
