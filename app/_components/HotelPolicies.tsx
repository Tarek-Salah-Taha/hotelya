import { HotelPoliciesProps } from "../_types/types";
import { FaPerson } from "react-icons/fa6";
import { FaSignInAlt, FaSignOutAlt, FaSmoking } from "react-icons/fa";
import { TbCalendarCancel } from "react-icons/tb";
import { MdOutlinePets } from "react-icons/md";
import { convertTo12Hour } from "../_lib/convertTo12Hour";

function HotelPolicies({ policies, checkIn, checkOut }: HotelPoliciesProps) {
  const { minAge, petsAllowed, smokingAllowed, cancellationPolicy } =
    policies[0] || {};

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm text-text">
      <h2 className="text-2xl font-semibold mb-4">Policies</h2>
      <div className=" pl-5 text-lg text-gray-700 space-y-2">
        <div className="flex items-center gap-2">
          <FaSignInAlt className="w-6 h-6 shrink-0 text-primary" />
          Check-in: From {convertTo12Hour(checkIn)}.
        </div>
        <div className="flex items-center gap-2">
          <FaSignOutAlt className="w-6 h-6 shrink-0 text-primary" />
          Check-out: Until {convertTo12Hour(checkOut)}.
        </div>
        <div className="flex items-center gap-2">
          <FaPerson className="w-6 h-6 shrink-0 text-primary" />
          Minimum age for check-in: {minAge} years.
        </div>
        <div className="flex items-center gap-2">
          <TbCalendarCancel className="w-6 h-6 shrink-0 text-primary" />
          {cancellationPolicy}
        </div>
        <div className="flex items-center gap-2">
          <MdOutlinePets className="w-6 h-6 shrink-0 text-primary" />
          {petsAllowed ? "Pets are allowed." : "Pets are not allowed."}
        </div>
        <div className="flex items-center gap-2">
          <FaSmoking className="w-6 h-6 shrink-0 text-primary" />
          {smokingAllowed ? "Smoking is allowed." : "Smoking is not allowed."}
        </div>
      </div>
    </div>
  );
}

export default HotelPolicies;
