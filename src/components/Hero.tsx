import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.6;
      const progress = Math.min(scrollY / heroHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate logo transformation
  const logoScale = 1 - (scrollProgress * 0.6); // Scale from 1 to 0.4
  const logoOpacity = scrollProgress >= 0.95 ? 0 : 1;
  const logoTranslateY = scrollProgress * -200; // Move upward

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-card relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-b from-transparent via-cream/20 to-transparent" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto opacity-0 animate-fade-up">
        {/* Logo - Animated on scroll */}
        <div 
          className="mb-16 transition-opacity duration-300"
          style={{
            transform: `scale(${logoScale}) translateY(${logoTranslateY}px)`,
            opacity: logoOpacity,
            transition: 'transform 0.1s ease-out, opacity 0.2s ease-out',
          }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground mb-4">
            DEENE
          </h1>
          <p className="text-spaced text-xs md:text-sm text-muted-foreground font-sans font-light uppercase">
            S O C I A L
          </p>
        </div>
        
        {/* Divider */}
        <div className="w-px h-16 bg-border mx-auto mb-12 opacity-0 animate-fade-in animation-delay-400" />
        
        {/* Tagline */}
        <p className="font-serif text-lg md:text-xl lg:text-2xl text-muted-foreground italic opacity-0 animate-fade-in animation-delay-600">
          Where authenticity leads, conversation follows.
        </p>
      </div>

      {/* Scroll indicator - Subtle arrow only */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-800">
        <ChevronDown 
          className="w-5 h-5 text-border animate-pulse" 
          strokeWidth={1}
        />
      </div>
    </section>
  );
};

export default Hero;
