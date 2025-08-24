import { HotelPoliciesProps } from "../_types/types";
import { FaPerson } from "react-icons/fa6";
import { FaSignInAlt, FaSignOutAlt, FaSmoking } from "react-icons/fa";
import { TbCalendarCancel } from "react-icons/tb";
import { MdOutlinePets } from "react-icons/md";
import { convertTo12Hour } from "../_helpers/convertTo12Hour";
import { useTranslations } from "next-intl";
import SectionTitle from "./SectionTitle";
import InfoRow from "./InfoRow";

function HotelPolicies({ policies, checkIn, checkOut }: HotelPoliciesProps) {
  const t = useTranslations("HotelPage");
  const { minAge, petsAllowed, smokingAllowed, cancellationPolicy } =
    policies || {};

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <SectionTitle title={t("Policies")} underline />

      <div className="space-y-4 pl-1 rtl:pr-1 rtl:pl-0">
        <InfoRow icon={FaSignInAlt}>
          {t("Check-in: From")}{" "}
          <span className="font-medium">{convertTo12Hour(checkIn, t)}.</span>
        </InfoRow>

        <InfoRow icon={FaSignOutAlt}>
          {t("Check-out: Until")}{" "}
          <span className="font-medium">{convertTo12Hour(checkOut, t)}.</span>
        </InfoRow>

        {minAge && (
          <InfoRow icon={FaPerson}>
            {t("Minimum age for check-in")}:{" "}
            <span className="font-medium">
              {minAge} {t("years")}.
            </span>
          </InfoRow>
        )}

        {cancellationPolicy && (
          <InfoRow icon={TbCalendarCancel}>{cancellationPolicy}</InfoRow>
        )}

        <InfoRow icon={MdOutlinePets} highlight={petsAllowed ? "green" : "red"}>
          {petsAllowed ? t("Pets are allowed") : t("Pets are not allowed")}
        </InfoRow>

        <InfoRow icon={FaSmoking} highlight={smokingAllowed ? "green" : "red"}>
          {smokingAllowed
            ? t("Smoking is allowed")
            : t("Smoking is not allowed")}
        </InfoRow>
      </div>
    </div>
  );
}

export default HotelPolicies;
