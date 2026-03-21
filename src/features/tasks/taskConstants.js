import {
  LayoutDashboard, Clock, Loader2, CheckCircle2,
} from "lucide-react";

export const STATUS_MAP = {
  "pending":     { label: "Pending",     cls: "badge-pending",     next: "in-progress" },
  "in-progress": { label: "In Progress", cls: "badge-in-progress", next: "completed"   },
  "completed":   { label: "Completed",   cls: "badge-completed",   next: "pending"     },
};


export const STATUSES = [
  { value: "all",         label: "All"         },
  { value: "pending",     label: "Pending"     },
  { value: "in-progress", label: "In Progress" },
  { value: "completed",   label: "Completed"   },
];


export const STATUS_LABELS = {
  pending:       "Pending",
  "in-progress": "In Progress",
  completed:     "Completed",
};


export const STATUS_VALUES = ["pending", "in-progress", "completed"];

export const NAV_ITEMS = [
  { id: "all",         label: "All Tasks",   icon: LayoutDashboard, color: "text-violet-500" },
  { id: "pending",     label: "Pending",     icon: Clock,           color: "text-amber-500"  },
  { id: "in-progress", label: "In Progress", icon: Loader2,         color: "text-blue-500"   },
  { id: "completed",   label: "Completed",   icon: CheckCircle2,    color: "text-emerald-500"},
];