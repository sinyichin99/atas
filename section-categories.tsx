import { ASIAN_IMG, WESTERN_IMG, DRINKS_IMG } from "../lib/site-data";

const CATS = [
  {
    title: "Asian Delights",
    img: ASIAN_IMG,
    alt: "Atas Asian Delights traditional Nasi Lemak platter with sambal and fried egg",
    desc: "Savor our main dishes, crafted with fresh ingredients and bold flavors.",
    objectPosition: "center",
  },
  {
    title: "Western",
    img: WESTERN_IMG,
    alt: "Atas hearty Western favorites roasted chicken, sausages and potatoes",
    desc: "Savour our hearty Western favourites, perfectly crafted to satisfy every craving.",
    objectPosition: "center",
  },
  {
    title: "Drinks",
    img: DRINKS_IMG,
    alt: "Atas handcrafted iced coffee in crystal glass",
    desc: "Refresh with our handcrafted drinks, perfectly paired to complement meal.",
    objectPosition: "center",
  },
];

export function Categories() {
  return (
    <section
      id="categories"
      className="bg-[#153226] text-white py-12 sm:py-16 border-t border-b border-[#1f4535]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between text-xs tracking-[0.2em] uppercase text-stone-300/80 pb-8 sm:pb-12 border-b border-[#214a37]">
          <span className="font-medium">Atas Restaurant</span>
          <span className="font-normal text-stone-400">Flavors of Heritage</span>
          <span className="font-light">©2026</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-10">
          {CATS.map((c) => (
            <div key={c.title} className="flex flex-col group cursor-pointer">
              <h2 className="font-serif-display text-2xl sm:text-3xl font-medium text-white mb-5 transition-colors group-hover:text-[#d88f4c]">
                {c.title}
              </h2>
              <div className="relative aspect-square w-full overflow-hidden bg-[#0e2118] border border-white/10 shadow-lg group-hover:border-[#d88f4c]/40 transition-all duration-300">
                <img
                  alt={c.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  src={c.img}
                  style={{ objectPosition: c.objectPosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/25 group-hover:from-black/15 group-hover:via-black/5 group-hover:to-black/10 transition-colors duration-300" />
              </div>
              <p className="mt-4 text-xs sm:text-sm text-stone-300/85 leading-relaxed font-light">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
