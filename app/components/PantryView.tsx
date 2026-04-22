"use client";

interface Props {
  pantry: string[];
  onRemove: (name: string) => void;
  onFindRecipes: () => void;
  onAddMore: () => void;
}

export default function PantryView({ pantry, onRemove, onFindRecipes, onAddMore }: Props) {
  return (
    <div className="animate-slide-up">
      <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
        {pantry.length} ingrediënten in je koelkast
      </p>

      <div className="card p-4 mb-4">
        {pantry.length === 0 ? (
          <p className="text-center py-8" style={{ color: "var(--text-secondary)" }}>
            Je koelkast is leeg
          </p>
        ) : (
          <ul className="space-y-2">
            {pantry.map((item) => (
              <li
                key={item}
                className="flex items-center justify-between py-2 border-b last:border-0"
                style={{ borderColor: "rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    {getEmoji(item)}
                  </span>
                  <span className="font-medium capitalize" style={{ color: "var(--text)" }}>
                    {item}
                  </span>
                </div>
                <button
                  onClick={() => onRemove(item)}
                  className="p-1.5 rounded-full hover:bg-red-50 transition-colors"
                  style={{ color: "var(--red)" }}
                  aria-label={`Verwijder ${item}`}
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onAddMore}
          className="btn-secondary flex-1"
        >
          + Meer toevoegen
        </button>
        <button
          onClick={onFindRecipes}
          className="btn-primary flex-1"
          disabled={pantry.length < 2}
          style={{ opacity: pantry.length >= 2 ? 1 : 0.5 }}
        >
          Zoek recepten
        </button>
      </div>
    </div>
  );
}

function getEmoji(ingredient: string): string {
  const map: Record<string, string> = {
    eieren: "🥚", melk: "🥛", boter: "🧈", kaas: "🧀", pasta: "🍝",
    rijst: "🍚", aardappelen: "🥔", ui: "🧅", knoflook: "🧄", tomaten: "🍅",
    brood: "🍞", bloem: "🌾", suiker: "🍬", olijfolie: "🫒", kip: "🍗",
    gehakt: "🥩", zalm: "🐟", spinazie: "🥬", wortel: "🥕", bananen: "🍌",
    avocado: "🥑", citrioen: "🍋",
  };
  return map[ingredient] ?? "🥫";
}
