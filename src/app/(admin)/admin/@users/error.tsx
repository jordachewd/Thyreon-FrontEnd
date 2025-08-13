"use client";

import ErrorCard from "@/components/shared/ErrorCard";

export default function AdminError() {
  return (
    <ErrorCard
      mini
      error="An error occurred while loading the section. Please try again later."
    />
  );
}
