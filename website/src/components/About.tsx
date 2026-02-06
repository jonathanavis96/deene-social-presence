const About = () => {
  const portraitSrc = `${import.meta.env.BASE_URL}mockimage1_portrait.png`;

  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Portrait Image */}
          <div className="order-2 md:order-1">
            <div className="aspect-[3/4] bg-secondary/50 relative overflow-hidden">
              <img
                src={portraitSrc}
                alt="Deene, founder of Deene Social"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/5 to-transparent" aria-hidden="true" />
            </div>
          </div>

          {/* Text Content */}
          <div className="order-1 md:order-2 space-y-8">
            <div className="space-y-4">
              <p className="text-spaced text-xs text-accent font-sans uppercase tracking-widest">
                About
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
                Human. Honest.
                <br />
                Unmistakable.
              </h2>
            </div>

            <div className="w-12 h-px bg-accent" aria-hidden="true" />

            <div className="space-y-6 font-sans text-muted-foreground leading-relaxed">
              <p className="text-base md:text-lg font-light">
                I'm Alex-Deene, and I help brands show up online with clarity and intention. 
                No fluff, no forced virality - just thoughtful content that feels like you.
              </p>
              <p className="text-base md:text-lg font-light">
                I blend strategy with storytelling to create a digital presence that's 
                effortless, authentic, and unmistakably yours. Whether it's shaping your 
                voice, crafting campaigns, or building a feed that people actually want to 
                follow, I focus on what matters: connection over noise.
              </p>
              <p className="text-base md:text-lg font-light">
                My approach is simple: understand the brand, honor the vision, and let the 
                work speak for itself. Clean, confident, never salesy. I work with founders 
                and businesses who value substance over spectacle - people who know their 
                story deserves to be told with care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
