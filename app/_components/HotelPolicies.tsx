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
    <div
      className="
      bg-white p-6 rounded-xl 
      border border-gray-100
      shadow-sm hover:shadow-md 
      transition-all duration-300
      group
    "
    >
      <div className="relative pb-2 mb-6 overflow-hidden">
        <h2
          className="
          text-2xl font-semibold 
          text-gray-800
          inline-block
          group-hover:translate-x-1 
          transition-transform duration-300
        "
        >
          Policies
        </h2>
        <span
          className="
          absolute bottom-0 left-0 
          w-12 h-1 bg-primary rounded-full 
          scale-x-0 group-hover:scale-x-100 
          origin-left transition-transform duration-500
        "
        />
      </div>

      <div className="space-y-4 pl-1">
        {/* Check-in */}
        <div className="flex items-start gap-3 group/item">
          <FaSignInAlt
            className="
            w-6 h-6 shrink-0 text-primary 
            mt-0.5
            transition-transform
            group-hover/item:scale-110
          "
          />
          <span className="text-gray-700 leading-relaxed">
            Check-in: From{" "}
            <span className="font-medium">{convertTo12Hour(checkIn)}</span>
          </span>
        </div>

        {/* Check-out */}
        <div className="flex items-start gap-3 group/item">
          <FaSignOutAlt
            className="
            w-6 h-6 shrink-0 text-primary 
            mt-0.5
            transition-transform
            group-hover/item:scale-110
          "
          />
          <span className="text-gray-700 leading-relaxed">
            Check-out: Until{" "}
            <span className="font-medium">{convertTo12Hour(checkOut)}</span>
          </span>
        </div>

        {/* Minimum Age */}
        <div className="flex items-start gap-3 group/item">
          <FaPerson
            className="
            w-6 h-6 shrink-0 text-primary 
            mt-0.5
            transition-transform
            group-hover/item:scale-110
          "
          />
          <span className="text-gray-700 leading-relaxed">
            Minimum age for check-in:{" "}
            <span className="font-medium">{minAge} years</span>
          </span>
        </div>

        {/* Cancellation Policy */}
        <div className="flex items-start gap-3 group/item">
          <TbCalendarCancel
            className="
            w-6 h-6 shrink-0 text-primary 
            mt-0.5
            transition-transform
            group-hover/item:scale-110
          "
          />
          <span className="text-gray-700 leading-relaxed">
            {cancellationPolicy.includes("Free cancellation") ? (
              <span className="text-green-600 font-medium">
                {cancellationPolicy}
              </span>
            ) : (
              cancellationPolicy
            )}
          </span>
        </div>

        {/* Pets Policy */}
        <div className="flex items-start gap-3 group/item">
          <MdOutlinePets
            className="
            w-6 h-6 shrink-0 text-primary 
            mt-0.5
            transition-transform
            group-hover/item:scale-110
          "
          />
          <span
            className={`text-gray-700 leading-relaxed ${
              petsAllowed ? "text-green-600 font-medium" : "text-gray-600"
            }`}
          >
            {petsAllowed ? "Pets are allowed." : "Pets are not allowed."}
          </span>
        </div>

        {/* Smoking Policy */}
        <div className="flex items-start gap-3 group/item">
          <FaSmoking
            className="
            w-6 h-6 shrink-0 text-primary 
            mt-0.5
            transition-transform
            group-hover/item:scale-110
          "
          />
          <span
            className={`text-gray-700 leading-relaxed ${
              smokingAllowed ? "text-red-600 font-medium" : "text-gray-600"
            }`}
          >
            {smokingAllowed ? "Smoking is allowed." : "Smoking is not allowed."}
          </span>
        </div>
      </div>
    </div>
  );
}

export default HotelPolicies;
