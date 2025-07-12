import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaGlobe } from "react-icons/fa";

import { LocalizedHotel } from "../_lib/transformHotel";

function ContactInformation({ hotel }: { hotel: LocalizedHotel }) {
  const { address, city, country, phone, email, website } = hotel;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm text-text">
      <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
      <div className=" pl-5 text-lg text-gray-700 space-y-2">
        <div className="flex items-center gap-2">
          <IoLocationSharp className="w-6 h-6 shrink-0 text-primary" />
          {address}, {city}, {country}
        </div>
        <div className="flex items-center gap-2">
          <FaPhone className="w-6 h-6 shrink-0 text-primary" />
          {phone}
        </div>
        <div className="flex items-center gap-2">
          <MdEmail className="w-6 h-6 shrink-0 text-primary" />
          <a href={`mailto:${email}`} target="_blank">
            {email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <FaGlobe className="w-6 h-6 shrink-0 text-primary" />
          <a href={website} target="_blank">
            {website}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactInformation;
