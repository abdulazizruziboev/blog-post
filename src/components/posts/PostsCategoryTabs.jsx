export default function CategoryTabs({ category, setCategory, categories }) {
  return (
    <div className="flex justify-center p-4">
      <div
        role="tablist"
        className="inline-flex h-12 w-full max-w-[448px] items-center justify-between rounded-[10px] bg-[#F3F4F6] p-1"
      >
        {categories.map((tab) => {
          const isActive = category === tab;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              onClick={() => setCategory(tab)}
              className={`h-full flex-1 rounded-[8px] px-3 text-sm font-medium cursor-pointer transition-all ${
                isActive
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}
