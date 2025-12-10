import css from "@/styles/layout/admin/AdminMain.module.css";
import AdminHeader from "./AdminHeader";

type AdminMainProps = {
  children: React.ReactNode;
};

export default function AdminMain({ children }: AdminMainProps) {
  return (
    <main id="AdminMain" className={css.wrapper}>
      <AdminHeader />
      <section id="AdminMainSection" className={css.section}>
        {children}
      </section>
    </main>
  );
}
