import { Link, NavLink, useNavigate } from "react-router-dom";
import { FileText, LayoutGrid, LogOut, Plus } from "lucide-react";
import Logo from "../../assets/images/logo.svg";
import { clearAuth } from "../../utils/auth";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/dashboard/posts", label: "Posts", icon: FileText },
  { to: "/dashboard/create-post", label: "Create Post", icon: Plus },
];

export default function AdminSidebar({ onNavigate }) {
  const navigate = useNavigate();

  function handleLogout() {
    clearAuth();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="border-b border-[#E5E7EB] px-6 py-5">
        <Link to="/dashboard" onClick={onNavigate} className="inline-flex rounded-md">
          <img src={Logo} alt="Blogify logo" className="h-6 w-auto" />
        </Link>
        <p className="mt-1 text-xs text-[#6B7280]">Admin Panel</p>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                isActive
                  ? "bg-[#EEF0FF] text-[#4346EF]"
                  : "text-[#0F1729] hover:bg-[#F3F4F6]"
              }`
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-[#E5E7EB] p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#0F1729] hover:bg-[#FEF2F2] hover:text-red-600 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
