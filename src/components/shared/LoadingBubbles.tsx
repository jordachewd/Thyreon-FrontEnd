import classNames from "classnames";
import { memo } from "react";
import css from "@/styles/shared/LoadingBubbles.module.css";

type BubbleSizes = "small" | "medium" | "large";
type wrappedAlign = "left" | "center" | "right";

type LoadingProps = {
  size?: BubbleSizes;
  wrapped?: boolean;
  fullHeight?: boolean;
  align?: wrappedAlign;
};

const sizeMappings = {
  small: ["w-1 h-1", "w-1.5 h-1.5", "w-2 h-2"],
  medium: ["w-1.5 h-1.5", "w-2 h-2", "w-2.5 h-2.5"],
  large: ["w-2 h-2", "w-2.5 h-2.5", "w-3 h-3"],
};

function LoadingBubbles(props: LoadingProps) {
  const {
    size = "medium",
    wrapped = false,
    fullHeight = false,
    align = "left",
  } = props;

  const bubbles = sizeMappings[size] || sizeMappings.medium;

  const alignClass =
    align === "center"
      ? "justify-center"
      : align === "right"
      ? "justify-end"
      : "";

  const wrpHeight = fullHeight ? "h-full" : "h-20";

  const loaderCss = classNames(css.wrapper, alignClass, wrpHeight);
  const wrpLoaderCss = classNames(css.isWrapped, alignClass, wrpHeight);

  const bubbleLoader = (
    <div className={loaderCss}>
      {bubbles.map((bubbleSize, index) => {
        const bubbleClass = classNames(
          css.bubble,
          css[`bubble${index + 1}`],
          bubbleSize
        );
        return <div key={index} className={bubbleClass} />;
      })}
    </div>
  );

  const wrappedLoader = <div className={wrpLoaderCss}>{bubbleLoader}</div>;

  if (wrapped) {
    return wrappedLoader;
  }

  return bubbleLoader;
}

export default memo(LoadingBubbles);
