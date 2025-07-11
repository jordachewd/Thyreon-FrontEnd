import { PlanName } from "@/types/plan/plan-name.d";

export const plans = [
  {
    id: 0,
    price: 0,
    name: "lite" as PlanName,
    desc: "Perfect for trying WP Care on one site. Includes basic automation to keep your site online and updated.",
    features: [
      {
        label: "1 website",
        isIncluded: true,
      },
      {
        label: "Uptime Monitoring",
        isIncluded: true,
      },
      {
        label: "Automatic Updates",
        isIncluded: true,
      },
      {
        label: "Automatic Backups",
        isIncluded: false,
      },
      {
        label: "Security Scanning",
        isIncluded: false,
      },
      {
        label: "Standard Email support",
        isIncluded: false,
      },
      {
        label: "Custom Maintenance Rules",
        isIncluded: false,
      },
      {
        label: "AI Agent: Site Health Analysis",
        isIncluded: false,
      },
      {
        label: "Pagespeed Optimization",
        isIncluded: false,
      },
      {
        label: "Smart Fix Suggestions",
        isIncluded: false,
      },
    ],
  },
  {
    id: 1,
    price: 29,
    name: "pro" as PlanName,
    desc: "A complete maintenance suite for small teams or freelancers. Includes backups, scans, and standard support.",
    features: [
      {
        label: "Up to 5 websites",
        isIncluded: true,
      },
      {
        label: "Uptime Monitoring",
        isIncluded: true,
      },
      {
        label: "Automatic Updates",
        isIncluded: true,
      },
      {
        label: "Automatic Backups",
        isIncluded: true,
      },
      {
        label: "Security Scanning",
        isIncluded: true,
      },
      {
        label: "Standard Email support",
        isIncluded: true,
      },
      {
        label: "Custom Maintenance Rules",
        isIncluded: true,
      },
      {
        label: "AI Agent: Site Health Analysis",
        isIncluded: false,
      },
      {
        label: "Pagespeed Optimization",
        isIncluded: false,
      },
      {
        label: "Smart Fix Suggestions",
        isIncluded: false,
      },
    ],
  },
  {
    id: 2,
    price: 69,
    name: "premium" as PlanName,
    desc: "For serious site owners and agencies. Includes everything in Pro plus performance tuning, AI monitoring, and premium support.",
    features: [
      {
        label: "Unlimited websites",
        isIncluded: true,
      },
      {
        label: "Uptime Monitoring",
        isIncluded: true,
      },
      {
        label: "Automatic Updates",
        isIncluded: true,
      },
      {
        label: "Automatic Backups",
        isIncluded: true,
      },
      {
        label: "Security Scanning",
        isIncluded: true,
      },
      {
        label: "Priority Email support",
        isIncluded: true,
      },
      {
        label: "Custom Maintenance Rules",
        isIncluded: true,
      },

      {
        label: "AI Agent: Site Health Analysis",
        isIncluded: true,
      },
      {
        label: "Pagespeed Optimization",
        isIncluded: true,
      },
      {
        label: "Smart Fix Suggestions",
        isIncluded: true,
      },
    ],
  },
];
