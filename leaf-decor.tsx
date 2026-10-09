// Decorative botanical leaf SVGs used as section accents.

export function LeafClusterDark({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 240 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className ?? ""} ${flip ? "scale-x-[-1]" : ""}`}
      style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.6))" }}
      aria-hidden="true"
    >
      <path
        d="M-10 0 C 30 50, 70 120, 95 200"
        stroke="#1E3E22"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M10 -10 C 60 40, 110 100, 140 170"
        stroke="#254D2B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M15 20 Q 55 25, 90 40 Q 60 55, 15 20 Z" fill="#2E5A33" opacity="0.95" />
      <path d="M25 35 Q 75 55, 115 80 Q 75 85, 25 35 Z" fill="#1F4225" />
      <path d="M40 15 Q 85 10, 130 25 Q 90 40, 40 15 Z" fill="#3B6F40" opacity="0.9" />
      <path d="M50 65 Q 110 80, 155 110 Q 110 120, 50 65 Z" fill="#2B562F" />
      <path d="M60 85 Q 120 115, 165 155 Q 115 150, 60 85 Z" fill="#1C3C20" opacity="0.95" />
      <path d="M75 50 Q 135 55, 185 80 Q 135 90, 75 50 Z" fill="#36683B" />
      <path d="M85 130 Q 140 165, 175 210 Q 130 200, 85 130 Z" fill="#234927" />
      <path d="M95 160 Q 145 205, 170 255 Q 135 240, 95 160 Z" fill="#19371D" />
      <path d="M105 110 Q 165 130, 210 160 Q 165 170, 105 110 Z" fill="#305F35" opacity="0.9" />
      <path d="M120 90 Q 175 100, 220 125 Q 180 135, 120 90 Z" fill="#447D4A" opacity="0.85" />
      <path d="M70 190 Q 110 235, 130 280 Q 105 260, 70 190 Z" fill="#29522D" />
    </svg>
  );
}

export function LeafClusterLight({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className ?? ""} ${flip ? "scale-x-[-1] scale-y-[-1]" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M10 10 C 60 70, 110 140, 180 200"
        stroke="#47624B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M25 35 Q 50 20, 85 28 C 65 38, 45 42, 25 35 Z" fill="#5C7A5E" opacity="0.9" />
      <path d="M45 60 Q 90 40, 135 55 C 105 70, 75 75, 45 60 Z" fill="#47624B" opacity="0.95" />
      <path d="M70 90 Q 125 75, 175 95 C 140 115, 100 115, 70 90 Z" fill="#3B553F" opacity="0.9" />
      <path
        d="M95 125 Q 155 115, 195 140 C 160 160, 125 155, 95 125 Z"
        fill="#5C7A5E"
        opacity="0.95"
      />
      <path d="M125 160 Q 175 160, 200 190 C 175 198, 145 190, 125 160 Z" fill="#47624B" />
      <path d="M30 42 Q 25 80, 48 95 C 45 75, 40 55, 30 42 Z" fill="#334B36" />
      <path d="M55 70 Q 55 115, 80 135 C 75 110, 68 85, 55 70 Z" fill="#547155" />
      <path d="M85 105 Q 90 155, 118 175 C 110 145, 100 120, 85 105 Z" fill="#3D5941" />
      <path d="M120 145 Q 130 185, 155 205 C 145 180, 135 160, 120 145 Z" fill="#5C7A5E" />
    </svg>
  );
}
