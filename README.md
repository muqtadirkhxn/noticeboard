# Notice Board

A full-featured Notice Board application built with **Next.js (Pages Router)**, **Prisma ORM**, **Supabase PostgreSQL**, and **Tailwind CSS**.

This project was developed as part of the Reno Platforms Web Development Internship Assignment.

---

## Live Demo

**Live URL:** https://noticeboard-eight.vercel.app/

**GitHub Repository:** https://github.com/muqtadirkhxn/noticeboard

---

## Features

### Notice Management

- Create notices
- View notices
- Edit notices
- Delete notices

### Notice Fields

- Title (required)
- Body (required)
- Category (Exam, Event, General)
- Priority (Normal, Urgent)
- Publish Date
- Optional Image URL

### Additional Features

- Urgent notices displayed before normal notices
- Visible Urgent badge
- Server-side validation
- Category filtering
- Responsive design
- Delete confirmation before removal
- Cloud database persistence using Supabase PostgreSQL

---

## Assignment Requirements Covered

- ✅ Next.js Pages Router
- ✅ Prisma ORM
- ✅ Hosted PostgreSQL Database (Supabase)
- ✅ Full CRUD Functionality
- ✅ API Routes
- ✅ Server-side Validation
- ✅ Urgent-first Ordering
- ✅ Responsive Design
- ✅ Category Filtering
- ✅ Optional Image Support
- ✅ Public GitHub Repository
- ✅ Public Vercel Deployment

---

## Tech Stack

| Layer     | Technology                |
| --------- | ------------------------- |
| Framework | Next.js 14 (Pages Router) |
| ORM       | Prisma                    |
| Database  | Supabase PostgreSQL       |
| Hosting   | Vercel (Free Tier)        |
| Styling   | Tailwind CSS              |

---

# Running Locally

## Prerequisites

- Node.js 18+
- npm
- Supabase Account

## Installation

### Clone Repository

```bash
git clone https://github.com/muqtadirkhxn/noticeboard.git
cd noticeboard
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create a `.env` file:

```env
DATABASE_URL="your_database_url"
DIRECT_URL="your_direct_database_url"
```

### Push Prisma Schema

```bash
npx prisma db push
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Environment Variables

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
```

You can obtain these values from:

**Supabase Dashboard → Settings → Database → Prisma Connection String**

---

## API Routes

| Method | Route               | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/api/notices`      | Fetch all notices   |
| POST   | `/api/notices`      | Create notice       |
| GET    | `/api/notices/[id]` | Fetch single notice |
| PUT    | `/api/notices/[id]` | Update notice       |
| DELETE | `/api/notices/[id]` | Delete notice       |

---

## Server-Side Validation

Validation is performed inside API routes.

### Validation Rules

- Title cannot be empty
- Body cannot be empty
- Publish date must be valid
- Category must be:
  - Exam
  - Event
  - General
- Priority must be:
  - Normal
  - Urgent

Invalid requests return appropriate HTTP status codes and validation messages.

---

## Database Ordering Logic

Urgent notices are sorted before normal notices directly in the Prisma query:

```javascript
orderBy: [{ priority: "desc" }, { createdAt: "desc" }];
```

This ensures sorting is performed on the server/database rather than in the browser.

---

## Deployment

The application is deployed using Vercel.

### Deployment Steps

1. Push repository to GitHub
2. Import repository into Vercel
3. Add environment variables:
   - DATABASE_URL
   - DIRECT_URL
4. Deploy
5. Verify CRUD operations

---

## One Thing I Would Improve With More Time

If given more time, I would implement direct image uploads using **Supabase Storage** instead of requiring image URLs.

This would provide a better user experience by allowing users to upload images directly from their devices.

Additional improvements would include:

- Search functionality
- Pagination for large datasets
- Notice scheduling
- Notice expiration
- Authentication and authorization

---

## AI Usage

AI tools (**ChatGPT** and **Claude**) were used for:

- Project architecture guidance
- Prisma schema design
- API route implementation
- Responsive UI suggestions
- Debugging and troubleshooting
- Deployment guidance
- Code review

All generated code was reviewed, tested, modified, and integrated manually. Final implementation decisions, validation logic, database configuration, responsive behavior, and deployment setup were verified and adjusted by me.

---

## Author

**Muqtadir Khan**
