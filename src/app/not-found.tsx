import ErrorCard from "@/components/shared/ErrorCard";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <ErrorCard
        title="Page Not Found!"
        error="The page you are looking for does not exist."
      />
    </div>
  );
}
