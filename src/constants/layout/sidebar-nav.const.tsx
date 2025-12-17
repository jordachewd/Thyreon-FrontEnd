import SidebarNavItem from "@/types/layout/sidebar-nav.d";

const sidebarNavItems: SidebarNavItem[] = [
  {
    id: 0,
    slug: "dashboard",
    href: "/dashboard",
    icon: "bi bi-grid",
    label: "Dashboard",
    isAdmin: false,
  },

  {
    id: 1,
    slug: "sites",
    href: "/sites",
    icon: "bi bi-window-stack",
    label: "Websites",
    isAdmin: false,
  },

  {
    id: 2,
    slug: "users",
    href: "/users",
    icon: "bi bi-people",
    label: "Users",
    isAdmin: true,
  },

  {
    id: 3,
    slug: "transactions",
    href: "/transactions",
    icon: "bi bi-receipt",
    label: "Transactions",
    isAdmin: true,
  },

  {
    id: 4,
    slug: "notifications",
    href: "/notifications",
    icon: "bi bi-bell",
    label: "Notifications",
    isAdmin: false,
  },

  {
    id: 5,
    slug: "account",
    href: "/faqs",
    icon: "bi bi-patch-question",
    label: "Need Help?",
    isAdmin: false,
  },

  {
    id: 6,
    slug: "settings",
    href: "/settings",
    icon: "bi bi-sliders",
    label: "Settings",
    isAdmin: false,
  },
];

export default sidebarNavItems;
