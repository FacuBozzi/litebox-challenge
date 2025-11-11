import Image from "next/image";

type ArrowIconProps = {
  className?: string;
};

export function ArrowIcon({ className }: ArrowIconProps) {
  return (
    <Image
      src="/arrows/right-yellow-arrow.svg"
      alt=""
      aria-hidden
      width={24}
      height={10}
      className={className}
    />
  );
}
