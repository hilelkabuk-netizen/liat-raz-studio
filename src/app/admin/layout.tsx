import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "ממשק ניהול | סטודיו קרמיקה ליאת רז",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
    </div>
  );
}
