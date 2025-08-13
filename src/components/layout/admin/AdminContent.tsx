import css from "@/styles/layout/admin/AdminContent.module.css";
import AdminHeader from "./AdminHeader";

type AdminContentProps = {
  children: React.ReactNode;
};

export default function AdminContent({ children }: AdminContentProps) {
  return (
    <main id="AdminContent" className={css.wrapper}>
      <AdminHeader />
      <section id="AdminContentSection" className={css.section}>
        {children}
      </section>
    </main>
  );
}
