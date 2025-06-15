import Image from "next/image";
import {
  FaBed,
  FaRulerCombined,
  FaBath,
  FaUser,
  FaChild,
} from "react-icons/fa";

import { LuBaby } from "react-icons/lu";

type RoomCardProps = {
  roomType: string;
  image: string;
  priceNew: number;
  priceOld?: number;
  specs: {
    area: number;
    bed: number;
    bedType: string;
    bathrooms: number;
    adults: number;
    children: number;
    extraBed: boolean;
  };
  roomDescription: string;
};

function RoomCard({
  roomType,
  image,
  priceNew,
  priceOld,
  specs,
  roomDescription,
}: RoomCardProps) {
  return (
    <div className="flex flex-col md:flex-row border rounded-xl p-4 bg-white shadow-sm space-y-4 md:space-y-0 md:space-x-6">
      {/* Room Image */}
      <div className="w-full md:w-1/3">
        <Image
          src={image}
          alt={roomType}
          width={300}
          height={300}
          className="rounded-lg w-full h-52 object-cover"
        />
      </div>

      {/* Room Info */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Title */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-text">{roomType}</h3>

          {/* Specs Icons */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <FaRulerCombined className="text-primary" />
              {specs.area} m²
            </div>
            <div className="flex items-center gap-1">
              <FaBed className="text-primary" />
              {specs.bed} Bed(s) ({specs.bedType})
            </div>
            <div className="flex items-center gap-1">
              <FaBath className="text-primary" />
              {specs.bathrooms} Bathroom(s)
            </div>
            <div className="flex items-center gap-1">
              <FaUser className="text-primary" />
              {specs.adults} Adult(s)
            </div>
            {specs.children > 0 && (
              <div className="flex items-center gap-1">
                <FaChild className="text-primary" />
                {specs.children === 1
                  ? "1 Child"
                  : `${specs.children} Children`}
              </div>
            )}
            {specs.extraBed && (
              <div className="flex items-center gap-1">
                <LuBaby className="text-primary" />
                Free crib available upon request
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500">{roomDescription}</p>
        </div>

        {/* Price & Button */}
        <div className="mt-4 flex justify-between items-center">
          <div>
            {priceOld && (
              <p className="line-through text-sm text-gray-400">${priceOld}</p>
            )}
            <p className="text-xl font-bold text-primary">${priceNew}</p>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90">
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
