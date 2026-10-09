import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { REVIEWS } from "../lib/site-data";
import { getLatestReviews } from "../lib/reviews.functions";

const GOOGLE_REVIEW_URL =
  "https://www.google.com/search?q=atas+restaurant+melaka+review&oq=atas+&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIICAEQRRgnGDsyBggCEEUYOzIGCAMQRRg5MgYIBBBFGDwyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgxNjE5ajBqN6gCALACAA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x31d1f14a3960c1f9:0xa9faf87c157058c5,1,,,";

type ReviewItem = {
  name: string;
  meta: string;
  when: string;
  text: string;
};

export function Reviews() {
  const fetchReviews = useServerFn(getLatestReviews);
  const { data } = useQuery({
    queryKey: ["latest-reviews"],
    queryFn: () => fetchReviews(),
    staleTime: 1000 * 60 * 30,
  });

  const rating = data?.rating ?? 4.8;
  const reviews: ReviewItem[] = data && data.reviews.length > 0 ? data.reviews : REVIEWS;

  return (
    <section
      id="reviews"
      className="bg-[#153226] text-white py-20 sm:py-28 border-t border-[#1f4535]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold tracking-[0.25em] text-[#d88f4c] uppercase">
                Reviews
              </span>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-stone-300 hover:text-[#d88f4c] transition-colors"
              >
                <Star size={14} className="fill-[#d88f4c] text-[#d88f4c]" />
                Google Reviews {rating.toFixed(1)} ★
              </a>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-medium text-white leading-tight">
              Dining Stories From <br />
              Our Guests.
            </h2>
          </div>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d88f4c] hover:text-white transition-colors shrink-0"
          >
            See All Google Reviews →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.name + r.when}
              className="bg-[#0e2118] border border-[#214736] rounded-xl p-6 flex flex-col"
            >
              <div className="flex items-center mb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#d88f4c] font-semibold">
                  Google Review
                </span>
              </div>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-[#d88f4c] text-[#d88f4c]" />
                ))}
              </div>
              <p className="text-sm text-stone-200/90 leading-relaxed font-light flex-grow">
                “{r.text}”
              </p>
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="font-serif-display text-base font-medium text-white">{r.name}</div>
                <div className="text-xs text-stone-400 mt-0.5">{r.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
