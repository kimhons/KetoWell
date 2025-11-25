# KetoWell

Transform Your Health with the Science of Ketogenic Living

## 🏗️ Monorepo Structure

This repository is organized as a monorepo containing multiple packages:

```
KetoWell/
├── packages/
│   ├── web/              # React web application
│   ├── mobile/           # Flutter mobile app (coming soon)
│   └── shared/           # Shared code and types
├── docs/                 # Documentation
├── scripts/              # Build and deployment scripts
└── README.md             # This file
```

## 📦 Packages

### Web Application (`packages/web`)

Full-featured web application built with React, Express, and TypeScript.

**Tech Stack:**
- Frontend: React 19, Tailwind CSS 4, shadcn/ui
- Backend: Express.js, tRPC
- Database: MySQL with Drizzle ORM
- Payment: Stripe
- Email: Resend
- AI: OpenAI GPT-4

**Features:**
- Book purchase and delivery system
- Referral rewards program
- Social sharing integration
- Email notifications
- Analytics tracking
- User authentication

[View Web App Documentation →](./packages/web/README.md)

### Mobile Application (`packages/mobile`)

🚧 **Coming Soon** - Flutter mobile app for iOS and Android.

[View Mobile App Documentation →](./packages/mobile/README.md)

### Shared Package (`packages/shared`)

Common types, constants, and utilities shared between web and mobile apps.

[View Shared Package Documentation →](./packages/shared/README.md)

## 🚀 Quick Start

### Prerequisites

- Node.js 22.x or higher
- pnpm 9.x or higher
- MySQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/kimhons/KetoWell.git
cd KetoWell

# Install dependencies
pnpm install

# Set up environment variables
cp packages/web/.env.example packages/web/.env
# Edit packages/web/.env with your configuration

# Push database schema
pnpm db:push

# Start development server
pnpm dev
```

The web application will be available at `http://localhost:3000`

## 📚 Documentation

- [Web App Setup](./packages/web/README.md)
- [Stripe Integration](./docs/STRIPE_INTEGRATION.md)
- [Referral System](./docs/REFERRAL_SYSTEM.md)
- [Book Analytics](./docs/BOOK-ANALYTICS-GUIDE.md)
- [GA4 Setup](./docs/GA4_SETUP.md)
- [Newsletter Integration](./docs/NEWSLETTER_INTEGRATION.md)

## 🛠️ Development

### Workspace Commands

```bash
# Run web app in development mode
pnpm dev:web

# Build web app for production
pnpm build:web

# Run tests across all packages
pnpm test

# Lint all packages
pnpm lint

# Format code
pnpm format

# Database operations
pnpm db:push        # Push schema changes
pnpm db:studio      # Open Drizzle Studio
```

### Package-Specific Commands

```bash
# Work on a specific package
cd packages/web
pnpm dev

# Or use workspace filter
pnpm --filter web dev
```

## 🏗️ Architecture

### Web Application

```
packages/web/
├── client/           # React frontend
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable components
│   │   ├── lib/          # Utilities and helpers
│   │   └── hooks/        # Custom React hooks
│   └── public/       # Static assets
├── server/           # Express backend
│   ├── routes/       # API routes
│   ├── _core/        # Core server setup
│   └── db.ts         # Database connection
├── drizzle/          # Database schema
└── shared/           # Shared types
```

### Database Schema

**Key Tables:**
- `users` - User accounts and authentication
- `book_purchases` - Book purchase records
- `referral_codes` - Referral code generation
- `referral_tracking` - Referral usage tracking

[View Full Schema Documentation →](./packages/web/README.md#database-schema)

## 💳 Stripe Integration

The application uses Stripe for payment processing:

1. **Book Sales**: One-time $9.99 purchases
2. **Checkout Flow**: Stripe Checkout for secure payments
3. **Email Delivery**: Automatic purchase confirmation emails
4. **Download Access**: Secure PDF download links

[View Stripe Integration Guide →](./docs/STRIPE_INTEGRATION.md)

## 🎁 Referral System

Viral growth engine with automatic reward generation:

- **Referral Codes**: Unique codes for each purchaser (BOOKREF-XXXXX)
- **Tracking**: Automatic referral attribution via URL parameters
- **Rewards**: 20% off KetoWell Premium for 3 months per referral
- **Limits**: 10 referrals per code, 90-day expiration

[View Referral System Guide →](./docs/REFERRAL_SYSTEM.md)

## 📊 Analytics

Comprehensive tracking with Google Analytics 4:

- **Page Views**: Track all page visits
- **Events**: Custom events for user actions
- **Conversions**: Purchase and referral tracking
- **Funnels**: Conversion funnel visualization

[View Analytics Guide →](./docs/BOOK-ANALYTICS-GUIDE.md)

## 🌐 Deployment

### Web Application

The web app can be deployed to any platform that supports Node.js:

- **Recommended**: Vercel, Railway, Render
- **Requirements**: Node.js 22+, MySQL database
- **Environment Variables**: See `packages/web/.env.example`

### Database

- **Production**: MySQL 8.0+
- **Migrations**: Handled by Drizzle Kit
- **Backups**: Recommended daily backups

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🔗 Links

- **Website**: [KetoWell.com](https://ketowell.com)
- **GitHub**: [github.com/kimhons/KetoWell](https://github.com/kimhons/KetoWell)
- **Documentation**: [View Docs](./docs/)
- **Support**: support@ketowell.com

## 🙏 Acknowledgments

- Built with [Manus](https://manus.im) - AI-powered development platform
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Powered by [Stripe](https://stripe.com/) for payments

---

**Made with ❤️ by the KetoWell Team**
