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
  // We only shrink the logo (no vertical movement).
  // Shrink happens between scroll 0 and ~40% of the viewport height.
  let progress = 0;
  let logoLocked = false;

  if (vh > 0) {
    const start = 0;
    const end = vh * 0.363; // scroll a tiny bit more before locking (was 0.35)
    const raw = (scrollY - start) / (end - start);
    progress = Math.min(1, Math.max(0, raw));
    logoLocked = progress >= 1;
  }

  // Scale from 1 → 0.35 as you scroll (slightly smaller nav logo than before)
  const logoScale = 1 - 0.725 * progress; // was 0.6 → now min scale is 0.35

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-card relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-b from-transparent via-cream/20 to-transparent" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Logo & Nav container */}
        <div
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
            {/* Logo (same element for hero + nav) */}
            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="flex flex-col items-center hover:opacity-70 transition-opacity cursor-pointer"
            >
              <h1
                className={`font-serif tracking-tight text-foreground ${
                  logoLocked
                    ? "text-xl mb-0"
                    : "text-5xl md:text-7xl lg:text-8xl mb-4"
                }`}
              >
                DEENE
              </h1>
              <p
                className={`text-muted-foreground font-sans font-light uppercase ${
                  logoLocked
                    ? "text-[8px] tracking-[0.25em]"
                    : "text-spaced text-xs md:text-sm"
                }`}
              >
                {logoLocked ? "SOCIAL" : "S O C I A L"}
              </p>
            </button>

            {/* Nav links – only visible once logo is locked */}
            {logoLocked && (
              <nav
                className="flex items-center gap-8 opacity-0 animate-fade-in"
                style={{
                  animationDuration: "1s",      // slower fade-in
                  animationDelay: "0.15s",      // small delay so it feels smoother
                  animationFillMode: "forwards",
                }}
              >
                <button
                  onClick={() =>
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors font-sans font-light uppercase tracking-wider"
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
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors font-sans font-light uppercase tracking-wider"
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
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors font-sans font-light uppercase tracking-wider"
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
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors font-sans font-light uppercase tracking-wider"
                >
                  Contact
                </button>
              </nav>
            )}
          </div>
        </div>

        {/* Spacer to prevent jump when the nav becomes fixed */}
        {logoLocked && <div className="mb-16 h-20" />}

        {/* Divider under hero logo */}
        <div className="w-px h-16 bg-border mx-auto mb-12 opacity-0 animate-fade-in animation-delay-400" />

        {/* Tagline */}
        <p className="font-serif text-lg md:text-xl lg:text-2xl text-muted-foreground italic opacity-0 animate-fade-in animation-delay-600">
          Where authenticity leads, conversation follows.
        </p>
      </div>

      {/* Scroll indicator – line + pulsing chevron */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-800 flex flex-col items-center">
        <div className="w-px h-10 md:h-12 bg-muted-foreground/40 animate-scroll-pulse" />
        <ChevronDown
          className="w-4 h-4 text-muted-foreground/70 -mt-1 animate-scroll-pulse"
          strokeWidth={1.5}
        />
      </div>
    </section>
  );
};

export default Hero;
