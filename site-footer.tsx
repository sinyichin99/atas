import { ATAS_LOGO_IMG } from "../lib/site-data";

export function Footer() {
  return (
    <footer className="bg-[#0E2018] text-white border-t border-[#1f4535]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="inline-flex flex-col items-start select-none">
              <img src={ATAS_LOGO_IMG} alt="Atas" className="h-9 w-auto object-contain" />
              <span className="font-sans font-semibold uppercase text-[9px] tracking-[0.32em] mt-1 text-white"></span>
            </div>
            <p className="mt-4 text-sm text-stone-300/80 leading-relaxed font-light max-w-xs">
              Where culinary excellence meets warm hospitality. Exceptional tastes crafted
              dynamically by masters.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d88f4c] mb-4">
              Opening Hours
            </h4>
            <p className="text-sm text-stone-300/85 font-light">Mon - Sun: 7:30AM – 11PM</p>
            <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#d88f4c] mb-4">
              Contact us
            </h4>
            <p className="text-sm text-stone-300/85 font-light leading-relaxed">
              29, Jln. Bunga Raya, Kampung Jawa, 75100 Melaka
            </p>
            <a
              href="tel:60126093690"
              className="block mt-2 text-sm text-stone-300/85 font-light hover:text-[#d88f4c] transition-colors"
            >
              +60 12-609 3690
            </a>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d88f4c] mb-4">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/atas.melaka/"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-stone-300/85 hover:text-[#d88f4c] transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/atasrestaurant/?locale=ms_MY"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-stone-300/85 hover:text-[#d88f4c] transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://www.tripadvisor.com.my/Restaurant_Review-g306997-d26365485-Reviews-Atas_Restaurant-Melaka_Central_Melaka_District_Melaka_State.html"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-stone-300/85 hover:text-[#d88f4c] transition-colors"
              >
                TripAdvisor
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-stone-400 font-light">
          © 2026 Copyright - Atas Restaurant. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
