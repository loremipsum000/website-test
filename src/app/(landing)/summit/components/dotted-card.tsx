interface DottedCardProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const DottedCard = ({ children, className = "", contentClassName = "" }: DottedCardProps) => {
  return (
    <div className={`flex relative w-fit rounded-2xl bg-[#212226] border border-white/10 overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "12px 12px",
          maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)",
        }}
      />
      <div className={`z-10 ${contentClassName}`}>{children}</div>
    </div>
  );
};
