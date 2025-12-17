"use client";

type TableToolbarProps = {
  toolbarContent?: React.ReactNode;
};

export default function TableToolbar({ toolbarContent }: TableToolbarProps) {
  if (!toolbarContent) return null;

  return (
    <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
      {toolbarContent}
    </div>
  );
}
