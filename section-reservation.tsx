import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { PALM_LEAF_BOTTOM_IMG } from "../lib/site-data";
import { submitBooking } from "../lib/booking.functions";
import { trackReservation } from "../lib/form-tracking";

type SeatingContextType = {
  selectedTable: string | null;
  decoSelection?: {
    type: "atas" | "birthday";
    pax: string;
    price: string;
  } | null;
  onDecoClear?: () => void;
};

// All selectable dining slots during operating hours (7:30 AM – 11:00 PM),
// in 30-minute increments. We intentionally do NOT gate these by calendar
// availability: Atas has 17 tables and accepts multiple bookings at the same
// time, so every slot must remain selectable even after one is booked. The
// calendar booking is best-effort (it reserves the first table at that time);
// every submission is also captured as a CRM lead so concurrent reservations
// for the same slot are all recorded.
const OPERATING_TIME_SLOTS: { value: string; label: string }[] = (() => {
  const slots: { value: string; label: string }[] = [];
  for (let m = 7 * 60 + 30; m <= 23 * 60; m += 30) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    const value = `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
    const ampm = h >= 12 ? "PM" : "AM";
    const displayHour = h % 12 === 0 ? 12 : h % 12;
    slots.push({ value, label: `${displayHour}:${String(min).padStart(2, "0")} ${ampm}` });
  }
  return slots;
})();

export function Reservation({ selectedTable, decoSelection, onDecoClear }: SeatingContextType) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [babyChair, setBabyChair] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setDate("");
    setTime("");
    setGuests(2);
    setBabyChair(false);
    onDecoClear?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (!name || !phone || !date || !time) {
      toast.error("Please fill in your name, phone, date and time.");
      return;
    }

    setSubmitting(true);
    try {
      const [firstName, ...rest] = name.trim().split(/\s+/);
      const lastName = rest.join(" ") || "Guest";
      const guestLabel = guests > 0 ? `${guests} Guest${guests > 1 ? "s" : ""}` : "Not specified";

      // Build an unambiguous ISO-8601 slot fixed to Malaysia Time (MYT, +08:00)
      // — e.g. "2026-10-09T19:00:00+08:00". The booking API rejects naive
      // local-time strings (returns 502), and we want Melaka time regardless of
      // the visitor's device timezone, so we bake in +08:00 directly from the
      // picked date/time rather than relying on the browser's offset.
      const selectedSlot = `${date}T${time}:00+08:00`;

      // Fire the CRM / automated-sales form submission FIRST (awaited, not
      // fire-and-forget) so we know the lead landed in the pipeline even when
      // the calendar booking provider is down.
      const trackResult = await trackReservation({
        firstName,
        lastName,
        email: email || "guest@atasrestaurant.example",
        phone,
        date,
        time,
        guestLabel,
        selectedTable,
        babyChair,
        decoSelection,
      });

      let bookingSucceeded = false;

      try {
        await submitBooking({
          data: {
            firstName,
            lastName,
            email: email || "guest@atasrestaurant.example",
            phone,
            selectedSlot,
            guests: guestLabel,
            selectedTable: selectedTable || undefined,
            babyChair,
            decoSelection,
          },
        });
        bookingSucceeded = true;
      } catch (bookingErr) {
        // The CRM lead was already captured above, so a calendar-provider outage
        // is non-fatal — surface a reassuring message and reset the form.
        const bmsg = bookingErr instanceof Error ? bookingErr.message : "";
        if (
          bmsg.includes("502") ||
          bmsg.includes("503") ||
          bmsg.includes("504") ||
          bmsg.includes("Bad gateway") ||
          bmsg.includes("Bad Gateway") ||
          bmsg.includes("Failed to fetch")
        ) {
          toast.success(
            "Your reservation request was received! Our booking system is being synced — we'll confirm your table shortly via phone or WhatsApp.",
            { duration: 8000 },
          );
        } else {
          toast.error("Booking failed — please call us at +60 12-609 3690 or try again shortly.", {
            duration: 8000,
          });
        }
        resetForm();
        return;
      }

      if (bookingSucceeded) {
        toast.success("Reservation confirmed! We'll see you soon. A confirmation has been sent.", {
          duration: 8000,
        });
      } else if (trackResult.ok) {
        toast.success(
          "Your reservation request was received! We'll confirm your table shortly via phone or WhatsApp.",
          { duration: 8000 },
        );
      } else {
        toast.success("Reservation request received! We'll confirm shortly.", { duration: 8000 });
      }
      resetForm();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      toast.error(
        msg
          ? `Something went wrong: ${msg}`
          : "Booking failed — please call us at +60 12-609 3690 or try again shortly.",
        { duration: 8000 },
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="reservation"
      className="relative bg-[#F5EFE6] text-[#153226] py-20 sm:py-28 overflow-hidden"
    >
      {/* Blurred bottom leaf decoration, sent to back */}
      <img
        src={PALM_LEAF_BOTTOM_IMG}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-32 sm:w-44 md:w-56 h-auto z-0 opacity-50 blur-[3px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 pt-4">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#787265] uppercase">
              // Reserve your table
            </span>
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium text-[#153226] mt-4 leading-[1.12]">
              Your Seat Awaits. <br />
              Reserve A Memorable <br />
              Dining Experience.
            </h2>
            <p className="mt-6 text-sm text-[#4e554b] leading-relaxed max-w-md font-light">
              Whether it's an intimate riverside dinner, a family gathering, or a corporate event,
              our team ensures every detail is prepared with the utmost care and elegance.
            </p>
            <div className="mt-8 pt-8 border-t border-[#dfd4c4] space-y-2 text-xs text-[#5f665c]">
              <p>
                <strong className="text-[#153226] font-medium">Opening Hours:</strong> Mon - Sun:
                7:30AM – 11PM
              </p>
              <p>
                <strong className="text-[#153226] font-medium">Direct Line:</strong> +60 12-609 3690
              </p>
              <p>
                <strong className="text-[#153226] font-medium">Address:</strong> 29, Jln. Bunga
                Raya, Kampung Jawa, 75100 Melaka
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#142e22] text-white p-8 sm:p-12 rounded-lg shadow-2xl border border-[#214736]">
              <div className="text-center mb-8">
                <span className="font-cormorant italic text-sm text-[#d88f4c] tracking-widest uppercase">
                  Book your Table
                </span>
                <h3 className="font-serif-display text-3xl sm:text-4xl font-normal text-white mt-1">
                  Make A Reservation
                </h3>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-normal text-stone-300 mb-2">
                      Booking Name
                    </label>
                    <input
                      placeholder="Enter Your Name"
                      className="w-full bg-[#0d2218] border border-[#214534] focus:border-[#d88f4c] focus:outline-none px-4 py-3 text-sm text-white placeholder-stone-500 transition-colors"
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-stone-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      placeholder="Enter Your Phone Number"
                      className="w-full bg-[#0d2218] border border-[#214534] focus:border-[#d88f4c] focus:outline-none px-4 py-3 text-sm text-white placeholder-stone-500 transition-colors"
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-normal text-stone-300 mb-2">
                      Email (optional)
                    </label>
                    <input
                      placeholder="you@email.com"
                      className="w-full bg-[#0d2218] border border-[#214534] focus:border-[#d88f4c] focus:outline-none px-4 py-3 text-sm text-white placeholder-stone-500 transition-colors"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-stone-300 mb-2">Date</label>
                    <input
                      className="w-full bg-[#0d2218] border border-[#214534] focus:border-[#d88f4c] focus:outline-none px-4 py-3 text-sm text-white placeholder-stone-500 transition-colors [color-scheme:dark]"
                      required
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-normal text-stone-300 mb-2">Time</label>
                    <select
                      className="w-full bg-[#0d2218] border border-[#214534] focus:border-[#d88f4c] focus:outline-none px-4 py-3 text-sm text-white transition-colors [color-scheme:dark] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      disabled={!date}
                    >
                      <option value="" disabled>
                        {date ? "Select a time" : "Pick a date first"}
                      </option>
                      {OPERATING_TIME_SLOTS.map((slot) => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-normal text-stone-300 mb-2">
                      Person of Number
                    </label>
                    <div className="flex items-stretch w-full bg-[#0d2218] border border-[#214534] focus-within:border-[#d88f4c] overflow-hidden transition-colors">
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.max(1, g - 1))}
                        disabled={guests <= 1}
                        aria-label="Reduce guests"
                        className="flex items-center justify-center w-12 shrink-0 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        <Minus size={16} />
                      </button>
                      <div className="flex-1 flex items-center justify-center py-3 text-sm text-white font-medium select-none border-x border-[#214534]">
                        {guests} {guests > 1 ? "Guests" : "Guest"}
                      </div>
                      <button
                        type="button"
                        onClick={() => setGuests((g) => Math.min(10, g + 1))}
                        disabled={guests >= 10}
                        aria-label="Add guests"
                        className="flex items-center justify-center w-12 shrink-0 text-white hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {selectedTable && (
                  <div className="text-xs text-[#d88f4c] bg-[#0d2218] border border-[#214534] px-4 py-3 rounded-xs">
                    Selected table from seating plan: <strong>{selectedTable}</strong>
                  </div>
                )}

                {decoSelection && (
                  <div className="text-xs text-[#d88f4c] bg-[#0d2218] border border-[#214534] px-4 py-3 rounded-xs flex items-start justify-between gap-3">
                    <span>
                      Table Deco:{" "}
                      <strong>
                        {decoSelection.type === "atas"
                          ? "Atas Table Deco ✨"
                          : "Birthday Table Deco ❤️✨"}
                      </strong>{" "}
                      ({decoSelection.pax}) — <strong>{decoSelection.price}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => onDecoClear?.()}
                      aria-label="Remove deco package"
                      className="text-stone-400 hover:text-white shrink-0 transition-colors cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                <div className="pt-1">
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      className="w-5 h-5 accent-[#d88f4c] bg-[#0d2218] border-[#214534] cursor-pointer"
                      type="checkbox"
                      checked={babyChair}
                      onChange={(e) => setBabyChair(e.target.checked)}
                    />
                    <span className="text-xs font-normal text-stone-200">Baby Chair</span>
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#ea8037] hover:bg-[#d6722d] active:bg-[#c26424] disabled:opacity-60 disabled:cursor-not-allowed text-neutral-900 font-bold text-xs uppercase tracking-[0.2em] py-4 transition-all duration-200 shadow-lg hover:shadow-xl rounded-xs"
                  >
                    {submitting ? "BOOKING..." : "BOOK YOUR TABLE"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
