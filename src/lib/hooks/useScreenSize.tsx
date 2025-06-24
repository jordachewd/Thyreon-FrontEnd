import { useState, useEffect } from "react";

export type ScreenSize = {
  width: number;
  height: number;
  breakpoint: string | null;
};

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const getBreakpointName = (width: number): string | null => {
  if (width <= breakpoints.sm) return "sm";
  if (width <= breakpoints.md) return "md";
  if (width <= breakpoints.lg) return "lg";
  if (width <= breakpoints.xl) return "xl";
  return "xxl";
};

const useScreenSize = () => {
  const [screen, setScreen] = useState<ScreenSize>({
    width: 0,
    height: 0,
    breakpoint: null,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let frameId: number;

    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const breakpoint = getBreakpointName(width);

      // Prevent unnecessary re-renders
      setScreen((prev) => {
        if (
          prev.width === width &&
          prev.height === height &&
          prev.breakpoint === breakpoint
        ) {
          return prev;
        }
        return { width, height, breakpoint };
      });
    };

    const onResize = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateSize);
    };

    updateSize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return screen;
};

export default useScreenSize;

/** USAGE **
 *
 * const { width, height, breakpoint } = useScreenSize();
 *  if (breakpoint === 'md') {
 *    // Do something
 * }
 *
 */
