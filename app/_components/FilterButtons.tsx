import { IoMdSearch } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";
import MotionButton from "./MotionButton";

type FilterButtonsProps = {
  onApply: () => void;
  onReset: () => void;
  applyLabel: string;
  resetLabel: string;
};

export default function FilterButtons({
  onApply,
  onReset,
  applyLabel,
  resetLabel,
}: FilterButtonsProps) {
  return (
    <div className="mt-6 flex flex-col gap-3">
      <MotionButton
        label={applyLabel}
        onClick={onApply}
        variant="primary"
        icon={<IoMdSearch />}
        className="w-full"
      />

      <MotionButton
        label={resetLabel}
        onClick={onReset}
        variant="danger"
        icon={<VscDebugRestart />}
        className="w-full"
      />
    </div>
  );
}
