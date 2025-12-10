import { DottedCard } from "./dotted-card";

const features = [
  {
    title: "Code First",
    description: "Engage in hands-on development challenges and explore cutting-edge solutions with fellow developers.",
  },
  {
    title: "Cross-Pollination",
    description:
      "Connect across different development domains. Share challenges and solutions in a collaborative environment.",
  },
  {
    title: "Core Team Access",
    description:
      "Meet live with Sonic developers. Deep dive into performance improvements, discuss future features, and get direct technical support.",
  },
  {
    title: "Ecosystem Growth",
    description:
      "Connect with fellow builders. Share use cases, find collaborators, and help grow the ecosystem together.",
  },
  {
    title: "Community Focus",
    description:
      "For developers, built by developers sharing best practices. Be part of the growing global community of Sonic developers.",
  },
];

const HighlightCardDotted = ({ title, description }: { title: string; description: string }) => {
  return (
    <DottedCard>
      <div className="flex flex-col gap-y-2 p-5 max-w-96 line-clamp-3">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-sm text-white/90">{description}</p>
      </div>
    </DottedCard>
  );
};

const FeaturesGrid = ({ features }: { features: Array<{ title: string; description: string }> }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        {features.map((feature, index) => (
          <HighlightCardDotted key={index} title={feature.title} description={feature.description} />
        ))}
      </div>
    </div>
  );
};
export const WhyJoinUs = () => {
  return (
    <section className="px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Why join us?</h2>
      <FeaturesGrid features={features} />
    </section>
  );
};
