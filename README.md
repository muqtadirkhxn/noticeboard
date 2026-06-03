Notice Board

A full-featured Notice Board application built with Next.js (Pages Router), Prisma ORM, Supabase PostgreSQL, and Tailwind CSS.

This project was developed as part of the Reno Platforms Web Development Internship Assignment.

The application supports full Create, Read, Update, and Delete (CRUD) functionality, server-side validation, Urgent-first ordering, responsive design, and optional image support.

Live Demo

Live URL: https://noticeboard-eight.vercel.app/

GitHub Repository: https://github.com/muqtadirkhxn/noticeboard

Project Overview

The Notice Board application allows users to create, view, edit, and delete notices while maintaining persistent storage through a hosted PostgreSQL database using Prisma ORM.

The application follows the Reno Platforms assignment requirements by implementing:

Full CRUD functionality
API-based data operations
Server-side validation
Database persistence
Responsive design
Urgent-first ordering handled at the database level
Delete confirmation before removal
Features
Create, view, edit, and delete notices
Notice fields:
Title (required)
Body (required)
Category (Exam, Event, General)
Priority (Normal, Urgent)
Publish Date
Optional Image URL
Urgent notices displayed before Normal notices
Visible red Urgent badge
Server-side validation in API routes
Delete confirmation before removal
Responsive design for desktop and mobile devices
Category filtering (All, Exam, Event, General)
Optional image support for notices
Persistent cloud database storage using Supabase PostgreSQL
Assignment Compliance

This project satisfies the Reno Platforms assignment requirements:

✅ Next.js Pages Router
✅ Prisma ORM
✅ Hosted PostgreSQL Database (Supabase)
✅ Full CRUD Functionality
✅ API Routes
✅ Server-side Validation
✅ Urgent-first Database Ordering
✅ Delete Confirmation
✅ Responsive Design
✅ Optional Image Support
✅ Public Deployment Ready
Screenshots
Home Page

Add screenshot after deployment

Create Notice Page

Add screenshot after deployment

Mobile Responsive View

Add screenshot after deployment

Tech Stack
Layer Technology
Framework Next.js 14 (Pages Router)
ORM Prisma
Database Supabase PostgreSQL
Hosting Vercel (Free Tier)
Styling Tailwind CSS
Running Locally
Prerequisites
Node.js 18+
npm
Supabase Account
Installation

Clone the repository:

git clone <repository-url>
cd noticeboard

Install dependencies:

npm install

Create a .env file:

DATABASE_URL="your_database_url"

DIRECT_URL="your_direct_database_url"

Push the Prisma schema:

npx prisma db push

Generate Prisma Client:

npx prisma generate

Start the development server:

npm run dev

Open:

http://localhost:3000

Environment Variables

DATABASE_URL="postgresql://..."

DIRECT_URL="postgresql://..."

These values can be obtained from:

Supabase Dashboard → Settings → Database → Prisma Connection String

API Routes
Method Route Description
GET /api/notices Fetch all notices (Urgent first)
POST /api/notices Create a notice
GET /api/notices/[id] Fetch a single notice
PUT /api/notices/[id] Update a notice
DELETE /api/notices/[id] Delete a notice

All mutating routes perform validation on the server and return appropriate HTTP status codes.

Server-Side Validation

Validation is performed inside the API routes.

Checks include:

Title cannot be empty
Body cannot be empty
Publish date must be valid
Category must be Exam, Event, or General
Priority must be Normal or Urgent

Invalid requests return validation errors with appropriate HTTP status codes.

Database Ordering Logic

Urgent notices are ordered before Normal notices directly in the Prisma query:

orderBy: [
{ priority: 'desc' },
{ createdAt: 'desc' }
]

This ensures sorting is handled on the server/database side rather than in the browser.

Deployment

The application is deployed using Vercel.

Deployment Steps
Push the repository to GitHub
Import the repository into Vercel
Add environment variables:
DATABASE_URL
DIRECT_URL
Deploy the application
Verify CRUD operations in production
One Thing I Would Improve With More Time

If given more time, I would implement image uploads using Supabase Storage instead of requiring image URLs. This would provide a better user experience and allow users to upload images directly from their devices.

Additional improvements would include:

Search functionality
Pagination for large datasets
Authentication and authorization
Rich text editor for notice content
Notice scheduling and expiration
AI Usage

AI tools (Claude and ChatGPT) were used for:

Project architecture guidance
Prisma schema design
API route implementation
UI and responsive design suggestions
Debugging and troubleshooting
Deployment guidance and code review

All generated code was reviewed, tested, modified, and integrated manually. The final implementation, validation logic, database configuration, responsive behavior, and deployment setup were verified and adjusted by me.

Author

Muqtadir Khan
