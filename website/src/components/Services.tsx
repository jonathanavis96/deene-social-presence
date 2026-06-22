import Reveal from "@/components/Reveal";

const services = [
  {
    title: "Social Media Management",
    description: "Think of me as an extension of your team. Someone who learns your brand, understands your audience, keeps everything consistent, and helps your online presence feel as natural and authentic as the business behind it.",
  },
  {
    title: "Content Direction",
    description: "This is my favourite part. Taking a new menu, product, campaign, event, or idea and figuring out how we bring it to life online in a way that feels exciting, intentional, and true to your brand.",
  },
  {
    title: "Content Creation",
    description: "Through Deene Social, I have an in-house content creator who helps with reels, images, behind-the-scenes moments, shoot days, and everyday storytelling. For bigger productions, I also work alongside trusted photographers and videographers.",
  },
  {
    title: "Client & Customer Communication",
    description: "Your online communication matters. I help manage DMs, comments, enquiries, and customer touchpoints in a way that feels aligned with your brand, builds trust, and keeps people feeling seen and looked after.",
  },
  {
    title: "Strategy & Ideas",
    description: "Sometimes you just need someone to sit with you, hear everything going on, and turn it into a clear direction. I help shape ideas, monthly content plans, campaigns, and the bigger picture of what your brand is trying to say.",
  },
  {
    title: "Analytics & Reporting",
    description: "I keep an eye on what's working, what people are responding to, and where there's room to grow - without making it overcomplicated. These insights help guide the content and shape what we do next.",
  },
  {
    title: "Design Support",
    description: "I assist with simple digital artwork, social media ads, story layouts, and content pieces that keep your brand looking consistent. For more detailed design work, I can also help guide the process or bring in a trusted designer.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 px-6 bg-card" aria-labelledby="services-heading">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Reveal>
          <div className="text-center mb-20 space-y-4">
            <p className="text-spaced text-xs text-accent font-sans uppercase tracking-widest" aria-hidden="true">
              What I Offer
            </p>
            <h2 id="services-heading" className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
              Services
            </h2>
          </div>
        </Reveal>

        {/* Services Grid */}
        <Reveal delay={120} className="grid md:grid-cols-2 gap-px bg-border">
          {services.map((service, index) => {
            // A lone trailing card (odd count) spans both columns and centres its
            // content, so it sits balanced under the row above with no empty cell.
            const isCentered = services.length % 2 === 1 && index === services.length - 1;

            return (
              <div
                key={index}
                className={`bg-card p-10 md:p-14 group hover:bg-secondary/30 transition-colors duration-500 ${
                  isCentered ? "md:col-span-2" : ""
                }`}
              >
                <div className={`space-y-6 ${isCentered ? "md:max-w-md md:mx-auto md:text-center" : ""}`}>
                  <span className="text-spaced text-xs text-muted-foreground font-sans" aria-hidden="true">
                    0{index + 1}
                  </span>

                  <h3 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors duration-500">
                    {service.title}
                  </h3>

                  <div
                    className={`w-8 h-px bg-border group-hover:bg-accent group-hover:w-12 transition-all duration-500 ${
                      isCentered ? "md:mx-auto" : ""
                    }`}
                    aria-hidden="true"
                  />

                  <p className="font-sans text-muted-foreground text-sm md:text-base font-light leading-relaxed text-justify hyphens-auto">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
