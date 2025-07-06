import Image from "next/image";

type ImageGalleryProps = {
  images: string[];
};

function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {images.slice(0, 3).map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Gallery image ${i + 1}`}
            className="w-full h-64 object-cover rounded-xl shadow"
            width={600}
            height={400}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
