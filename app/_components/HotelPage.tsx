import { HotelPageProps } from "../_types/types";
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

function HotelPage({ hotel, rooms }: HotelPageProps) {
  const allImages = [
    hotel.exteriorImages,
    hotel.roomsImages,
    hotel.restaurantsImages,
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      <HotelHeader hotel={hotel} />
      <ImageGallery images={allImages} />
      <HotelOverview description={hotel.description} />
      <HotelPopularAmenities tags={hotel.tags} />
      <HotelAmenities amenities={hotel.amenities} />
      <RoomListing
        rooms={rooms}
        hotelName={hotel.hotelName}
        city={hotel.city}
        country={hotel.country}
      />
      <ContactInformation hotel={hotel} />
      <HotelPolicies
        policies={hotel.policies}
        checkIn={hotel.checkIn}
        checkOut={hotel.checkOut}
      />
      <PaymentOptions payment={hotel.paymentOptions} />
      <LanguagesSpoken languages={hotel.languagesSpoken} />
    </div>
  );
}

export default HotelPage;
