import { cn } from "@/lib/utils";
import { Body, H2 } from "./ui/typography";

interface HeroSectionProps {
  topline?: React.ReactNode;
  title: string;
  subtitle: string;
  className?: string;
}

export const HeroSection = ({
  topline,
  title,
  subtitle,
  className,
}: HeroSectionProps) => {
  return (
    <section className={cn("relative", className)}>
      <div className="flex flex-col gap-y-8">
        <div className="container mx-auto flex flex-col gap-y-4 items-center text-center">
          {topline}
          <H2
            medium
            className="leading-none max-w-[40rem]"
            aria-label={`${title} section`}
            id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {title}
          </H2>
          <Body size="large" className="leading-relaxed max-w-[40rem]">
            {subtitle}
          </Body>
        </div>
      </div>
    </section>
  );
};
