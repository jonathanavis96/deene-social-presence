const ClientLogos = () => {
  // Array of logo filenames (15 logos available)
  const logos = Array.from({ length: 15 }, (_, i) => `logo-${String(i + 1).padStart(2, '0')}.svg`);

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
          {logos.map((logo, index) => (
            <div
              key={index}
              className="aspect-[3/2] flex items-center justify-center p-4"
            >
              <img
                src={`/logos/${logo}`}
                alt={`Client logo ${index + 1}`}
                className="logo-embossed w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
