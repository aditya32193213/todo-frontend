<div align="center">

# ✅ TaskFlow — Frontend

### *A sleek, modern task management app built with React 19 & Tailwind CSS*

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.19-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![React Router](https://img.shields.io/badge/React_Router-7.13.1-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Axios](https://img.shields.io/badge/Axios-1.13.6-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com)

</div>

---

## 🌟 Overview

**TaskFlow** is a full-featured task management application frontend that connects to a secure Node.js / Express / MongoDB backend. It features a stunning glassmorphism UI, animated backgrounds, dark mode, real-time task metrics, and a fully responsive layout — all built with modern React 19 patterns.

---

## ✨ Features

### 🗂️ Task Management
- ➕ **Create** tasks with title, description, and status
- ✏️ **Edit** tasks via a polished modal with inline validation
- 🗑️ **Delete** tasks with a smooth 220ms slide-out exit animation
- 🔄 **Toggle status** directly from the task card — Pending → In Progress → Completed → Pending
- 🌱 **Seed sample tasks** instantly to populate a fresh account

### 🔍 Search, Filter & Sort
- 🔎 **Debounced search** — waits 400ms after the last keystroke before hitting the API
- 🏷️ **Status filter tabs** — All / Pending / In Progress / Completed
- 📅 **Sort order** — Newest First / Oldest First
- 🔁 **Page resets** automatically whenever search, filter, or sort changes

### 📊 Dashboard & Metrics
- 📈 **Live metric cards** — Total, Completed, In Progress, Pending — updated after every mutation
- 📉 **Completion progress bar** with a smooth 0.9s animated CSS fill
- ⚡ **Single aggregation query** — all metric counts fetched in one backend round-trip via `$facet`

### 📄 Pagination
- 🔢 Page-based navigation with Previous / Next buttons and numbered page pills
- 🎯 Accurate `total` and `pages` counts — always in sync with the real backend list

### 🔐 Authentication
- 📝 **Register** — name, email, password with full client-side validation
- 🔑 **Login / Logout** — JWT sessions with token blacklisting on logout
- 🛡️ **Protected routes** — client-side JWT `exp` check via `atob` prevents authenticated-looking flash on hard reload
- 🔒 **Change password** from the Profile page
- 🚨 **Auto-logout** on session expiry with a toast notification and 1.5s delay before redirect
- 🚩 **No double-redirect** — deliberate logout and interceptor-triggered logout are coordinated via a shared flag

### 🌙 Theme & UX
- 🌗 **Dark / Light mode** with OS preference detection via `matchMedia` and a real-time `change` listener
- 💎 **Glassmorphism** cards, forms, sidebar, and navbar
- 🎭 **3D tilt effect** on auth forms using CSS perspective + `rotateX/Y`
- ✨ **Animated floating orbs** and a grid texture overlay on every page background
- 📱 **Fully responsive** — mobile drawer sidebar with backdrop overlay, persistent desktop sidebar
- 🔔 **Toast notifications** for every user action (success, error, network failure)
- ⚠️ **Error boundary** with dev-only stack trace overlay and soft React Router navigation on recovery
- ♿ **Accessible** — `aria-labelledby` on modals, `role="alert"` on errors, `htmlFor` on all labels, `aria-label` on all icon buttons

---

## 🛠️ Tech Stack

| Category | Package | Version |
|---|---|---|
| ⚛️ UI Framework | `react` + `react-dom` | `19.2.4` |
| 🧭 Routing | `react-router-dom` | `7.13.1` |
| 💅 Styling | `tailwindcss` | `3.4.19` |
| 🌐 HTTP Client | `axios` | `1.13.6` |
| 🍞 Notifications | `react-hot-toast` | `2.6.0` |
| 🎨 Icons | `lucide-react` | `0.577.0` |
| 🎨 Extra Icons | `react-icons` | `5.6.0` |
| 🏗️ Build Tool | `react-scripts` (CRA) | `5.0.1` |
| 🔬 Testing | `@testing-library/react` | `16.3.2` |
| 🔧 PostCSS | `autoprefixer` + `postcss` | `10.4.27` / `8.5.8` |
| 🔤 Fonts | Syne (display) · DM Sans (body) | Google Fonts |

---

## 📁 Project Structure

```
src/
├── 📂 components/
│   ├── ErrorBoundary.jsx     # Class component — dev overlay, soft Router reset via onReset prop
│   ├── FormField.jsx         # Accessible label + input wrapper (useId + cloneElement for htmlFor)
│   ├── Logo.jsx              # SVG logo with per-instance gradient IDs (useId — no id collision)
│   ├── Navbar.jsx            # Sticky nav — user dropdown, theme toggle, seed button (memo)
│   ├── PageBackground.jsx    # Memoized animated orbs + grid texture overlay
│   ├── PasswordInput.jsx     # Reusable show/hide password toggle (used on 3 pages)
│   ├── PrivateRoute.jsx      # JWT client-side expiry guard (atob decode — no API call needed)
│   ├── Sidebar.jsx           # Responsive nav sidebar with live metric counts (memo + useCallback)
│   ├── TodoCard.jsx          # Task card — status toggle, edit/delete actions (memo + try/finally)
│   └── TodoModal.jsx         # Create / Edit / Delete modal — spinner, aria-labelledby, Escape key
│
├── 📂 context/
│   ├── AuthContext.jsx       # Auth state — login / register / logout / updatePassword
│   │                         # Split loading flags: authLoading (login/register) + profileLoading
│   └── ThemeContext.jsx      # Dark mode — OS listener, manual override, memoized context value
│
├── 📂 features/tasks/
│   ├── seedTasks.js          # 8 sample tasks for instant demo seeding
│   └── taskConstants.js      # STATUS_MAP, STATUSES, NAV_ITEMS, STATUS_VALUES, STATUS_LABELS
│
├── 📂 hooks/
│   ├── useAuth.js            # Re-export of useAuth from AuthContext (backward-compat shim)
│   ├── useDebounce.js        # Generic debounce hook — 400ms default
│   ├── useTaskList.js        # Fetch + paginate + debounced search + filter + sort
│   ├── useTaskMetrics.js     # Fetch aggregated metric counts (non-critical — silent fail)
│   ├── useTaskModal.js       # Modal open/close state + form data — pure ephemeral UI state
│   ├── useTaskMutations.js   # Create / Edit / Delete / Seed + isSaving ref guard
│   └── useTasks.js           # Composes all four task hooks into one interface for Home.jsx
│
├── 📂 pages/
│   ├── Home.jsx              # Main dashboard — metrics, search, filter, sort, task list, pagination
│   ├── Login.jsx             # Sign in page with 3D tilt form
│   ├── Register.jsx          # Sign up page with client-side validation
│   └── Profile.jsx           # Account info + change password form
│
├── 📂 services/
│   ├── api.js                # Axios instance — JWT request interceptor + global 401 handler
│   ├── authService.js        # register / login / logout / updatePassword
│   └── todoService.js        # getTodos / getTaskMetrics / createTodo / updateTodo / deleteTodo
│
├── App.jsx                   # Route tree + providers (ThemeProvider > AuthProvider) + ErrorBoundary
└── index.css                 # Tailwind + glassmorphism, buttons, badges, spinner, animations
```

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A running instance of the **TaskFlow Backend**

### 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/taskflow.git

# 2. Navigate to the frontend directory
cd taskflow/frontend

# 3. Install all dependencies
npm install
```

### ⚙️ Environment Variables

Create a `.env` file in the **frontend root**:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

| Variable | Description | Required |
|---|---|---|
| `REACT_APP_API_URL` | Backend API base URL | ⚠️ Recommended |

> 💡 If `REACT_APP_API_URL` is not set, the app falls back to the deployed production API — always set this locally to target your own backend.

> ⚠️ CRA requires the `REACT_APP_` prefix — any variable without it is silently ignored at build time.

### ▶️ Running the App

```bash
# Start development server (http://localhost:3000)
npm start

# Create an optimised production build
npm run build

# Run the test suite
npm test
```

---

## 🔌 API Integration

All HTTP calls go through the centralised Axios instance in `services/api.js`. The JWT token is attached to every request automatically via an interceptor — no manual `Authorization` header needed in any service file.

### 🔑 Authentication Endpoints

| Method | Endpoint | Response |
|---|---|---|
| `POST` | `/api/auth/register` | `201` `{ success, message, data: { id, name, email, token } }` |
| `POST` | `/api/auth/login` | `200` `{ success, message, data: { id, name, email, token } }` |
| `POST` | `/api/auth/logout` | `200` `{ success, message }` |
| `PATCH` | `/api/auth/password` | `200` `{ success, message }` |

### 📝 Task Endpoints

| Method | Endpoint | Response |
|---|---|---|
| `GET` | `/api/tasks` | `200` `{ success, message, data: { tasks, total, pages, page, count } }` |
| `GET` | `/api/tasks/metrics` | `200` `{ success, message, data: { total, completed, inProgress, pending, pct } }` |
| `POST` | `/api/tasks` | `201` `{ success, message, data: task }` |
| `PUT` | `/api/tasks/:id` | `200` `{ success, message, data: updatedTask }` |
| `DELETE` | `/api/tasks/:id` | `204` No Content |

### 🔍 Query Parameters — `GET /api/tasks`

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | `number` | `1` | Current page |
| `limit` | `number` | `5` | Tasks per page (max 50) |
| `status` | `string` | — | `pending` / `in-progress` / `completed` |
| `sort` | `string` | `latest` | `latest` / `oldest` / `a-z` / `z-a` |
| `search` | `string` | — | Title search (debounced, regex-escaped) |

### 🔒 JWT Token Lifecycle

```
Login / Register
      ↓
token  → localStorage["token"]
user   → localStorage["tf-user"]
      ↓
Every API request  →  Authorization: Bearer <token>   (request interceptor)
      ↓
401 response  →  clear storage  →  redirect /login    (response interceptor)
      ↓
PrivateRoute  →  atob(token.split(".")[1])  →  check exp   (no network call)
```

---

## 🎯 Key Design Decisions

### 🧩 Composed Hook Architecture

`useTasks.js` assembles four focused, single-responsibility hooks:

| Hook | Responsibility |
|---|---|
| `useTaskList` | Fetch, paginate, debounce, filter, sort tasks |
| `useTaskMetrics` | Fetch aggregated metric counts |
| `useTaskModal` | Modal open/close state + form data |
| `useTaskMutations` | Create / Edit / Delete / Seed + all side effects |

Each hook is independently readable, testable, and replaceable. `Home.jsx` only ever calls `useTasks()`.

### ⚡ Performance Patterns

| Pattern | Applied In | Effect |
|---|---|---|
| `React.memo` | Navbar, Sidebar, PageBackground, TodoCard | Skips re-renders caused by unrelated state changes |
| `useCallback` | All stable function props | Maintains referential stability to work with memo |
| `useMemo` | Metric cards, pagination numbers, countMap, ThemeContext value | Avoids reallocating on every render |
| `useDebounce` | Search input (400ms) | Reduces API calls to one per typing pause |
| `React.lazy + Suspense` | All page components | Code-splits by route for faster initial load |

### 🛡️ Error Resilience

| Scenario | Solution |
|---|---|
| 💥 Render crash | `ErrorBoundary` — recovery UI with dev stack trace |
| 🔄 Error recovery | `RouteErrorBoundary` passes `navigate` as `onReset` — soft redirect, no full reload |
| 🔴 Status toggle fails | `try/finally` in `handleToggle` — `toggling` always resets, button never stuck |
| 🔴 Logout fails | `try/finally` in `onLogout` — `isLoggingOut` always resets |
| 🔴 Save fails | `isSaving` ref guard + `try/finally` — prevents double-submit and stuck spinner |
| 💾 Corrupt localStorage | `readUser` try/catch — auto-clears broken entry, returns null |
| 📊 Metrics fetch fails | Silent catch — previous counts stay visible, dev `console.warn` logged |
| 📵 Network offline | `toastForError` checks `navigator.onLine` — distinct offline toast message |

---

## 📸 Pages

| 🖥️ Page | 🔗 Route | 🔒 Access | 📝 Description |
|---|---|---|---|
| 🏠 Dashboard | `/` | Protected | Metrics, task list, search, filter, sort, pagination |
| 👤 Profile | `/profile` | Protected | User info card + change password form |
| 🔑 Login | `/login` | Public | Sign in with 3D tilt form |
| 📝 Register | `/register` | Public | Create account with validation |
| ❌ Not Found | `*` | Public | 404 page with home link |

---

## 🌐 Deployment

### ▲ Vercel

```bash
# Build command
npm run build

# Output directory
build
```

Add `vercel.json` for SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### 🟦 Netlify

```bash
# Build command:   npm run build
# Publish directory: build
```

Add `public/_redirects`:

```
/*  /index.html  200
```

Set environment variables in your hosting dashboard:

```
REACT_APP_API_URL = https://your-backend.onrender.com/api
```

> ⚠️ Without the SPA redirect rule, refreshing any non-root route (e.g. `/profile`) returns a **404** from the hosting provider.

---

## 🧪 Testing

```bash
# Run all tests in watch mode
npm test

# Run with coverage report
npm test -- --coverage
```

| Package | Version |
|---|---|
| `@testing-library/react` | `^16.3.2` |
| `@testing-library/dom` | `^10.4.1` |
| `@testing-library/jest-dom` | `^6.9.1` |
| `@testing-library/user-event` | `^13.5.0` |

---

## 🤝 Backend

This frontend is designed to work exclusively with the **TaskFlow Backend**.

> 🔗 See the [Backend README](../backend/README.md) for setup, environment variables, and full API docs.

**Backend stack:** Node.js · Express · MongoDB · Mongoose · JWT · bcryptjs

---

## 📄 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

<div align="center">

Made with ❤️ using **React 19** · **Tailwind CSS 3** · **React Router 7**

⭐ **Star this repo** if TaskFlow helped you!

</div>
