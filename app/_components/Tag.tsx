function Tag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
      {label}
      <button onClick={onRemove} className="text-gray-500 hover:text-red-500">
        &times;
      </button>
    </span>
  );
}

export default Tag;
