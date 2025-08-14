import css from "@/styles/layout/admin/AdminMain.module.css";
import AdminHeader from "./AdminHeader";

type AdminContentProps = {
  children: React.ReactNode;
};

export default function AdminMain({ children }: AdminContentProps) {
  return (
    <main id="AdminMain" className={css.wrapper}>
      <AdminHeader />
      <section id="AdminMainSection" className={css.section}>
        {children}
      </section>
    </main>
  );
}
