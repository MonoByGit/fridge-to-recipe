"use client";

import { useState, useRef } from "react";

interface Props {
  pantry: string[];
  onAdd: (name: string) => void;
  onViewPantry: () => void;
  onFindRecipes: () => void;
}

const SUGGESTIONS = [
  "eieren", "melk", "boter", "kaas", "pasta", "rijst", "aardappelen",
  "ui", "knoflook", "tomaten", "brood", "bloem", "suiker", "olijfolie",
  "kip", "gehakt", "zalm", "spinazie", "wortel", "bananen", "avocado",
];

export default function IngredientInput({ pantry, onAdd, onViewPantry, onFindRecipes }: Props) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = SUGGESTIONS.filter(
    (s) => s.includes(input.toLowerCase()) && !pantry.includes(s)
  );

  const handleAdd = (name: string) => {
    onAdd(name);
    setInput("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) handleAdd(input.trim());
  };

  return (
    <div className="animate-slide-up">
      <div className="mb-8 text-center">
        <div className="text-5xl mb-3">🥗</div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
          Wat heb je in huis?
        </h1>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Voeg je ingrediënten toe en ontdek recepten
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="bijv. eieren, pasta, tomaten..."
              className="w-full px-4 py-3 rounded-xl border text-base outline-none transition-all"
              style={{
                background: "var(--surface)",
                borderColor: input ? "var(--green)" : "rgba(0,0,0,0.12)",
                color: "var(--text)",
                boxShadow: input ? "0 0 0 3px rgba(52,199,89,0.15)" : "none",
              }}
            />
          </div>
          <button
            type="submit"
            className="btn-primary px-5 py-3 rounded-xl"
            disabled={!input.trim()}
            style={{ opacity: input.trim() ? 1 : 0.5 }}
          >
            +
          </button>
        </div>
      </form>

      {input && filtered.length > 0 && (
        <div className="card p-2 mb-4 animate-fade-in">
          <p className="text-xs px-2 pt-1 pb-2 font-medium" style={{ color: "var(--text-secondary)" }}>
            Suggesties
          </p>
          <div className="flex flex-wrap gap-2 p-1">
            {filtered.slice(0, 6).map((s) => (
              <button
                key={s}
                onClick={() => handleAdd(s)}
                className="ingredient-tag cursor-pointer border-none"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {!input && (
        <div className="mb-4">
          <p className="text-xs font-medium mb-2 px-1" style={{ color: "var(--text-secondary)" }}>
            {pantry.length === 0 ? "Veelgebruikte ingrediënten" : "Meer toevoegen"}
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.filter((s) => !pantry.includes(s)).slice(0, 12).map((s) => (
              <button
                key={s}
                onClick={() => handleAdd(s)}
                className="ingredient-tag cursor-pointer border-none"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {pantry.length > 0 && (
        <div className="card p-4 mb-4 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
              Toegevoegd ({pantry.length})
            </p>
            <button
              onClick={onViewPantry}
              className="text-xs font-medium"
              style={{ color: "var(--blue)" }}
            >
              Bekijk alles
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {pantry.map((item) => (
              <span key={item} className="ingredient-tag">
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {pantry.length >= 2 && (
        <button
          onClick={onFindRecipes}
          className="btn-primary w-full mt-2"
          style={{ borderRadius: 16 }}
        >
          Zoek recepten →
        </button>
      )}

      {pantry.length === 1 && (
        <p className="text-center text-sm mt-3" style={{ color: "var(--text-secondary)" }}>
          Voeg nog een ingrediënt toe om recepten te zoeken
        </p>
      )}
    </div>
  );
}
