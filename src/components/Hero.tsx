import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [logoLocked, setLogoLocked] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;

      const heroHeight = heroRef.current.offsetHeight || window.innerHeight;
      // Distance over which the logo should move/shrink
      const lockDistance = heroHeight * 0.5; // tweakable: 0.4–0.6 range
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / lockDistance, 1);

      setScrollProgress(progress);
      setLogoLocked(progress >= 1);
    };

    handleScroll(); // initialise on load
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scale from 1 → 0.6 as we scroll, never smaller than 0.6
  const logoScale = Math.max(0.6, 1 - scrollProgress * 0.4);

  // Move the logo upward as we scroll (in px)
  // 0 at start, up to -120px when fully locked
  const logoTranslateY = -scrollProgress * 120;

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-card relative overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-b from-transparent via-cream/20 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto opacity-0 animate-fade-up">
        {/* Logo + Nav container */}
        <div
          className={`mb-16 ${
            logoLocked
              ? "fixed top-0 left-0 right-0 z-50 py-4 bg-card/95 backdrop-blur-sm border-b border-border"
              : ""
          }`}
          style={
            logoLocked
              ? undefined
              : {
                  transform: `scale(${logoScale}) translateY(${logoTranslateY}px)`,
                  transition: "transform 0.05s ease-out",
                }
          }
        >
          <div
            className={
              logoLocked
                ? "max-w-5xl mx-auto px-8 flex items-center justify-between"
                : "flex flex-col items-center text-center"
            }
          >
            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className={`flex flex-col items-center hover:opacity-70 transition-opacity ${
                logoLocked ? "cursor-pointer" : ""
              }`}
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

            {/* Nav links - only when locked */}
            {logoLocked && (
              <nav
                className="flex items-center gap-8 opacity-0 animate-fade-in"
                style={{
                  animationDuration: "0.5s",
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

        {/* Spacer when logo is locked to prevent content jump */}
        {logoLocked && <div className="mb-16 h-20" />}

        {/* Divider */}
        <div className="w-px h-16 bg-border mx-auto mb-12 opacity-0 animate-fade-in animation-delay-400" />

        {/* Tagline */}
        <p className="text-center font-serif text-lg md:text-xl lg:text-2xl text-muted-foreground italic opacity-0 animate-fade-in animation-delay-600">
          Where authenticity leads, conversation follows.
        </p>
      </div>

      {/* Scroll indicator - clearer line + chevron with pulse */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-800 flex flex-col items-center">
        <div className="w-px h-10 bg-muted-foreground/50 animate-scroll-pulse" />
        <ChevronDown
          className="w-5 h-5 text-muted-foreground/70 -mt-1 animate-scroll-pulse"
          strokeWidth={1.5}
        />
      </div>
    </section>
  );
};

export default Hero;
