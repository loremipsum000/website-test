import Link from "next/link";

export const AirdropLink = () => {
  return (
    <Link href="https://my.soniclabs.com/points" target="_blank" rel="noopener noreferrer" className="relative inline-block group">
      <div className="absolute inset-0 bg-gradient-sonic-mirrored animate-gradient rounded-full blur-sm group-hover:blur group-hover:brightness-125 transition" />
      <div className="relative z-10 p-[1px] rounded-full bg-gradient-sonic-mirrored animate-gradient">
        <div className="flex items-center justify-center gap-x-2 px-3 py-1 bg-black/85 rounded-full group-hover:bg-black/75 transition">
          <span className="text-white/85 font-medium text-body-sm group-hover:text-white transition">
            Airdrop
          </span>
        </div>
      </div>
    </Link>
  );
};
