interface ClientLogosProps {
  /** Set to false to disable color hover effect. Defaults to true. */
  enableColorReveal?: boolean;
}

/**
 * ClientLogos component displays an infinite scrolling marquee of client logos.
 *
 * @param enableColorReveal - When true (default), logos transition from monochrome to color on hover.
 *                            Set to false to keep logos monochrome on hover.
 */
const ClientLogos = ({ enableColorReveal = true }: ClientLogosProps) => {
  const baseUrl = import.meta.env.BASE_URL;

  // Array of logo filenames (15 logos available)
  const logos = Array.from({ length: 15 }, (_, i) => `logo-${String(i + 1).padStart(2, '0')}.svg`);

  return (
    <section id="clients" className="py-12 md:py-16 bg-background overflow-hidden" aria-labelledby="clients-heading">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8 space-y-4">
          <h2 id="clients-heading" className="text-spaced text-xs text-accent font-sans uppercase tracking-widest">
            Trusted By
          </h2>
        </div>
      </div>

      {/* Scrolling Logo Strip */}
      <div className="relative group">
        <div className="flex animate-marquee group-hover:pause-animation">
          {/* First set of logos */}
          {logos.map((logo, index) => {
            const logoName = logo.replace('.svg', '');
            const monoPath = `${baseUrl}logos/${logo}`;
            const colorPath = `${baseUrl}logos/_colored/${logoName}-color.svg`;

            return (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-40 h-24 flex items-center justify-center px-8 relative transition-all duration-200 ease-out hover:-translate-y-0.5"
              >
                {enableColorReveal ? (
                  <>
                    {/* Monochrome base layer */}
                    <img
                      src={monoPath}
                      alt=""
                      aria-hidden="true"
                      className="logo-embossed w-full h-full object-contain opacity-60 transition-opacity duration-300 absolute inset-0 px-4"
                    />
                    {/* Color layer (revealed on hover) */}
                    <img
                      src={colorPath}
                      alt={`Client brand logo`}
                      className="logo-embossed w-full h-full object-contain opacity-0 hover:opacity-100 transition-opacity duration-300 absolute inset-0 px-4"
                    />
                  </>
                ) : (
                  <img
                    src={monoPath}
                    alt="Client brand logo"
                    className="logo-embossed w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 px-4"
                  />
                )}
              </div>
            );
          })}
          {/* Duplicate set for seamless loop */}
          {logos.map((logo, index) => {
            const logoName = logo.replace('.svg', '');
            const monoPath = `${baseUrl}logos/${logo}`;
            const colorPath = `${baseUrl}logos/_colored/${logoName}-color.svg`;

            return (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-40 h-24 flex items-center justify-center px-8 relative transition-all duration-200 ease-out hover:-translate-y-0.5"
                aria-hidden="true"
              >
                {enableColorReveal ? (
                  <>
                    {/* Monochrome base layer */}
                    <img
                      src={monoPath}
                      alt=""
                      aria-hidden="true"
                      className="logo-embossed w-full h-full object-contain opacity-60 transition-opacity duration-300 absolute inset-0 px-4"
                    />
                    {/* Color layer (revealed on hover) */}
                    <img
                      src={colorPath}
                      alt=""
                      aria-hidden="true"
                      className="logo-embossed w-full h-full object-contain opacity-0 hover:opacity-100 transition-opacity duration-300 absolute inset-0 px-4"
                    />
                  </>
                ) : (
                  <img
                    src={monoPath}
                    alt=""
                    aria-hidden="true"
                    className="logo-embossed w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 px-4"
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
