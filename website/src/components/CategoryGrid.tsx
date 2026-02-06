import { GalleryImage } from "@/data/galleryData";

interface CategoryGridProps {
  images: GalleryImage[];
}

const CategoryGrid = ({ images }: CategoryGridProps) => {
  // Define a pattern for mixed sizes - some images span 2 columns or 2 rows
  // This creates a visually interesting masonry-like layout
  const getGridItemClass = (index: number) => {
    // Pattern: every 3rd and 4th image are larger (span 2 units)
    // This creates a balanced masonry effect
    const pattern = index % 7;
    
    switch (pattern) {
      case 0:
        // Large square - spans 2x2
        return "col-span-2 row-span-2";
      case 3:
        // Wide rectangle - spans 2x1
        return "col-span-2 row-span-1";
      case 5:
        // Tall rectangle - spans 1x2
        return "col-span-1 row-span-2";
      default:
        // Standard square - spans 1x1
        return "col-span-1 row-span-1";
    }
  };

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4 md:gap-6"
      role="list"
      aria-label="Gallery images"
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={`${getGridItemClass(index)} overflow-hidden rounded-sm group relative`}
          role="listitem"
        >
          {/* Container with subtle shadow */}
          <div className="relative w-full h-full shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Subtle overlay on hover for interactivity */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
