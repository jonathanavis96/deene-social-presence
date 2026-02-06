const ClientLogos = () => {
  const placeholders = Array(6).fill(null);

  return (
    <section id="clients" className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-spaced text-xs text-accent font-sans uppercase tracking-widest">
            Trusted By
          </p>
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
          {placeholders.map((_, index) => (
            <div
              key={index}
              className="aspect-[3/2] bg-secondary/30 flex items-center justify-center hover:bg-secondary/50 transition-colors duration-300"
            >
              <span className="text-muted-foreground/50 font-sans text-xs tracking-wide">
                Logo
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
