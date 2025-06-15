import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { LuHotel } from "react-icons/lu";

function Navigation() {
  return (
    <nav className="text-base sm:text-lg">
      <ul className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-center">
        <li>
          <Link href="/" className="flex items-center gap-2">
            <FaRegHeart /> Favorites
          </Link>
        </li>
        <li>
          <Link href="/" className="flex items-center gap-2">
            <MdOutlineBookmarkBorder /> My Trips
          </Link>
        </li>
        <li>
          <Link href="/hotels" className="flex items-center gap-2">
            <LuHotel /> Hotels
          </Link>
        </li>
        <li>
          <Link href="/" className="flex items-center gap-2">
            <CgProfile /> Login/Signup
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
