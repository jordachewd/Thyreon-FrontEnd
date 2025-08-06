import { memo } from "react";
import css from "@/styles/sections/admin/ProfileBilling.module.css";
import PageHead from "@/components/layout/common/PageHead";
import { ProfileWrapperType } from "@/types/profile/profile-wrapper.d";

function ProfileBillingWrapper({
  title = undefined,
  alignTitle = "center",
  size = "h4",
  children,
}: ProfileWrapperType) {
  return (
    <section className={css.section}>
      {title && <PageHead title={title} alignTitle={alignTitle} size={size} />}
      {children}
    </section>
  );
}

export default memo(ProfileBillingWrapper);
