function SearchBox() {
  return (
    <div className="bg-white shadow-md p-4 rounded-md flex flex-wrap gap-4 justify-center mt-[-40px] mx-4 md:mx-20 relative z-10">
      <input
        className="border p-2 rounded w-full sm:w-[45%] md:w-[18%]"
        placeholder="Where are you going?"
      />
      <input
        className="border p-2 rounded w-full sm:w-[45%] md:w-[18%]"
        type="date"
      />
      <input
        className="border p-2 rounded w-full sm:w-[45%] md:w-[18%]"
        type="date"
      />
      <select className="border p-2 rounded w-full sm:w-[45%] md:w-[18%]">
        <option>2 Adults</option>
        <option>1 Adult</option>
        <option>Family</option>
      </select>
      <button className="bg-primary text-white px-6 py-2 rounded w-full sm:w-[45%] md:w-[18%]">
        Search Hotels
      </button>
    </div>
  );
}

export default SearchBox;
