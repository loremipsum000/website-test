import SonicCommunitiesImage from "@/assets/images/sonic-communities.jpg";

export const SonicCommunities = (props: React.ComponentProps<"img">) => {
  return (
    <img src={SonicCommunitiesImage.src} alt="Sonic Communities" {...props} />
  );
};
