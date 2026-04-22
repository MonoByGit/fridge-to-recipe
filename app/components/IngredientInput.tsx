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
    const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length > 1) {
      parts.forEach((part) => onAdd(part));
      setInput("");
      inputRef.current?.focus();
    } else if (parts.length === 1) {
      handleAdd(parts[0]);
    }
  };

  return (
    <div className="animate-slide-up">
      <div className="taf-hero mb-6">
        <div className="text-4xl mb-3 relative z-10">🥗</div>
        <h1 className="text-2xl font-extrabold mb-1 relative z-10" style={{ color: "#fff", letterSpacing: "-0.5px" }}>
          Wat heb je in huis?
        </h1>
        <p className="text-sm relative z-10" style={{ color: "rgba(255,255,255,0.6)" }}>
          Voer je ingrediënten in — komma-gescheiden mag ook
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="melk, brood, room..."
              className="taf-input"
            />
          </div>
          <button
            type="submit"
            className="btn-primary px-5"
            disabled={!input.trim()}
            style={{ opacity: input.trim() ? 1 : 0.45, borderRadius: 14 }}
          >
            +
          </button>
        </div>
      </form>

      {input && filtered.length > 0 && (
        <div className="card p-2 mb-4 animate-fade-in">
          <p className="taf-label px-2 pt-2 pb-2">Suggesties</p>
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
          <p className="taf-label mb-2 px-1">
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
            <p className="taf-label">Toegevoegd ({pantry.length})</p>
            <button
              onClick={onViewPantry}
              className="text-xs font-bold"
              style={{ color: "var(--green-dark)" }}
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
        >
          Zoek recepten →
        </button>
      )}

      {pantry.length === 1 && (
        <p className="text-center text-sm mt-3 font-medium" style={{ color: "var(--text-secondary)" }}>
          Voeg nog minstens één ingrediënt toe
        </p>
      )}
    </div>
  );
}
