import GalleryCarousel from "@/components/GalleryCarousel";
import { galleryCategories } from "@/data/galleryData";

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

        {/* Gallery Carousel */}
        <GalleryCarousel categories={galleryCategories} autoPlay={true} autoPlayInterval={10000} />
      </div>
    </section>
  );
};

export default Gallery;
