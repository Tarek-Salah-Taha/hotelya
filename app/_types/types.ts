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

export type Hotel = {
  id: number;
  hotelName_en: string;
  city_en: string;
  country_en: string;
  stars: number;
  rating: number;
  priceNew: number;
  priceOld: number;
  tags_en: string[];
  exteriorImages: string;

  continent_en: string;
  address_en: string;
  description_en: string;
  amenities_en: Amenities;
  policies_en: Policy;
  paymentOptions_en: string[];
  languagesSpoken_en: string[];
  email: string;
  phone: string;
  website: string;
  checkIn: string;
  checkOut: string;
  restaurantsImages: string;
  roomsImages: string[];
};

export type HotelCardData = Pick<
  Hotel,
  | "id"
  | "hotelName_en"
  | "city_en"
  | "country_en"
  | "priceNew"
  | "priceOld"
  | "exteriorImages"
  | "rating"
  | "stars"
  | "tags_en"
>;

export type HotelHeaderData = Pick<
  Hotel,
  "hotelName_en" | "city_en" | "country_en" | "rating" | "stars" | "address_en"
>;

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
