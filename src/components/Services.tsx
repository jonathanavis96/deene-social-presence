const services = [
  {
    title: "Social Media Management",
    description: "Strategy, content creation, posting, analytics, and consistent brand voice.",
  },
  {
    title: "Content Direction",
    description: "Creative planning, styling guidance, mood boards, and shoot preparation.",
  },
  {
    title: "Brand Aesthetic Development",
    description: "Tone of voice, visual direction, brand curation, and long-term digital identity.",
  },
  {
    title: "Consulting Sessions",
    description: "1:1 guidance for businesses wanting clarity, direction, and a social presence that feels authentic.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 space-y-4">
          <p className="text-spaced text-xs text-accent font-sans uppercase tracking-widest">
            Services
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
            Intentionally Crafted
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card p-10 md:p-14 group hover:bg-secondary/30 transition-colors duration-500"
            >
              <div className="space-y-6">
                <span className="text-spaced text-xs text-muted-foreground font-sans">
                  0{index + 1}
                </span>
                
                <h3 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors duration-500">
                  {service.title}
                </h3>
                
                <div className="w-8 h-px bg-border group-hover:bg-accent group-hover:w-12 transition-all duration-500" />
                
                <p className="font-sans text-muted-foreground text-sm md:text-base font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
