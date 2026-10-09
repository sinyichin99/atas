import { useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Utensils,
  Sparkles,
  X,
  Search,
  FileText,
  LayoutGrid,
  Download,
  ExternalLink,
} from "lucide-react";
import {
  FEATURED_MENU_ITEMS,
  FULL_MENU_CATEGORIES,
  PASTA_IMG,
  MENU_PDF_URL,
} from "../lib/site-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"visual" | "browse">("visual");
  const [filterBarVisible, setFilterBarVisible] = useState(true);
  const lastScrollTop = useRef(0);

  const filteredCategories = FULL_MENU_CATEGORIES.map((cat) => {
    const matchingItems = cat.items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "all" || cat.id.toLowerCase().includes(activeCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });
    return { ...cat, items: matchingItems };
  }).filter((cat) => cat.items.length > 0);

  return (
    <section id="menu" className="bg-[#153226] text-white py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20">
          <p className="font-cormorant italic text-base sm:text-lg text-[#d88f4c] tracking-widest font-normal mb-2">
            Signature Culinary Creation
          </p>
          <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-wide">
            Atas Melaka Dining Menu
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full h-full min-h-[420px] lg:min-h-0 overflow-hidden shadow-2xl border border-white/10 group rounded-lg">
              <img
                alt="Signature dish at Atas Restaurant Melaka"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                src={PASTA_IMG}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 bg-[#ea8037] text-black font-bold text-xs uppercase tracking-widest rounded-full mb-2">
                  Featured Dish
                </span>
                <p className="font-serif-display text-xl text-white font-medium">
                  Classic Chicken Bolognese Spaghetti
                </p>
                <p className="text-xs text-stone-300 mt-1 font-light">
                  minced chicken and mushroom in tomato sauce & parmesan saunce
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center divide-y divide-white/10">
            {FEATURED_MENU_ITEMS.map((item) => (
              <div
                key={item.code}
                className="py-5 sm:py-6 first:pt-0 last:pb-0 group transition-all duration-200"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#d88f4c]/80 bg-[#d88f4c]/10 px-2 py-0.5 rounded border border-[#d88f4c]/20">
                      {item.code}
                    </span>
                    <h3 className="font-serif-display text-lg sm:text-xl font-normal text-white group-hover:text-[#d88f4c] transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <span className="font-serif-display text-lg sm:text-xl text-[#d88f4c] font-medium tracking-wide shrink-0">
                    {item.price}
                  </span>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm text-stone-300/80 leading-relaxed font-light max-w-xl">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <h3 className="font-serif-display text-2xl sm:text-3xl font-normal text-white text-center sm:text-left leading-snug">
            Where Heritage Flavors <br />
            Meet Modern Culinary Art.
          </h3>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-3 hover:bg-[#d87028] text-black font-semibold text-xs uppercase tracking-[0.18em] px-8 py-4 transition-all duration-200 rounded shadow-lg shadow-[#ea8037]/20 group shrink-0 cursor-pointer bg-[#bf8d49]"
          >
            <BookOpen size={16} />
            <span>View Full Menu</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>

      {/* Aesthetic Full Menu Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl h-[90vh] bg-[#12281D] text-slate-100 border border-[#ea8037]/30 p-0 flex flex-col overflow-hidden shadow-2xl">
          {/* Modal Header */}
          <div className="bg-[#0f1f17] border-b border-white/10 p-6 sm:p-8 shrink-0 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[#ea8037] text-xs font-semibold uppercase tracking-[0.2em] mb-1">
                  <Sparkles size={14} />
                  <span>Atas Restaurant Melaka</span>
                </div>
                <DialogTitle className="font-serif-display text-2xl sm:text-4xl text-white font-normal">
                  Full Culinary Menu
                </DialogTitle>
                <DialogDescription className="text-stone-400 text-xs sm:text-sm mt-1">
                  Explore our complete selection of Asian delicacies, Western mains, pizzas & drinks
                </DialogDescription>
              </div>

              {/* Tab Switcher */}
              <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10 shrink-0 self-start">
                <button
                  onClick={() => setActiveTab("visual")}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "visual"
                      ? "bg-[#ea8037] text-black"
                      : "text-stone-300 hover:text-white"
                  }`}
                >
                  <FileText size={14} />
                  <span>Visual Menu</span>
                </button>
                <button
                  onClick={() => setActiveTab("browse")}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === "browse"
                      ? "bg-[#ea8037] text-black"
                      : "text-stone-300 hover:text-white"
                  }`}
                >
                  <LayoutGrid size={14} />
                  <span>Browse Dishes</span>
                </button>
              </div>
            </div>
          </div>

          {/* Modal Body */}
          {activeTab === "visual" ? (
            /* --- Visual Menu: elegant PDF frame --- */
            <div className="flex-1 overflow-y-auto bg-[#12281D] p-6 sm:p-10">
              <div className="relative max-w-3xl mx-auto">
                {/* Decorative frame */}
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-[#ea8037]/20 via-transparent to-[#ea8037]/10 blur-xl pointer-events-none" />
                <div className="relative rounded-xl overflow-hidden border border-[#ea8037]/30 shadow-2xl shadow-black/50 ring-1 ring-white/5">
                  <object
                    data={MENU_PDF_URL}
                    type="application/pdf"
                    className="w-full h-[70vh] bg-white"
                    aria-label="Atas Restaurant Melaka full menu PDF"
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-10 text-center bg-[#0f1f17]">
                      <FileText className="text-[#ea8037] mb-2" size={40} />
                      <p className="font-serif-display text-xl text-white">
                        Your menu is ready to view
                      </p>
                      <p className="text-xs text-stone-400 max-w-xs">
                        Your browser couldn&rsquo;t display the PDF inline. Open it in a new tab or
                        download a copy below.
                      </p>
                      <a
                        href={MENU_PDF_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#ea8037] hover:bg-[#d87028] text-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-all mt-2"
                      >
                        <ExternalLink size={14} />
                        Open Menu
                      </a>
                    </div>
                  </object>
                </div>

                <div className="flex items-center justify-center mt-6">
                  <a
                    href={MENU_PDF_URL}
                    download
                    className="inline-flex items-center gap-2 text-[#ea8037] hover:text-[#d87028] text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <Download size={14} />
                    Download a copy
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* --- Browse Dishes: searchable dish browser --- */
            <div className="flex-1 flex flex-col bg-[#12281D] overflow-hidden">
              {/* Sticky Search + Category Filters — pinned to top */}
              <div
                className={`shrink-0 border-b border-white/10 bg-[#12281D] px-6 sm:px-8 transition-all duration-300 ${
                  filterBarVisible
                    ? "opacity-100 max-h-44 py-3"
                    : "opacity-0 max-h-0 overflow-hidden py-0 pointer-events-none"
                }`}
              >
                <div className="relative w-full max-w-md mx-auto">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search dish or code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-[#ea8037] transition-all"
                  />
                </div>
                <div className="hidden md:flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-center flex-wrap">
                  {[
                    { id: "all", label: "All Items" },
                    { id: "Asian", label: "Asian" },
                    { id: "Ala Carte", label: "Ala Carte" },
                    { id: "Mains", label: "Mains" },
                    { id: "Pizza", label: "Pizza" },
                    { id: "Pasta & Soup", label: "Pasta & Soup" },
                    { id: "Salad & Bites", label: "Salads & Bites" },
                    { id: "Desserts", label: "Desserts" },
                    { id: "Beverages", label: "Beverages" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-4 py-2 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                        activeCategory === cat.id
                          ? "bg-[#ea8037] text-black shadow-md font-semibold"
                          : "bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white border border-white/5"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              <div
                onScroll={(e) => {
                  const el = e.currentTarget;
                  const st = el.scrollTop;
                  if (typeof window !== "undefined" && window.innerWidth < 768) {
                    if (st > lastScrollTop.current && st > 80) {
                      setFilterBarVisible(false);
                    } else if (st < lastScrollTop.current || st < 80) {
                      setFilterBarVisible(true);
                    }
                  }
                  lastScrollTop.current = st;
                }}
                className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-10 bg-[#12281D]"
              >
                {filteredCategories.length === 0 ? (
                  <div className="text-center py-16 text-stone-400">
                    <Utensils className="mx-auto text-stone-500 mb-3" size={32} />
                    <p className="text-base font-serif-display">No menu items match your search.</p>
                    <p className="text-xs mt-1">Try searching for a different dish name or code.</p>
                  </div>
                ) : (
                  filteredCategories.map((category) => (
                    <div key={category.id} className="space-y-6">
                      <div className="border-b border-white/10 pb-3 flex items-end justify-between">
                        <div>
                          <h3 className="font-serif-display text-2xl text-[#ea8037] font-medium flex items-center gap-2">
                            <span>{category.title}</span>
                          </h3>
                          <p className="text-xs text-stone-400 mt-0.5">{category.subtitle}</p>
                        </div>
                        <span className="text-xs text-stone-500 uppercase tracking-widest font-mono">
                          {category.items.length} items
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {category.items.map((item) => (
                          <div
                            key={item.code}
                            className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-[#ea8037]/30 p-4 rounded-lg transition-all group duration-200"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-mono text-[#ea8037] bg-[#ea8037]/10 px-1.5 py-0.5 rounded border border-[#ea8037]/20 font-semibold">
                                    {item.code}
                                  </span>
                                  <h4 className="font-serif-display text-base text-white group-hover:text-[#ea8037] transition-colors">
                                    {item.name}
                                  </h4>
                                </div>
                                <p className="text-xs text-stone-300/80 leading-relaxed font-light">
                                  {item.desc}
                                </p>
                              </div>
                              <span className="font-serif-display text-sm font-semibold text-[#ea8037] shrink-0 whitespace-nowrap bg-[#ea8037]/10 px-2.5 py-1 rounded">
                                {item.price}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="bg-[#0f1f17] border-t border-white/10 p-4 sm:p-6 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-400 text-center sm:text-left">
              * All prices are subject to 10% service charge. Items & availability subject to
              change.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#reservation"
                onClick={() => setIsOpen(false)}
                className="bg-[#ea8037] hover:bg-[#d87028] text-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-all shadow-md"
              >
                Reserve a Table
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
