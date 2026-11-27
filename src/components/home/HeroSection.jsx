import { Link } from "react-router-dom";
import HeroImage from "../../assets/images/landing-hero.jpg";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-linear-to-r from-[#F7F1FD] to-[#F1F1FE] px-4 py-20 lg:py-32">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold leading-tight text-[#0F1729] sm:text-6xl">
            Create, Read, <br />
            <span className="text-[#8524E5]">Inspire.</span>
          </h1>
          <p className="my-6 max-w-md text-lg leading-7 text-[#6B7280] sm:text-xl">
            Discover stories written by amazing people. Share your knowledge and
            inspire others with your unique perspective.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/posts"
              className="flex items-center gap-2 rounded-xl bg-linear-to-r from-[#8524E5] to-[#4346EF] px-8 py-3 font-medium text-white hover:brightness-110"
            >
              Explore Posts <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-black/10 bg-white px-8 py-3 font-medium text-[#0F1729] hover:bg-[#F9FAFB] hover:border-[#4346EF]/30"
            >
              Get Started
            </Link>
          </div>
        </div>
        <img
          src={HeroImage}
          alt="Creative workspace"
          className="w-full max-w-xl rounded-2xl object-cover shadow-2xl"
        />
      </div>
    </section>
  );
}
