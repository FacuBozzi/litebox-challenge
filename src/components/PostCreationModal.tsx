"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { fetchRelatedPostsPayload } from "@/lib/relatedPosts";

type FlowState = "selecting" | "uploading" | "failed" | "success" | "completed";

type PostCreationModalProps = {
  onCloseAction: () => void;
};

const resolveApiHost = () => {
  const host = process.env.LITE_TECH_API_HOST ?? "http://localhost:8080";
  return host.replace(/\/$/, "");
};

export function PostCreationModal({ onCloseAction }: PostCreationModalProps) {
  const router = useRouter();
  const [flowState, setFlowState] = useState<FlowState>("selecting");
  const [title, setTitle] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const apiHost = resolveApiHost();

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

  const refreshRelatedPosts = useCallback(async () => {
    try {
      const payload = await fetchRelatedPostsPayload(apiHost);
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("related-posts:updated", { detail: payload }),
        );
      }
    } catch (error) {
      console.error("Failed to refresh related posts", error);
    } finally {
      router.refresh();
    }
  }, [apiHost, router]);

  const finalizeCreation = useCallback(async () => {
    if (isFinalizing) {
      return;
    }
    setIsFinalizing(true);
    try {
      await refreshRelatedPosts();
    } catch (error) {
      console.error(error);
    } finally {
      onCloseAction();
    }
  }, [isFinalizing, onCloseAction, refreshRelatedPosts]);

  useEffect(() => {
    if (flowState !== "uploading") {
      return;
    }
    setUploadProgress(0);
    let animationFrame: number;
    let startTimestamp: number | null = null;
    const duration = 1500;

    const animateProgress = (timestamp: number) => {
      if (startTimestamp === null) {
        startTimestamp = timestamp;
      }
      const elapsed = timestamp - startTimestamp;
      const nextProgress = Math.min((elapsed / duration) * 100, 100);
      setUploadProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrame = requestAnimationFrame(animateProgress);
      } else {
        setFlowState("success");
      }
    };

    animationFrame = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(animationFrame);
  }, [flowState]);

  const handleRetry = () => {
    setFlowState("selecting");
    setUploadProgress(0);
    setFile(null);
    setSelectedFileName("");
  };

  const validateFields = () => {
    const hasTitle = title.trim().length > 0;
    const hasImage = Boolean(file);
    setTitleError(!hasTitle);
    setImageError(!hasImage);
    return hasTitle && hasImage;
  };

  const handleConfirm = async () => {
    if (isSubmitting || flowState === "uploading") {
      return;
    }
    if (!validateFields() || !file) {
      return;
    }
    if (flowState !== "success") {
      return;
    }

    try {
      setIsSubmitting(true);

      const body = new FormData();
      body.append("title", title.trim());
      body.append("image", file);

      const response = await fetch(`${apiHost}/api/post/related`, {
        method: "POST",
        body,
      });

      if (!response.ok) {
        throw new Error(`Post creation failed with status ${response.status}`);
      }

      setFlowState("completed");
    } catch (error) {
      console.error(error);
      window.alert("We could not create your post. Please try again later.");
      onCloseAction();
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDone = () => {
    void finalizeCreation();
  };
  const handleCancel = () => onCloseAction();

  const handleBrowseClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0];
    if (!nextFile) return;
    setFile(nextFile);
    setSelectedFileName(nextFile.name);
    setImageError(false);
    setFlowState("uploading");
  };

  const renderProgressContent = () => {
    const textClass = "text-sm text-left font-semibold text-[#1c1735]";

    if (flowState === "selecting") {
      return (
        <>
          <button
            type="button"
            onClick={handleBrowseClick}
            className={`flex w-full max-w-[330px] items-center justify-center gap-2 border-2 ${
              imageError ? "border-[#FF2F2F]" : "border-black"
            } bg-transparent px-4 py-3 text-base font-semibold text-[#1c1735] transition hover:bg-white/40`}
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
        </>
      );
    }

    if (flowState === "uploading") {
      return (
        <>
          <div className={textClass}>
            Loading image {Math.round(uploadProgress)}%
          </div>
          <div className="mt-1 h-2.5 w-full overflow-hidden border border-black bg-white/40">
            <div
              className="h-full bg-black transition-[width] duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
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
                  onChange={(event) => {
                    setTitle(event.target.value);
                    if (titleError) {
                      setTitleError(false);
                    }
                  }}
                  placeholder="Post Title"
                  className={`w-full border-2 ${
                    titleError ? "border-[#FF2F2F]" : "border-black"
                  } bg-white px-4 py-3 text-base font-medium text-[#1c1735] outline-none focus:ring-1 focus:ring-black`}
                />
              </div>

              <div className="w-full max-w-[330px]">
                {renderProgressContent()}
              </div>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={isSubmitting || flowState !== "success"}
                className={`mt-2 w-30 cursor-pointer bg-black px-6 py-3 text-base font-semibold text-white transition hover:scale-[1.01] ${
                  isSubmitting || flowState !== "success"
                    ? "cursor-not-allowed opacity-60"
                    : ""
                }`}
              >
                {isSubmitting ? "Posting..." : "Confirm"}
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
                disabled={isFinalizing}
                className={`w-28 bg-black px-6 py-3 text-base font-semibold text-white transition hover:scale-[1.01] ${
                  isFinalizing ? "cursor-not-allowed opacity-70" : ""
                }`}
              >
                {isFinalizing ? "Closing..." : "Done"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
