import Image from "next/image";
import { ArrowIcon } from "@/components/ArrowIcon";

export function Navbar() {
  return (
    <header className="flex flex-col py-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Image
          src="/lite-tech/lite-tech-logo.svg"
          width={150}
          height={100}
          alt="Lite-Tech logo"
        />
      </div>
      <button className="group flex items-center justify-end gap-1 text-sm font-semibold text-white transition hover:text-[#c3ff3c]">
        <span>New post</span>
        <ArrowIcon className="h-6 w-6" />
      </button>
    </header>
  );
}
