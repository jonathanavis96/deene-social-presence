import { GalleryImage } from "@/data/galleryData";

interface CategoryGridProps {
  images: GalleryImage[];
}

const CategoryGrid = ({ images }: CategoryGridProps) => {
  // Define a pattern for mixed sizes - some images span 2 columns or 2 rows
  // This creates a visually interesting masonry-like layout
  const getGridItemClass = (index: number) => {
    // Pattern matching photos-numbered.png layout
    // Target grid: Row1=[1(2x2), 2, 3] Row2=[1(cont), 6, 5(1x2)] Row3=[7, 4(2x1), 5(cont)]
    // Order in DOM: [0]=1, [1]=2, [2]=3, [3]=6, [4]=5, [5]=7, [6]=4
    const pattern = index % 7;
    
    switch (pattern) {
      case 0:
        // Photo 1: Large square - spans 2x2 (hero image top-left)
        return "col-span-2 row-span-2";
      case 4:
        // Photo 5: Tall rectangle - spans 1x2 (right side, rows 2-3)
        return "col-span-1 row-span-2";
      case 6:
        // Photo 4: Wide rectangle - spans 2x1 (bottom row, cols 2-3)
        return "col-span-2 row-span-1";
      default:
        // Photos 2, 3, 6, 7: Standard squares - span 1x1
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
              style={{
                objectPosition: image.objectPosition,
                transform: image.scale ? `scale(${image.scale})` : undefined,
              }}
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
