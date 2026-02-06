interface GalleryItem {
  category: string;
  images: string[];
}

const galleryData: GalleryItem[] = [
  {
    category: "Coffee x2",
    images: ["/placeholder-coffee-1.jpg", "/placeholder-coffee-2.jpg"],
  },
  {
    category: "Restaurants",
    images: ["/placeholder-restaurant.jpg"],
  },
  {
    category: "Accommodation",
    images: ["/placeholder-accommodation.jpg"],
  },
  {
    category: "Wine bars",
    images: ["/placeholder-winebar.jpg"],
  },
  {
    category: "Products",
    images: ["/placeholder-products.jpg"],
  },
  {
    category: "Wine Estates",
    images: ["/placeholder-wineestate.jpg"],
  },
];

const Gallery = () => {
  return (
    <section id="created" className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <p className="text-spaced text-xs text-accent font-sans uppercase tracking-widest">
            Created
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
            Created
          </h2>
        </div>

        {/* Gallery Grid - Grouped by Category */}
        <div className="space-y-16">
          {galleryData.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-6">
              {/* Category Label */}
              <h3 className="font-sans text-sm md:text-base text-muted-foreground uppercase tracking-wider">
                {group.category}
              </h3>

              {/* Images for this category */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.images.map((image, imageIndex) => (
                  <div
                    key={imageIndex}
                    className="aspect-square bg-secondary/20 rounded-sm overflow-hidden group"
                  >
                    <img
                      src={image}
                      alt={`${group.category} ${imageIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
