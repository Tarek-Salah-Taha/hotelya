function RoomInfo({
  t,
  roomType,
  tRoomTypes,
  price,
}: {
  t: (key: string) => string;
  roomType: string | null;
  tRoomTypes: (key: string) => string;
  price: number;
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
      <h3 className="font-semibold text-lg text-gray-800 mb-2">
        {t("Room Details")}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">{t("Room Type")}</p>
          <p className="font-medium">{tRoomTypes(roomType || "")}</p>
        </div>
        <div>
          <p className="text-gray-600">{t("Price Per Night")}</p>
          <p className="font-medium">
            {price} {t("$")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RoomInfo;
