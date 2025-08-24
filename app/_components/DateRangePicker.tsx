import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { rangesOverlap } from "../_helpers/rangesOverlap";

type DateRangePickerProps = {
  startDate: Date | null;
  endDate: Date | null;
  setDates: (start: Date | null, end: Date | null) => void;
  t: (key: string) => string;
  monthsToShow: number;
  locale: string;
  bookedRanges: { start: Date; end: Date }[];
};

function DateRangePicker({
  startDate,
  endDate,
  setDates,
  t,
  monthsToShow,
  locale,
  bookedRanges,
}: DateRangePickerProps) {
  return (
    <div>
      <div className="flex items-center mb-4 space-x-2">
        <FaCalendarAlt className="text-primary mr-2" />
        <h3 className="font-semibold text-lg text-gray-800">
          {t("Select Dates")}
        </h3>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <DatePicker
          selected={startDate}
          onChange={(dates) => {
            const [start, end] = dates as [Date, Date];

            if (start && end) {
              const hasConflict = bookedRanges.some((range) =>
                rangesOverlap(start, end, range.start, range.end)
              );

              if (hasConflict) {
                setDates(null, null);
                toast.error(
                  t(
                    "Selected range includes some booked dates, please choose another range"
                  )
                );
                return;
              }
            }

            setDates(start, end);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          monthsShown={monthsToShow}
          minDate={new Date()}
          excludeDateIntervals={bookedRanges}
          renderDayContents={(day, date) => {
            const isBooked = bookedRanges.some(
              (range) => date >= range.start && date <= range.end
            );

            return (
              <span
                title={isBooked ? t("This date is already booked") : ""}
                className={isBooked ? "cursor-not-allowed" : ""}
              >
                {day}
              </span>
            );
          }}
          calendarClassName="!border-0 !p-4 !bg-white"
          dayClassName={(date) => {
            const isBooked = bookedRanges.some(
              (range) => date >= range.start && date <= range.end
            );
            return isBooked
              ? "!bg-red-200 !text-red-700 !cursor-not-allowed !rounded-md"
              : "!rounded-md hover:!bg-primary/10";
          }}
          weekDayClassName={() => "!text-gray-500 !font-normal"}
          monthClassName={() => "!text-gray-800"}
          locale={locale}
        />
      </div>
    </div>
  );
}

export default DateRangePicker;
