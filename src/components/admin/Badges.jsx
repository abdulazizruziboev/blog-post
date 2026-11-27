export function CategoryBadge({ category }) {
  return (
    <span className="inline-flex rounded-full bg-[#EEF0FF] px-2.5 py-0.5 text-xs font-medium text-[#4346EF]">
      {category}
    </span>
  );
}

export function StatusBadge({ status }) {
  const published = status === "Published";
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
        published ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#F3F4F6] text-[#6B7280]"
      }`}
    >
      {status || "Draft"}
    </span>
  );
}
