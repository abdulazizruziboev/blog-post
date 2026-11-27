import { Search } from "lucide-react";

export default function PostsSearch({ searchValue, setSearchValue }) {
  return (
    <section className="bg-linear-to-r from-[#F7F1FD] to-[#F1F1FE] px-4 py-16 lg:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <div className="w-full max-w-xl">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[42px]">
            Explore Our Posts
          </h1>
          <p className="mt-3 text-sm text-slate-500 sm:text-base">
            Discover amazing content from talented writers across various topics
          </p>

          <div className="relative mx-auto mt-8 max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search posts..."
              className="w-full rounded-xl border border-slate-200/80 bg-white py-3 pr-4 pl-11 text-sm text-slate-800 shadow-xs outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
