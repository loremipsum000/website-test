import { CtaButton } from "./cta-button";
import { Body, H2, H3, H4 } from "./ui/typography";

interface HighlightSectionProps {
  title: string;
  subtitle: string;
  rightContent?: React.ReactNode;
  cta?: {
    title: string;
    url: string;
  };
  secondaryCta?: {
    title: string;
    url: string;
  };
}

export const HighlightSection = ({
  title,
  subtitle,
  rightContent,
  cta,
  secondaryCta,
}: HighlightSectionProps) => {
  return (
    <section className="container mx-auto">
      <div className="grid items-center grid-cols-1 gap-y-10 md:grid-cols-8 md:gap-x-20">
        <div className="md:col-span-5 flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-6">
            <H3 medium className="leading-none">
              {title}
            </H3>
            <Body
              size="large"
              className="text-body-lg leading-relaxed max-w-lg"
            >
              {subtitle}
            </Body>
          </div>
          {cta || secondaryCta ? (
            <div className="flex items-center gap-x-4">
              {cta && <CtaButton href={cta.url}>{cta.title}</CtaButton>}
              {secondaryCta && (
                <CtaButton href={secondaryCta.url} variant="secondary">
                  {secondaryCta.title}
                </CtaButton>
              )}
            </div>
          ) : null}
        </div>

        <div className="relative flex justify-center md:justify-end md:col-span-3">
          {rightContent}
        </div>
      </div>
    </section>
  );
};
