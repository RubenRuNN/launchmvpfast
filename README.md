# CarWash Pro - SaaS Platform

A comprehensive car wash service management platform built with the T3 Stack.

## Features

### Customer Features
- Secure registration and login
- Service booking (mobile or center-based)
- Booking and payment history
- Email and SMS notifications
- Vehicle management

### Admin Features
- Kanban board for service management
- Service management (types, prices, duration)
- Employee and fleet vehicle management
- Wash center location management
- Employee and vehicle assignment per booking
- Customer vehicle registration tracking
- Analytics and reporting

## Tech Stack
- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Drizzle ORM](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [Twilio](https://twilio.com) for SMS notifications
- [Resend](https://resend.com) for email notifications
- [LemonSqueezy](https://lemonsqueezy.com) for payments

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in your environment variables
4. Set up your database: `npm run db:push`
5. Start the development server: `npm run dev`

## Environment Variables

### Required
- `DATABASE_URL` - PostgreSQL database connection string
- `NEXTAUTH_SECRET` - NextAuth.js secret
- `NEXTAUTH_URL` - Your app URL

### Optional (for full functionality)
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` - For SMS notifications
- `RESEND_API_KEY` - For email notifications
- `LEMONSQUEEZY_API_KEY`, `LEMONSQUEEZY_STORE_ID` - For payments
- Social auth keys (Google, GitHub)

## License

MIT License - see LICENSE file for details.