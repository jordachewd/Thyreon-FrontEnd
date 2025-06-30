import SidebarNavItem from "@/types/sidebar-nav.d";

const sidebarNavItems: SidebarNavItem[] = [
  {
    id: 0,
    href: "/dashboard",
    icon: "bi bi-house",
    label: "Dashboard",
    isAdmin: false,
  },
  {
    id: 1,
    href: "/monitoring",
    icon: "bi bi-display",
    label: "Monitoring",
    isAdmin: false,
  },
  {
    id: 2,
    href: "/backups",
    icon: "bi bi-cloud-arrow-up",
    label: "Backups",
    isAdmin: false,
  },
  {
    id: 3,
    href: "/updates",
    icon: "bi bi-arrow-repeat",
    label: "Updates",
    isAdmin: false,
  },
  {
    id: 4,
    href: "/security",
    icon: "bi bi-shield-check",
    label: "Security",
    isAdmin: false,
  },
  {
    id: 5,
    href: "/users",
    icon: "bi bi-people",
    label: "Users",
    isAdmin: true, // Admin only
  },
  {
    id: 6,
    href: "/settings",
    icon: "bi bi-gear",
    label: "Settings",
    isAdmin: true, // Admin only
  },
];

export default sidebarNavItems;
