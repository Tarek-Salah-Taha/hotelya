// utils/room-specs.ts
import {
  FaBed,
  FaRulerCombined,
  FaBath,
  FaUser,
  FaChild,
} from "react-icons/fa";
import { LuBaby } from "react-icons/lu";
import { RoomSpecs } from "../_types/types"; // Assuming you'll add this type

type GetRoomSpecsParams = {
  specs: RoomSpecs;
  tRoomDescriptions: (key: string) => string;
};

export const getRoomSpecs = ({
  specs,
  tRoomDescriptions,
}: GetRoomSpecsParams) => {
  return [
    {
      icon: FaRulerCombined,
      text: `${specs.area} ${tRoomDescriptions("m²")}`,
      condition: true,
    },
    {
      icon: FaBed,
      text: `${specs.bed} × ${tRoomDescriptions(specs.bedType)}`,
      condition: true,
    },
    {
      icon: FaBath,
      text: tRoomDescriptions(specs.bathrooms === 1 ? "Bath" : "Baths"),
      condition: true,
    },
    {
      icon: FaUser,
      text:
        specs.adults === 1
          ? tRoomDescriptions("Adult")
          : `${specs.adults} ${tRoomDescriptions("Adults")}`,
      condition: true,
    },
    {
      icon: FaChild,
      text:
        specs.children === 1
          ? tRoomDescriptions("Child")
          : `${specs.children} ${tRoomDescriptions("Children")}`,
      condition: specs.children > 0,
    },
    {
      icon: LuBaby,
      text: tRoomDescriptions("Free crib"),
      condition: specs.extraBed,
    },
  ].filter((spec) => spec.condition);
};
