import { useState, useEffect, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { GalleryCategory } from "@/data/galleryData";
import CategoryGrid from "@/components/CategoryGrid";

interface GalleryCarouselProps {
  categories: GalleryCategory[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const GalleryCarousel = ({
  categories,
  autoPlay = true,
  autoPlayInterval = 6000,
}: GalleryCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Setup autoplay plugin
  const autoplayPlugin = Autoplay({
    delay: autoPlayInterval,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  });

  // Track current slide
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (!api) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          api.scrollPrev();
          break;
        case "ArrowRight":
          event.preventDefault();
          api.scrollNext();
          break;
        case " ":
        case "Enter":
          event.preventDefault();
          setIsPaused((prev) => !prev);
          if (isPaused) {
            autoplayPlugin.play();
          } else {
            autoplayPlugin.stop();
          }
          break;
      }
    },
    [api, isPaused, autoplayPlugin]
  );

  // Pause on hover
  const handleMouseEnter = () => {
    if (autoPlay && autoplayPlugin) {
      autoplayPlugin.stop();
    }
  };

  const handleMouseLeave = () => {
    if (autoPlay && !isPaused && autoplayPlugin) {
      autoplayPlugin.play();
    }
  };

  // Navigate to specific slide
  const goToSlide = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Gallery carousel"
      aria-roledescription="carousel"
      tabIndex={0}
    >
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
          duration: 50, // Slower transition (double duration = half speed)
        }}
        plugins={autoPlay ? [autoplayPlugin] : []}
        className="w-full"
      >
        <CarouselContent>
          {categories.map((category) => (
            <CarouselItem key={category.id}>
              <div className="space-y-6">
                {/* Category title */}
                <h3 className="font-sans text-sm md:text-base text-muted-foreground uppercase tracking-wider text-center">
                  {category.title}
                </h3>

                {/* Masonry grid with CategoryGrid component */}
                <CategoryGrid images={category.images} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows - outside the grid, larger */}
        <CarouselPrevious 
          className="-left-16 md:-left-20 h-12 w-12 md:h-14 md:w-14" 
          aria-label="Previous category" 
        />
        <CarouselNext 
          className="-right-16 md:-right-20 h-12 w-12 md:h-14 md:w-14" 
          aria-label="Next category" 
        />
      </Carousel>

      {/* Dot indicators */}
      <div
        className="flex justify-center gap-2 mt-8"
        role="tablist"
        aria-label="Carousel navigation"
      >
        {categories.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              current === index
                ? "bg-accent w-8"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={current === index}
            role="tab"
          />
        ))}
      </div>

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {current + 1} of {categories.length}: {categories[current]?.title}
      </div>
    </div>
  );
};

export default GalleryCarousel;
