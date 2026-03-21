import {
  LayoutDashboard, Clock, Loader2, CheckCircle2,
} from "lucide-react";

// ── Task status values, labels, badge classes ─────────────────────────────
export const STATUS_MAP = {
  "pending":     { label: "Pending",     cls: "badge-pending",     next: "in-progress" },
  "in-progress": { label: "In Progress", cls: "badge-in-progress", next: "completed"   },
  "completed":   { label: "Completed",   cls: "badge-completed",   next: "pending"     },
};

// Filter tab options — used by Home.jsx filter bar
export const STATUSES = [
  { value: "all",         label: "All"         },
  { value: "pending",     label: "Pending"     },
  { value: "in-progress", label: "In Progress" },
  { value: "completed",   label: "Completed"   },
];

// Human-readable labels for TodoModal status pills
export const STATUS_LABELS = {
  pending:       "Pending",
  "in-progress": "In Progress",
  completed:     "Completed",
};

// Ordered list for iterating TodoModal status pills
export const STATUS_VALUES = ["pending", "in-progress", "completed"];

// FIX 7: Sidebar previously had its own NAV_ITEMS array with hardcoded id
// values identical to STATUSES.value. Adding icon + color metadata here
// lets Sidebar import directly instead of maintaining a parallel structure.
// The label differs slightly ("All Tasks" vs "All") — kept intentional.
export const NAV_ITEMS = [
  { id: "all",         label: "All Tasks",   icon: LayoutDashboard, color: "text-violet-500" },
  { id: "pending",     label: "Pending",     icon: Clock,           color: "text-amber-500"  },
  { id: "in-progress", label: "In Progress", icon: Loader2,         color: "text-blue-500"   },
  { id: "completed",   label: "Completed",   icon: CheckCircle2,    color: "text-emerald-500"},
];