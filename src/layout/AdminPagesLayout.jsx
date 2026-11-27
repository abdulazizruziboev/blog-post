import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminPagesLayout() {
  return (
    <div className="flex min-h-screen bg-white">
      <aside className="sticky top-0 flex h-screen w-64 shrink-0 border-r border-[#E5E7EB]">
        <AdminSidebar />
      </aside>

      <main className="min-w-0 flex-1 px-12 py-10">
        <div className="mx-auto w-full max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
