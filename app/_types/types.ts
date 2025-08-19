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
  roomsImages: string;

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
  area: number;
  beds: number;
  bathrooms: number;
  adults: number;
  children: number;
  priceOld: number;
  priceNew: number;
  roomType: string;
  roomDescription: string;
  extraBed: boolean;
  bedType: string;
};

export type HotelFilterData = {
  id: string;
  continent: string;
  country: string;
  city: string;
  priceNew: number;
  rating: number;
  stars: number;
  paymentOptions: string[];
  languagesSpoken: string[];
  amenities: string[];
  policies: string[];
  tags: string[];
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
  paymentOptions?: string[];
  languagesSpoken?: string[];
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
  onPageChange?: (page: number) => void; // for client-side pagination
};

export type HotelCardItemProps = {
  hotel: HotelCardData;
};

export type HotelFilterParams = {
  continent: string[];
  country: string;
  city: string;
  minPrice: number;
  maxPrice: number;
  ratingLabels: string[];
  stars: number[];
  paymentOptions: string[];
  languagesSpoken: string[];
};

export type HotelPageProps = {
  hotel: LocalizedHotel;
  rooms: Room[];
};

export type HotelPoliciesProps = {
  policies: Policy;
  checkIn: string;
  checkOut: string;
};

export type HotelAmenitiesProps = {
  amenities: Amenities[];
};

export type HotelReviewsProps = {
  hotelId: number;
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
  hotelName: string;
  city: string;
  country: string;
};

export type RoomListingProps = {
  rooms: Room[];
  hotelName: string;
  city: string;
  country: string;
};

export type RoomData = {
  id: number;
  hotelId: number;
  roomType: string;
  priceNew: number;
  hotel:
    | {
        [key: string]: string;
      }
    | Array<{
        [key: `${string}_${SupportedLang}`]: string;
      }>;
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
  id: number;
  hotelId: number;
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
  hotelId: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  numAdults: number;
  numChildren: number;
  totalPrice: number;
  totalNights: number;
  createdAt: string;
  roomType: string;
  priceNew: number;
  hotel: {
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

export type UserProfile = {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
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
  | "FaBed"
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
  | "MdFoodBank"
  | "MdPets"
  | "MdAccessible"
  | "MdFamilyRestroom"
  | "RiSafe2Line"
  | "GiHotSurface"
  | "GiSuitcase"
  | "GiKidSlide";

export type Tag = {
  icon: IconKey;
  labels: string[];
};

export type BookingTab = "upcoming" | "past";
export type BookingSort = "latest" | "oldest" | "name";
export type BookingStatusFilter = "all" | "confirmed" | "cancelled";

export type PaymentOptionProps = {
  payment: string[];
};

export type AmenityBadgeProps = {
  label: string;
  bg: string;
  text: string;
  hover: string;
  key: number;
};

export type RoomSpecs = {
  area: number;
  bed: number;
  bedType: string;
  bathrooms: number;
  adults: number;
  children: number;
  extraBed: boolean;
};

export type FeatureCardProps = {
  icon: string;
  title: string;
  description: string;
};

export type FeatureItem = {
  icon: string;
  titleKey: string;
  descriptionKey: string;
};
