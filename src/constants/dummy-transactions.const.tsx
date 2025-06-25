import { Transaction } from "@/types/transaction-data.d";

export const dummyTransactions: Transaction[] = [
  {
    id: "txn_12345678909898989898",
    plan: "Pro",
    amount: 244,
    createdAt: new Date("2024-08-01T10:00:00Z"),
    expiresOn: new Date("2025-06-01T10:00:00Z"),
    billing: "Yearly",
    stripeId: "stripe_123456789989870",
  },
  {
    id: "txn_1234567890",
    plan: "Pro",
    amount: 29,
    createdAt: new Date("2024-06-01T10:00:00Z"),
    expiresOn: new Date("2025-06-01T10:00:00Z"),
    billing: "Monthly",
    stripeId: "stripe_1234567890",
  },
];
