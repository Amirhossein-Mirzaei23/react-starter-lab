# Quick Reference: Import Path Changes

This document provides a quick reference for the import path changes made during restructuring.

## Common Import Patterns

### Store Imports

**Before:**
```typescript
import { useUserStore } from '../stores/userStore/userStore';
import { useHeaderStore } from '../stores/headerStore/headerStore';
```

**After:**
```typescript
// From src/ root level
import { useUserStore } from './store/slices/userStore/userStore';

// From features (3 levels deep)
import { useUserStore } from '@/app/store';

// Or use the central export
import { useUserStore } from '../../../app/store';
```

---

### API Imports Within Same Feature

**Before:**
```typescript
// In features/auth/components/authentication.tsx
import { userLoginApi } from '../../api/authentication/login-api';
```

**After:**
```typescript
// In features/auth/components/authentication.tsx
import { userLoginApi } from '../api/login-api';
```

---

### API Imports Across Features

**Before:**
```typescript
// In features/groups/components/card.tsx
import { FriendDto } from '../../api/users/user.types';
```

**After:**
```typescript
// In features/groups/components/card.tsx
import { FriendDto } from '../../users/api/user.types';
```

---

### API Imports from Hooks/Utils

**Before:**
```typescript
// In hooks/useGroupsList.ts
import { getUserGroupsApi } from '../api/groups/groups-services';
```

**After:**
```typescript
// In hooks/useGroupsList.ts
import { getUserGroupsApi } from '../features/groups/api/groups-services';
```

---

### HTTP Service Imports

**Before:**
```typescript
import api from '../api/http';
```

**After:**
```typescript
import api from '../services/http';
```

---

### Shared UI Component Imports

**Before:**
```typescript
// From any location
import { Button } from '../components/ui/button';
```

**After:**
```typescript
// From features (3 levels deep)
import { Button } from '../../../components/ui/button';

// From routes/hooks/utils (2 levels deep)
import { Button } from '../../components/ui/button';

// From src/ root
import { Button } from './components/ui/button';
```

---

### Layout Component Imports

**Before:**
```typescript
import MainLayout from '../layouts/MainLayout';
```

**After:**
```typescript
// From routes
import MainLayout from '../components/layout/MainLayout';

// From features
import MainLayout from '../../../components/layout/MainLayout';
```

---

### Hook Imports

**Before:**
```typescript
import useAuth from '../hooks/useAuth';
```

**After:**
```typescript
// From features (3 levels deep)
import useAuth from '../../../hooks/useAuth';

// Or use central export
import { useAuth } from '../../../app/hooks';
```

---

### Utility Imports

**Before:**
```typescript
import { askForPermission } from '../utils/askForPermision';
```

**After:**
```typescript
// From features (3 levels deep)
import { askForPermission } from '../../../utils/askForPermision';

// From src/ root
import { askForPermission } from './utils/askForPermision';
```

---

### Page/Route Component Imports

**Before:**
```typescript
// In routes/route.tsx
import ProfilePage from '../pages/profile/landing/profile';
import GroupsListPage from '../pages/groups/list';
```

**After:**
```typescript
// In routes/route.tsx
import ProfilePage from '../features/profile/profile/landing/profile';
import GroupsListPage from '../features/groups/groups/list';
```

---

## Import Depth Reference

Based on file location:

| Location | Depth to src/ | Example |
|----------|---------------|---------|
| `src/` | `.` | `./utils/` |
| `src/routes/` | `..` | `../utils/` |
| `src/features/auth/` | `../..` | `../../utils/` |
| `src/features/auth/components/` | `../../..` | `../../../utils/` |
| `src/features/auth/components/nested/` | `../../../..` | `../../../../utils/` |

---

## Quick Tips

1. **Within a feature**: Use `../api/`, `../components/`
2. **Cross-feature**: Use `../../featureName/api/`
3. **From feature to shared**: Use `../../../` (3 dots up to src/)
4. **From shared to feature**: Use `../features/featureName/`

---

## Verification

To verify your imports are correct:
```bash
cd apps/react-vite
npm run build
```

If there are no errors, all imports are correct! ✅
