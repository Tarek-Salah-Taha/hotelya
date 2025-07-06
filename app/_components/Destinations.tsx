import Image from "next/image";

function Destinations() {
  return (
    <section className="py-2 px-4 md:px-20 bg-white text-text">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
        Popular Destinations
      </h2>
      <p className="text-center mb-10">
        Discover the world&apos;s most amazing places to stay.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { city: "Paris", price: "$120", img: "/paris.jpg" },
          { city: "Tokyo", price: "$95", img: "/tokyo.jpg" },
          { city: "New York", price: "$180", img: "/newyork.jpg" },
          { city: "Cairo", price: "$75", img: "/cairo.jpg" },
        ].map(({ city, price, img }) => (
          <div key={city} className="rounded overflow-hidden shadow-md">
            <Image
              src={img}
              alt={city}
              width={500}
              height={300}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold">{city}</h3>
              <p>From {price}/night</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Destinations;
