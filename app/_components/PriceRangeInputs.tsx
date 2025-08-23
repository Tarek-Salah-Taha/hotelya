type Props = {
  min: number;
  max: number;
  onChangeMin: (val: number) => void;
  onChangeMax: (val: number) => void;
};

export default function PriceRangeInputs({
  min,
  max,
  onChangeMin,
  onChangeMax,
}: Props) {
  return (
    <div className="flex gap-3">
      <input
        type="number"
        placeholder="Min"
        className="w-1/2 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        value={min}
        min={0}
        onChange={(e) => onChangeMin(+e.target.value)}
      />
      <input
        type="number"
        placeholder="Max"
        className="w-1/2 border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        value={max}
        min={0}
        onChange={(e) => onChangeMax(+e.target.value)}
      />
    </div>
  );
}
