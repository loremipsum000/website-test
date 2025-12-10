import { Calendar, MapPin } from "lucide-react";
import { CtaButton } from "./cta-button";

export const EventCard = ({
  title,
  description,
  time,
  location,
  link,
  image,
}: {
  title: string;
  description: string;
  time: string;
  location: string;
  image: string;
  link: string;
}) => (
  <div className="flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-shade-2 shadow-md hover:shadow-lg transition-shadow duration-300 bg-background">
    <div className="relative h-40 sm:h-auto sm:w-60 sm:p-4">
      <div className="h-full w-full overflow-hidden ">
        <img
          className="w-full aspect-square sm:rounded-2xl object-cover object-top sm:object-center"
          src={image}
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% via-background/80 via-30% to-background to-100% sm:hidden"></div>
      </div>
    </div>
    <div className="flex flex-col items-start justify-between p-4 sm:w-2/3 sm:pt-4 -mt-16 sm:mt-0 relative z-10">
      <div className="sm:max-w-sm">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="mb-4 line-clamp-4">{description}</p>
        <div className="flex flex-col gap-y-2 mb-4">
          <div className="flex items-center gap-x-2">
            <Calendar className="h-5 w-5" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin className="h-5 w-5" />
            <span>{location}</span>
          </div>
        </div>
      </div>
      <CtaButton href={link ?? "#"} className="self-start">
        Details
      </CtaButton>
    </div>
  </div>
);
