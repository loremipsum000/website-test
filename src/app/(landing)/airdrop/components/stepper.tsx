import { CtaButton } from "@/components/cta-button";
import { urlFor } from "@/sanity/lib/image";
import { SanityImageAsset } from "../../../../../sanity.types";

export const Indicator = ({ status }: { status: string }) => {
  switch (status) {
    case "live":
      return (
        <div className="relative p-[2px] bg-gradient-sonic-mirrored rounded-lg animate-gradient">
          <div className="relative z-10 bg-black/75 rounded-md p-[1px]">
            <div className="p-[1px] rounded-full">
              <div className="flex items-center justify-center gap-x-1 px-2 py-0.5 rounded-lg transition overflow-hidden">
                <span className="flex items-center gap-x-2">
                  <div className="relative">
                    <div className="absolute h-3 w-3 bg-red-500 rounded-full animate-ping" />
                    <div className="relative h-3 w-3 bg-red-500 rounded-full" />
                  </div>
                  <span className="italic text-body-sm font-bold">Live</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    case "closed":
    case "coming-soon":
      return (
        <div className="relative border-2 border-gray-500 rounded-lg">
          <div className="relative z-10 bg-black/85 rounded-md">
            <div className="absolute inset-0 bg-gradient-sonic-mirrored animate-gradient to-red-500 rounded-md -z-10" />
            <div className="p-[2px] rounded-md bg-black/90">
              <div className="flex items-center justify-center gap-x-1 px-2 py-0.5 rounded-lg transition overflow-hidden">
                <span className="italic text-body-sm font-bold text-white">
                  {status === "closed" ? "Closed" : "Coming soon"}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

interface Step {
  phase: string;
  status: string;
  title: string;
  description: string;
  cta?: { text: string; href: string };
  image: string;
  icons: Array<{
    image: SanityImageAsset;
    color: string;
  }>;
}

export const Stepper = ({ steps }: { steps: Array<Step> }) => {
  return (
    <div className="relative flex flex-col gap-y-16 md:gap-y-24">
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-sonic-vertical">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80" />
      </div>
      {steps.map((step, index) => (
        <div
          key={index}
          className="ml-8 md:ml-16 flex items-end gap-x-8 relative"
        >
          <div className="flex flex-col items-start gap-y-4 md:gap-y-8">
            <div className="flex items-center gap-x-4">
              <h2 className="text-h6 font-bold text-shade-light">
                {step.phase}
              </h2>
              <Indicator status={step.status} />
            </div>
            <div className="flex flex-col gap-y-2">
              <h3 className="text-h2 font-medium">{step.title}</h3>
              <p className="text-body-lg max-w-xl">{step.description}</p>
            </div>
            {step.cta && (
              <CtaButton external href={step.cta.href} variant="secondary">
                {step.cta.text}
              </CtaButton>
            )}
            {step.icons && (
              <div className="flex space-x-3">
                {step.icons.map((icon: any, idx: number) => (
                  <img
                    key={idx}
                    src={urlFor(icon.image).url()}
                    alt={icon.src}
                    className="w-16 h-16 md:w-24 md:h-24 rounded-2xl object-contain object-top"
                    style={{
                      backgroundColor: icon.color,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          {step.image && (
            <img
              src={urlFor(step.image).url()}
              alt={step.title}
              className="hidden md:block w-64 h-auto rounded-2xl object-contain object-bottom absolute right-0 -bottom-5"
              style={{ height: "80%" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
