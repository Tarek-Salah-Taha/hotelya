"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { RoomCardProps, SupportedLang } from "../_types/types";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { getRoomSpecs } from "../_utils/getRoomSpecs";
import MotionButton from "./MotionButton";

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
  const locale = useLocale() as SupportedLang;

  const roomSpecs = getRoomSpecs({ specs, tRoomDescriptions });

  return (
    <motion.div className="relative flex flex-col md:flex-row border border-gray-200 rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300">
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
            {tRoomDescriptions("Save")} {(priceOld - priceNew).toFixed(2)}{" "}
            {tRoomDescriptions("$")}
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
            {roomSpecs.map((spec, index) => {
              const IconComponent = spec.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-sm"
                >
                  <IconComponent className="text-primary" size={14} />
                  <span className="text-gray-700">{spec.text}</span>
                </motion.div>
              );
            })}
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {tRoomDescriptions(roomDescription)}
          </p>
        </div>

        {/* Price & Button */}
        <div className="mt-auto flex flex-col justify-between items-start gap-4">
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

          <MotionButton
            label={tRoomDescriptions("Check Availability")}
            onClick={() => router.push(`/${locale}/rooms/${roomId}`)}
            variant="primary"
            className="w-full"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default RoomCard;
