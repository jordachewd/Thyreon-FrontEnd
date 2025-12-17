import classNames from "classnames";

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

export default function LoadingBubbles({
  size = "medium",
  wrapped = false,
  fullHeight = false,
  align = "center",
}: LoadingProps) {
  const bubbles = sizeMappings[size] || sizeMappings.medium;

  const alignClass =
    align === "center"
      ? "justify-center"
      : align === "right"
      ? "justify-end"
      : "justify-start";

  const wrpHeight = fullHeight ? "h-dvh" : "h-20";
  const loaderCss = classNames("flex items-center gap-1 w-full", alignClass, wrpHeight);
  const wrpLoaderCss = classNames("flex items-center w-full", alignClass, wrpHeight);

  const bubbleLoader = (
    <div className={loaderCss}>
      {bubbles.map((bubbleSize, index) => {
        const animationClass = 
          index === 0 ? "animate-bounce-slow" :
          index === 1 ? "animate-bounce" : 
          "animate-bounce-fast";
        const bubbleClass = classNames(
          "flex rounded-full -mb-0.5 bg-leaf-green-400",
          animationClass,
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
