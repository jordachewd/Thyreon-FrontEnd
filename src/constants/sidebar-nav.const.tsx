import SidebarNavItem from "@/types/sidebar-nav.d";

const sidebarNavItems: SidebarNavItem[] = [
  {
    id: 0,
    href: "/dashboard",
    icon: "bi bi-house",
    label: "Dashboard",
  },
  {
    id: 1,
    href: "/monitoring",
    icon: "bi bi-display",
    label: "Monitoring",
  },
  {
    id: 2,
    href: "/backups",
    icon: "bi bi-cloud-arrow-up",
    label: "Backups",
  },
  {
    id: 3,
    href: "/updates",
    icon: "bi bi-arrow-repeat",
    label: "Updates",
  },
  {
    id: 4,
    href: "/security",
    icon: "bi bi-shield-check",
    label: "Security",
  },
  {
    id: 5,
    href: "/settings",
    icon: "bi bi-gear",
    label: "Settings",
  },
];

export default sidebarNavItems;
