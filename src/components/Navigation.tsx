import { useState, useEffect } from "react";

const Navigation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navVisible, setNavVisible] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.6;
      const progress = Math.min(scrollY / heroHeight, 1);
      setScrollProgress(progress);
      
      // Show nav bar when scroll progress reaches threshold
      const shouldShowNav = progress >= 0.85;
      setNavVisible(shouldShowNav);
      
      // Delay links appearing slightly after nav
      if (shouldShowNav && !linksVisible) {
        setTimeout(() => setLinksVisible(true), 150);
      } else if (!shouldShowNav) {
        setLinksVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [linksVisible]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Logo scale in nav (starts small, becomes normal as it "arrives")
  const logoScale = 0.4 + (scrollProgress * 0.6);
  const logoOpacity = scrollProgress >= 0.85 ? 1 : scrollProgress * 1.2;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border transition-all duration-500 ease-out ${
        navVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">
        {/* Centered container for logo and links */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-center hover:opacity-70 transition-opacity"
            style={{
              transform: `scale(${logoScale})`,
              opacity: logoOpacity,
              transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
            }}
          >
            <span className="font-serif text-xl tracking-tight text-foreground">
              DEENE
            </span>
            <span className="text-[8px] text-muted-foreground font-sans font-light uppercase tracking-[0.25em]">
              SOCIAL
            </span>
          </button>

          {/* Navigation Links */}
          <div 
            className={`flex items-center gap-8 transition-all duration-500 ease-out ${
              linksVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
          >
            <button
              onClick={() => scrollToSection("about")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors font-sans font-light uppercase tracking-wider"
            >
              About
            </button>
            <span className="text-border">·</span>
            <button
              onClick={() => scrollToSection("services")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors font-sans font-light uppercase tracking-wider"
            >
              Services
            </button>
            <span className="text-border">·</span>
            <button
              onClick={() => scrollToSection("clients")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors font-sans font-light uppercase tracking-wider"
            >
              Clients
            </button>
            <span className="text-border">·</span>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors font-sans font-light uppercase tracking-wider"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
