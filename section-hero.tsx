import { HERO_IMG } from "../lib/site-data";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center overflow-hidden bg-[#153226]"
    >
      <div className="absolute inset-0 z-0">
        <img
          alt="Atas Restaurant signature medium-rare steak, garden salad and roasted potatoes"
          className="w-full h-full object-cover object-center select-none scale-[1.01]"
          src={HERO_IMG}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#153226]/70 via-transparent to-transparent" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-28 sm:py-36 w-full">
        <div className="max-w-xl text-left">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[4.15rem] xl:text-[4.5rem] font-bold uppercase tracking-tight text-white leading-[1.06] drop-shadow-lg not-italic font-serif text-left">
            SAVOR EVERY <br />
            <span className="whitespace-nowrap">MOMENT WITH</span> <br />
            <span className="text-[#DE7B35] font-bold">EVERY BITE</span>
          </h1>
          <p className="mt-5 sm:mt-6 sm:text-[14px] text-white font-jost font-light max-w-[430px] leading-[1.65] drop-shadow-sm text-sm">
            Delight in flavors crafted to bring joy, comfort, and unforgettable dining experiences
            every time.
          </p>
          <div className="mt-7 sm:mt-8">
            <a
              href="#reservation"
              className="inline-flex items-center justify-center bg-[#BF8D49] hover:bg-[#ad7e3e] active:bg-[#9c7035] text-white font-semibold text-xs uppercase tracking-[0.16em] px-8 py-3.5 transition-all duration-200 shadow-md hover:shadow-lg rounded-[2px] border border-white/10"
            >
              BOOK YOUR TABLE
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
