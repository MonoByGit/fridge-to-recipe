"use client";

import { useMemo } from "react";
import { matchRecipes } from "../lib/recipes";
import { Recipe } from "../types";

interface Props {
  pantry: string[];
  onSelect: (recipe: Recipe) => void;
}

export default function RecipeResults({ pantry, onSelect }: Props) {
  const recipes = useMemo(() => matchRecipes(pantry), [pantry]);

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="text-5xl mb-4">🤷</div>
        <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--text)" }}>
          Geen recepten gevonden
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>
          Voeg meer ingrediënten toe om recepten te ontdekken
        </p>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
        {recipes.length} recepten gevonden op basis van jouw ingrediënten
      </p>

      <div className="space-y-4">
        {recipes.map((recipe, i) => {
          const pct = recipe.matchPercent ?? 0;
          const matchClass = pct >= 80 ? "match-high" : pct >= 60 ? "match-medium" : "match-low";
          const matchLabel = pct >= 80 ? "Perfecte match" : pct >= 60 ? "Goede match" : "Gedeeltelijke match";

          return (
            <div
              key={recipe.id}
              className="recipe-card animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
              onClick={() => onSelect(recipe)}
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{recipe.imageEmoji}</span>
                    <div>
                      <h3 className="font-semibold text-base" style={{ color: "var(--text)" }}>
                        {recipe.title}
                      </h3>
                      <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
                        {recipe.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`match-badge ${matchClass}`}>
                    {matchLabel} ({pct}%)
                  </span>
                  {recipe.prepTime !== undefined && (
                    <span className="text-xs px-2 py-1 rounded-full"
                      style={{ background: "#f5f5f7", color: "var(--text-secondary)" }}>
                      ⏱ {(recipe.prepTime ?? 0) + (recipe.cookTime ?? 0)} min
                    </span>
                  )}
                  <span className="text-xs px-2 py-1 rounded-full"
                    style={{ background: "#f5f5f7", color: "var(--text-secondary)" }}>
                    {difficultyLabel(recipe.difficulty)}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full"
                    style={{ background: "#f5f5f7", color: "var(--text-secondary)" }}>
                    {recipe.servings} personen
                  </span>
                </div>
              </div>

              <div className="h-1 rounded-b-xl" style={{
                background: `linear-gradient(to right, ${pct >= 80 ? "#34C759" : pct >= 60 ? "#FF9500" : "#FF3B30"} ${pct}%, #f0f0f0 ${pct}%)`
              }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function difficultyLabel(d: string): string {
  return d === "easy" ? "😊 Makkelijk" : d === "medium" ? "🔥 Gemiddeld" : "⭐ Uitdagend";
}
