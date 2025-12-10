export const OnboardingBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.15] transition-opacity duration-700"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgb(255 255 255 / 0.4) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div
        className="absolute left-[15%] top-[50%] w-[40%] opacity-30 transition-[filter,transform,background] duration-700"
        style={{
          aspectRatio: "2/1",
          background: "radial-gradient(#FF8A3D 0%, transparent 90%)",
          filter: "blur(120px)",
          transform: "rotate(45deg)",
        }}
      />
      <div
        className="absolute right-[15%] top-[30%] w-[40%] opacity-30 transition-[filter,transform,background] duration-700"
        style={{
          aspectRatio: "2/1",
          background: "radial-gradient(#3D76FF 0%, transparent 90%)",
          filter: "blur(120px)",
          transform: "rotate(-45deg)",
        }}
      />
    </div>
  );
};
