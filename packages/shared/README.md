# @ketowell/shared

Shared types, constants, and utilities for KetoWell web and mobile applications.

## Purpose

This package contains code that is shared between the web application (React) and mobile application (Flutter), including:

- **TypeScript type definitions** for API requests and responses
- **Shared constants** (API endpoints, configuration values)
- **Validation schemas** using Zod
- **Utility functions** that work across platforms

## Usage

### In Web App

```typescript
import { BookPurchase, API_ENDPOINTS } from '@ketowell/shared';
```

### In Mobile App

The TypeScript types can be used to generate Dart types for the Flutter app, ensuring type safety across the entire stack.

## Development

```bash
# Build the package
pnpm build

# Watch mode for development
pnpm dev

# Clean build artifacts
pnpm clean
```

## Structure

```
shared/
├── src/
│   ├── types/          # TypeScript type definitions
│   ├── constants/      # Shared constants
│   └── index.ts        # Main export file
├── package.json
├── tsconfig.json
└── README.md
```
