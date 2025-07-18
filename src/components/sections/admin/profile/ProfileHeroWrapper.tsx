import { memo } from "react";
import css from "@/styles/sections/admin/ProfileHero.module.css";
import PageHead from "@/components/layout/common/PageHead";

interface ProfileHeroWrapperProps {
  children: React.ReactNode;
  title?: string;
  alignTitle?: "left" | "center" | "right";
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function ProfileHeroWrapper({
  title = undefined,
  alignTitle = "center",
  size = "h4",
  children,
}: ProfileHeroWrapperProps) {
  return (
    <section className={css.section}>
      {title && <PageHead title={title} alignTitle={alignTitle} size={size} />}
      <div className={css.hero}>{children}</div>
    </section>
  );
}
export default memo(ProfileHeroWrapper);
