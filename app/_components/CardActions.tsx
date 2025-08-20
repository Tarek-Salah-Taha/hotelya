import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import MotionButton from "./MotionButton";

export default function CardActions({
  hotelId,
  locale,
  tFavorites,
  onBookNow,
  onRemove,
}: {
  hotelId: number;
  locale: string;
  tFavorites: (key: string) => string;
  onBookNow: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <div className="flex sm:flex-row gap-5 mt-4">
      <MotionButton
        label={tFavorites("bookButton")}
        icon={locale === "ar" ? <FiArrowLeft /> : <FiArrowRight />}
        onClick={() => onBookNow(hotelId)}
        variant="primary"
      />

      <MotionButton
        label={tFavorites("Remove")}
        icon={<FaRegTrashAlt />}
        onClick={() => onRemove(hotelId)}
        variant="danger"
      />
    </div>
  );
}
