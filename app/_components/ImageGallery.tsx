import Image from "next/image";
import { ImageGalleryProps } from "../_types/types";

function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {images.slice(0, 3).map((src, i) => (
          <div
            key={i}
            className="
              relative
              overflow-hidden
              rounded-xl
              shadow-lg
              group
              transition-all
              duration-500
              hover:shadow-xl
              hover:z-10
            "
          >
            <Image
              src={src || "/room-placeholder.jpg"}
              alt={`Gallery image ${i + 1}`}
              className="
                w-full h-64 object-cover
                transition-transform duration-700
                group-hover:scale-110
              "
              width={600}
              height={400}
              loading="lazy"
              placeholder="blur"
              blurDataURL="/room-placeholder.jpg"
            />
            <div
              className="
              absolute inset-0
              bg-gradient-to-t from-black/40 to-transparent
              opacity-0
              group-hover:opacity-100
              transition-opacity duration-500
              flex items-end p-4
            "
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
