import { MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-foreground text-primary-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <p className="font-serif text-xl tracking-tight">DEENE</p>
            <p className="text-spaced text-[10px] opacity-70">S O C I A L</p>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <a
              href="https://wa.me/27788819656"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center md:justify-start font-sans text-lg hover:opacity-80 transition-opacity"
              aria-label="Contact us on WhatsApp at +27 78 881 9656"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              <span>+27 78 881 9656</span>
            </a>
            <a
              href="https://instagram.com/deenesocial"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-lg hover:opacity-80 transition-opacity"
            >
              @deenesocial
            </a>
            <a
              href="mailto:alex@deenesocial.com"
              className="font-sans text-base hover:opacity-80 transition-opacity"
            >
              alex@deenesocial.com
            </a>
          </div>

          {/* Copyright */}
          <p className="font-sans text-xs opacity-50">
            © {new Date().getFullYear()} Deene Social. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
