import classNames from "classnames";
import css from "@/styles/shared/LoadingBubbles.module.css";

type BubbleSizes = "small" | "medium" | "large";
type wrappedAlign = "left" | "center" | "right";

interface LoadingBubblesProps {
  size?: BubbleSizes;
  wrapped?: boolean;
  fullHeight?: boolean;
  align?: wrappedAlign;
}

const sizeMappings = {
  small: ["w-1 h-1", "w-1.5 h-1.5", "w-2 h-2"],
  medium: ["w-1.5 h-1.5", "w-2 h-2", "w-2.5 h-2.5"],
  large: ["w-2 h-2", "w-2.5 h-2.5", "w-3 h-3"],
};

export default function LoadingBubbles({
  size = "medium",
  wrapped = false,
  fullHeight = false,
  align = "center",
}: LoadingBubblesProps) {
  const bubbles = sizeMappings[size] || sizeMappings.medium;
  const wrpHeight = fullHeight ? "h-dvh" : "h-20";
  const alignClass =
    align === "center"
      ? "justify-center"
      : align === "right"
      ? "justify-end"
      : "";

  const bubbleLoader = (
    <div className={classNames(css.wrapper, alignClass)}>
      {bubbles.map((bubbleSize, index) => (
        <div
          key={index}
          className={classNames(
            css.bubble,
            css[`bubble${index + 1}`],
            bubbleSize
          )}
        />
      ))}
    </div>
  );

  if (wrapped) {
    return (
      <div className={classNames(css.isWrapped, alignClass, wrpHeight)}>
        {bubbleLoader}
      </div>
    );
  }

  return bubbleLoader;
}
