import { memo } from "react";
import css from "@/styles/sections/admin/ProfileHero.module.css";
import PageHead from "@/components/layout/common/PageHead";

interface ProfileHeroWrapperProps {
  children: React.ReactNode;
  title?: string;
}

function ProfileHeroWrapper({
  title = "Profile Overview",
  children,
}: ProfileHeroWrapperProps) {
  return (
    <section className={css.section}>
      <PageHead title={title} />
      <div className={css.hero}>{children}</div>
    </section>
  );
}
export default memo(ProfileHeroWrapper);
