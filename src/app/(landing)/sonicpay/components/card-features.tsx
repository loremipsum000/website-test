import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

type CardFeatureProps = {
  title: string;
  description: string;
  icon: string;
};

const CardFeature = ({ title, description, icon }: CardFeatureProps) => {
  return (
    <div className="flex flex-col gap-y-4 p-5 md:p-6">
      {icon && (
        <div className="h-12 w-12 relative flex items-center justify-center rounded-md bg-[#23252A]">
          <Image
            src={urlFor(icon)?.url()}
            alt={`${title} icon`}
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
      )}
      <div className="flex flex-col flex-1">
        <div className="text-xl font-medium mb-1">{title}</div>
        <div className="text-sm text-gray-300">{description}</div>
      </div>
    </div>
  );
};

export const CardFeatures = ({
  features,
}: {
  features: CardFeatureProps[];
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative max-w-5xl mx-auto">
      {features.map((feature, index) => (
        <div
          key={index}
          className="rounded-md bg-[#18191C]/90 backdrop-blur-md border border-white/10 shadow-lg"
        >
          <CardFeature {...feature} />
        </div>
      ))}
    </div>
  );
};
