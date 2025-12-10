export const SonicStackTag = () => {
  return (
    <div className="z-10 relative bg-gradient-sonic-mirrored rounded-full select-none">
      <div className="absolute w-full h-full bg-gradient-sonic-mirrored animate-gradient rounded-full blur-sm -z-10"></div>
      <div className="p-[1px] rounded-full">
        <div className="flex items-center gap-x-2 px-3 py-1 bg-background/85 text-body-lg rounded-full overflow-hidden">
          <span className="text-foreground">Sonic Stack</span>
        </div>
      </div>
    </div>
  );
};
