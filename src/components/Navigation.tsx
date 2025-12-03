import { useState, useEffect } from "react";

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past 80vh (most of hero)
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-serif text-2xl tracking-tight text-foreground hover:opacity-70 transition-opacity"
        >
          DEENE
        </button>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-sans font-light uppercase tracking-wider"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-sans font-light uppercase tracking-wider"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("clients")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-sans font-light uppercase tracking-wider"
          >
            Clients
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors font-sans font-light uppercase tracking-wider"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
