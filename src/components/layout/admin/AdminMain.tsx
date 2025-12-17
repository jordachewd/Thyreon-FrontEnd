import AdminHeader from "./AdminHeader";

type AdminMainProps = {
  children: React.ReactNode;
};

export default function AdminMain({ children }: AdminMainProps) {
  return (
    <main id="AdminMain" className="admin-main-wrapper">
      <AdminHeader />
      <section id="AdminMainSection" className="admin-main-section">
        {children}
      </section>
    </main>
  );
}
