export function ComingSoonTag() {
  return (
    <div className="relative p-[2px] bg-gradient-sonic-mirrored rounded-lg animate-gradient">
      <div className="relative z-10 bg-black/75 rounded-md p-[1px]">
        <div className="p-[1px] rounded-full">
          <div className="flex items-center justify-center gap-x-1 px-2 py-0.5 rounded-lg transition overflow-hidden">
            <span className="italic text-body-sm font-bold">Coming Soon</span>
          </div>
        </div>
      </div>
    </div>
  );
}