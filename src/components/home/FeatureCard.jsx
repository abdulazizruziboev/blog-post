export default function FeatureCard({ icon, title, description }) {
  return (
    <article className="rounded-xl border border-[#E5E7EB] p-8">
      <span className="flex size-12 items-center justify-center rounded-xl bg-[#EEEEFF]">
        <img src={icon} alt="" className="size-6" />
      </span>
      <h3 className="mt-5 text-xl font-semibold text-[#0F1729]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#6B7280]">{description}</p>
    </article>
  );
}
