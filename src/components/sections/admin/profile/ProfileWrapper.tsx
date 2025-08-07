import { memo } from "react";
import css from "@/styles/sections/admin/ProfileWrapper.module.css";
import PageHead from "@/components/layout/common/PageHead";
import { ProfileWrapperType } from "@/types/profile/profile-wrapper.d";

function ProfileWrapper({
  title,
  alignTitle,
  titleSize,
  children,
  hero,
}: ProfileWrapperType) {
  return (
    <section className={css.section}>
      {title && (
        <PageHead title={title} alignTitle={alignTitle} size={titleSize} />
      )}
      {hero ? <div className={css.hero}>{children}</div> : children}
    </section>
  );
}
export default memo(ProfileWrapper);
