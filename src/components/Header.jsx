import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";

export default function Header() {
  return (
    <header className="p-4 shadow-2xs bg-white min-h-17.5">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
        <Link>
          <img src={Logo} alt="Blogify logo" />
        </Link>

        <nav className="flex gap-4 items-center font-semibold text-[#0F1729] text-[14px]">
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link
            to="/login"
            className="text-[12px] text-white bg-[#4346EF] border-2 border-black rounded-xl px-4 py-2.5"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
