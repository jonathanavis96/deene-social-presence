const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-foreground text-primary-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <p className="font-serif text-xl tracking-tight">DEENE</p>
            <p className="text-spaced text-[10px] opacity-70">S O C I A L</p>
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
