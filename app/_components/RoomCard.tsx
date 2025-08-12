"use client";

import Image from "next/image";
import {
  FaBed,
  FaRulerCombined,
  FaBath,
  FaUser,
  FaChild,
} from "react-icons/fa";
import { LuBaby } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { RoomCardProps, SupportedLang } from "../_types/types";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

function RoomCard({
  roomId,
  roomType,
  image,
  priceNew,
  priceOld,
  specs,
  roomDescription,
}: RoomCardProps) {
  const router = useRouter();

  const tRoomTypes = useTranslations("RoomTypes");

  const tRoomDescriptions = useTranslations("RoomDescriptions");

  const pathname = usePathname();
  const locale: SupportedLang = (
    ["en", "fr", "es", "de", "it", "ar"].includes(pathname.split("/")[1])
      ? pathname.split("/")[1]
      : "en"
  ) as SupportedLang;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex flex-col md:flex-row border border-gray-200 rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Room Image */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="w-full md:w-2/5 overflow-hidden relative"
      >
        <Image
          src={image || "/room-placeholder.jpg"}
          alt={roomType}
          width={400}
          height={300}
          className="w-full h-64 md:h-full object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          loading="lazy"
          blurDataURL="/room-placeholder.jpg"
          placeholder="blur"
        />
        {priceOld && (
          <div className="absolute top-4 start-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
            {tRoomDescriptions("Save")} {""}
            {(priceOld - priceNew).toFixed(2)} {tRoomDescriptions("$")}
          </div>
        )}
      </motion.div>

      {/* Room Info */}
      <div className="flex-1 flex flex-col p-6 md:p-8">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {tRoomTypes(roomType)}
          </h3>

          <div className="flex flex-wrap gap-2 mb-4">
            {[
              {
                icon: <FaRulerCombined className="text-primary" size={14} />,
                text: `${specs.area} ${tRoomDescriptions("m²")}`,
              },
              {
                icon: <FaBed className="text-primary" size={14} />,
                text: `${specs.bed} × ${tRoomDescriptions(specs.bedType)}`,
              },
              {
                icon: <FaBath className="text-primary" size={14} />,
                text: `${
                  specs.bathrooms === 1
                    ? tRoomDescriptions("Bath")
                    : tRoomDescriptions("Baths")
                }`,
              },
              {
                icon: <FaUser className="text-primary" size={14} />,
                text: `${
                  specs.adults === 1
                    ? tRoomDescriptions("Adult")
                    : `${specs.adults}  ${tRoomDescriptions("Adults")}`
                }`,
              },
              specs.children > 0 && {
                icon: <FaChild className="text-primary" size={14} />,
                text: `${
                  specs.children === 1
                    ? tRoomDescriptions("Child")
                    : `${specs.children}  ${tRoomDescriptions("Children")}`
                }`,
              },
              specs.extraBed && {
                icon: <LuBaby className="text-primary" size={14} />,
                text: tRoomDescriptions("Free crib"),
              },
            ]
              .filter(Boolean)
              .map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-sm"
                >
                  {item && "icon" in item && item.icon}
                  <span className="text-gray-700">
                    {item && "text" in item ? item.text : ""}
                  </span>
                </motion.div>
              ))}
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {tRoomDescriptions(roomDescription)}
          </p>
        </div>

        {/* Price & Button */}
        <div className="mt-auto flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div className="flex flex-col">
            <div className="flex items-end gap-2">
              <p className="text-2xl font-bold text-primary">
                {priceNew} {tRoomDescriptions("$")}
              </p>
              {priceOld && (
                <p className="text-sm line-through text-gray-400 mb-0.5">
                  {priceOld} {tRoomDescriptions("$")}
                </p>
              )}
            </div>
            <p className="text-sm text-gray-500">
              {tRoomDescriptions("per night + taxes")}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-primary text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 w-full sm:w-auto text-center shadow-md hover:shadow-lg"
            onClick={() => router.push(`/${locale}/rooms/${roomId}`)}
          >
            {tRoomDescriptions("Check Availability")}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default RoomCard;
