import Image from "next/image";

type ArrowIconProps = {
  className?: string;
  color?: string;
};

export function ArrowIcon({ className, color = "yellow" }: ArrowIconProps) {
  return (
    <Image
      src={`/arrows/right-${color}-arrow.svg`}
      alt=""
      aria-hidden
      width={24}
      height={10}
      className={className}
    />
  );
}
