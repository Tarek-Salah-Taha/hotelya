import { IoLocationSharp } from "react-icons/io5";
import { FaPhone, FaGlobe } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { LocalizedHotel } from "../_utils/transformHotel";
import { useTranslations } from "next-intl";
import SectionTitle from "./SectionTitle";
import InfoRow from "./InfoRow";

type ContactInformationProps = {
  hotel: LocalizedHotel;
};

function ContactInformation({ hotel }: ContactInformationProps) {
  const t = useTranslations("HotelPage");
  const { address, city, country, phone, email, website } = hotel;

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <SectionTitle title={t("Contact Information")} underline />

      <div className="space-y-4 pl-1 rtl:pr-1 rtl:pl-0">
        <InfoRow icon={IoLocationSharp}>
          {address} • {city} • {country}
        </InfoRow>

        {phone && (
          <InfoRow icon={FaPhone} href={`tel:${phone}`}>
            {phone}
          </InfoRow>
        )}

        {email && (
          <InfoRow icon={MdEmail} href={`mailto:${email}`}>
            {email}
          </InfoRow>
        )}

        {website && (
          <InfoRow icon={FaGlobe} href={website}>
            {website}
          </InfoRow>
        )}
      </div>
    </div>
  );
}

export default ContactInformation;
