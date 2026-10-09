import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ATAS_LOGO_IMG } from "../lib/site-data";

const NAV = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT US", href: "#about" },
  { label: "WHY CHOOSE", href: "#categories" },
  { label: "BOOK A TABLE", href: "#reservation" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 ${
        scrolled ? "bg-[#4d4d4d]/80 backdrop-blur-md py-3" : "bg-[#4d4d4d]/55 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#home" className="group inline-flex flex-col items-center select-none">
          <img
            src={ATAS_LOGO_IMG}
            alt="Atas"
            className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-sans font-semibold uppercase text-[9px] sm:text-[9.5px] tracking-[0.32em] mt-1 text-white"></span>
        </a>

        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-semibold tracking-[0.2em] text-white/90 hover:text-[#DE7B35] transition-colors relative py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#reservation"
            className="inline-flex bg-[#BF8D49] hover:bg-[#ad7e3e] active:bg-[#9c7035] text-white font-semibold text-xs uppercase tracking-[0.16em] px-6 py-2.5 transition-all duration-200 shadow-md hover:shadow-lg rounded-[2px] border border-white/10"
          >
            BOOK YOUR TABLE
          </a>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <a
            href="#reservation"
            className="bg-[#BF8D49] text-white font-semibold text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-[2px]"
          >
            BOOK
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-white p-2"
            aria-label="Toggle Navigation Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#4d4d4d]/95 backdrop-blur-md border-t border-white/10">
          <nav className="flex flex-col px-6 py-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-semibold tracking-[0.2em] text-white/90 hover:text-[#DE7B35] transition-colors border-b border-white/5"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
