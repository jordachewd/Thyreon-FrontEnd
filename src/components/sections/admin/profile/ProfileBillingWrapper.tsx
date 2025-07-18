import { memo } from "react";
import css from "@/styles/sections/admin/ProfileBilling.module.css";
import PageHead from "@/components/layout/common/PageHead";

interface ProfileBillingWrapperProps {
  children: React.ReactNode;
  title?: string;
  alignTitle?: "left" | "center" | "right";
  size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function ProfileBillingWrapper({
  title = undefined,
  alignTitle = "center",
  size = "h4",
  children,
}: ProfileBillingWrapperProps) {
  return (
    <section className={css.section}>
      {title && <PageHead title={title} alignTitle={alignTitle} size={size} />}
      {children}
    </section>
  );
}

export default memo(ProfileBillingWrapper);
