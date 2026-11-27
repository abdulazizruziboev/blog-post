import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import Twitter from "../assets/images/twitter.svg";
import GitHub from "../assets/images/github.svg";
import Linkedin from "../assets/images/linkedin.svg";

export default function Footer() {
  return (
    <footer className="p-4 bg-white border-t border-t-black/5">
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-4">
            <Link to="/" className="inline-flex w-fit rounded-md">
              <img src={Logo} alt="Blogify logo" />
            </Link>
            <p className="max-w-96 text-[#6B7280] text-[14px] leading-5">
              Create, read, and inspire. Discover amazing stories written by
              talented creators from around the world.
            </p>
          </div>
          <div>
            <h2 className="text-[#0F1729] text-[24px] leading-8 font-semibold">
              Quick links
            </h2>
            <nav className="flex flex-col gap-2 text-[#6B7280] text-[14px] leading-5 mt-3.5">
              <Link to="/" className="w-fit rounded-md hover:text-[#4346EF]">Home</Link>
              <Link to="/posts" className="w-fit rounded-md hover:text-[#4346EF]">Posts</Link>
              <Link to="/login" className="w-fit rounded-md hover:text-[#4346EF]">Login</Link>
            </nav>
          </div>
          <div>
            <h2 className="text-[#0F1729] text-[24px] leading-8 font-semibold">
              Connect
            </h2>
            <div className="flex gap-2 mt-4">
              <Link
                to="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-1 hover:bg-[#F3F4F6]"
                aria-label="Twitter"
              >
                <img src={Twitter} alt="" />
              </Link>

              <Link
                to="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-1 hover:bg-[#F3F4F6]"
                aria-label="GitHub"
              >
                <img src={GitHub} alt="" />
              </Link>

              <Link
                to="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-1 hover:bg-[#F3F4F6]"
                aria-label="LinkedIn"
              >
                <img src={Linkedin} alt="" />
              </Link>
            </div>
          </div>
        </div>
        <hr className="w-full my-8 opacity-25" />
        <div className="text-center">
          <p className="text-[#6B7280] text-[14px] leading-5 ">
            © 2025 Blogify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
