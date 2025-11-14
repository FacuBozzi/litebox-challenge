"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { ArrowIcon } from "@/components/ArrowIcon";
import { PostCreationModal } from "@/components/PostCreationModal";

export function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <div className="sticky top-0 inset-x-0 z-40 -mx-4 bg-black/80 px-4 backdrop-blur-[8px] sm:-mx-8 sm:px-8">
        <header className="mx-auto flex max-w-6xl flex-col py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/lite-tech/lite-tech-logo.svg"
              width={150}
              height={100}
              alt="Lite-Tech logo"
            />
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
