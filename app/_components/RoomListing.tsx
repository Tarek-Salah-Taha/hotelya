import { Room } from "../_types/types";
import RoomCard from "./RoomCard";

type RoomListingProps = {
  rooms: Room[];
};

function RoomListing({ rooms }: RoomListingProps) {
  return (
    <div className="space-y-6 mt-6 p-6">
      <h2 className="text-xl font-semibold mb-4 text-text">Room Types</h2>
      {rooms.map((room) => {
        const encodedRoomType = encodeURIComponent(room.roomType);
        const image = `https://jcnxjvrwruueplpsmdse.supabase.co/storage/v1/object/public/rooms/types/${encodedRoomType}.jpg`;

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
          />
        );
      })}
    </div>
  );
}

export default RoomListing;
