import { useState } from "react";
import { Instagram, ArrowRight } from "lucide-react";

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
    <section id="contact" className="py-24 md:py-32 px-6 bg-card">
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
            If you'd like to work together or chat through your vision, reach
            out anytime.
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
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-transparent border-b border-border py-3 font-sans text-foreground focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/50"
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-sans text-muted-foreground uppercase tracking-wide">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-transparent border-b border-border py-3 font-sans text-foreground focus:outline-none focus:border-accent transition-colors placeholder:text-muted-foreground/50"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-sans text-muted-foreground uppercase tracking-wide">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full bg-transparent border-b border-border py-3 font-sans text-foreground focus:outline-none focus:border-accent transition-colors resize-none placeholder:text-muted-foreground/50"
                placeholder="Tell me about your project..."
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={status === "submitting" || !isFormConfigured}
              className="group flex items-center gap-3 font-sans text-sm uppercase tracking-widest text-foreground hover:text-accent transition-colors disabled:opacity-60"
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
