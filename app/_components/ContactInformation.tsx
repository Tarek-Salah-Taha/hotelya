import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaGlobe } from "react-icons/fa";
import { LocalizedHotel } from "../_lib/transformHotel";
import { useTranslations } from "next-intl";

function ContactInformation({ hotel }: { hotel: LocalizedHotel }) {
  const t = useTranslations("HotelPage");

  const { address, city, country, phone, email, website } = hotel;

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
          rtl:group-hover:-translate-x-1
          transition-transform duration-300
        "
        >
          {t("Contact Information")}
        </h2>
        <div
          className="
          absolute bottom-0 w-12 h-1 bg-primary rounded-full 
          scale-x-0 group-hover:scale-x-100 
          origin-left transition-transform duration-500
          rtl:origin-right
        "
        />
      </div>

      <div className="space-y-4 pl-1 rtl:pr-1 rtl:pl-0">
        {/* Address */}
        <div className="flex items-start gap-3 group/item">
          <IoLocationSharp
            className="
            w-6 h-6 shrink-0 text-primary 
            mt-0.5
            transition-transform
            group-hover/item:scale-110          "
          />
          <span className="text-gray-700 leading-relaxed">
            {address} • {city} • {country}
          </span>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3 group/item">
          <FaPhone
            className="
            w-6 h-6 shrink-0 text-primary
            transition-transform
            group-hover/item:scale-110
          "
          />
          <a
            href={`tel:${phone}`}
            className="
              text-gray-700 hover:text-primary
              transition-colors duration-200
              underline-offset-4 hover:underline
            "
          >
            {phone}
          </a>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 group/item">
          <MdEmail
            className="
            w-6 h-6 shrink-0 text-primary
            transition-transform
            group-hover/item:scale-110          "
          />
          <a
            href={`mailto:${email}`}
            target="_blank"
            className="
              text-gray-700 hover:text-primary
              transition-colors duration-200
              underline-offset-4 hover:underline
              break-all
            "
          >
            {email}
          </a>
        </div>

        {/* Website */}
        <div className="flex items-center gap-3 group/item">
          <FaGlobe
            className="
            w-6 h-6 shrink-0 text-primary
            transition-transform
            group-hover/item:scale-110          "
          />
          <a
            href={website}
            target="_blank"
            className="
              text-gray-700 hover:text-primary
              transition-colors duration-200
              underline-offset-4 hover:underline
              break-all
            "
          >
            {website}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactInformation;
