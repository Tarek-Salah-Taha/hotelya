import { Hotel, Room } from "../_types/types";
import ContactInformation from "./ContactInformation";
import HotelAmenities from "./HotelAmenities";
import HotelHeader from "./HotelHeader";
import HotelOverview from "./HotelOverview";
import HotelPolicies from "./HotelPolicies";
import HotelPopularAmenities from "./HotelPopularAmenities";
import ImageGallery from "./ImageGallery";
import LanguagesSpoken from "./LanguagesSpoken";
import PaymentOptions from "./PaymentOptions";
import RoomListing from "./RoomListing";

type HotelPageProps = {
  hotel: Hotel;
  rooms: Room[];
};

function HotelPage({ hotel, rooms }: HotelPageProps) {
  const allImages = [
    hotel.exteriorImages,
    hotel.roomsImages,
    hotel.restaurantsImages,
  ].flat();

  return (
    <div className="space-y-6">
      <HotelHeader hotel={hotel} />
      <ImageGallery images={allImages} />
      <HotelOverview description={hotel.description_en} />
      <HotelPopularAmenities tags={hotel.tags_en} />
      <HotelAmenities
        amenities={
          Array.isArray(hotel.amenities_en)
            ? hotel.amenities_en
            : [hotel.amenities_en]
        }
      />
      <RoomListing rooms={rooms} />
      <ContactInformation hotel={hotel} />
      <HotelPolicies
        policies={
          Array.isArray(hotel.policies_en)
            ? hotel.policies_en
            : [hotel.policies_en]
        }
        checkIn={hotel.checkIn}
        checkOut={hotel.checkOut}
      />

      <PaymentOptions payment={hotel.paymentOptions_en} />
      <LanguagesSpoken languages={hotel.languagesSpoken_en} />
    </div>
  );
}
export default HotelPage;
