import { useState } from "react";
import { Instagram, ArrowRight, MessageCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID;
  const isFormConfigured = formspreeId && formspreeId !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormConfigured) {
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 bg-card" aria-labelledby="contact-heading">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <p className="text-spaced text-xs text-accent font-sans uppercase tracking-widest" aria-hidden="true">
            Contact
          </p>
          <h2 id="contact-heading" className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
            Let's Connect
          </h2>
          <p className="font-sans text-muted-foreground text-base md:text-lg font-light max-w-lg mx-auto">
            If you'd like to work together or chat through your vision, reach
            out anytime.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-8 max-w-xl mx-auto" aria-label="Contact form">
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="contact-name" className="text-xs font-sans text-muted-foreground uppercase tracking-wide">
                Name
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-transparent border-b border-border py-3 font-sans text-foreground focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-colors placeholder:text-muted-foreground/50"
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-xs font-sans text-muted-foreground uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-transparent border-b border-border py-3 font-sans text-foreground focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-colors placeholder:text-muted-foreground/50"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-xs font-sans text-muted-foreground uppercase tracking-wide">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full bg-transparent border-b border-border py-3 font-sans text-foreground focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-colors resize-none placeholder:text-muted-foreground/50"
                placeholder="Tell me about your project..."
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={status === "submitting" || !isFormConfigured}
              className="group flex items-center gap-3 font-sans text-sm uppercase tracking-widest text-foreground hover:text-accent transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm px-1"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {!isFormConfigured && (
              <p className="text-xs font-sans text-muted-foreground">
                Contact form not configured yet.
              </p>
            )}
            {status === "success" && (
              <p className="text-xs font-sans text-emerald-600">
                Thank you — your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p className="text-xs font-sans text-red-600">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </div>
        </form>

        {/* Divider */}
        <div className="w-px h-16 bg-border mx-auto my-16" aria-hidden="true" />

        {/* Contact Info */}
        <div className="text-center space-y-8">
          <a
            href="mailto:alex@deenesocial.com"
            className="font-sans text-lg md:text-xl text-muted-foreground hover:text-foreground transition-colors block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm"
          >
            alex@deenesocial.com
          </a>

          <a
            href="https://wa.me/27788819656"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm px-1"
          >
            <MessageCircle className="w-7 h-7" />
            <span className="font-sans text-lg md:text-xl">+27 78 881 9656</span>
          </a>

          <a
            href="https://www.instagram.com/deenesocial/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm px-1"
          >
            <Instagram className="w-7 h-7" />
            <span className="font-sans text-lg md:text-xl">@deenesocial</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
