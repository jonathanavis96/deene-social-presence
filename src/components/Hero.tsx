const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-card relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-b from-transparent via-cream/20 to-transparent" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto opacity-0 animate-fade-up">
        {/* Logo */}
        <div className="mb-16">
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

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-800 flex flex-col items-center gap-3">
        <p className="text-xs text-muted-foreground font-sans font-light uppercase tracking-widest">Scroll</p>
        <div className="w-px h-12 bg-border animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
