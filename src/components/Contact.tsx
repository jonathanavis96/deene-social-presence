import { useState } from "react";
import { Instagram, ArrowRight } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section className="py-24 md:py-32 px-6 bg-card">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <p className="text-spaced text-xs text-accent font-sans uppercase tracking-widest">
            Contact
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
            Let's Connect
          </h2>
          <p className="font-sans text-muted-foreground text-base md:text-lg font-light max-w-lg mx-auto">
            If you'd like to work together or chat through your vision, reach out anytime.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-8 max-w-xl mx-auto">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-sans text-muted-foreground uppercase tracking-wide">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-border py-3 font-sans text-foreground focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/50"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-sans text-muted-foreground uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-border py-3 font-sans text-foreground focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/50"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-sans text-muted-foreground uppercase tracking-wide">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full bg-transparent border-b border-border py-3 font-sans text-foreground focus:outline-none focus:border-accent transition-colors resize-none placeholder:text-muted-foreground/50"
                placeholder="Tell me about your project..."
              />
            </div>
          </div>

          <button
            type="submit"
            className="group flex items-center gap-3 font-sans text-sm uppercase tracking-widest text-foreground hover:text-accent transition-colors"
          >
            Send Message
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Divider */}
        <div className="w-px h-16 bg-border mx-auto my-16" />

        {/* Contact Info */}
        <div className="text-center space-y-6">
          <a
            href="mailto:Deenesocial@gmail.com"
            className="font-sans text-muted-foreground hover:text-foreground transition-colors block"
          >
            Deenesocial@gmail.com
          </a>

          <a
            href="https://www.instagram.com/deenesocial/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="w-5 h-5" />
            <span className="font-sans text-sm">@deenesocial</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
