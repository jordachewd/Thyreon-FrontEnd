import { memo } from "react";
import css from "@/styles/sections/admin/ProfileBilling.module.css";
import PageHead from "@/components/layout/common/PageHead";

interface ProfileBillingWrapperProps {
  children: React.ReactNode;
  title?: string;
}

function ProfileBillingWrapper({
  title = "Transaction History",
  children,
}: ProfileBillingWrapperProps) {
  return (
    <section className={css.section}>
      <PageHead title={title} />
      {children}
    </section>
  );
}

export default memo(ProfileBillingWrapper);
