import FeatureCard from "./FeatureCard";
import { features } from "../../data/homeData";

export default function FeaturesSection() {
  return (
    <section className="px-4 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-3xl font-bold text-[#0F1729] sm:text-4xl">
            Why Choose Blogify?
          </h2>
          <p className="mt-4 text-[#6B7280]">
            Built with modern technologies and best practices to provide the best
            blogging experience.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
