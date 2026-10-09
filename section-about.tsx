import { useState } from "react";
import { ArrowRight, Sparkles, X, Check } from "lucide-react";
import { LeafClusterLight } from "./leaf-decor";
import { EVENT_TABLE_IMG, COURTYARD_IMG, RIVERSIDE_IMG, ABOUT_BG_IMG } from "../lib/site-data";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

export const ATAS_TABLE_DECO_IMG =
  "https://vibe.filesafe.space/1791391034583947001/attachments/e9f60bbf-5b4c-49c7-a7e2-decc877bdc25.jpg";
export const BIRTHDAY_TABLE_DECO_IMG =
  "https://vibe.filesafe.space/1791391034583947001/attachments/2c1c1b2d-e969-4e29-b30e-3694b5b51dc9.jpg";

const CARDS = [
  {
    id: "table-deco",
    tag: "Atas Moments",
    title: "Special Celebrations & Private Dining",
    subtitle: "Click to explore Table Deco packages",
    img: EVENT_TABLE_IMG,
    alt: "Table setup for private events and celebrations at Atas",
    interactive: true,
  },
  {
    id: "courtyard",
    tag: "Heritage Architecture",
    title: "Heritage Courtyard & Conservatory",
    subtitle: null,
    img: COURTYARD_IMG,
    alt: "Sunlit courtyard and colonial glasshouse dining architecture",
    interactive: false,
  },
  {
    id: "riverside",
    tag: "Riverside Atmosphere",
    title: "Alfresco Malacca River Dining",
    subtitle: null,
    img: RIVERSIDE_IMG,
    alt: "Waterfront patio dining deck along Malacca River",
    interactive: false,
  },
];

type DecoSelection = {
  type: "atas" | "birthday";
  pax: string;
  price: string;
};

