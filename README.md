# State Management Workflow with Redux & AWS Amplify

This project uses **Redux Toolkit** for state management and **AWS Amplify** for authentication.

---

## Workflow Diagram

```
A. User Logs In via Login Form
-
1. signIn (Amplify)
2. Dispatch fetchUserSession
3. getCurrentUser + fetchAuthSession
4. Extract Tokens & User Info
5. Redux: Store user, accessToken, idToken
6. Redirect to Protected Route (/)
  
B. Later on page refresh
-
1. fetchUserSession again
2. Verify session from Amplify
3. Update Redux State

C. User clicks Logout
-
1. dispatch logoutUser()
2. signOut (Amplify)
3. Clear Redux Auth State
4. Redirect to /login
```

---

## Folder Structure

```
src/
├── pages/
│   ├── auth/
│   │   ├── Login.tsx         # Handles login and dispatches fetchUserSession
│   │   └── Register.tsx
│   ├── Home.tsx              # Protected route using session from Redux
│   ├── Dashboard.tsx         # Same as Home
│   └── NotFound.tsx
│
├── store/
│   ├── slices/
│   │   └── authSlice.ts      # Contains all auth-related Redux logic
│   └── index.ts              # Configures Redux store
│
├── routes.tsx                # Routing setup with protected/auth redirect logic
├── layout/                   # Layouts for protected areas
└── components/
    ├── ProtectedRoutes.tsx   # Guard component for auth-protected routes
    └── AuthRedirectRoute.tsx # Redirects authenticated users away from login/register
```

---

## Core Logic

### Login (`Login.tsx`)

```ts
await signIn({ username, password });
dispatch(fetchUserSession()); // Fetch tokens & user info
```

### Redux Slice (`authSlice.ts`)

- `fetchUserSession`:
  - Gets user info via `getCurrentUser()`
  - Gets tokens via `fetchAuthSession()`
- `logoutUser`:
  - Calls `signOut()` and clears auth state



### ProtectedRoute

- Checks if user exists in Redux
- If not, attempts `fetchUserSession`
- Redirects unauthenticated users to `/login`

  ### Home & Dashboard

  - On mount, they dispatch `fetchUserSession` if no user is present.
  - Uses `useSelector` to access Redux state.

---

## State Shape

```ts
interface AuthState {
  user: { username: string; email?: string } | null;
  accessToken: string | null;
  idToken: string | null;
  loading: boolean;
  error: string | null;
}
```

---

## Redux Store Setup

### `src/store/index.ts`

```ts
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
```

Use the hooks:

```ts
const dispatch = useDispatch<AppDispatch>();
const { user, loading } = useSelector((state: RootState) => state.auth);
```

---

## Tokens

Tokens (`accessToken`, `idToken`) are extracted from `fetchAuthSession()` and stored in Redux. 
Can be used for:
- Calling authorized APIs (e.g., API Gateway, AppSync)
- Validating sessions on the client

---

## Session Persistence

- On page refresh or route change, protected pages re-check session using `fetchUserSession()`.
- Redux keeps auth state alive during session (non-persistent across tabs unless stored in localStorage/sessionStorage).

---

## Logout

```ts
dispatch(logoutUser());
```

- Calls `signOut()` via Amplify
- Clears Redux state
- Redirects to `/login`