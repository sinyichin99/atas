import { useState } from "react";
import { PALM_LEAF_TOP_IMG, SEATING_PLAN_BG_IMG } from "../lib/site-data";

type Table = {
  id: string;
  name: string;
  zone: "riverside" | "courtyard" | "veranda" | "high";
  capacity: string;
  shape: "circle" | "rect";
  // Coordinates based on the exact 1619 x 971 image canvas
  cx?: number;
  cy?: number;
  r?: number;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  rx?: number;
};

// Exact table dimensions & coordinates tailored to the 1619 x 971 graphic
const TABLES: Table[] = [
  // Riverside top tables (T14 - T17) - square rounded tables with chairs
  {
    id: "T14",
    name: "Table 14",
    zone: "riverside",
    capacity: "4 Guests",
    shape: "rect",
    x: 708,
    y: 84,
    w: 88,
    h: 88,
    rx: 20,
  },
  {
    id: "T15",
    name: "Table 15",
    zone: "riverside",
    capacity: "4 Guests",
    shape: "rect",
    x: 863,
    y: 84,
    w: 88,
    h: 88,
    rx: 20,
  },
  {
    id: "T16",
    name: "Table 16",
    zone: "riverside",
    capacity: "4 Guests",
    shape: "rect",
    x: 1018,
    y: 84,
    w: 88,
    h: 88,
    rx: 20,
  },
  {
    id: "T17",
    name: "Table 17",
    zone: "riverside",
    capacity: "4 Guests",
    shape: "rect",
    x: 1166,
    y: 84,
    w: 88,
    h: 88,
    rx: 20,
  },

  // Garden Courtyard (T1 - T4)
  {
    id: "T1",
    name: "Table 1",
    zone: "courtyard",
    capacity: "4 Guests",
    shape: "rect",
    x: 69,
    y: 450,
    w: 88,
    h: 88,
    rx: 20,
  },
  {
    id: "T2",
    name: "Table 2",
    zone: "courtyard",
    capacity: "4 Guests",
    shape: "rect",
    x: 243,
    y: 450,
    w: 88,
    h: 88,
    rx: 20,
  },
  {
    id: "T3",
    name: "Table 3",
    zone: "courtyard",
    capacity: "4 Guests",
    shape: "rect",
    x: 69,
    y: 708,
    w: 88,
    h: 88,
    rx: 20,
  },
  {
    id: "T4",
    name: "Table 4",
    zone: "courtyard",
    capacity: "4 Guests",
    shape: "rect",
    x: 243,
    y: 708,
    w: 88,
    h: 88,
    rx: 20,
  },

  // Veranda (T5, T6)
  {
    id: "T5",
    name: "Table 5",
    zone: "veranda",
    capacity: "4 Guests",
    shape: "rect",
    x: 443,
    y: 341,
    w: 86,
    h: 86,
    rx: 20,
  },
  {
    id: "T6",
    name: "Table 6",
    zone: "veranda",
    capacity: "6 Guests",
    shape: "rect",
    x: 626,
    y: 342,
    w: 161,
    h: 86,
    rx: 20,
  },

  // Veranda Garden (T11, T10)
  {
    id: "T11",
    name: "Table 11",
    zone: "veranda",
    capacity: "4 Guests",
    shape: "rect",
    x: 1084,
    y: 249,
    w: 88,
    h: 88,
    rx: 20,
  },
  {
    id: "T10",
    name: "Table 10",
    zone: "veranda",
    capacity: "4 Guests",
    shape: "rect",
    x: 1084,
    y: 407,
    w: 88,
    h: 88,
    rx: 20,
  },

  // Right Veranda (T13, T12)
  {
    id: "T13",
    name: "Table 13",
    zone: "veranda",
    capacity: "4 Guests",
    shape: "rect",
    x: 1475,
    y: 256,
    w: 88,
    h: 88,
    rx: 20,
  },
  {
    id: "T12",
    name: "Table 12",
    zone: "veranda",
    capacity: "4 Guests",
    shape: "rect",
    x: 1475,
    y: 434,
    w: 88,
    h: 88,
    rx: 20,
  },

  // High Table Area (T7, T8)
  {
    id: "T7",
    name: "Table 7",
    zone: "high",
    capacity: "4 Guests",
    shape: "rect",
    x: 1098,
    y: 750,
    w: 75,
    h: 146,
    rx: 16,
  },
  {
    id: "T8",
    name: "Table 8",
    zone: "high",
    capacity: "4 Guests",
    shape: "rect",
    x: 1276,
    y: 750,
    w: 75,
    h: 146,
    rx: 16,
  },

  // High table - long communal (T9)
  {
    id: "T9",
    name: "Table 9",
    zone: "high",
    capacity: "6-8 Guests",
    shape: "rect",
    x: 1421,
    y: 704,
    w: 168,
    h: 70,
    rx: 16,
  },
];

