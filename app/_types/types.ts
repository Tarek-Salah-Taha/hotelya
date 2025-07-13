// // ------------------------
// // 🌍 Localized Utility

// import { LocalizedHotel } from "../_lib/transformHotel";

// // ------------------------
// // Remove these types:
// // - Preferences
// // - Store

// // Keep only the SupportedLang type for language selection
// export type SupportedLang = "en" | "ar" | "fr" | "de" | "es" | "it";

// export type Localized<T> = {
//   [K in keyof T as `${K & string}_${SupportedLang}`]: T[K];
// };

// // ------------------------
// // 🏨 Hotel & Room Types
// // ------------------------

// export type Policy = {
//   minAge: number;
//   petsAllowed: boolean;
//   smokingAllowed: boolean;
//   extraBedPolicy: string;
//   cancellationPolicy: string;
// };

// export type Amenities = {
//   type: string;
//   features: string[];
// };

// export type Hotel = Localized<{
//   hotelName: string;
//   city: string;
//   country: string;
//   tags: string[];
//   continent: string;
//   address: string;
//   description: string;
// }> & {
//   id: number;
//   stars: number;
//   rating: number;
//   priceNew: number;
//   priceOld: number;
//   exteriorImages: string;
//   restaurantsImages: string;
//   roomsImages: string[];

//   amenities: Amenities;
//   policies: Policy;
//   paymentOptions: string[];
//   languagesSpoken: string[];

//   email: string;
//   phone: string;
//   website: string;
//   checkIn: string;
//   checkOut: string;
// };

// export type Room = {
//   hotelId: number;
//   id: number;
//   roomType: string;
//   area: number;
//   beds: number;
//   bathrooms: number;
//   adults: number;
//   children: number;
//   priceOld: number;
//   priceNew: number;
//   bedType: string;
//   roomDescription: string;
//   extraBed: boolean;
// };

// // ------------------------
// // 🛎️ UI Component Props
// // ------------------------

// export type HotelCardData = Pick<
//   Hotel,
//   "id" | "priceNew" | "priceOld" | "exteriorImages" | "rating" | "stars"
// > & {
//   [K in
//     | `hotelName_${SupportedLang}`
//     | `city_${SupportedLang}`
//     | `country_${SupportedLang}`
//     | `tags_${SupportedLang}`]: string | string[];
// };

// export type HotelHeaderData = Pick<
//   Hotel,
//   | `hotelName_${SupportedLang}`
//   | `city_${SupportedLang}`
//   | `country_${SupportedLang}`
//   | `address_${SupportedLang}`
//   | "stars"
//   | "rating"
// >;

// export type HotelCardProps = {
//   hotels: HotelCardData[];
//   currentPage: number;
//   totalPages: number;
//   basePath: string;
//   destination?: string;
// };

// export type HotelCardItemProps = {
//   hotel: HotelCardData;
// };

// export type HotelPageProps = {
//   hotel: LocalizedHotel;
//   rooms: Room[];
// };

// export type HotelPoliciesProps = {
//   policies: Policy[];
//   checkIn: string;
//   checkOut: string;
// };

// export type HotelAmenitiesProps = {
//   amenities: Amenities[];
// };

// export type HotelReviewsProps = {
//   hotelId: string;
//   initialReviews: Review[];
// };

// export type RoomCardProps = {
//   hotelId: number;
//   roomId: number;
//   roomType: string;
//   image: string;
//   priceNew: number;
//   priceOld?: number;
//   specs: {
//     area: number;
//     bed: number;
//     bedType: string;
//     bathrooms: number;
//     adults: number;
//     children: number;
//     extraBed: boolean;
//   };
//   roomDescription: string;
// };

// export type RoomListingProps = {
//   rooms: Room[];
// };

// export type StarRatingProps = {
//   rating: number;
//   setRating: (rating: number) => void;
// };

// export type ImageGalleryProps = {
//   images: string[];
// };

// // ------------------------
// // 📝 Reviews
// // ------------------------

// export type Review = {
//   id: string;
//   hotelId: string;
//   author: string;
//   rating: number;
//   comment: string;
//   date: string;
// };

// // ------------------------
// // 📅 Booking
// // ------------------------

// export type Booking = {
//   id: string;
//   checkInDate: string;
//   checkOutDate: string;
//   hotel?: Partial<Pick<Hotel, "exteriorImages">> &
//     Partial<
//       Pick<
//         Hotel,
//         | `hotelName_${SupportedLang}`
//         | `city_${SupportedLang}`
//         | `country_${SupportedLang}`
//       >
//     >;
// };

// // ------------------------
// // 👤 User / Auth
// // ------------------------

// export type FormValues = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   mobile: string;
//   dateOfBirth: string | null;
//   gender: string;
//   city: string;
//   country: string;
//   avatarUrl?: string;
// };

// export type RegisterData = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// };

// export type LoginData = {
//   email: string;
//   password: string;
// };

// // ------------------------
// // ⚙️ Preferences / Store
// // ------------------------

// export type Preferences = {
//   country: string;
//   currency: string;
//   language: SupportedLang;
//   flag?: string;
// };

// export type Store = {
//   preferences: Preferences;
//   setPreferences: (prefs: Preferences) => void;
// };

// // ------------------------
// // 💡 Suggestions
// // ------------------------

// export type Suggestion = string;

// export type HotelSuggestion = {
//   [key: string]: string | null;
// };

// // ------------------------
// // 🔑 Icon Keys
// // ------------------------

