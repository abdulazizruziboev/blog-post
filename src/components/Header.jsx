import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";

export default function Header() {
  return (
    <header className="p-4 shadow-2xs bg-white min-h-17.5">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
        <Link to="/" className="rounded-md">
          <img src={Logo} alt="Blogify logo" />
        </Link>

        <nav className="flex gap-4 items-center font-semibold text-[#0F1729] text-[14px]">
          <Link to="/" className="rounded-md px-2 py-1 hover:text-[#4346EF]">
            Home
          </Link>
          <Link to="/posts" className="rounded-md px-2 py-1 hover:text-[#4346EF]">
            Posts
          </Link>
          <Link
            to="/login"
            className="text-[12px] text-white bg-[#4346EF] border-2 border-black rounded-xl px-4 py-2.5 hover:bg-[#3538d4] hover:border-[#4346EF]"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
