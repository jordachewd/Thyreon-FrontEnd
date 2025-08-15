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
    href: "/sites",
    icon: "bi bi-window-stack",
    label: "Websites",
    isAdmin: false,
  },

  {
    id: 999,
    href: "/admin",
    icon: "bi bi-award",
    label: "Admin",
    isAdmin: true, // Admin only
  },
];

export default sidebarNavItems;
