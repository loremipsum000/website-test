import { CtaButton } from "@/components/cta-button";

export type SimpleCardProps = {
  title: string;
  description: string;
  image: string;
  cta: {
    title: string;
    url: string;
  };
};
export const SimpleCard = ({
  title,
  description,
  image,
  cta,
}: SimpleCardProps) => {
  return (
    <div className="rounded-3xl border border-shade-2 p-6 bg-background">
      <div className="flex sm:flex-col gap-3 items-start h-full">
        <img className="w-14 sm:w-28 h-auto" src={image} alt="" />
        <div className="flex flex-col flex-1 gap-y-3 items-start">
          <div className="flex-1">
            <h6 className="text-h5 sm:text-h6 font-semibold">{title}</h6>
            <p className="mt-2 font-medium">{description}</p>
          </div>
          {cta && (
            <CtaButton
              className="theme-dark:text-hero-3"
              variant="secondary"
              href={cta.url ?? "#"}
            >
              {cta.title}
            </CtaButton>
          )}
        </div>
      </div>
    </div>
  );
};
