import { memo } from "react";

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "small" | "medium" | "large";
  children?: React.ReactNode;
  className?: string;
}

function Avatar({ src, alt, size = "medium", children, className = "" }: AvatarProps) {
  return (
    <div className={`avatar avatar-${size} ${className}`}>
      {src ? (
        <img src={src} alt={alt || "Avatar"} className="avatar-image" />
      ) : children ? (
        <span className="avatar-fallback">{children}</span>
      ) : (
        <span className="avatar-fallback">
          <i className="bi bi-person-fill"></i>
        </span>
      )}
    </div>
  );
}

export default memo(Avatar);
