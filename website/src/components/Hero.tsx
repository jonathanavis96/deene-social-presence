import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setViewportHeight(window.innerHeight);
    }

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    const handleScroll = () => {
      const currentY = window.scrollY || window.pageYOffset || 0;
      setScrollY(currentY);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const vh = viewportHeight ?? 0;

  // --- Scroll animation logic ---
  let progress = 0;
  let logoLocked = false;

  if (vh > 0) {
    const start = 0;
    const end = vh * 0.363; // slight delay before locking
    const raw = (scrollY - start) / (end - start);
    progress = Math.min(1, Math.max(0, raw));
    logoLocked = progress >= 1;
  }

  // Scale from 1 → 0.35
  const logoScale = 1 - 0.725 * progress;

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-card relative overflow-hidden" aria-label="Hero section">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-b from-transparent via-cream/20 to-transparent" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Logo + Nav Container */}
        <header
          className={
            logoLocked
              ? "fixed top-0 left-0 right-0 z-50 py-4 bg-card/95 backdrop-blur-sm border-b border-border"
              : "relative mb-16"
          }
          style={
            logoLocked
              ? undefined
              : {
                  transform: `scale(${logoScale})`,
                  transformOrigin: "center center",
                  transition: "transform 0.08s ease-out",
                }
          }
        >
          <div
            className={
              logoLocked
                ? "flex flex-col items-center gap-3"
                : "flex flex-col items-center"
            }
          >
            {/* Logo */}
            <div className="flex flex-col items-center">
              <h1
                className={`font-serif tracking-tight text-foreground ${
                  logoLocked
                    ? "text-xl mb-0"
                    : "mb-4"
                }`}
                style={
                  logoLocked
                    ? undefined
                    : {
                        fontSize: "clamp(6rem, 15vw, 12rem)",
                        lineHeight: "1",
                      }
                }
              >
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="hover:opacity-70 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
                  aria-label="Scroll to top"
                >
                  DEENE
                </button>
              </h1>
              <p
                className={`text-muted-foreground font-sans font-light uppercase ${
                  logoLocked
                    ? "text-[10px] tracking-[0.25em]"
                    : "text-spaced text-sm md:text-lg"
                }`}
              >
                {logoLocked ? "SOCIAL" : "S O C I A L"}
              </p>
            </div>

            {/* Nav Links */}
            {logoLocked && (
              <nav
                className="
                  flex items-center justify-center
                  gap-6 sm:gap-8
                  px-4
                  opacity-0 animate-fade-in
                "
                style={{
                  animationDuration: "1s",
                  animationDelay: "0.15s",
                  animationFillMode: "forwards",
                }}
                aria-label="Main navigation"
              >
                <button
                  onClick={() =>
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors font-sans font-light uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm px-1"
                >
                  About
                </button>

                <span className="text-border" aria-hidden="true">·</span>

                <button
                  onClick={() =>
                    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors font-sans font-light uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm px-1"
                >
                  Services
                </button>

                <span className="text-border" aria-hidden="true">·</span>

                <button
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors font-sans font-light uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm px-1"
                >
                  Contact
                </button>
              </nav>
            )}
          </div>
        </header>

        {/* Spacer to prevent jump */}
        {logoLocked && <div className="mb-16 h-20" aria-hidden="true" />}

        {/* Divider */}
        <div className="w-px h-16 bg-border mx-auto mb-12 opacity-0 animate-fade-in animation-delay-400" aria-hidden="true" />

      </div>

      {/* Scroll Indicator - One continuous line with arrow */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-800" aria-hidden="true">
        <svg 
          width="24" 
          height="120" 
          viewBox="0 0 24 120" 
          fill="none" 
          className="animate-scroll-pulse"
          aria-hidden="true"
        >
          {/* Vertical line */}
          <line 
            x1="12" 
            y1="0" 
            x2="12" 
            y2="110" 
            stroke="currentColor" 
            strokeWidth="1"
            className="text-muted-foreground/30"
          />
          {/* Chevron arrow at the end (connected to line) */}
          <path 
            d="M 6 106 L 12 112 L 18 106" 
            stroke="currentColor" 
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            className="text-muted-foreground/40"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
