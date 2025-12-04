import css from "@/styles/sections/admin/AccountWrapper.module.css";
import PageHead from "@/components/layout/common/PageHead";
import { AccountWrapperType } from "@/types/account/account-wrapper.d";

export default function AccountWrapper({
  title,
  alignTitle,
  titleSize,
  children,
  hero,
}: AccountWrapperType) {
  return (
    <section className={css.section}>
      {title && (
        <PageHead
          title={title}
          alignTitle={alignTitle}
          size={titleSize}
          className="mb-4"
        />
      )}
      {hero ? <div className={css.hero}>{children}</div> : children}
    </section>
  );
}
