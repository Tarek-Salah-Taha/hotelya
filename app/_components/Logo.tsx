import Link from "next/link";
import Image from "next/image";

function Logo() {
  return (
    <Link
      href="/"
      className="relative w-[120px] h-[60px] min-w-[120px] min-h-[60px] inline-block"
    >
      <Image
        src="/logo.png"
        alt="Hotelya logo"
        fill
        className="object-contain"
        quality={100}
        priority
      />
    </Link>
  );
}

export default Logo;
