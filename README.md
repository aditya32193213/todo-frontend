<div align="center">

# 📝 TaskFlow — Frontend

### *Your tasks. Your flow. Totally under control.*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Axios](https://img.shields.io/badge/Axios-v1-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](https://opensource.org/licenses/ISC)

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Frontend-Live_Demo-6366f1?style=for-the-badge)](https://todo-frontend-swart-nine.vercel.app/)
[![Backend API](https://img.shields.io/badge/⚙️_Backend-Live_API-10b981?style=for-the-badge)](https://todo-backend-t5gm.onrender.com/)
[![PRs Welcome](https://img.shields.io/badge/🤝_PRs-Welcome-ec4899?style=for-the-badge)](https://github.com/your-username/todo-frontend/pulls)

<br/>

> 🚀 A polished, production-ready **React 19** frontend for the TaskFlow Todo application — featuring JWT auth, dark mode, real-time task metrics, debounced search, pagination, and an accessible component library — all styled with **Tailwind CSS** and built for performance.

</div>

---

## 📌 Table of Contents

- [🎬 Demo](#-demo)
- [📸 Screenshots](#-screenshots)
- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Folder Structure](#-folder-structure)
- [📂 Folder Overview](#-folder-overview)
- [🏗️ System Architecture](#️-system-architecture)
- [🪝 Hooks Architecture](#-hooks-architecture)
- [🧩 Component Reference](#-component-reference)
- [🌐 API Integration](#-api-integration)
- [⚙️ Environment Variables](#️-environment-variables)
- [🚀 Setup & Installation](#-setup--installation)
- [🔒 Auth & Security](#-auth--security)
- [🎨 Theming & Styling](#-theming--styling)
- [⚡ Performance Optimisations](#-performance-optimisations)
- [♿ Accessibility](#-accessibility)
- [🐛 Error Handling](#-error-handling)
- [🔮 Future Enhancements](#-future-enhancements)
- [👤 Author](#-author)

---

## 🎬 Demo

<div align="center">

[![TaskFlow Demo](https://img.shields.io/badge/▶️_Watch_Full_Walkthrough-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.loom.com/share/cf2456f629684cfeaec0441862e4416d)

*Click above to watch a full walkthrough of TaskFlow in action!*

| 🌐 Live Frontend | ⚙️ Backend API |
|---|---|
| [todo-frontend-swart-nine.vercel.app](https://todo-frontend-swart-nine.vercel.app/) | [todo-backend-t5gm.onrender.com](https://todo-backend-t5gm.onrender.com/) |

</div>

---

## 📸 Screenshots


<div align="center">

### 🏠 Dashboard — Light Mode
```
┌─────────────────────────────────────────────────────┐
│  [ Screenshot: Home page — metric cards, progress   │
│    bar, task list, search & filter bar ]            │
│  Path: /screenshots/home-light.png                  │
└─────────────────────────────────────────────────────┘
```

### 🌙 Dashboard — Dark Mode
```
┌─────────────────────────────────────────────────────┐
│  [ Screenshot: Home page in dark mode ]             │
│  Path: /screenshots/home-dark.png                   │
└─────────────────────────────────────────────────────┘
```

### 🔐 Login Page
```
┌─────────────────────────────────────────────────────┐
│  [ Screenshot: Login form with glassmorphism card ] │
│  Path: /screenshots/login.png                       │
└─────────────────────────────────────────────────────┘
```

### 📝 Register Page
```
┌─────────────────────────────────────────────────────┐
│  [ Screenshot: Registration form ]                  │
│  Path: /screenshots/register.png                    │
└─────────────────────────────────────────────────────┘
```

### ✅ Create / Edit Task Modal
```
┌─────────────────────────────────────────────────────┐
│  [ Screenshot: Modal with title, description,       │
│    and coloured status pills ]                      │
│  Path: /screenshots/modal-create.png                │
└─────────────────────────────────────────────────────┘
```

### 🗑️ Delete Confirmation Modal
```
┌─────────────────────────────────────────────────────┐
│  [ Screenshot: Delete confirmation dialog ]         │
│  Path: /screenshots/modal-delete.png                │
└─────────────────────────────────────────────────────┘
```

### 👤 Profile Page
```
┌─────────────────────────────────────────────────────┐
│  [ Screenshot: Profile card + change password form ]│
│  Path: /screenshots/profile.png                     │
└─────────────────────────────────────────────────────┘
```

### 📱 Mobile — Sidebar Overlay
```
┌─────────────────────────────────────────────────────┐
│  [ Screenshot: Mobile layout — sidebar open with    │
│    backdrop blur overlay ]                          │
│  Path: /screenshots/mobile-sidebar.png              │
└─────────────────────────────────────────────────────┘
```

</div>

---

## ✨ Key Features

### 🔐 Authentication
- JWT-based login, register, and logout flows
- Token auto-attached to every request via Axios request interceptor
- Client-side JWT expiry check in `PrivateRoute` — redirects *before* the first API call fires, preventing a flash of protected content
- Two isolated loading states: `authLoading` (login/register) and `profileLoading` (password update) — no spinner cross-contamination
- Safe `JSON.parse` guard on stored user — corrupt `tf-user` entries auto-removed on next load

### ✅ Task Management
- Full **CRUD** — create, read, update, delete
- **Optimistic status updates** with automatic rollback on API failure
- **Exit animation** (220ms delay) before DOM removal on delete — smooth, not jarring
- One-click status cycling: `pending → in-progress → completed → pending`
- 8-task **seed** for instant onboarding — one click, parallel `Promise.all` creates

### 🔍 Search, Filter & Sort
- **Debounced search** (400ms) — zero API calls while typing
- Status filter tabs: All / Pending / In Progress / Completed
- Sort toggle: Newest first ↔ Oldest first
- All filter/sort/search changes **automatically reset to page 1**
- Empty state differentiation: "No tasks yet" vs "No results found"

### 📊 Metrics & Progress
- Live stat cards: Total · Completed · In Progress · Pending
- Animated violet completion percentage progress bar
- Sidebar mini overview widget with Done / Busy / Todo counts
- All counts fetched in **one DB round-trip** (`$facet` aggregation on the backend)
- Metrics failures are silent — page never crashes over a non-critical count

### 🎨 UI & Theming
- **Dark / Light mode** toggle — persisted in `localStorage`, responds to OS `prefers-color-scheme` changes in real time
- Glassmorphism design: `glass-card`, `glass`, `page-bg`, `grid-overlay`, animated `orb` backgrounds
- Animated gradient logo with instance-unique SVG gradient IDs (no multi-instance collision)
- Smooth page-level animations: `animate-slide-up`, `animate-fade-in`, `animate-float`, `animate-glow-pulse`
- Fully responsive: collapsible mobile sidebar overlay + static desktop sidebar

### 📄 Pagination
- Server-side pagination, 5 tasks per page
- Prev / Next chevrons + numbered page buttons
- Memoized page number array — `Array.from` only runs when `totalPages` changes

---

## 🛠️ Tech Stack

| Category | Technology | Version | Purpose |
|---|---|---|---|
| ⚛️ UI Library | **React** | ^19.2.4 | Component model & rendering |
| 🎨 Styling | **Tailwind CSS** | ^3.4.19 | Utility-first CSS framework |
| 🗺️ Routing | **React Router DOM** | ^7.13.1 | Client-side routing & protected routes |
| 🌐 HTTP | **Axios** | ^1.13.6 | API calls with request/response interceptors |
| 🔔 Notifications | **react-hot-toast** | ^2.6.0 | Non-blocking toast notifications |
| 🎯 Icons | **lucide-react** | ^0.577.0 | Consistent stroke icon library |
| 🔲 Icons (extra) | **react-icons** | ^5.6.0 | Additional icon sets |
| 🧪 Testing | **@testing-library/react** | ^16.3.2 | Component & integration testing |
| 📦 Build | **react-scripts (CRA)** | 5.0.1 | Build toolchain & dev server |
| 🔧 CSS Processing | **autoprefixer + postcss** | ^10.4 / ^8.5 | Vendor prefix automation |

---

## 📁 Folder Structure

```
todo-frontend/
│
├── 📄 package.json                          # Dependencies & npm scripts
├── 📄 tailwind.config.js                    # Tailwind theme & custom utilities
├── 📄 postcss.config.js                     # PostCSS + autoprefixer
├── 📄 .env                                  # 🔐 Local env vars (never commit!)
├── 📄 .env.example                          # 📋 Environment variable template
│
├── 📂 public/
│   └── 📄 index.html                        # HTML shell
│
└── 📂 src/
    │
    ├── 📄 index.js                          # ReactDOM.createRoot entry point
    ├── 📄 App.jsx                           # 🗺️  Root: providers, router, routes, Toaster
    │
    ├── 📂 pages/                            # 🖥️  Lazy-loaded route-level views
    │   ├── 📄 Home.jsx                      # Dashboard: tasks, metrics, search, pagination
    │   ├── 📄 Login.jsx                     # Sign-in form
    │   ├── 📄 Register.jsx                  # Account creation form
    │   └── 📄 Profile.jsx                   # User info card + change password form
    │
    ├── 📂 components/                       # 🧩 Reusable UI components
    │   ├── 📄 ErrorBoundary.jsx             # Class error boundary with dev stack overlay
    │   ├── 📄 FormField.jsx                 # Accessible label + input + error wrapper
    │   ├── 📄 Logo.jsx                      # Animated gradient TaskFlow logo
    │   ├── 📄 Navbar.jsx                    # Sticky top bar with user dropdown
    │   ├── 📄 PageBackground.jsx            # Orb + grid overlay decorative backgrounds
    │   ├── 📄 PasswordInput.jsx             # Unified show/hide password field
    │   ├── 📄 PrivateRoute.jsx              # JWT expiry guard for protected pages
    │   ├── 📄 Sidebar.jsx                   # Collapsible nav with filter tabs + metrics
    │   ├── 📄 TodoCard.jsx                  # Task row: status toggle, edit, delete
    │   └── 📄 TodoModal.jsx                 # Create / Edit / Delete modal dialog
    │
    ├── 📂 context/                          # 🌍 React Context providers
    │   ├── 📄 AuthContext.jsx               # Auth state, login, logout, password update
    │   └── 📄 ThemeContext.jsx              # Dark/light mode + OS sync
    │
    ├── 📂 hooks/                            # 🪝 Custom React hooks
    │   ├── 📄 useTasks.js                   # Orchestrator — flat API over all sub-hooks
    │   ├── 📄 useTaskList.js                # Fetch, pagination, search, filter, sort
    │   ├── 📄 useTaskMetrics.js             # Isolated metrics fetch (non-critical)
    │   ├── 📄 useTaskModal.js               # Modal open/close/mode/formData (pure UI)
    │   ├── 📄 useTaskMutations.js           # All writes: CRUD, seed, status toggle
    │   ├── 📄 useAuth.js                    # Re-export shim → AuthContext
    │   └── 📄 useDebounce.js               # Generic debounce (400ms default)
    │
    ├── 📂 services/                         # 🌐 API layer
    │   ├── 📄 api.js                        # Axios instance + interceptors
    │   ├── 📄 authService.js                # Auth API calls
    │   └── 📄 todoService.js                # Task API calls
    │
    └── 📂 features/
        └── 📂 tasks/
            ├── 📄 taskConstants.js          # STATUS_MAP, STATUSES, NAV_ITEMS, labels
            └── 📄 seedTasks.js              # 8 sample tasks for onboarding / demo
```

---

## 📂 Folder Overview

### 🖥️ `pages/` — Route-Level Views

Every page is **lazy-loaded** with `React.lazy()` — the JS chunk only downloads when the user first visits that route.

| Page | Route | Protected | Description |
|---|---|---|---|
| `Home.jsx` | `/` | 🔒 Yes | Main dashboard — task list, metrics, search, filter, sort, pagination |
| `Login.jsx` | `/login` | 🌐 No | Email + password sign-in with glass card form |
| `Register.jsx` | `/register` | 🌐 No | Account creation with confirm password |
| `Profile.jsx` | `/profile` | 🔒 Yes | Read-only user info card + change password form |

---

### 🧩 `components/` — UI Building Blocks

| Component | `memo` | Key Details |
|---|---|---|
| `ErrorBoundary` | ✅ (class) | `onReset` → soft nav; dev overlay with `componentStack`; Sentry-ready |
| `FormField` | ❌ | `useId()` + `cloneElement` injects `id`; `role="alert"` on errors |
| `Logo` | ❌ | `useId()` for unique SVG gradient IDs; 3 sizes: `sm` / `md` / `lg` |
| `Navbar` | ✅ | Sticky; hamburger mobile toggle; theme toggle; user dropdown with Escape handler |
| `PageBackground` | ✅ | Module-level orb arrays → referentially stable → memo is effective |
| `PasswordInput` | ❌ | Replaces 3 copy-pasted implementations; spreads `...rest` for `FormField` ID compat |
| `PrivateRoute` | ❌ | `atob` JWT decode; redirects before API fires |
| `Sidebar` | ✅ | Mobile overlay + `backdrop-blur`; `NAV_ITEMS` from constants; count badges |
| `TodoCard` | ✅ | Status circle toggle; hover-reveal actions; `task-exit` animation; date `useMemo` |
| `TodoModal` | ❌ | `aria-labelledby`; auto-focus; Escape key; `isMutating` spinner; 3-mode |

---

### 🌍 `context/` — Global State

| Context | State Held | Key Behaviour |
|---|---|---|
| `AuthContext` | `user`, `authLoading`, `profileLoading` | Two isolated loading flags; `isLoggingOut` coordination with Axios interceptor |
| `ThemeContext` | `isDark` | `prefers-color-scheme` real-time listener; manual toggle persisted; memoized value |

---

### 🪝 `hooks/` — Custom Hooks

| Hook | Single Responsibility |
|---|---|
| `useTasks` | Orchestrator — composes sub-hooks, exposes flat API to `Home.jsx` |
| `useTaskList` | Task fetching, pagination (limit=5), search (debounced), status filter, sort |
| `useTaskMetrics` | Fetches `GET /tasks/metrics`; silent fail with dev-only `console.warn` |
| `useTaskModal` | Pure UI state: `isOpen`, `mode`, `selectedTodo`, `formData` |
| `useTaskMutations` | Create, edit, delete (+ 220ms exit), seed, optimistic status toggle |
| `useAuth` | `export default useAuth` re-export shim from `AuthContext` |
| `useDebounce` | Delays value update by `delay` ms; used on search input |

---

### 🌐 `services/` — API Layer

| File | Purpose |
|---|---|
| `api.js` | Axios instance (12s timeout); request interceptor auto-attaches `Bearer` token; 401 interceptor redirects on session expiry (skipped during deliberate logout) |
| `authService.js` | `login`, `register`, `logout` (accepts token explicitly), `updatePassword` |
| `todoService.js` | `getTodos`, `getTaskMetrics`, `createTodo`, `updateTodo`, `deleteTodo`; all unwrap `res.data.data` |

---

### 📦 `features/tasks/` — Domain Constants & Data

| File | Exports |
|---|---|
| `taskConstants.js` | `STATUS_MAP` (label + badge class + next status), `STATUSES` (filter tabs), `STATUS_LABELS`, `STATUS_VALUES`, `NAV_ITEMS` (with Lucide icons + colours) |
| `seedTasks.js` | `SEED_TASKS` — 8 realistic tasks (3 completed, 2 in-progress, 3 pending); lazy-importable |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                        BROWSER — TaskFlow Frontend                           │
│                   https://todo-frontend-swart-nine.vercel.app                │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  App.jsx — Provider tree                                               │  │
│  │                                                                        │  │
│  │  <ThemeProvider>                                                       │  │
│  │    <AuthProvider>                                                      │  │
│  │      <BrowserRouter>                                                   │  │
│  │        <RouteErrorBoundary>  ← class ErrorBoundary + useNavigate wrap │  │
│  │          <Suspense fallback={<PageLoader />}>                          │  │
│  │            <Routes>                                                    │  │
│  │              / → <PrivateRoute> → <Home />    (lazy chunk)            │  │
│  │              /profile → <PrivateRoute> → <Profile /> (lazy chunk)     │  │
│  │              /login    → <Login />            (lazy chunk)            │  │
│  │              /register → <Register />         (lazy chunk)            │  │
│  │              * → inline 404                                           │  │
│  │            </Routes>                                                   │  │
│  │          </Suspense>                                                   │  │
│  │        </RouteErrorBoundary>                                           │  │
│  │      </BrowserRouter>                                                  │  │
│  │    </AuthProvider>                                                     │  │
│  │  </ThemeProvider>                                                      │  │
│  │  <Toaster /> ← outside BrowserRouter (survives route transitions)     │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  Home.jsx (Protected Route)                                            │  │
│  │                                                                        │  │
│  │  useTasks() ─ orchestrates:                                            │  │
│  │    ├── useTaskList      → fetch + page + search + filter + sort       │  │
│  │    │     └── useDebounce (400ms on search)                            │  │
│  │    ├── useTaskMetrics   → isolated GET /tasks/metrics                 │  │
│  │    ├── useTaskModal     → pure UI: open/close/mode/formData           │  │
│  │    └── useTaskMutations → all writes + seed + optimistic status       │  │
│  │                                                                        │  │
│  │  ┌────────────┐  ┌──────────────────────────────────┐  ┌───────────┐  │  │
│  │  │  Navbar    │  │  <main>                          │  │  Sidebar  │  │  │
│  │  │  (memo)    │  │  Title + New Task btn            │  │  (memo)   │  │  │
│  │  │            │  │  Metric cards (×4, memoized)     │  │           │  │  │
│  │  │ Seed btn   │  │  Progress bar                    │  │ NAV_ITEMS │  │  │
│  │  │ Theme btn  │  │  Search + Filter tabs + Sort btn │  │ filter    │  │  │
│  │  │ User menu  │  │  Skeleton loaders / Error state  │  │ progress  │  │  │
│  │  │            │  │  TodoCard list (memo ×n)         │  │ widget    │  │  │
│  │  └────────────┘  │  Pagination buttons (memoized)   │  │ seed btn  │  │  │
│  │                  └──────────────────────────────────┘  └───────────┘  │  │
│  │                                                                        │  │
│  │  <TodoModal />  (create | edit | delete)                               │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │  services/api.js — Axios Instance                                      │  │
│  │  baseURL: REACT_APP_API_URL || https://todo-backend-t5gm.onrender.com  │  │
│  │  timeout: 12 000ms                                                     │  │
│  │                                                                        │  │
│  │  Request interceptor:  headers.Authorization = "Bearer <token>"       │  │
│  │  Response interceptor: 401 → clear localStorage → toast → /login      │  │
│  │                        (isLoggingOut=true skips this path)             │  │
│  └─────────────────────────────────┬──────────────────────────────────────┘  │
└────────────────────────────────────┼─────────────────────────────────────────┘
                                     │  HTTPS
                                     ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                   BACKEND — Express REST API (Render)                        │
│              https://todo-backend-t5gm.onrender.com/api                      │
│                                                                              │
│   POST /auth/register   POST /auth/login   POST /auth/logout                 │
│   PATCH /auth/password                                                       │
│   GET  /tasks           POST /tasks        PUT  /tasks/:id                   │
│   DELETE /tasks/:id     GET  /tasks/metrics                                  │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 🔄 Full Data Flow — Create Task

```
User clicks "Add Task" in TodoModal
  → TodoModal onClick → onSave()
  → useTaskMutations.handleSave()
     ├── isSaving.current = true     (ref — no re-render)
     ├── setIsMutating(true)         (state — triggers spinner in modal)
     ├── todoService.createTodo(formData)
     │     └── api.js POST /tasks    (Bearer token auto-attached)
     │           └── res.data.data → new task
     ├── fetchTodos()                (refresh list + pagination counts)
     ├── fetchMetrics()              (refresh stat cards)
     ├── toast.success("Task created 🎉")
     └── closeModal()
     finally: isSaving.current = false, setIsMutating(false)
```

---

## 🪝 Hooks Architecture

The hook layer uses a **single-responsibility composition** pattern. `Home.jsx` imports only `useTasks` and gets back a flat API — it never talks to sub-hooks directly.

```
Home.jsx
  └── useTasks()
        ├── useTaskList(...)
        │     ├── useState: todos, loading, error, page, totalPages, total, exitId
        │     ├── useState: searchRaw, statusFilter, sortOrder
        │     ├── useDebounce(searchRaw, 400)   ← gates API on debouncedSearch
        │     └── useCallback: fetchTodos, setStatusFilter, setSearchRaw, setSortOrder
        │
        ├── useTaskMetrics()
        │     └── fetchMetrics() → GET /tasks/metrics (isolated, silent fail)
        │
        ├── useTaskModal()
        │     └── useState: isModalOpen, modalMode, selectedTodo, formData
        │         useCallback: openCreate, openEdit, openDelete, closeModal
        │
        └── useTaskMutations({ setTodos, fetchTodos, fetchMetrics, modal, setExitId })
              ├── useRef:   isSaving          ← double-submit guard (no re-render)
              ├── useState: isMutating        ← spinner state (needs re-render)
              ├── useState: seeding
              └── useCallback: handleSave, handleStatusChange, handleSeed
```

### 🛡️ Guard Patterns

| Pattern | Hook | Purpose |
|---|---|---|
| `isSaving` ref | `useTaskMutations` | Blocks double-submit; doesn't cause extra render |
| `isMutating` state | `useTaskMutations` | Drives Save/Delete button spinner |
| 400ms debounce | `useTaskList` + `useDebounce` | Suppresses API calls while typing |
| `setPage(1)` on filter/sort/search | `useTaskList` | Never shows stale page on new query |
| Silent metrics fail | `useTaskMetrics` | Non-critical data; never crashes the page |
| Optimistic + rollback | `useTaskMutations.handleStatusChange` | Instant UI feedback; reverts on error |
| 220ms exit delay (delete) | `useTaskMutations.handleSave` | Animation runs before DOM removal |
| `isSaving` reset inside setTimeout | `useTaskMutations.handleSave` | Guard stays closed during the full delete animation window |

---

## 🧩 Component Reference

### `<TodoCard />`
```jsx
<TodoCard
  todo={task}
  onEdit={openEdit}
  onDelete={openDelete}
  onStatusChange={handleStatusChange}
  isExiting={exitId === task._id}
/>
```

- **Status circle**: empty border (pending) → pulsing blue dot (in-progress) → green checkmark (completed)
- **Hover-reveal** edit (pencil) and delete (trash) buttons — invisible until hover
- `handleToggle` cycles to `STATUS_MAP[status].next` with `try/finally` to always reset `toggling`
- `useMemo` on date — `new Date(createdAt)` only computed when `createdAt` changes
- `task-exit` CSS class applied when `isExiting=true`; `completed` tasks render at `opacity-70`

---

### `<TodoModal />`
```jsx
<TodoModal
  isOpen={isModalOpen}
  onClose={closeModal}
  onSave={handleSave}
  mode="create" | "edit" | "delete"
  formData={formData}
  setFormData={setFormData}
  isMutating={isMutating}
/>
```

- `role="dialog"` + `aria-modal="true"` + `aria-labelledby="modal-dialog-title"`
- Auto-focuses `titleRef` input 80ms after open (Suspense-safe)
- Global `Escape` key handler (cleaned up on close)
- Title inline validation on `onBlur` — `setTitleTouched(true)` triggers red ring
- Status pills with colour theming: amber (pending), blue (in-progress), emerald (completed)
- `isMutating` prop disables both Cancel and primary buttons + shows animated spinner
- Delete mode shows a confirmation message (no form fields)

---

### `<FormField />`
```jsx
<FormField label="Email Address" error={errors.email} required>
  <input type="email" {...props} />
</FormField>
```
- `useId()` generates a stable, unique ID per instance (safe for SSR)
- `cloneElement` injects that ID onto the child (`PasswordInput` spreads `...rest` so it lands on `<input>`)
- `htmlFor` → clicking the label text focuses the field
- `role="alert"` on error `<p>` for immediate screen-reader announcement

---

### `<PrivateRoute />`
```jsx
<Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
```
Checks three conditions before rendering children. Fails → `<Navigate to="/login" replace />`:
1. `user` context is null (not logged in)
2. No `token` in `localStorage`
3. Token is expired — decoded via `atob(token.split(".")[1])`, `Date.now() >= exp * 1000`

---

### `<Logo />`
```jsx
<Logo size="sm" | "md" | "lg" showText={true} />
```
- Violet-to-lavender linear gradient on the SVG rect
- `useId()` generates unique gradient ID per instance — prevents two `<Logo>` elements fighting over `id="lg1"` in the same document
- Checklist icon with animated checkmark path

---

### `<ErrorBoundary />`
```jsx
<ErrorBoundary onReset={() => navigate("/", { replace: true })}>
  {children}
</ErrorBoundary>
```
- `onReset` → soft React Router navigation (wrapped in `RouteErrorBoundary` in `App.jsx`)
- Persists `componentStack` in state for error-reporting tools (e.g. Sentry)
- Dev overlay: error message + component stack in a scrollable `<pre>`
- Two action buttons: "Reload page" (hard reload) and "Go to home" (soft nav)

---

## 🌐 API Integration

### Base URL

| Environment | URL |
|---|---|
| 🏠 Local development | `http://localhost:5000/api` |
| 🚀 Production (Render) | `https://todo-backend-t5gm.onrender.com/api` |

Set `REACT_APP_API_URL` to override. A `console.warn` fires in development if it's unset.

### Response Unwrapping

The backend always responds with:
```json
{ "success": true, "message": "...", "data": <payload> }
```
Axios wraps the HTTP body under `res.data`, so `todoService` reads `res.data.data` for the actual payload.

### Service Functions

| Function | Method | Endpoint | Payload → Returns |
|---|---|---|---|
| `login(data)` | POST | `/auth/login` | `{email,password}` → `{id,name,email,token}` |
| `register(data)` | POST | `/auth/register` | `{name,email,password}` → `{id,name,email,token}` |
| `logout(token)` | POST | `/auth/logout` | token in header → `204` |
| `updatePassword(data)` | PATCH | `/auth/password` | `{currentPassword,newPassword,confirmPassword}` → `200` |
| `getTodos(params)` | GET | `/tasks` | `?page&limit&status&sort&search` → `{tasks,total,page,pages}` |
| `getTaskMetrics()` | GET | `/tasks/metrics` | — → `{total,completed,inProgress,pending,pct}` |
| `createTodo(data)` | POST | `/tasks` | `{title,description,status}` → task object |
| `updateTodo(id,data)` | PUT | `/tasks/:id` | partial task → updated task |
| `deleteTodo(id)` | DELETE | `/tasks/:id` | — → `204` (no body) |

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` before running.

### 📋 `.env.example`
```env
# ── API ────────────────────────────────────────────────────────────────────────
# Backend API base URL — no trailing slash
# Omit to fall back to the deployed Render API automatically
REACT_APP_API_URL=http://localhost:5000/api

# ── Notes ──────────────────────────────────────────────────────────────────────
# All CRA variables MUST start with REACT_APP_
# A dev-mode console.warn fires if REACT_APP_API_URL is missing
# NEVER store secrets here — these values are compiled into the JS bundle
```

### 📊 Variable Reference

| Variable | Required | Default | Description |
|---|---|---|---|
| `REACT_APP_API_URL` | ❌ Optional | `https://todo-backend-t5gm.onrender.com/api` | Backend base URL |

> ⚠️ Frontend env vars are embedded in the compiled bundle — **never put JWT secrets, DB URIs, or API keys here.**

---

## 🚀 Setup & Installation

### 📋 Prerequisites

- ✅ **Node.js** ≥ 18.x — [Download](https://nodejs.org/)
- ✅ **npm** ≥ 9.x (bundled with Node.js)
- ✅ The **backend** running locally or via the deployed Render URL

---

### 🔧 Step-by-Step

```bash
# 1️⃣  Clone the repository
git clone https://github.com/aditya32193213/todo-frontend.git
cd todo-frontend

# 2️⃣  Install dependencies
npm install

# 3️⃣  Configure environment
cp .env.example .env
# ✏️  Set REACT_APP_API_URL if targeting local backend

# 4️⃣  Start development server
npm start
# → http://localhost:3000  (auto-opens in browser)

# 5️⃣  Build for production
npm run build
# → Optimised output in /build

# 6️⃣  Run tests
npm test
```

---

### 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| 🔄 Development | `npm start` | CRA dev server with hot-reload |
| 🏗️ Build | `npm run build` | Minified production bundle → `/build` |
| 🧪 Test | `npm test` | Jest + RTL in interactive watch mode |
| 🚀 Eject | `npm run eject` | Exposes CRA config *(irreversible)* |

---

### 🌍 Local Backend Setup

```env
# .env  (frontend)
REACT_APP_API_URL=http://localhost:5000/api
```

```env
# .env  (backend)
CLIENT_URL=http://localhost:3000
```

---

### ☁️ Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Set the environment variable on the Vercel dashboard:
```
REACT_APP_API_URL = https://todo-backend-t5gm.onrender.com/api
```

Or connect the GitHub repo on [vercel.com](https://vercel.com) — it auto-detects CRA and sets the build command to `npm run build`.

---

## 🔒 Auth & Security

### 🔐 Login Flow
```
User submits Login form
  → Client validates (email regex, non-empty)
  → handleLogin({ email, password })          AuthContext
  → authService.login(credentials)            API call
  → Backend: { id, name, email, token }
  → localStorage.setItem("token", token)
  → localStorage.setItem("tf-user", JSON.stringify({id, name, email}))
  → setUser(userData)
  → navigate("/")
```

### 🚪 Logout Flow
```
User clicks Logout
  → Navbar.onLogout()
  → const token = localStorage.getItem("token")   ← read FIRST
  → localStorage.removeItem("token")
  → localStorage.removeItem("tf-user")
  → setUser(null)
  → setLoggingOut(true)                            ← 401 interceptor stands down
  → logoutService(token)                           ← backend blacklists token
  → setLoggingOut(false)
  → window.location.href = "/login"                ← hard redirect after cleanup
```

### 🛡️ PrivateRoute — Pre-flight JWT Expiry Check
```js
const isTokenExpired = (token) => {
  const payload = JSON.parse(atob(token.split(".")[1]));
  return Date.now() >= payload.exp * 1000;  // exp is in seconds
};
// Fails silently (returns true) on: missing token, bad base64, no exp claim
```

This prevents a user from seeing a momentary flash of the dashboard after their token expired while the tab was closed.

---

## 🎨 Theming & Styling

### Dark Mode Strategy
```
document.documentElement.classList.add("dark")   ← Tailwind "class" strategy
localStorage.setItem("tf-theme", "dark" | "light")
```

- **Initial state**: checks `tf-theme` in `localStorage` → falls back to `window.matchMedia("(prefers-color-scheme: dark)")`
- **OS listener**: real-time `change` event on the media query — app follows OS changes live if the user hasn't set an explicit preference
- **Manual toggle**: sets `tf-theme` → OS listener stands down
- **Context value**: `useMemo({ isDark, toggle })` — consumers only re-render when `isDark` changes

### Custom CSS Class Reference

| Class | Purpose |
|---|---|
| `.glass` | `backdrop-blur` frosted glass surface |
| `.glass-card` | Elevated glass card with subtle border |
| `.page-bg` | Full-screen gradient background layer |
| `.grid-overlay` | Dot grid texture overlay |
| `.orb` | Blurred ambient colour sphere |
| `.btn-primary` | Violet filled CTA button |
| `.btn-ghost` | Transparent outlined button |
| `.btn-danger` | Red destructive action button |
| `.input` | Base styled input/textarea |
| `.input-error` | Red ring error state |
| `.metric-card` | Stats card container |
| `.progress-track` | Grey progress bar track |
| `.progress-fill` | Violet animated fill bar |
| `.badge-pending` | Amber status pill |
| `.badge-in-progress` | Blue status pill |
| `.badge-completed` | Emerald status pill |
| `.spinner` | Small spinning loader ring |
| `.animate-slide-up` | Slide + fade entrance |
| `.animate-fade-in` | Opacity fade entrance |
| `.animate-float` | Vertical float loop |
| `.animate-glow-pulse` | Violet glow pulse ring |
| `.task-exit` | Slide + fade exit for deleted tasks |
| `.shadow-glow` | Violet drop shadow glow |
| `.shadow-3d` | Layered 3D-depth box shadow |
| `.form-scene` / `.form-3d` | CSS perspective 3D tilt on form cards |

### Typography
```
font-display  →  headings, labels, buttons, numbers
font-body     →  body copy, descriptions, helper text
```
Rendered via `'DM Sans', sans-serif` configured in `Toaster` style.

---

## ⚡ Performance Optimisations

| Optimisation | Location | Impact |
|---|---|---|
| `React.lazy` + `Suspense` | `App.jsx` | Each page is a separate JS chunk, downloaded on demand |
| `React.memo` | `Navbar`, `Sidebar`, `TodoCard`, `PageBackground` | Skips re-render entirely when props are stable |
| `useCallback` on all prop handlers | `Home.jsx`, all hooks | Referential stability → `memo` actually fires |
| `useMemo` — metric cards array | `Home.jsx` | Rebuilt only after a CRUD mutation, not on every keystroke |
| `useMemo` — page numbers array | `Home.jsx` | `Array.from` runs only when `totalPages` changes |
| `useMemo` — formatted date | `TodoCard.jsx` | `new Date()` only called when `createdAt` changes |
| `useMemo` — sidebar count map | `Sidebar.jsx` | Rebuilt only when metric values change |
| `useMemo` — context value | `ThemeContext.jsx` | Prevents unnecessary re-renders of all theme consumers |
| 400ms debounced search | `useDebounce` + `useTaskList` | Zero API calls while user is still typing |
| `isSaving` as `useRef` | `useTaskMutations` | Double-submit guard without triggering a re-render |
| Optimistic status updates | `useTaskMutations` | UI responds instantly; rolls back silently on failure |
| Module-level orb arrays | `Login`, `Register`, `Profile`, `Home` | Arrays don't reallocate on re-render → `PageBackground` memo works |
| `Promise.all` for seed | `useTaskMutations.handleSeed` | All 8 seed tasks created in parallel, not sequentially |
| `<Toaster />` outside router | `App.jsx` | Persists across route transitions; never unmounted |

---

## ♿ Accessibility

| Feature | Where | Implementation |
|---|---|---|
| Label–input association | `FormField` | `useId()` + `cloneElement` injects matching `id` / `htmlFor` |
| Password toggle label | `PasswordInput` | `aria-label="Show password"` / `"Hide password"` |
| Inline error announcements | `FormField` | `role="alert"` for immediate screen-reader pickup |
| Dialog semantics | `TodoModal` | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` |
| Focus management | `TodoModal` | Auto-focuses title input on open (80ms delay) |
| Keyboard close | `TodoModal`, `Navbar` | `Escape` key closes modal / dropdown |
| Dropdown ARIA | `Navbar` | `aria-expanded`, `aria-haspopup="menu"`, `role="menu"`, `role="menuitem"` |
| Unique SVG IDs | `Logo` | `useId()` prevents gradient conflict with multiple instances |
| Status toggle hint | `TodoCard` | `title="Click to mark as {next}"` on the circle button |
| Sidebar close label | `Sidebar` | `aria-label="Close sidebar"` |
| Disabled state feedback | `TodoModal`, `TodoCard` | `disabled` attr + `cursor-not-allowed` + `opacity-60` |
| Reduced-motion friendly | Custom CSS | Animations use CSS transitions (respect OS preference if configured) |

---

## 🐛 Error Handling

Errors are handled at four distinct levels — each layer catches what it can and propagates the rest.

```
Level 1 — Form validation (before any API call)
  • FormField shows per-field errors below inputs
  • TodoModal validates title on blur and on submit
  • Login / Register / Profile validate all fields before submit
  • Errors cleared on each fresh submission attempt

Level 2 — Service layer (catch in hooks)
  • useTaskMutations.toastForError() categorises errors:
      !navigator.onLine | ERR_NETWORK  →  "No internet connection…"
      4xx                              →  backend message forwarded
      5xx / other                      →  "Something went wrong on our end…"
  • Status toggle errors silently roll back the optimistic UI update

Level 3 — Global 401 Axios interceptor (api.js)
  • Expired / invalid token → clears localStorage → toast → redirect /login
  • Guarded by isLoggingOut flag so deliberate logout never double-redirects

Level 4 — React ErrorBoundary (render / lifecycle crashes)
  • Catches unexpected component errors that escape the above
  • Dev overlay: error message + scrollable component stack trace
  • "Go to home" → soft React Router reset via onReset prop
  • "Reload page" → hard browser reload
  • Sentry-ready: componentDidCatch receives error + componentStack
```

---

## 🔮 Future Enhancements

| # | Feature | Priority | Notes |
|---|---|---|---|
| 🔲 | **Task due dates & reminders** | 🔴 High | `dueDate` field + browser Notification API |
| 🔲 | **Drag-and-drop reorder** | 🔴 High | `@dnd-kit/core` — accessible D&D |
| 🔲 | **Task categories / tags** | 🔴 High | Multi-select tag filter in sidebar |
| 🔲 | **Sub-tasks / checklists** | 🟡 Medium | Nested task items in modal |
| 🔲 | **Priority levels** (Low/Med/High) | 🟡 Medium | Colour badge + sort by priority |
| 🔲 | **Export to CSV / PDF** | 🟡 Medium | `jsPDF` + `papaparse` |
| 🔲 | **Full test coverage** | 🟡 Medium | Unit (hooks) + integration (pages) with RTL |
| 🔲 | **Infinite scroll** | 🟡 Medium | Replace pagination with `IntersectionObserver` |
| 🔲 | **Collaborative tasks** | 🟡 Medium | Share tasks between users |
| 🔲 | **Migrate to Vite** | 🟢 Low | Drop CRA — faster HMR, lighter build |
| 🔲 | **TanStack Query** | 🟢 Low | Replace manual fetch hooks with cache/invalidation |
| 🔲 | **PWA / offline support** | 🟢 Low | Service worker + offline task queue |
| 🔲 | **Keyboard shortcuts** | 🟢 Low | `N` = new task, `/` = focus search, `Esc` = close modal |
| 🔲 | **Activity / audit log** | 🟢 Low | "You created this task 2h ago" timeline |
| 🔲 | **OAuth** (Google / GitHub) | 🟢 Low | Passport.js on backend + social login buttons |
| 🔲 | **Analytics dashboard** | 🟢 Low | `recharts` — tasks created/completed over time |

---

## 👤 Author

<div align="center">

**Aditya**
*Full Stack Developer*

[![Frontend](https://img.shields.io/badge/🌐_Frontend-Live-6366f1?style=for-the-badge)](https://todo-frontend-swart-nine.vercel.app/)
[![Backend](https://img.shields.io/badge/⚙️_Backend_API-Live-10b981?style=for-the-badge)](https://todo-backend-t5gm.onrender.com/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/aditya32193213)

</div>

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">

*Built with ❤️ by Aditya — TaskFlow v1.0 · MERN Stack*

</div>