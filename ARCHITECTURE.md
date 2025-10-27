# Architecture Overview

## State Management

### Redux Toolkit
- **Store**: Centralized state management at `src/store/index.ts`
- **Slices**: Feature-based state slices in `src/store/slices/`
- **Hooks**: Typed hooks for Redux in `src/store/hooks.ts`

Current slices:
- `authSlice`: Authentication state (user, token, isAuthenticated)

### Zustand (Legacy)
- Still used for some features but being migrated to Redux
- Located in `src/stores/authStore.ts`

## API Services

### Service Structure
Located in `src/services/`:

```
services/
├── api/
│   ├── base.ts           # Base API client configuration
│   ├── authService.ts    # Authentication API
│   └── productsService.ts # Products API
└── hooks/
    ├── useAuth.ts        # Authentication hooks
    └── useProducts.ts    # Products hooks
```

### API Client Pattern
```typescript
// Base client
export const apiClient = {
  get, post, put, delete
};

// Service functions
export const authService = {
  login, register, resetPassword, logout
};
```

### TanStack Query Hooks
```typescript
// Custom hooks using TanStack Query
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
  });
};
```

## Data Flow

### Authentication Flow
1. User submits login form
2. `useLogin` hook calls `authService.login()`
3. On success:
   - Update Redux store via `dispatch(setCredentials())`
   - Navigate to home page
4. Header reads from Redux store via `useAppSelector()`

### Products Flow
1. Component calls `useProducts()` hook
2. TanStack Query checks cache
3. If stale, fetches from `productsService.getAll()`
4. Returns cached or fresh data

## Type Safety

### TypeScript
- All API requests/responses typed
- Redux state fully typed
- TanStack Query queries typed via generics

### Example
```typescript
export interface LoginRequest {
  email: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
  });
};
```

## Best Practices

### API Services
- Keep services pure (no side effects)
- Return typed responses
- Handle errors consistently
- Mock implementations for development

### TanStack Query
- Use custom hooks for all data fetching
- Leverage caching with proper `staleTime`
- Use optimistic updates for better UX
- Handle loading and error states

### Redux Toolkit
- Use typed hooks (`useAppDispatch`, `useAppSelector`)
- Keep slices focused on single domain
- Use `createSlice` for all state management
- Avoid complex thunks for simple actions
