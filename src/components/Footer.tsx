import Image from "next/image";

const socialLinks = [
  {
    href: "#",
    src: "/social-media/linkedin-logo.svg",
    alt: "LinkedIn",
  },
  {
    href: "#",
    src: "/social-media/facebook-logo.svg",
    alt: "Facebook",
  },
  {
    href: "#",
    src: "/social-media/x-logo.svg",
    alt: "X",
  },
];

export function Footer() {
  return (
    <footer className="mt-12 px-4 pb-10 pt-12 sm:px-0">
      <div className="mx-auto h-60 max-w-6xl bg-purple px-6 py-10 text-white sm:px-28 sm:py-20">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <Image
              src="/lite-tech/lite-tech-logo.svg"
              width={140}
              height={70}
              alt="Lite-Tech logo"
              priority={false}
            />
            <p className="mt-15 text-sm font-normal text-white">
              © Copyright Lite-Tech. All Rights Reserved
            </p>
          </div>
          <div className="flex items-center justify-center gap-6 text-xl font-semibold text-white md:mr-10 md:justify-start">
            {socialLinks.map((link) => (
              <a
                key={link.alt}
                className="transition hover:scale-110 hover:text-background-yellow"
                href={link.href}
                aria-label={link.alt}
              >
                <Image
                  src={link.src}
                  width={10}
                  height={10}
                  alt={link.alt}
                  className="h-5 w-5"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
