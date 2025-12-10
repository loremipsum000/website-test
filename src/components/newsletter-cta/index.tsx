import { NewsletterCtaContent } from "./content";

interface NewsletterCtaProps {
  topLine?: React.ReactNode;
}

export const NewsletterCta = ({ topLine }: NewsletterCtaProps) => {
  return (
    <NewsletterCtaContent
      title="Stay up to date with Sonic"
      subtitle="Join our newsletter to receive updates on the latest developments, events, and opportunities in the Sonic ecosystem."
      signUpText="Subscribe"
      socialLinks={[
        {
          type: "discord",
          title: "Discord",
          url: "https://discord.gg/sonic",
        },
        {
          type: "x",
          title: "X (Twitter)",
          url: "https://x.com/sonic",
        },
        {
          type: "telegram",
          title: "Telegram",
          url: "https://t.me/sonic",
        },
      ]}
      successMessage="Thank you for subscribing!"
      errorMessage="Something went wrong. Please try again."
      topLine={topLine}
    />
  );
};
