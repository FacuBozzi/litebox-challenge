import Image from "next/image";

type FileIconProps = {
  className?: string;
};

export const FileIcon = ({ className = "h-4 w-4" }: FileIconProps) => (
  <Image
    src="/misc/file-icon.svg"
    alt="file icon"
    width={20}
    height={20}
    className={className}
  />
);
