import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

type DateRangePickerProps = {
  startDate: Date | null;
  endDate: Date | null;
  setDates: (start: Date | null, end: Date | null) => void;
  t: (key: string) => string;
  monthsToShow: number;
  locale: string;
};

function DateRangePicker({
  startDate,
  endDate,
  setDates,
  t,
  monthsToShow,
  locale,
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
            setDates(start, end);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
          monthsShown={monthsToShow}
          minDate={new Date()}
          calendarClassName="!border-0 !p-4 !bg-white"
          dayClassName={() => "!rounded-md hover:!bg-primary/10"}
          weekDayClassName={() => "!text-gray-500 !font-normal"}
          monthClassName={() => "!text-gray-800"}
          locale={locale}
        />
      </div>
    </div>
  );
}

export default DateRangePicker;
