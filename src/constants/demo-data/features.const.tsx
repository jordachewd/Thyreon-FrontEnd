import AppFeatureItem from "@/types/feature-item.d";

const appFeatures: AppFeatureItem[] = [
  {
    id: 0,
    icon: "bi bi-display",
    title: "Uptime Monitoring",
    description:
      "Track your website's availability and uptime with our automated monitoring system.",
  },
  {
    id: 1,
    icon: "bi bi-cloud-arrow-up",
    title: "Automatic Backups",
    description:
      "Scheduled backups ensure your website data is safe and can be restored.",
  },
  {
    id: 2,
    icon: "bi bi-arrow-repeat",
    title: "Automatic Updates",
    description:
      "Keep your WordPress core, themes, and plugins up to date automatically to enhance security and performance.",
  },
  {
    id: 3,
    icon: "bi bi-shield-check",
    title: "Security Scanning",
    description:
      "Regular security scans to detect vulnerabilities and protect your website from threats.",
  },
];

export default appFeatures;
