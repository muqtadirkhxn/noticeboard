# Notice Board

A full-featured Notice Board application built with **Next.js (Pages Router)**, **Prisma ORM**, **TiDB Cloud (MySQL)**, and **Tailwind CSS**. Supports full CRUD (create, read, update, delete) with server-side validation, Urgent-first ordering, responsive design, and optional image support.

**Live Demo:** _[your-vercel-url]_
**GitHub:** _[your-repo-url]_

---

## Features

- Create, view, edit, and delete notices
- Fields: title, body, category (Exam / Event / General), priority (Normal / Urgent), publish date, optional image URL
- Urgent notices always appear at the top with a red badge
- Ordering (Urgent-first, then by creation date) is handled in the **database query** via Prisma, not in the browser
- Server-side input validation in API routes — required fields cannot be empty, dates must be valid
- Responsive card grid — works on phone and desktop
- Delete requires a confirmation step (inline card overlay)
- Category filter tabs on the listing page
- Clean, accessible UI with Tailwind CSS

---

## Tech Stack

| Layer        | Technology                             |
| ------------ | -------------------------------------- |
| Framework    | Next.js 14, Pages Router               |
| Database ORM | Prisma                                 |
| Database     | Supabase (free tier, MySQL-compatible) |
| Hosting      | Vercel (Hobby / free tier)             |
| Styling      | Tailwind CSS                           |

---

## Running Locally

### Prerequisites

- Node.js 18+
- A free [TiDB Cloud](https://tidbcloud.com/) account (or Neon / Supabase)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/noticeboard.git
cd noticeboard

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and fill in DATABASE_URL

# 4. Push the Prisma schema to your database
npx prisma db push

# 5. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable       | Description                           |
| -------------- | ------------------------------------- |
| `DATABASE_URL` | MySQL connection string from Supabase |

Example Supabase connection string:

```
DATABASE_URL="mysql://username:password@host:4000/noticeboard?sslaccept=strict"
```

---

## Deploying to Vercel

1. Push your repository to GitHub.
2. Import the project on [Vercel](https://vercel.com/).
3. Add `DATABASE_URL` in **Project Settings → Environment Variables**.
4. Deploy — Vercel runs `prisma generate` automatically via the `postinstall` script.

---

## API Routes

| Method   | Route              | Description                      |
| -------- | ------------------ | -------------------------------- |
| `GET`    | `/api/notices`     | Fetch all notices (Urgent first) |
| `POST`   | `/api/notices`     | Create a new notice              |
| `GET`    | `/api/notices/:id` | Fetch a single notice            |
| `PUT`    | `/api/notices/:id` | Update a notice                  |
| `DELETE` | `/api/notices/:id` | Delete a notice                  |

All mutating routes validate on the server and return `422` with field-level error messages on invalid input.

---

## One Thing I Would Improve

With more time, I would add **image upload support** using Cloudinary or Vercel Blob instead of requiring a URL. Drag-and-drop image uploads would significantly improve the content-creation experience, especially on mobile. I would also add **pagination or infinite scroll** for the listing page once the notice count grows large.

---

## AI Usage

Claude (claude.ai) was used to:

- Generate the initial boilerplate for all pages and API routes
- Help design the Prisma schema and validation logic
- Suggest Tailwind class combinations for the card and form UI
- Review the Urgent-first ordering logic to ensure it runs in the database query rather than client-side

All code was reviewed, understood, and manually adjusted — including routing structure, confirmation dialog logic, form state management, and server-side error handling.
