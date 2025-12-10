import Link from "next/link";
import Image from "next/image";

type FooterProps = {
  linkSections?: {
    title: string;
    links: { title: string; url: string }[];
  }[];
  logo?: string;
  copyrightNotice?: string;
};

export const Footer = ({
  linkSections,
  logo,
  copyrightNotice,
}: FooterProps) => {
  return (
    <footer className="w-full bottom-0 bg-sonic-black z-30">
      <div className="mx-auto container w-full max-w-screen-xl p-4 py-12 flex flex-col gap-y-16">
        <div className="flex flex-col gap-y-8 md:flex-row md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <div className="relative w-32 h-8">
                <Image
                  src={"/sonic-logo.svg"}
                  alt="Sonic"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-1 sm:gap-16 sm:flex sm:flex-row">
            {linkSections?.map((section, i) => (
              <div className="md:text-left" key={i}>
                <h2 className="mb-6 font-medium text-shade-light">
                  {section.title}
                </h2>
                <ul className="text-sonic-white font-medium">
                  {section.links.map((link, i) => (
                    <li key={i} className="mb-4">
                      <a href={link.url} className="hover:underline">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-body-sm text-gray-500 sm:text-center dark:text-gray-400">
            {copyrightNotice}
          </span>
        </div>
      </div>
    </footer>
  );
};
