"use client";

import { createContext, useContext } from "react";
import { Hotel } from "../_types/types";

type HotelContextType = {
  hotel: Hotel;
};

const HotelContext = createContext<HotelContextType | null>(null);

export function useHotelContext() {
  const context = useContext(HotelContext);
  if (!context)
    throw new Error("useHotelContext must be used within <HotelProvider>");
  return context;
}

type Props = {
  hotel: Hotel;
  children: React.ReactNode;
};

export function HotelProvider({ hotel, children }: Props) {
  return (
    <HotelContext.Provider value={{ hotel }}>{children}</HotelContext.Provider>
  );
}
