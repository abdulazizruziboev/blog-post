export default function StatCard({ icon, value, label, color }) {
  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
      <div className={"flex items-center justify-center size-10 rounded-lg " + color}>
        {icon}
      </div>
      <p className="mt-4 text-2xl font-bold text-[#0F1729]">{value}</p>
      <p className="mt-0.5 text-sm text-[#6B7280]">{label}</p>
    </div>
  );
}
