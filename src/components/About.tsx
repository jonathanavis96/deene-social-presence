const About = () => {
  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Portrait Placeholder */}
          <div className="order-2 md:order-1">
            <div className="aspect-[3/4] bg-secondary/50 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-muted-foreground font-sans text-sm tracking-wide">
                  Portrait Image
                </span>
              </div>
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/5 to-transparent" />
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 md:order-2 space-y-8">
            <div className="space-y-4">
              <p className="text-spaced text-xs text-accent font-sans uppercase tracking-widest">
                About
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
                Human. Honest.<br />Unmistakable.
              </h2>
            </div>

            <div className="w-12 h-px bg-accent" />

            <div className="space-y-6 font-sans text-muted-foreground leading-relaxed">
              <p className="text-base md:text-lg font-light">
                Deene Social brings clarity and intention to how brands show up online.
              </p>
              <p className="text-base md:text-lg font-light">
                I blend creativity with strategy to shape a digital presence that feels 
                effortless, authentic, and true to you.
              </p>
              <p className="text-base md:text-lg font-light">
                Clean, thoughtful storytelling — never loud, never salesy.
              </p>
            </div>

            <p className="font-serif text-lg md:text-xl text-foreground italic pt-4">
              Because when authenticity leads, conversation follows — and your brand 
              becomes the story people choose to tell and follow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
