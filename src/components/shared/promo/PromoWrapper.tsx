import { ReactNode } from "react";

export default function PromoWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 w-full rounded-lg p-4 shadow-md overflow-hidden relative items-center bg-midnight-800 text-vanilla-100 dark:bg-vanilla-100 dark:text-midnight-400">
      <div className="w-full flex flex-col gap-2 z-10 text-center">{children}</div>
      <div className="flex items-center justify-center absolute z-0 opacity-50 rounded-lg w-full h-[150%] -top-1/2 right-1/3 -rotate-45 bg-midnight-400 dark:bg-vanilla-400"></div>
    </div>
  );
}
