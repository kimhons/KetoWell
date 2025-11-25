# KetoWell Monorepo Restructuring Plan

## Overview

This document outlines the plan to reorganize the KetoWell repository from a single web application into a monorepo structure that can accommodate both the web application and the upcoming Flutter mobile app.

## Current Structure

```
keto-health-website/
├── client/           # React frontend
├── server/           # Express backend
├── drizzle/          # Database schema
├── shared/           # Shared types
├── package.json
└── README.md
```

## Proposed Monorepo Structure

```
KetoWell/
├── packages/
│   ├── web/                    # Web application (existing code)
│   │   ├── client/            # React frontend
│   │   ├── server/            # Express backend
│   │   ├── drizzle/           # Database schema
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── mobile/                 # Flutter mobile app (placeholder)
│   │   ├── lib/               # Dart source code
│   │   ├── android/           # Android platform code
│   │   ├── ios/               # iOS platform code
│   │   ├── pubspec.yaml       # Flutter dependencies
│   │   └── README.md
│   │
│   └── shared/                 # Shared code between web and mobile
│       ├── api-client/        # API client library
│       ├── types/             # TypeScript type definitions
│       ├── constants/         # Shared constants
│       └── package.json
│
├── docs/                       # Documentation
│   ├── api/                   # API documentation
│   ├── architecture/          # Architecture diagrams
│   └── guides/                # Development guides
│
├── scripts/                    # Build and deployment scripts
│   ├── deploy-web.sh
│   ├── deploy-mobile.sh
│   └── setup-dev.sh
│
├── .github/                    # GitHub workflows
│   └── workflows/
│       ├── web-ci.yml
│       └── mobile-ci.yml
│
├── package.json                # Root package.json with workspaces
├── pnpm-workspace.yaml         # pnpm workspace configuration
├── README.md                   # Updated root README
└── LICENSE
```

## Migration Steps

### Phase 1: Create Directory Structure

1. Create `/packages` directory
2. Create `/packages/web`, `/packages/mobile`, `/packages/shared` subdirectories
3. Create `/docs` and `/scripts` directories

### Phase 2: Move Web Application

1. Move `client/`, `server/`, `drizzle/`, `shared/` to `/packages/web/`
2. Move `package.json` to `/packages/web/package.json`
3. Create new root `package.json` with workspace configuration
4. Update import paths in web application code

### Phase 3: Create Shared Package

1. Extract common types from `/packages/web/shared` to `/packages/shared/types`
2. Create API client library in `/packages/shared/api-client`
3. Extract shared constants to `/packages/shared/constants`
4. Configure package exports for consumption by web and mobile

### Phase 4: Create Mobile Placeholder

1. Initialize Flutter project in `/packages/mobile`
2. Create basic app structure
3. Add README with setup instructions
4. Configure API client dependency

### Phase 5: Update Configuration

1. Create `pnpm-workspace.yaml` for workspace management
2. Update root `package.json` with workspace scripts
3. Update `.gitignore` for monorepo structure
4. Update CI/CD workflows for separate web/mobile builds

### Phase 6: Documentation

1. Update root README.md with monorepo structure
2. Create package-specific READMEs
3. Document cross-package dependencies
4. Add architecture diagrams

## Benefits of Monorepo Structure

### Code Sharing
- Shared TypeScript types between web and mobile
- Reusable API client library
- Consistent constants and configuration

### Development Workflow
- Single repository to clone
- Unified version control
- Easier cross-platform feature development

### Deployment
- Independent deployment of web and mobile
- Shared CI/CD infrastructure
- Coordinated releases

### Maintenance
- Centralized dependency management
- Consistent code style across platforms
- Easier refactoring across packages

## Workspace Configuration

### Root package.json

```json
{
  "name": "ketowell-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "dev:web": "pnpm --filter web dev",
    "build:web": "pnpm --filter web build",
    "dev:mobile": "cd packages/mobile && flutter run",
    "build:mobile": "cd packages/mobile && flutter build",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint",
    "format": "pnpm -r format"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "prettier": "^3.0.0",
    "eslint": "^8.0.0"
  }
}
```

### pnpm-workspace.yaml

```yaml
packages:
  - 'packages/*'
```

## Shared Package Structure

### packages/shared/package.json

```json
{
  "name": "@ketowell/shared",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    "./types": "./dist/types/index.js",
    "./api-client": "./dist/api-client/index.js",
    "./constants": "./dist/constants/index.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  },
  "dependencies": {
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

## Migration Checklist

- [ ] Backup current repository
- [ ] Create new directory structure
- [ ] Move web app files to /packages/web
- [ ] Update web app import paths
- [ ] Create shared package structure
- [ ] Extract shared code to /packages/shared
- [ ] Create mobile app placeholder
- [ ] Update root package.json
- [ ] Create pnpm-workspace.yaml
- [ ] Update .gitignore
- [ ] Test web app functionality
- [ ] Update README.md
- [ ] Update CI/CD workflows
- [ ] Commit and push to GitHub

## Rollback Plan

If issues arise during migration:

1. The original structure is preserved in Git history
2. Can revert to previous commit: `git reset --hard <commit-hash>`
3. Or use webdev_rollback_checkpoint to restore previous state

## Timeline

- **Phase 1-2**: 30 minutes (directory creation and file moves)
- **Phase 3**: 1 hour (shared package extraction)
- **Phase 4**: 30 minutes (mobile placeholder)
- **Phase 5**: 30 minutes (configuration updates)
- **Phase 6**: 30 minutes (documentation)

**Total Estimated Time**: 3 hours

## Next Steps After Restructuring

1. Initialize Flutter project in `/packages/mobile`
2. Set up mobile app authentication flow
3. Implement API client in mobile app
4. Create shared design system
5. Set up mobile CI/CD pipeline
