export default function StatCard({ icon: Icon, value, label, note, tone = "indigo" }) {
  const tones = {
    indigo: "bg-[#EEF0FF] text-[#4346EF]",
    violet: "bg-[#F3E8FF] text-[#9333EA]",
    green: "bg-[#DCFCE7] text-[#16A34A]",
    amber: "bg-[#FEF3C7] text-[#D97706]",
  };

  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white p-5">
      <div className="flex items-start justify-between gap-2">
        <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </span>
        {note && <span className="text-xs font-medium text-[#16A34A]">{note}</span>}
      </div>
      <p className="mt-4 text-2xl font-bold text-[#0F1729]">{value}</p>
      <p className="mt-0.5 text-sm text-[#6B7280]">{label}</p>
    </div>
  );
}
