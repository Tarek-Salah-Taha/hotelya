import { RoomListingProps } from "../_types/types";
import RoomCard from "./RoomCard";
import { useTranslations } from "next-intl";

function RoomListing({ rooms, hotelName, city, country }: RoomListingProps) {
  const t = useTranslations("HotelPage");

  return (
    <div
      className="
      bg-white p-6 rounded-xl 
      border border-gray-100
      shadow-sm hover:shadow-md 
      transition-all duration-300
      group
    "
    >
      <div className="space-y-8">
        <div className="relative pb-2 mb-6 overflow-hidden">
          <h2 className="text-2xl font-semibold text-gray-800 inline-block group-hover:translate-x-1 transition-transform duration-300 rtl:group-hover:-translate-x-1">
            {t("Room Types")}
          </h2>
          <div
            className="absolute bottom-0 w-12 h-1 bg-primary rounded-full 
          scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500
          rtl:origin-right"
          />
        </div>
        <p className="text-lg text-gray-600">
          {t("Explore our comfortable accommodations")}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 pt-6">
        {rooms.map((room) => {
          const encodedRoomType = encodeURIComponent(room.roomType);

          const image = `https://jcnxjvrwruueplpsmdse.supabase.co/storage/v1/object/public/rooms/types/${encodedRoomType}.jpg?width=400&height=300&quality=70&format=webp`;

          return (
            <RoomCard
              hotelId={room.hotelId}
              roomId={room.id}
              key={room.id}
              roomType={room.roomType}
              image={image}
              priceNew={room.priceNew}
              priceOld={room.priceOld}
              specs={{
                area: room.area,
                bed: room.beds,
                bedType: room.bedType,
                bathrooms: room.bathrooms,
                adults: room.adults,
                children: room.children,
                extraBed: room.extraBed,
              }}
              roomDescription={room.roomDescription}
              hotelName={hotelName}
              city={city}
              country={country}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RoomListing;
