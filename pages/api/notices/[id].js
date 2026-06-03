import prisma from '../../../lib/prisma'

function isValidDate(dateStr) {
  if (!dateStr) return false
  const d = new Date(dateStr)
  return d instanceof Date && !isNaN(d)
}

export default async function handler(req, res) {
  const id = parseInt(req.query.id, 10)
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' })

  if (req.method === 'GET') {
    try {
      const notice = await prisma.notice.findUnique({ where: { id } })
      if (!notice) return res.status(404).json({ error: 'Notice not found' })
      return res.status(200).json(notice)
    } catch {
      return res.status(500).json({ error: 'Failed to fetch notice' })
    }
  }

  if (req.method === 'PUT') {
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
      const updated = await prisma.notice.update({
        where: { id },
        data: {
          title: title.trim(),
          body: body.trim(),
          category: category || 'General',
          priority: priority || 'Normal',
          publishDate: new Date(publishDate),
          imageUrl: imageUrl || null,
        },
      })
      return res.status(200).json(updated)
    } catch {
      return res.status(500).json({ error: 'Failed to update notice' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.notice.delete({ where: { id } })
      return res.status(200).json({ message: 'Notice deleted' })
    } catch {
      return res.status(500).json({ error: 'Failed to delete notice' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
