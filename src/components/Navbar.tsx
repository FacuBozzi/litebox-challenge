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
      <div className="sticky inset-x-0 top-0 z-40 w-full bg-black/80 backdrop-blur-sm">
        <header className="mx-auto flex w-full max-w-6xl flex-col px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
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
