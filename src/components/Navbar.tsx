"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon } from "@/components/ArrowIcon";
import { PostCreationModal } from "@/components/PostCreationModal";
import Link from "next/link";

export function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  useEffect(() => {
    const node = navbarRef.current;
    if (!node) {
      return;
    }

    const updateNavbarHeight = () => {
      const height = node.offsetHeight;
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${height}px`,
      );
    };

    updateNavbarHeight();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateNavbarHeight);
      observer.observe(node);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateNavbarHeight);
    return () => window.removeEventListener("resize", updateNavbarHeight);
  }, []);

  return (
    <>
      <div
        ref={navbarRef}
        className="sticky inset-x-0 top-0 z-40 w-full bg-black/80 backdrop-blur-sm"
      >
        <header className="mx-auto flex w-full max-w-6xl flex-col px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Image
                src="/lite-tech/lite-tech-logo.svg"
                width={150}
                height={100}
                alt="Lite-Tech logo"
              />
            </Link>
          </div>
          <button
            type="button"
            onClick={openModal}
            className="group flex items-center justify-end gap-1 text-sm font-semibold text-white transition hover:text-[#c3ff3c]"
          >
            <span>New post</span>
            <ArrowIcon className="h-6 w-6" />
          </button>
        </header>
      </div>
      {isModalOpen ? <PostCreationModal onCloseAction={closeModal} /> : null}
    </>
  );
}
