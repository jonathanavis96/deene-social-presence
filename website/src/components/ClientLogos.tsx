interface ClientLogosProps {
  /** Set to false to disable color hover effect. Defaults to true. */
  enableColorReveal?: boolean;
}

/**
 * ClientLogos component displays a grid of client logos with optional color reveal on hover.
 *
 * @param enableColorReveal - When true (default), logos transition from monochrome to color on hover.
 *                            Set to false to keep logos monochrome on hover.
 */
const ClientLogos = ({ enableColorReveal = true }: ClientLogosProps) => {
  const baseUrl = import.meta.env.BASE_URL;

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
          {logos.map((logo, index) => {
            const logoName = logo.replace('.svg', '');
            const monoPath = `${baseUrl}logos/${logo}`;
            const colorPath = `${baseUrl}logos/_colored/${logoName}-color.svg`;

            return (
              <div
                key={index}
                className="aspect-[3/2] flex items-center justify-center p-4 relative transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg"
              >
                {enableColorReveal ? (
                  <>
                    {/* Monochrome base layer */}
                    <img
                      src={monoPath}
                      alt={`Client logo ${index + 1}`}
                      className="logo-embossed w-full h-full object-contain opacity-60 transition-opacity duration-300 absolute inset-0 p-4"
                    />
                    {/* Color layer (revealed on hover) */}
                    <img
                      src={colorPath}
                      alt={`Client logo ${index + 1}`}
                      className="logo-embossed w-full h-full object-contain opacity-0 hover:opacity-100 transition-opacity duration-300 absolute inset-0 p-4"
                    />
                  </>
                ) : (
                  <img
                    src={monoPath}
                    alt={`Client logo ${index + 1}`}
                    className="logo-embossed w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
