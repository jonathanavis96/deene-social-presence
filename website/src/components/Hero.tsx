import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [reservedHeaderHeight, setReservedHeaderHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setViewportHeight(window.innerHeight);
      const measuredHeight = headerRef.current?.offsetHeight ?? 0;
      setHeaderHeight(measuredHeight);
      if (measuredHeight > 0) {
        setReservedHeaderHeight((prev) => (prev ? Math.max(prev, measuredHeight) : measuredHeight));
      }
    }

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      const measuredHeight = headerRef.current?.offsetHeight ?? 0;
      setHeaderHeight(measuredHeight);
      if (measuredHeight > 0) {
        setReservedHeaderHeight((prev) => (prev ? Math.max(prev, measuredHeight) : measuredHeight));
      }
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
    <section className="min-h-screen flex flex-col justify-center items-center px-6 pb-[30px] bg-card relative overflow-hidden" aria-label="Hero section">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-b from-transparent via-cream/20 to-transparent" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Logo + Nav Container */}
        <div
          className="w-full mt-80 mb-16"
          ref={headerRef}
          style={{ minHeight: reservedHeaderHeight || headerHeight || undefined }}
        >
          <header
            className={
              logoLocked
                ? "fixed top-0 left-0 right-0 z-50 py-4 bg-card/95 backdrop-blur-sm border-b border-border"
                : "relative"
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
            <nav
              className={`
                flex items-center justify-center
                gap-6 sm:gap-8
                px-4
                transition-opacity duration-500
                ${logoLocked ? "opacity-100" : "opacity-0 pointer-events-none"}
              `}
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
          </div>
        </header>
        </div>

      </div>

      {/* Vertical line with downward chevron - outside header, scrolls naturally */}
      <div
        className="flex flex-col items-center opacity-0 animate-fade-in animation-delay-400 relative mt-auto md:mt-0"
        style={{
          marginBottom: "30px",
          marginTop: "auto",
        }}
        aria-hidden="true"
      >
        <div className="w-px bg-border/30 relative overflow-hidden h-[200px] md:h-[280px]">
          {/* Traveling dark pulse that widens the line */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-b from-transparent via-border to-transparent"
            style={{ 
              height: '40px',
              width: '3px',
              filter: 'brightness(0.6)',
              animation: 'scroll-pulse-line 15s linear infinite'
            }}
          />
        </div>
        <div className="relative -mt-1">
          {/* Base chevron (lighter) */}
          <ChevronDown
            className="w-4 h-4 text-border"
            strokeWidth={1.5}
            style={{ opacity: 0.3 }}
          />
          {/* Darkened pulse overlay on chevron */}
          <ChevronDown 
            className="w-4 h-4 text-border absolute top-0 left-0" 
            strokeWidth={1.5}
            style={{ 
              filter: 'brightness(0.6)',
              animation: 'scroll-pulse-chevron 15s linear infinite',
              opacity: 0
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
