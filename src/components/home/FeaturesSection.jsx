import FeatureCard from "./FeatureCard";
import { features } from "../../data/homeData";

export default function FeaturesSection() {
  return (
    <section className="px-4 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-4xl font-bold text-[#0F1729]">
            Why Choose Blogify?
          </h2>
          <p className="mt-4 text-[#6B7280]">
            Built with modern technologies and best practices to provide the best
            blogging experience.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
