import { FaCheck } from "react-icons/fa";
import { AmenityBadgeProps } from "../_types/types";

function AmenityBadge({ label, bg, text, hover, key }: AmenityBadgeProps) {
  return (
    <span
      key={key}
      className={`flex items-center gap-1.5 ${bg} ${text} ${hover} 
        px-3 py-1.5 rounded-full text-sm whitespace-nowrap 
        border border-transparent hover:border-current 
        transition-all duration-200 cursor-default`}
      title={label}
    >
      <FaCheck
        className={`${text} transition-transform group-hover/amenity:scale-110`}
        size={14}
      />
      <span className="transition-transform group-hover/amenity:translate-x-0.5 rtl:group-hover/amenity:-translate-x-0.5">
        {label}
      </span>
    </span>
  );
}

export default AmenityBadge;
