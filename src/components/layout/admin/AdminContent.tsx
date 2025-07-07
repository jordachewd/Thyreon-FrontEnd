import css from "@/styles/layout/admin/AdminContent.module.css";
import AdminHeader from "./AdminHeader";

export default function AdminContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main id="AdminContent" className={css.wrapper}>
      <AdminHeader />
      <section id="AdminContentSection" className={css.section}>
        {children}
      </section>
    </main>
  );
}