export function About({
  decoSelection,
  onDecoSelect,
}: {
  decoSelection: DecoSelection | null;
  onDecoSelect: (sel: DecoSelection | null) => void;
}) {
  const [decoModalOpen, setDecoModalOpen] = useState(false);
  const [activeDecoTab, setActiveDecoTab] = useState<"atas" | "birthday">("atas");
  const [atasTier, setAtasTier] = useState(0);
  const [birthdayTier, setBirthdayTier] = useState(0);

  const ATAS_TIERS = [
    { pax: "2 - 4 pax", price: "RM 80", note: "Standard setup" },
    { pax: "5 - 6 pax", price: "RM 100", note: "Extended table layout" },
    { pax: "7 - 10 pax", price: "RM 120", note: "Large group celebration" },
  ];
  const BIRTHDAY_TIERS = [
    { pax: "2 - 4 pax", price: "RM 140", note: "Intimate celebration" },
    { pax: "5 - 6 pax", price: "RM 170", note: "Friends & family gathering" },
    { pax: "7 - 10 pax", price: "RM 210", note: "Grand birthday party" },
  ];

  return (
    <section
      id="about"
      className="relative bg-[#f5eee6] text-[#153226] py-20 sm:py-28 overflow-hidden"
    >
      {/* Background with leaves positioned to always stay visible in the corners */}
      <img
        src={ABOUT_BG_IMG}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 sm:mb-20">
          <div className="lg:col-span-3">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#787265] uppercase">
              // About Atas
            </span>
          </div>
          <div className="lg:col-span-9 max-w-3xl">
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-medium text-[#153226] leading-[1.15]">
              Where Culinary Excellence <br />
              Meets Warm Hospitality.
            </h2>
            <p className="mt-5 text-sm sm:text-base text-[#474e44] leading-relaxed max-w-2xl font-light">
              Enjoy carefully crafted dishes made with fresh ingredients, creating a warm and
              memorable dining experience every time you visit.
            </p>
            <div className="mt-7">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-3 bg-[#545638] hover:bg-[#434629] active:bg-[#363820] text-white text-xs font-semibold uppercase tracking-[0.18em] px-6 py-3 transition-all duration-200 rounded-xs shadow-md hover:shadow-lg group cursor-pointer"
                  >
                    <span>More About Us</span>
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl p-0 overflow-hidden border-0 rounded-2xl bg-[#F5EFE6] [&>button]:hidden">
                  <DialogTitle className="sr-only">Our Story & Heritage</DialogTitle>
                  <DialogDescription className="sr-only">
                    The story behind Atas Restaurant in Melaka.
                  </DialogDescription>
                  <div className="relative px-7 sm:px-10 py-9 sm:py-12 text-[#153226]">
                    <div className="absolute top-5 right-6 pointer-events-none opacity-70">
                      <LeafClusterLight className="w-16 sm:w-20 h-auto" />
                    </div>
                    <span className="text-[11px] font-semibold tracking-[0.3em] text-[#787265] uppercase">
                      Our Story &amp; Heritage
                    </span>
                    <h3 className="mt-3 font-serif-display text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.15] max-w-xl">
                      A Symphony of Peranakan Soul &amp; Global Flavors
                    </h3>
                    <p className="mt-4 text-sm sm:text-[0.95rem] text-[#474e44] leading-relaxed font-light max-w-lg">
                      Nestled on the historic riverbanks of Jalan Bunga Raya in Melaka, Atas
                      Restaurant was born from a passion to honor Malaysia's rich multicultural food
                      tapestry while elevating every recipe with modern culinary finesse.
                    </p>
                    <div className="mt-7 space-y-3">
                      {[
                        { k: "Fine Quality", v: "Farm-fresh herbs & artisan butchery" },
                        {
                          k: "Riverfront Heritage",
                          v: "Direct view of Malacca's historic waterway",
                        },
                        { k: "Bespoke Hospitality", v: "Intimate celebrations & private catering" },
                      ].map((item) => (
                        <div
                          key={item.k}
                          className="flex items-start gap-3 border-l-2 border-[#d88f4c] pl-4"
                        >
                          <span className="font-serif-display text-base sm:text-lg font-medium text-[#153226] whitespace-nowrap">
                            {item.k}
                          </span>
                          <span className="text-xs sm:text-sm text-[#474e44] font-light leading-relaxed pt-0.5">
                            {item.v}
                          </span>
                        </div>
                      ))}
                    </div>
                    <DialogClose asChild>
                      <button
                        type="button"
                        className="mt-8 inline-flex items-center gap-3 bg-[#545638] hover:bg-[#434629] active:bg-[#363820] text-white text-xs font-semibold uppercase tracking-[0.18em] px-6 py-3 transition-all duration-200 rounded-xs shadow-md hover:shadow-lg group cursor-pointer"
                      >
                        <span>Continue Exploring</span>
                        <ArrowRight
                          size={15}
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        />
                      </button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CARDS.map((card) => {
            const isClickable = card.interactive;
            return (
              <div
                key={card.title}
                onClick={() => {
                  if (isClickable) setDecoModalOpen(true);
                }}
                role={isClickable ? "button" : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={(e) => {
                  if (isClickable && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    setDecoModalOpen(true);
                  }
                }}
                className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-white/40 border border-[#e3dacd] hover:-translate-y-1 ${
                  isClickable
                    ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#ea8037]"
                    : ""
                }`}
              >
                <div className="aspect-[3/4] w-full overflow-hidden relative">
                  <img
                    alt={card.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                    src={card.img}
                  />
                  {/* Subtle warm overlay to enhance readability and atmosphere */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500 pointer-events-none" />

                  {isClickable && (
                    <div className="absolute top-4 right-4 z-10 bg-[#142e22]/85 text-[#f5efe6] text-[11px] font-medium px-3 py-1.5 rounded-full backdrop-blur-md border border-white/15 flex items-center gap-1.5 shadow-md">
                      <Sparkles size={12} className="text-[#ea8037]" />
                      <span>View Deco</span>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E2018]/95 via-[#153226]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col justify-end p-6 sm:p-7 backdrop-blur-[1.5px]">
                  <div className="translate-y-5 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 ease-out">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#d88f4c] font-semibold block mb-1">
                      {card.tag}
                    </span>
                    <p className="text-white text-base sm:text-lg font-serif-display font-medium tracking-wide leading-snug drop-shadow-md">
                      {card.title}
                    </p>
                    {isClickable && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#ea8037] font-semibold tracking-wider uppercase mt-2">
                        <span>Click for Deco Packages</span>
                        <ArrowRight size={12} />
                      </span>
                    )}
                    <div className="h-0.5 w-8 bg-[#d88f4c] mt-2.5 transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100 group-hover:w-12" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Table Deco Modal (Atas Table Deco & Birthday Table Deco) */}
        <Dialog open={decoModalOpen} onOpenChange={setDecoModalOpen}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden border-0 rounded-2xl bg-[#142e22] text-white shadow-2xl [&>button]:hidden">
            <DialogTitle className="sr-only">Table Deco Packages</DialogTitle>
            <DialogDescription className="sr-only">
              Choose between Atas Table Deco and Birthday Table Deco celebration packages.
            </DialogDescription>

            {/* Modal Header */}
            <div className="relative px-6 sm:px-8 pt-7 pb-5 border-b border-[#214736] bg-[#0d2218]/80 flex items-start justify-between">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.3em] text-[#ea8037] uppercase flex items-center gap-1.5">
                  <Sparkles size={13} /> Celebration Packages
                </span>
                <h3 className="mt-1 font-serif-display text-2xl sm:text-3xl font-medium text-white">
                  Table Deco Experiences
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-light mt-1">
                  Celebrate special moments with our signature themed table setups &amp; ambience.
                </p>
              </div>
              <DialogClose asChild>
                <button
                  type="button"
                  aria-label="Close"
                  className="rounded-full p-2 text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </DialogClose>
            </div>

            {/* Tabs switcher */}
            <div className="px-6 sm:px-8 pt-5 bg-[#142e22]">
              <div className="grid grid-cols-2 p-1 bg-[#0d2218] rounded-xl border border-[#214736]">
                <button
                  type="button"
                  onClick={() => setActiveDecoTab("atas")}
                  className={`py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeDecoTab === "atas"
                      ? "bg-[#ea8037] text-neutral-900 shadow-md font-bold"
                      : "text-stone-300 hover:text-white"
                  }`}
                >
                  <span>Atas Table Deco ✨</span>
                  <span className="text-[11px] opacity-80 font-normal">From RM 80</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDecoTab("birthday")}
                  className={`py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                    activeDecoTab === "birthday"
                      ? "bg-[#ea8037] text-neutral-900 shadow-md font-bold"
                      : "text-stone-300 hover:text-white"
                  }`}
                >
                  <span>Birthday Table Deco ❤️✨</span>
                  <span className="text-[11px] opacity-80 font-normal">From RM 140</span>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
              {activeDecoTab === "atas" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
                  {/* Photo */}
                  <div className="md:col-span-6 rounded-xl overflow-hidden border border-[#214736] bg-[#0d2218] shadow-lg relative group">
                    <img
                      src={ATAS_TABLE_DECO_IMG}
                      alt="Atas Table Deco with balloons, rose petals, glowing centerpiece, candles and elegant place settings"
                      className="w-full aspect-[4/5] object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#0d2218]/85 text-xs font-semibold px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm text-[#ea8037]">
                      ✨ Signature Setup
                    </div>
                  </div>

                  {/* Details */}
                  <div className="md:col-span-6 flex flex-col justify-between space-y-5">
                    <div>
                      <div className="flex items-baseline justify-between">
                        <h4 className="font-serif-display text-2xl sm:text-3xl text-white">
                          Atas Table Deco ✨
                        </h4>
                        <span className="font-serif-display text-2xl font-bold text-[#ea8037]">
                          {ATAS_TIERS[atasTier].price}.00
                        </span>
                      </div>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-stone-400">
                        Base package (2–4 pax)
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0d2218] border border-[#214736] space-y-2 text-sm text-stone-200 font-light leading-relaxed">
                      <p className="font-normal text-white flex items-start gap-2">
                        <Check size={16} className="text-[#ea8037] mt-0.5 shrink-0" />
                        <span>
                          Table deco with one free slice of cake, inclusive of plate writing.
                        </span>
                      </p>
                      <p className="text-xs text-stone-400 italic pt-1">
                        Note: Bouquet of rose is not included. Kindly order separately.
                      </p>
                    </div>

                    {/* Tiered Pricing — selectable panel */}
                    <div>
                      <h5 className="text-xs uppercase tracking-[0.2em] text-[#ea8037] font-semibold mb-3">
                        Select Pax Tier
                      </h5>
                      <div className="space-y-2">
                        {ATAS_TIERS.map((tier, i) => {
                          const selected = atasTier === i;
                          return (
                            <button
                              key={tier.pax}
                              type="button"
                              onClick={() => setAtasTier(i)}
                              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 text-left ${
                                selected
                                  ? "bg-[#ea8037]/15 border-2 border-[#ea8037] ring-1 ring-[#ea8037]/40"
                                  : "bg-[#0d2218] border border-[#214736] hover:border-[#3a6450]"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className={`flex items-center justify-center w-5 h-5 rounded-full border-2 shrink-0 transition-colors ${
                                    selected ? "bg-[#ea8037] border-[#ea8037]" : "border-stone-500"
                                  }`}
                                >
                                  {selected && <Check size={12} className="text-neutral-900" />}
                                </span>
                                <div>
                                  <p className="text-sm font-semibold text-white">{tier.pax}</p>
                                  <p className="text-[11px] text-stone-400">{tier.note}</p>
                                </div>
                              </div>
                              <span className="font-serif-display text-lg font-bold text-[#ea8037]">
                                {tier.price}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href="#reservation"
                        onClick={() => {
                          onDecoSelect({
                            type: "atas",
                            pax: ATAS_TIERS[atasTier].pax,
                            price: ATAS_TIERS[atasTier].price,
                          });
                          setDecoModalOpen(false);
                        }}
                        className="inline-flex items-center justify-center w-full bg-[#ea8037] hover:bg-[#d6722d] text-neutral-900 font-bold text-xs uppercase tracking-[0.2em] py-3.5 rounded-lg shadow-lg transition-all duration-200"
                      >
                        Reserve with Atas Deco · {ATAS_TIERS[atasTier].price}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {activeDecoTab === "birthday" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
                  {/* Photo */}
                  <div className="md:col-span-6 rounded-xl overflow-hidden border border-[#214736] bg-[#0d2218] shadow-lg relative group">
                    <img
                      src={BIRTHDAY_TABLE_DECO_IMG}
                      alt="Birthday Table Deco with neon Happy Birthday star sign, balloons, roses, petals, and gifts"
                      className="w-full aspect-[4/5] object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#0d2218]/85 text-xs font-semibold px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm text-[#ea8037]">
                      ❤️✨ Neon Star Birthday Special
                    </div>
                  </div>

                  {/* Details */}
                  <div className="md:col-span-6 flex flex-col justify-between space-y-5">
                    <div>
                      <div className="flex items-baseline justify-between gap-3">
                        <h4 className="font-serif-display sm:text-3xl text-white text-lg leading-tight">
                          Birthday Table Deco ❤️✨
                        </h4>
                        <span className="font-serif-display font-bold text-[#ea8037] whitespace-nowrap shrink-0 text-2xl">
                          {BIRTHDAY_TIERS[birthdayTier].price}.00
                        </span>
                      </div>
                      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-stone-400">
                        Base package (2–4 pax)
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0d2218] border border-[#214736] space-y-2 text-sm text-stone-200 font-light leading-relaxed">
                      <p className="font-normal text-white flex items-start gap-2">
                        <Check size={16} className="text-[#ea8037] mt-0.5 shrink-0" />
                        <span>
                          Includes illuminated &quot;Happy Birthday&quot; star neon light, balloons,
                          rose floral accents, scattered rose petals, candles, and celebratory table
                          styling.
                        </span>
                      </p>
                    </div>

                    {/* Tiered Pricing — selectable panel */}
                    <div>
                      <h5 className="text-xs uppercase tracking-[0.2em] text-[#ea8037] font-semibold mb-3">
                        Select Pax Tier
                      </h5>
                      <div className="space-y-2">
                        {BIRTHDAY_TIERS.map((tier, i) => {
                          const selected = birthdayTier === i;
                          return (
                            <button
                              key={tier.pax}
                              type="button"
                              onClick={() => setBirthdayTier(i)}
                              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 text-left ${
                                selected
                                  ? "bg-[#ea8037]/15 border-2 border-[#ea8037] ring-1 ring-[#ea8037]/40"
                                  : "bg-[#0d2218] border border-[#214736] hover:border-[#3a6450]"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className={`flex items-center justify-center w-5 h-5 rounded-full border-2 shrink-0 transition-colors ${
                                    selected ? "bg-[#ea8037] border-[#ea8037]" : "border-stone-500"
                                  }`}
                                >
                                  {selected && <Check size={12} className="text-neutral-900" />}
                                </span>
                                <div>
                                  <p className="text-sm font-semibold text-white">{tier.pax}</p>
                                  <p className="text-[11px] text-stone-400">{tier.note}</p>
                                </div>
                              </div>
                              <span className="font-serif-display text-lg font-bold text-[#ea8037]">
                                {tier.price}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href="#reservation"
                        onClick={() => {
                          onDecoSelect({
                            type: "birthday",
                            pax: BIRTHDAY_TIERS[birthdayTier].pax,
                            price: BIRTHDAY_TIERS[birthdayTier].price,
                          });
                          setDecoModalOpen(false);
                        }}
                        className="inline-flex items-center justify-center w-full bg-[#ea8037] hover:bg-[#d6722d] text-neutral-900 font-bold text-xs uppercase tracking-[0.2em] py-3.5 rounded-lg shadow-lg transition-all duration-200"
                      >
                        Reserve with Birthday Deco · {BIRTHDAY_TIERS[birthdayTier].price}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
