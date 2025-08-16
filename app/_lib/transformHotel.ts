import { SupportedLang, Hotel } from "../_types/types";

// ✅ For full hotel pages
export type LocalizedHotel = Pick<
  Hotel,
  | "id"
  | "stars"
  | "rating"
  | "priceNew"
  | "priceOld"
  | "email"
  | "phone"
  | "website"
  | "checkIn"
  | "checkOut"
  | "exteriorImages"
  | "restaurantsImages"
  | "roomsImages"
> & {
  hotelName: string;
  city: string;
  country: string;
  tags: string[];
  continent: string;
  address: string;
  description: string;
  amenities: Hotel["amenities"];
  policies: Hotel["policies"];
  paymentOptions: string[];
  languagesSpoken: string[];
};

export type BookingLocalizedHotel = {
  hotelName: string;
  city: string;
  country: string;
  exteriorImages: string;
};

// List of all localized base keys
type LocalizedFieldMap = {
  hotelName: string;
  city: string;
  country: string;
  tags: string[];
  continent: string;
  address: string;
  description: string;
  amenities: Hotel["amenities"];
  policies: Hotel["policies"];
  paymentOptions: string[];
  languagesSpoken: string[];
};

// Full transform for hotel pages
export function transformHotelFields(
  hotel: Hotel,
  lang: SupportedLang
): LocalizedHotel {
  const localize = <T>(key: keyof LocalizedFieldMap): T => {
    const suffixKey = `${key}_${lang}` as keyof Hotel;
    return hotel[suffixKey] as T;
  };

  return {
    id: hotel.id,
    stars: hotel.stars,
    rating: hotel.rating,
    priceNew: hotel.priceNew,
    priceOld: hotel.priceOld,
    email: hotel.email,
    phone: hotel.phone,
    website: hotel.website,
    checkIn: hotel.checkIn,
    checkOut: hotel.checkOut,
    exteriorImages: hotel.exteriorImages,
    restaurantsImages: hotel.restaurantsImages,
    roomsImages: hotel.roomsImages,

    hotelName: localize("hotelName"),
    city: localize("city"),
    country: localize("country"),
    tags: localize("tags"),
    continent: localize("continent"),
    address: localize("address"),
    description: localize("description"),
    amenities: localize("amenities"),
    policies: localize("policies"),
    paymentOptions: localize("paymentOptions"),
    languagesSpoken: localize("languagesSpoken"),
  };
}

// Lightweight transform for bookings
export function transformBookingHotelFields(
  hotel: {
    exteriorImages?: string;
  } & {
    [K in
      | `hotelName_${SupportedLang}`
      | `city_${SupportedLang}`
      | `country_${SupportedLang}`]?: string;
  },
  lang: SupportedLang
): BookingLocalizedHotel {
  return {
    hotelName: hotel[`hotelName_${lang}`] ?? "",
    city: hotel[`city_${lang}`] ?? "",
    country: hotel[`country_${lang}`] ?? "",
    exteriorImages: hotel.exteriorImages ?? "/placeholder.jpg",
  };
}
