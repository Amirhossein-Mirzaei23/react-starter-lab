# Project Restructuring - Migration Guide

## Overview

This project has been successfully restructured from a traditional flat structure to a **feature-first architecture** under `apps/react-vite/`. This approach improves scalability, maintainability, and makes it easier to understand and work with related code.

## New Directory Structure

```
apps/react-vite/
├── public/                    # Static assets (unchanged)
│   ├── icons/
│   ├── illusteration/
│   └── manifest.json
├── src/
│   ├── assets/                # Images, icons, fonts
│   ├── app/                   # Application-wide configuration
│   │   ├── store.ts           # Central store exports
│   │   └── hooks.ts           # Central hooks exports
│   ├── features/              # ⭐ Feature-first organization
│   │   ├── auth/              # Authentication
│   │   │   ├── components/    # Auth-specific UI
│   │   │   └── api/           # Auth API calls
│   │   ├── bills/             # Bills management
│   │   │   ├── components/
│   │   │   └── api/
│   │   ├── friends/           # Friends management
│   │   │   ├── components/
│   │   │   ├── api/
│   │   │   └── friendShip/    # Friend pages
│   │   ├── groups/            # Groups management
│   │   │   ├── components/
│   │   │   ├── api/
│   │   │   └── groups/        # Group pages
│   │   ├── posts/             # Posts feature
│   │   │   ├── components/
│   │   │   └── api/
│   │   ├── profile/           # User profile
│   │   │   ├── components/
│   │   │   ├── api/
│   │   │   └── profile/       # Profile pages
│   │   ├── notifications/     # Notifications
│   │   │   └── api/
│   │   └── users/             # User management
│   │       └── api/
│   ├── components/            # Shared/reusable components
│   │   ├── ui/                # UI primitives
│   │   ├── layout/            # Layout components
│   │   ├── finance-preview-table/
│   │   └── guide/
│   ├── services/              # Shared services
│   │   ├── http.ts            # HTTP client
│   │   └── uploader/          # File upload service
│   ├── hooks/                 # Global custom hooks
│   ├── routes/                # Route configuration
│   │   ├── route.tsx          # Route definitions
│   │   ├── ProtectedRoute.tsx
│   │   ├── Home.tsx
│   │   └── NotFound.tsx
│   ├── store/                 # State management
│   │   └── slices/            # Zustand store slices
│   ├── utils/                 # Utility functions
│   ├── constants/             # Constants
│   ├── types/                 # TypeScript type definitions
│   ├── providers/             # Context providers
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Application entry
│   ├── queryClient.ts         # React Query config
│   └── sw.js                  # Service Worker
├── index.html
├── vite.config.ts
├── .env.example              # Environment variables template
├── package.json
└── README.md
```

## Key Changes

### 1. Feature-First Organization

**Before:**
```
src/
├── api/
│   ├── authentication/
│   ├── bills/
│   ├── friends/
│   └── ...
├── components/
│   ├── authentication/
│   ├── pendding-bills/
│   ├── friends-container/
│   └── ...
├── pages/
│   ├── profile/
│   └── ...
```

**After:**
```
src/
├── features/
│   ├── auth/
│   │   ├── components/     # All auth UI
│   │   └── api/            # All auth API
│   ├── bills/
│   │   ├── components/
│   │   └── api/
│   └── ...
```

Each feature is now self-contained with its own components, API calls, and pages.

### 2. Import Path Updates

Import paths have been updated throughout the project:

**Store imports:**
- `'../stores/userStore/userStore'` → `'../store/slices/userStore/userStore'`
- In features: `'../../stores/'` → `'../../../store/slices/'`

**API imports:**
- Within same feature: `'../../api/auth/'` → `'../api/'`
- Cross-feature: `'../../api/users/'` → `'../../users/api/'`
- From shared code: `'../api/groups/'` → `'../features/groups/api/'`

**Component imports:**
- Shared components: `'../../components/ui/'` → `'../../../components/ui/'`
- Layout: `'../layouts/'` → `'../components/layout/'`

**Service imports:**
- `'../api/http'` → `'../services/http'`

### 3. New Central Configuration

**`src/app/store.ts`** - Central store exports:
```typescript
export * from '../store/slices/userStore/userStore';
export * from '../store/slices/bottomSheetStore';
// ... all store slices
```

**`src/app/hooks.ts`** - Central hooks exports:
```typescript
export * from '../hooks/useAuth';
export * from '../hooks/useFindUser';
// ... all shared hooks
```

### 4. Routes Organization

Routes are now centralized in `src/routes/`:
- `route.tsx` - Main route configuration
- `ProtectedRoute.tsx` - Authentication guard
- `Home.tsx` - Home page component
- `NotFound.tsx` - 404 page component

## Migration Benefits

### ✅ Better Organization
- Related code is grouped together by feature
- Easier to find and understand feature-specific code
- Clear separation between features and shared code

### ✅ Improved Scalability
- New features can be added as self-contained modules
- Easier to remove or refactor features without affecting others
- Team members can work on different features with minimal conflicts

### ✅ Enhanced Maintainability
- Feature boundaries are clear and explicit
- Dependencies between features are more visible
- Shared code is clearly distinguished from feature-specific code

### ✅ Modern Architecture
- Follows industry best practices
- Similar to structures used in frameworks like Next.js App Router
- Supports future monorepo expansion

## Next Steps

1. **Install Dependencies:**
   ```bash
   cd apps/react-vite
   npm install
   ```

2. **Configure Environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Test the Application:**
   ```bash
   npm run dev
   ```

4. **Build for Production:**
   ```bash
   npm run build
   ```

5. **Run Linting:**
   ```bash
   npm run lint
   ```

## Troubleshooting

### Import Errors

If you encounter import errors, check:
1. The relative path depth matches the file location
2. Feature imports use the correct `../api/` or `../../featureName/api/` pattern
3. Shared imports use the correct depth (`../../../components/`, etc.)

### Module Not Found

If modules are not found:
1. Verify the file exists in the new location
2. Check that the filename matches exactly (case-sensitive)
3. Ensure TypeScript paths in `tsconfig.json` are correct

### Store Issues

If store slices are not found:
- Check `src/app/store.ts` for correct exports
- Verify store slice file names match the imports

## Additional Notes

- The old structure at the root level can be archived or removed once the migration is verified
- All configuration files (vite.config.ts, tsconfig.json, etc.) have been copied to `apps/react-vite/`
- Service Worker (sw.js) continues to work as before
- PWA manifest and assets remain in the `public/` directory

## Questions or Issues?

If you encounter any issues during the migration:
1. Check this guide for common patterns
2. Review the import path changes in similar files
3. Verify file locations in the new structure
4. Check TypeScript compiler errors for specific issues

---

**Migration completed:** February 15, 2026
**Structure:** Feature-first architecture
**Framework:** React + TypeScript + Vite
