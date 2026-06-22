import Reveal from "@/components/Reveal";

const About = () => {
  const base = import.meta.env.BASE_URL;
  const portraitWebp = `${base}mockimage1_portrait.webp`;
  const portraitJpg = `${base}mockimage1_portrait.jpg`;

  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Heading — full width, above everything */}
        <Reveal>
          <div className="space-y-4">
            <p className="text-spaced text-xs text-accent font-sans uppercase tracking-widest">About</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight">
              Hellooo There, I'm Alex-Deene.
            </h2>
          </div>
          <div className="w-12 h-px bg-accent mt-6 mb-12" aria-hidden="true" />
        </Reveal>

        {/* Photo floats left; copy wraps beside it, then reclaims full width below. */}
        <Reveal delay={120}>
          <div className="font-sans text-muted-foreground leading-relaxed text-base md:text-lg font-light text-justify hyphens-auto [&>p]:mb-6 [&>p:last-child]:mb-0">
            <figure className="w-full max-w-xs sm:max-w-sm mx-auto md:float-left md:w-[44%] md:max-w-none md:mr-10 lg:mr-12 md:mb-6 mb-8">
              {/* Portrait dipped into the surface */}
              <div className="portrait-well">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <picture>
                    <source srcSet={portraitWebp} type="image/webp" />
                    <img
                      src={portraitJpg}
                      alt="Alex-Deene, founder of Deene Social"
                      width={1000}
                      height={1333}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" aria-hidden="true" />
                  <div className="portrait-deboss absolute inset-0 pointer-events-none" aria-hidden="true" />
                </div>
              </div>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="w-6 h-px bg-accent" aria-hidden="true" />
                <span className="text-spaced text-[11px] uppercase tracking-widest text-muted-foreground font-sans">
                  Alex-Deene Howard · Founder
                </span>
              </figcaption>
            </figure>

            <p>Truthfully, I've never been a fan of polished bios.</p>

            <p>
              I've read enough "I help brands grow online" paragraphs to know that most of them start
              sounding the same after a while. And the honest truth is, I never really knew how to
              write one for myself without it feeling like I was trying too hard to sell something.
            </p>

            <p>So instead, here's the real version.</p>

            <p>
              I help people tell their stories online - Through content that feels honest,
              intentional, and true to who they are. Whether it's a winery, a guesthouse, a
              restaurant, a founder, or a growing business, my work is rooted in helping people show
              up online with clarity and confidence.
            </p>

            <p>
              I didn't study social media. I taught myself through curiosity, pressure, long hours,
              and a genuine love for the creative world. I studied Events Management, worked in the
              events and creative industry, built an online business during COVID, and later created
              and managed a social media department within a company before stepping out on my own.
            </p>

            <p>Somewhere along the way, I realised that good social media doesn't start with algorithms.</p>

            <p className="font-serif text-2xl md:text-3xl text-foreground md:clear-left md:pt-2">It starts with people.</p>

            <p>
              People who believe in what they're building. People who back their brand fully. People
              who are willing to show up, be part of the process, and go the extra mile to make their
              story stand out for the right reasons.
            </p>

            <p className="text-foreground">That's the kind of work I love.</p>

            <p>
              The best results always happen when there's trust, clear communication, and excitement
              from both sides. I bring the strategy, ideas, storytelling, and creative direction. You
              bring the heart, knowledge, and passion behind your brand. Together, we shape something
              that feels like you.
            </p>

            <p>This website isn't here to impress you with buzzwords.</p>

            <p>It's here to give you a feel for my work, my approach, and the kind of brands I love working with.</p>

            <p className="text-foreground text-left">
              If something resonates, let's have a coffee and chat.
              <br />
              That's usually where the best ideas begin.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
