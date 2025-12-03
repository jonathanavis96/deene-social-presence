import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // How far the user must scroll before the logo is fully "locked" in the nav
      const threshold = window.innerHeight * 0.5; // half a viewport
      const progress = clamp(window.scrollY / threshold, 0, 1);
      setScrollProgress(progress);
    };

    handleScroll(); // set initial value
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ----- Logo + nav animation values -----

  // Scale from 1 (hero) down to 0.35 (nav size)
  const logoScale = 1 - scrollProgress * 0.65; // 1 → 0.35

  // Move the logo upwards as you scroll, from centered to the nav position
  // We start roughly in the center of the screen and move up by ~40% of viewport
  const translateUp = window.innerHeight * 0.4;
  const logoTranslateY = -(scrollProgress * translateUp);

  // When progress is 0 → hero logo is big and centered, no nav bar
  // When progress is 1 → logo is shrunk, at the top in the nav bar
  const navVisible = scrollProgress > 0.1; // small delay before nav frame appears
  const navOpacity = clamp((scrollProgress - 0.3) / 0.7, 0, 1); // fade in links

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-card overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-b from-transparent via-cream/20 to-transparent" />

      {/* Fixed logo + nav wrapper (one place where the logo lives) */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div
          className="flex justify-center pointer-events-none"
          style={{
            transform: `translateY(${logoTranslateY}px) scale(${logoScale})`,
            transformOrigin: "top center",
            transition: "transform 0.08s ease-out",
          }}
        >
          {/* This inner bar becomes the nav when we reach the top */}
          <div
            className={`flex items-center gap-12 px-6 ${
              navVisible ? "py-4 bg-card/95 backdrop-blur-sm border-b border-border" : ""
            } pointer-events-auto`}
          >
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex flex-col items-center hover:opacity-70 transition-opacity"
            >
              <h1 className="font-serif tracking-tight text-foreground text-5xl md:text-7xl lg:text-8xl mb-4">
                DEENE
              </h1>
              <p className="text-muted-foreground font-sans font-light uppercase text-xs md:text-sm tracking-[0.35em]">
                S O C I A L
              </p>
            </button>

            {/* Nav links – fade in as the logo reaches the nav position */}
            <nav
              className="hidden md:flex items-center gap-8 text-xs font-sans font-light uppercase tracking-wider"
              style={{
                opacity: navOpacity,
                transition: "opacity 0.25s ease-out",
              }}
            >
              <button
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </button>
              <span className="text-border">·</span>
              <button
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Services
              </button>
              <span className="text-border">·</span>
              <button
                onClick={() =>
                  document
                    .getElementById("clients")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Clients
              </button>
              <span className="text-border">·</span>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main hero content (centered) */}
      <div className="relative z-10 text-center max-w-4xl mx-auto mt-32 opacity-0 animate-fade-up">
        {/* Spacer so that the centered logo doesn't overlap the tagline */}
        <div className="h-40 md:h-48" />

        {/* Divider */}
        <div className="w-px h-16 bg-border mx-auto mb-12 opacity-0 animate-fade-in animation-delay-400" />

        {/* Tagline */}
        <p className="font-serif text-lg md:text-xl lg:text-2xl text-muted-foreground italic opacity-0 animate-fade-in animation-delay-600">
          Where authenticity leads, conversation follows.
        </p>
      </div>

      {/* Scroll indicator - line + chevron with pulse */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-800 flex flex-col items-center">
        <div className="w-px h-8 bg-muted-foreground/40 animate-scroll-pulse" />
        <ChevronDown
          className="w-4 h-4 text-muted-foreground/60 -mt-1 animate-scroll-pulse"
          strokeWidth={1.5}
        />
      </div>
    </section>
  );
};

export default Hero;