// export type IconKey =
//   | "FaWifi"
//   | "FaParking"
//   | "FaSnowflake"
//   | "FaSortAmountUpAlt"
//   | "FaBed"
//   | "FaBriefcase"
//   | "FaBolt"
//   | "FaCoffee"
//   | "FaDumbbell"
//   | "FaSpa"
//   | "FaSwimmingPool"
//   | "FaUmbrellaBeach"
//   | "FaShuttleVan"
//   | "FaSoap"
//   | "FaWheelchair"
//   | "MdRoomService"
//   | "MdAccessTime"
//   | "MdTv"
//   | "MdRestaurant"
//   | "MdFreeBreakfast"
//   | "MdPets"
//   | "MdAccessible"
//   | "MdFamilyRestroom"
//   | "RiSafe2Line"
//   | "GiHotSurface"
//   | "GiSuitcase"
//   | "GiKidSlide";

// export type Tag = {
//   icon: IconKey;
//   label: string;
// };

// ------------------------
// 🌍 Localized Utility

import { LocalizedHotel } from "../_lib/transformHotel";

// ------------------------
export type SupportedLang = "en" | "ar" | "fr" | "de" | "es" | "it";

export type Localized<T> = {
  [K in keyof T as `${K & string}_${SupportedLang}`]: T[K];
};

// ------------------------
// 🏨 Hotel & Room Types
// ------------------------

export type Policy = {
  minAge: number;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  extraBedPolicy: string;
  cancellationPolicy: string;
};

export type Amenities = {
  type: string;
  features: string[];
};

export type Hotel = Localized<{
  hotelName: string;
  city: string;
  country: string;
  tags: string[];
  continent: string;
  address: string;
  description: string;
}> & {
  id: number;
  stars: number;
  rating: number;
  priceNew: number;
  priceOld: number;
  exteriorImages: string;
  restaurantsImages: string;
  roomsImages: string[];

  amenities: Amenities;
  policies: Policy;
  paymentOptions: string[];
  languagesSpoken: string[];

  email: string;
  phone: string;
  website: string;
  checkIn: string;
  checkOut: string;
};

export type Room = {
  hotelId: number;
  id: number;
  roomType: string;
  area: number;
  beds: number;
  bathrooms: number;
  adults: number;
  children: number;
  priceOld: number;
  priceNew: number;
  bedType: string;
  roomDescription: string;
  extraBed: boolean;
};

// ------------------------
// 🛎️ UI Component Props
// ------------------------

export type HotelCardData = {
  id: number;
  hotelName: string;
  city: string;
  country: string;
  tags?: string[];
  exteriorImages: string;
  priceNew: number;
  priceOld: number;
  stars: number;
  rating: number;
};

export type HotelHeaderData = {
  hotelName: string;
  city: string;
  country: string;
  address: string;
  stars: number;
  rating: number;
};

export type HotelCardProps = {
  hotels: HotelCardData[];
  currentPage: number;
  totalPages: number;
  basePath: string;
  destination?: string;
};

export type HotelCardItemProps = {
  hotel: HotelCardData;
};

export type HotelPageProps = {
  hotel: LocalizedHotel;
  rooms: Room[];
};

export type HotelPoliciesProps = {
  policies: Policy[];
  checkIn: string;
  checkOut: string;
};

export type HotelAmenitiesProps = {
  amenities: Amenities[];
};

export type HotelReviewsProps = {
  hotelId: string;
  initialReviews: Review[];
};

export type RoomCardProps = {
  hotelId: number;
  roomId: number;
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

export type RoomListingProps = {
  rooms: Room[];
};

export type StarRatingProps = {
  rating: number;
  setRating: (rating: number) => void;
};

export type ImageGalleryProps = {
  images: string[];
};

// ------------------------
// 📝 Reviews
// ------------------------

export type Review = {
  id: string;
  hotelId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

// ------------------------
// 📅 Booking
// ------------------------

export type Booking = {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  hotel?: {
    exteriorImages: string;
  } & {
    [K in
      | `hotelName_${SupportedLang}`
      | `city_${SupportedLang}`
      | `country_${SupportedLang}`]?: string;
  };
};

// ------------------------
// 👤 User / Auth
// ------------------------

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dateOfBirth: string | null;
  gender: string;
  city: string;
  country: string;
  avatarUrl?: string;
};

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

// ------------------------
// ⚙️ Preferences / Store
// ------------------------

export type Preferences = {
  country: string;
  currency: string;
  language: SupportedLang;
  flag?: string;
};

export type Store = {
  preferences: Preferences;
  setPreferences: (prefs: Preferences) => void;
};

// ------------------------
// 💡 Suggestions
// ------------------------

export type Suggestion = string;

export type HotelSuggestion = {
  [key: string]: string | null;
};

// ------------------------
// 🔑 Icon Keys
// ------------------------

export type IconKey =
  | "FaWifi"
  | "FaParking"
  | "FaSnowflake"
  | "FaSortAmountUpAlt"
  | "FaBed"
  | "FaBriefcase"
  | "FaBolt"
  | "FaCoffee"
  | "FaDumbbell"
  | "FaSpa"
  | "FaSwimmingPool"
  | "FaUmbrellaBeach"
  | "FaShuttleVan"
  | "FaSoap"
  | "FaWheelchair"
  | "MdRoomService"
  | "MdAccessTime"
  | "MdTv"
  | "MdRestaurant"
  | "MdFreeBreakfast"
  | "MdPets"
  | "MdAccessible"
  | "MdFamilyRestroom"
  | "RiSafe2Line"
  | "GiHotSurface"
  | "GiSuitcase"
  | "GiKidSlide";

export type Tag = {
  icon: IconKey;
  label: string;
};
