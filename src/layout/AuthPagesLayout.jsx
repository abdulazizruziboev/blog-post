import { Outlet } from "react-router-dom";

export default function AuthPagesLayout() {
  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      <Outlet />
    </main>
  );
}
