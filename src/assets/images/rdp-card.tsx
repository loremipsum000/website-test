import { SVGAttributes } from "react";

export default function RDPCard({
  ...props
}: React.HTMLAttributes<HTMLImageElement>) {
  return <img src="/images/rdp-card.png" alt="RDP Card" {...props} />;
}
