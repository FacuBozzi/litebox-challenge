"use client";

import Image from "next/image";
import { type ChangeEvent, useEffect, useRef, useState } from "react";

type FlowState = "selecting" | "uploading" | "failed" | "success" | "completed";

type PostCreationModalProps = {
  onCloseAction: () => void;
};

export function PostCreationModal({ onCloseAction }: PostCreationModalProps) {
  const [flowState, setFlowState] = useState<FlowState>("selecting");
  const [title, setTitle] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (flowState !== "uploading") return;
    const timer = setTimeout(() => setFlowState("failed"), 1700);
    return () => clearTimeout(timer);
  }, [flowState]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseAction();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCloseAction]);

  const showCancelAction = flowState === "uploading";
  const showRetryAction = flowState === "failed";

  const containerWidth =
    flowState === "completed" ? "max-w-[640px]" : "max-w-[560px]";
  const paddingClasses =
    flowState === "completed" ? "px-12 py-20 pb-10" : "px-12 py-14";

  const handleRetry = () => setFlowState("success");
  const handleConfirm = () => {
    if (flowState === "success") {
      setFlowState("completed");
    }
  };
  const handleDone = () => onCloseAction();
  const handleCancel = () => onCloseAction();

  const handleBrowseClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFileName(file.name);
    setFlowState("uploading");
  };

  const renderProgressContent = () => {
    const textClass = "text-sm text-left font-semibold text-[#1c1735]";

    if (flowState === "selecting") {
      return (
        <>
          <div className="flex flex-row items-center text-center">
            <button
              type="button"
              onClick={handleBrowseClick}
              className="flex w-full max-w-[330px] gap-2 items-center justify-center border-2 border-black bg-transparent px-4 py-3 text-base font-semibold text-[#1c1735] transition hover:bg-white/40"
            >
              <span>Upload image</span>
              <Image
                src="/arrows/arrow-up.svg"
                width={22}
                height={22}
                alt="arrow up"
              />
            </button>
            {selectedFileName && (
              <p className="mt-2 text-xs font-semibold text-[#1c1735]">
                {selectedFileName}
              </p>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </>
      );
    }

    if (flowState === "uploading") {
      return (
        <>
          <div className={textClass}>Loading image 60%</div>
          <div className="mt-1 h-2.5 w-full overflow-hidden border border-black bg-white/40">
            <div
              className="h-full bg-black transition-[width] duration-300 ease-out"
              style={{ width: "60%" }}
            />
          </div>
          {showCancelAction && (
            <div className="mt-1 flex justify-end">
              <button
                type="button"
                className={textClass}
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </>
      );
    }

    if (flowState === "failed") {
      return (
        <>
          <div className={textClass}>Failed to upload your file</div>
          <div className="mt-1 h-2.5 w-full bg-[#FF2F2F]" />
          {showRetryAction && (
            <div className="mt-1 flex justify-end">
              <button type="button" className={textClass} onClick={handleRetry}>
                Retry
              </button>
            </div>
          )}
        </>
      );
    }

    return (
      <>
        <div className={`flex items-center gap-2 ${textClass}`}>
          <span>Upload successful</span>
          <Image src="misc/check.svg" width={24} height={24} alt="check" />
        </div>
        <div className="mt-1 h-2.5 w-full bg-black" />
      </>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030304]/75 px-4"
      role="dialog"
      aria-modal="true"
    >
      <div className={`relative w-full ${containerWidth}`}>
        <div
          className="absolute inset-0 translate-x-2 translate-y-2 border-2 border-black bg-black"
          aria-hidden="true"
        />
        <div
          className={`relative pt-20 border-3 border-black bg-background-yellow text-[#1b1434] shadow-[6px_6px_0_#000] ${paddingClasses}`}
        >
          <button
            type="button"
            aria-label="Close modal"
            className="absolute right-8 top-6 mt-4 mr-3 transition hover:scale-105"
            onClick={handleCancel}
          >
            <Image
              src="misc/close-icon.svg"
              width={40}
              height={40}
              onClick={handleCancel}
              alt="close icon"
            />
          </button>

          {flowState !== "completed" ? (
            <div className="flex flex-col items-center gap-6 text-center">
              <div>
                <h2 className="text-3xl font-medium text-[#240F35]">
                  Upload your post
                </h2>
                <p className="mt-2 max-w-88 text-sm text-extra-muted">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse commodo libero.
                </p>
              </div>

              <div className="w-full max-w-[330px]">
                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Post Title"
                  className="w-full border-2 border-black bg-white px-4 py-3 text-base font-medium text-[#1c1735] outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="w-full max-w-[330px]">
                {renderProgressContent()}
              </div>

              <button
                type="button"
                onClick={handleConfirm}
                className="mt-2 w-30 cursor-pointer bg-black px-6 py-3 text-base font-semibold text-white transition hover:scale-[1.01]"
              >
                Confirm
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-8 text-center">
              <p className="max-w-sm text-3xl font-medium leading-snug text-[#240F35]">
                Your post was successfully uploaded!
              </p>
              <button
                type="button"
                onClick={handleDone}
                className="w-28 bg-black px-6 py-3 text-base font-semibold text-white transition hover:scale-[1.01]"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