const ZONE_LABELS: Record<Table["zone"], string> = {
  riverside: "Riverside Parasol Tables (T14 - T17)",
  courtyard: "Garden Courtyard (T1 - T4)",
  veranda: "Veranda Dining (T5, T6, T10 - T13)",
  high: "High Table Area (T7 - T9)",
};

export function Seating({
  selectedTable,
  onSelectTable,
}: {
  selectedTable: string | null;
  onSelectTable: (id: string | null) => void;
}) {
  const [hoveredTable, setHoveredTable] = useState<string | null>(null);

  const activeTableObj = TABLES.find((t) => t.id === selectedTable);
  const activeOrHovered = hoveredTable ? TABLES.find((t) => t.id === hoveredTable) : activeTableObj;

  return (
    <section
      id="seating"
      className="relative bg-[#F5EFE6] text-[#153226] py-20 sm:py-28 border-t border-[#ded3c3] overflow-hidden"
    >
      {/* Corner leaf decoration */}
      <img
        src={PALM_LEAF_TOP_IMG}
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-4 -right-4 sm:-top-5 sm:-right-5 w-24 sm:w-32 md:w-40 lg:w-48 h-auto z-10 drop-shadow-md opacity-70 blur-[2px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-[#787265]">
              // Interactive Floor Plan
            </span>
            <h2 className="font-serif-display text-4xl sm:text-5xl font-medium text-[#153226] mt-3">
              Find Your Perfect Spot
            </h2>
            <p className="mt-3 text-sm text-[#4e554b] max-w-xl font-light">
              Explore our architectural seating layout. Hover over any table to view seating details
              and click to select your spot by the Malacca River, in the courtyard, or at the
              veranda.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#4e554b]">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#1b3d2f] border border-[#00E5C9]/50 inline-block" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#00E5C9] shadow-[0_0_8px_#00E5C9] inline-block" />
              <span>Hovered / Selected</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Floor Plan Graphic Container */}
          <div className="lg:col-span-8">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#00E5C9]/30 bg-[#06150e]">
              <div className="w-full overflow-x-auto">
                <svg
                  viewBox="0 0 1619 971"
                  className="w-full min-w-[780px] h-auto select-none block"
                  style={{ background: "#06150e" }}
                >
                  <defs>
                    {/* Vibrant Cyan Glow on Hover & Selected */}
                    <filter id="cyanGlow" x="-60%" y="-60%" width="220%" height="220%">
                      <feDropShadow
                        dx="0"
                        dy="0"
                        stdDeviation="14"
                        floodColor="#00E5C9"
                        floodOpacity="0.95"
                      />
                      <feDropShadow
                        dx="0"
                        dy="0"
                        stdDeviation="6"
                        floodColor="#FFFFFF"
                        floodOpacity="0.8"
                      />
                    </filter>

                    <filter id="hoverCyan" x="-40%" y="-40%" width="180%" height="180%">
                      <feDropShadow
                        dx="0"
                        dy="0"
                        stdDeviation="10"
                        floodColor="#00E5C9"
                        floodOpacity="0.85"
                      />
                    </filter>
                  </defs>

                  {/* High fidelity illustrated floor plan map */}
                  <image
                    href={SEATING_PLAN_BG_IMG}
                    x="0"
                    y="0"
                    width="1619"
                    height="971"
                    preserveAspectRatio="xMidYMid meet"
                  />

                  {/* Interactive Table Hit & Glow Layers */}
                  {TABLES.map((t) => {
                    const isSelected = selectedTable === t.id;
                    const isHovered = hoveredTable === t.id;
                    const isHighlighted = isSelected || isHovered;

                    return (
                      <g
                        key={t.id}
                        className="cursor-default group focus:outline-none"
                        onClick={() => onSelectTable(isSelected ? null : t.id)}
                        onMouseEnter={() => setHoveredTable(t.id)}
                        onMouseLeave={() => setHoveredTable(null)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Select ${t.name} (${t.capacity})`}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            onSelectTable(isSelected ? null : t.id);
                          }
                        }}
                      >
                        {/* Generous invisible hit zone */}
                        {t.shape === "circle" ? (
                          <circle cx={t.cx} cy={t.cy} r={(t.r ?? 44) + 14} fill="transparent" />
                        ) : (
                          <rect
                            x={(t.x ?? 0) - 12}
                            y={(t.y ?? 0) - 12}
                            width={(t.w ?? 0) + 24}
                            height={(t.h ?? 0) + 24}
                            rx={(t.rx ?? 18) + 4}
                            fill="transparent"
                          />
                        )}

                        {/* Hover & selected color glow overlay */}
                        {isHighlighted &&
                          (t.shape === "circle" ? (
                            <circle
                              cx={t.cx}
                              cy={t.cy}
                              r={t.r}
                              fill="#00E5C9"
                              fillOpacity={isSelected ? 0.95 : 0.8}
                              stroke="#FFFFFF"
                              strokeWidth={isSelected ? 3.5 : 2.5}
                              filter="url(#cyanGlow)"
                              className="transition-all duration-200"
                            />
                          ) : (
                            <rect
                              x={t.x}
                              y={t.y}
                              width={t.w}
                              height={t.h}
                              rx={t.rx}
                              fill="#00E5C9"
                              fillOpacity={isSelected ? 0.95 : 0.8}
                              stroke="#FFFFFF"
                              strokeWidth={isSelected ? 3.5 : 2.5}
                              filter="url(#cyanGlow)"
                              className="transition-all duration-200"
                            />
                          ))}

                        {/* Table Label when highlighted */}
                        {isHighlighted && (
                          <text
                            x={t.shape === "circle" ? t.cx : (t.x ?? 0) + (t.w ?? 0) / 2}
                            y={
                              t.shape === "circle"
                                ? (t.cy ?? 0) + 6
                                : (t.y ?? 0) + (t.h ?? 0) / 2 + 6
                            }
                            fill="#062e26"
                            fontSize="17"
                            fontWeight="800"
                            textAnchor="middle"
                            letterSpacing="0.04em"
                            style={{ pointerEvents: "none" }}
                          >
                            {t.id}
                          </text>
                        )}

                        {/* Selected Tag Indicator */}
                        {isSelected && (
                          <g
                            transform={`translate(${
                              t.shape === "circle" ? t.cx : (t.x ?? 0) + (t.w ?? 0) / 2
                            }, ${
                              t.shape === "circle"
                                ? (t.cy ?? 0) - (t.r ?? 44) - 22
                                : (t.y ?? 0) - 22
                            })`}
                            style={{ pointerEvents: "none" }}
                          >
                            <rect
                              x={-50}
                              y={-14}
                              width={100}
                              height={28}
                              rx={14}
                              fill="#062e26"
                              stroke="#00E5C9"
                              strokeWidth={2}
                              filter="url(#hoverCyan)"
                            />
                            <text
                              x={0}
                              y={5}
                              fill="#00E5C9"
                              fontSize="11"
                              fontWeight="800"
                              textAnchor="middle"
                              letterSpacing="0.12em"
                            >
                              SELECTED
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
            <p className="mt-3 text-xs text-[#5f665c] font-light flex items-center justify-between">
              <span>
                ✦ Hover over any table to view seating and change color to glowing cyan. Click to
                select your table.
              </span>
              <span className="hidden sm:inline">17 Dining Tables</span>
            </p>
          </div>

          {/* Details Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white/70 border border-[#e3dacd] rounded-2xl p-6 sm:p-7 shadow-xl backdrop-blur-md">
              <span className="text-xs font-semibold tracking-widest uppercase text-[#ea8037]">
                Table Details
              </span>

              {activeOrHovered ? (
                <div className="mt-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-4xl font-serif-display font-semibold text-[#ea8037]">
                        {activeOrHovered.id}
                      </span>
                      <span className="ml-3 text-sm font-medium text-[#153226]">
                        {activeOrHovered.name}
                      </span>
                    </div>
                    <span className="text-xs uppercase tracking-wider text-[#062e26] font-bold px-3 py-1 rounded-full shadow-sm bg-[#ea8037]">
                      {activeOrHovered.capacity}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-[#4e554b]">{ZONE_LABELS[activeOrHovered.zone]}</p>

                  <div className="mt-6 pt-5 border-t border-[#dfd4c4] space-y-2.5 text-xs text-[#4e554b]">
                    <div className="flex justify-between">
                      <span className="text-[#5f665c]">Zone</span>
                      <span className="font-medium text-[#153226] capitalize">
                        {activeOrHovered.zone}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5f665c]">Capacity</span>
                      <span className="font-medium text-[#153226]">{activeOrHovered.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5f665c]">Atmosphere</span>
                      <span className="font-medium text-[#153226]">
                        {activeOrHovered.zone === "riverside"
                          ? "River Breeze & Sunset View"
                          : activeOrHovered.zone === "courtyard"
                            ? "Lush Greenery & Garden Ambience"
                            : activeOrHovered.zone === "veranda"
                              ? "Covered Dining & Gentle Lanterns"
                              : "Cocktail & Social Lounge"}
                      </span>
                    </div>
                  </div>

                  <a
                    href="#reservation"
                    onClick={() => {
                      if (!selectedTable && hoveredTable) {
                        onSelectTable(hoveredTable);
                      }
                    }}
                    className="mt-6 group inline-flex items-center justify-center w-full text-[#062e26] text-xs font-bold uppercase tracking-[0.2em] px-6 py-3.5 transition-all duration-300 rounded-md shadow-lg shadow-[#00E5C9]/20 bg-[#ea8037] hover:-translate-y-1 hover:shadow-2xl hover:scale-[1.02] active:scale-95"
                  >
                    Reserve Table {activeOrHovered.id}
                    <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </a>
                </div>
              ) : (
                <div className="mt-4 py-8 text-center">
                  <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center text-xl mb-3 text-[#ea8037] bg-muted">
                    ✦
                  </div>
                  <h4 className="font-serif-display text-lg text-[#153226] font-medium">
                    No Table Selected
                  </h4>
                  <p className="mt-2 text-xs text-[#5f665c] max-w-xs mx-auto leading-relaxed">
                    Hover over or click on any table on the map to preview capacity, zone, and
                    reserve your dining experience.
                  </p>
                </div>
              )}

              {/* Floor Plan Legend */}
              <div className="mt-6 pt-6 border-t border-[#dfd4c4]">
                <h5 className="text-[11px] font-semibold tracking-wider text-[#5f665c] uppercase mb-3">
                  Dining Zones
                </h5>
                <div className="space-y-2">
                  {Object.entries(ZONE_LABELS).map(([key, label]) => (
                    <div key={key} className="flex items-center gap-2.5 text-xs text-[#4e554b]">
                      <span className="w-2 h-2 rounded-full shrink-0 bg-[#ea8037]" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
