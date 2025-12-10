import { DottedCard } from "./dotted-card";
import Image from "next/image";

interface Venue {
  name: string;
  image: string;
  description: string;
}

interface TakingOverViennaProps {
  venues: Venue[];
}
export const TakingOverVienna = ({ venues }: TakingOverViennaProps) => {
  return (
    <section className="p-8 space-y-8">
      <h2 className="text-3xl font-bold">Taking over Vienna</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {venues.map((venue) => (
          <DottedCard className="flex flex-col gap-y-4 p-4" key={venue.name}>
            <Image src={venue.image} alt={venue.name} width={309} height={198} className="rounded-lg w-full" />
            <h3 className="font-bold">{venue.name}</h3>
            <p className="text-gray-300 text-sm">{venue.description}</p>
          </DottedCard>
        ))}
      </div>
    </section>
  );
};
