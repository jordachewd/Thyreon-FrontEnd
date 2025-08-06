import { memo } from "react";
import css from "@/styles/sections/admin/ProfileHero.module.css";
import PageHead from "@/components/layout/common/PageHead";
import { ProfileWrapperType } from "@/types/profile/profile-wrapper.d";

function ProfileHeroWrapper({
  title = undefined,
  alignTitle = "center",
  size = "h4",
  children,
}: ProfileWrapperType) {
  return (
    <section className={css.section}>
      {title && <PageHead title={title} alignTitle={alignTitle} size={size} />}
      <div className={css.hero}>{children}</div>
    </section>
  );
}
export default memo(ProfileHeroWrapper);
