import SidebarNavItem from "@/types/layout/sidebar-nav.d";

const sidebarNavItems: SidebarNavItem[] = [
  {
    id: 0,
    href: "/dashboard",
    icon: "bi bi-grid",
    label: "Dashboard",
    isAdmin: false,
  },
  {
    id: 1,
    href: "/mysites",
    icon: "bi bi-window-stack",
    label: "My Sites",
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
    href: "/admin",
    icon: "bi bi-award",
    label: "Admin",
    isAdmin: true, // Admin only
  },
];

export default sidebarNavItems;
