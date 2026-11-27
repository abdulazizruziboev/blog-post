import { Link, NavLink, useNavigate } from "react-router-dom";
import { FileText, LayoutGrid, LogOut, Plus } from "lucide-react";
import Logo from "../../assets/images/logo.svg";
import { clearAuth } from "../../utils/auth";

export default function AdminSidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    clearAuth();
    navigate("/login");
  }

  function linkClass({ isActive }) {
    if (isActive) {
      return "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium bg-[#EEF0FF] text-[#4346EF]";
    }
    return "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#0F1729] hover:bg-[#F3F4F6]";
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="px-6 py-5 border-b border-[#E5E7EB]">
        <Link to="/dashboard" className="inline-flex rounded-md">
          <img src={Logo} alt="Blogify logo" className="h-6" />
        </Link>
        <p className="mt-1 text-xs text-[#6B7280]">Admin Panel</p>
      </div>

      <nav className="flex flex-col gap-1 flex-1 p-3">
        <NavLink to="/dashboard" end className={linkClass}>
          <LayoutGrid className="size-4" />
          Dashboard
        </NavLink>
        <NavLink to="/dashboard/posts" className={linkClass}>
          <FileText className="size-4" />
          Posts
        </NavLink>
        <NavLink to="/dashboard/create-post" className={linkClass}>
          <Plus className="size-4" />
          Create Post
        </NavLink>
      </nav>

      <div className="p-3 border-t border-[#E5E7EB]">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-sm font-medium text-[#0F1729] hover:bg-[#FEF2F2] hover:text-red-600 cursor-pointer"
        >
          <LogOut className="size-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
