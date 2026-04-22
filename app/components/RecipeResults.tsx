"use client";

import { useMemo } from "react";
import { matchRecipes } from "../lib/recipes";
import { Recipe } from "../types";
import { Lang, getT } from "../lib/i18n";

interface Props {
  pantry: string[];
  onSelect: (recipe: Recipe) => void;
  onNewSearch?: () => void;
  lang?: Lang;
}

export default function RecipeResults({ pantry, onSelect, onNewSearch, lang = "nl" }: Props) {
  const t = getT(lang);
  const recipes = useMemo(() => matchRecipes(pantry), [pantry]);

  if (recipes.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="text-5xl mb-4">🤷</div>
        <h2 className="text-xl font-semibold mb-2" style={{ color: "var(--text)" }}>
          {t.noRecipes}
        </h2>
        <p style={{ color: "var(--text-secondary)" }}>
          {t.noRecipesHint}
        </p>
        {onNewSearch && (
          <button
            onClick={onNewSearch}
            className="mt-6 btn-secondary flex items-center gap-2 mx-auto"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {t.newSearch}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <p className="taf-label">
          {t.recipesFound(recipes.length)}
        </p>
        {onNewSearch && (
          <button
            onClick={onNewSearch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{ background: "var(--surface-alt)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
          >
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2.5"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            {t.newSearch}
          </button>
        )}
      </div>

      <div className="space-y-4">
        {recipes.map((recipe, i) => {
          const pct = recipe.matchPercent ?? 0;
          const matchClass = pct >= 80 ? "match-high" : pct >= 60 ? "match-medium" : "match-low";
          const matchLabel = pct >= 80 ? t.perfectMatch : pct >= 60 ? t.goodMatch : t.partialMatch;

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
                    <span className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{ background: "var(--surface-alt)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                      ⏱ {(recipe.prepTime ?? 0) + (recipe.cookTime ?? 0)} min
                    </span>
                  )}
                  <span className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ background: "var(--surface-alt)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                    {difficultyLabel(recipe.difficulty, lang)}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ background: "var(--surface-alt)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                    {recipe.servings} {lang === "en" ? "serv." : "pers."}
                  </span>
                </div>
              </div>

              <div className="h-1 rounded-b-xl" style={{
                background: `linear-gradient(to right, ${pct >= 80 ? "#34C759" : pct >= 60 ? "#FF9500" : "#FF3B30"} ${pct}%, rgba(52,199,89,0.08) ${pct}%)`
              }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function difficultyLabel(d: string, lang: Lang): string {
  if (lang === "en") {
    return d === "easy" ? "😊 Easy" : d === "medium" ? "🔥 Medium" : "⭐ Challenging";
  }
  return d === "easy" ? "😊 Makkelijk" : d === "medium" ? "🔥 Gemiddeld" : "⭐ Uitdagend";
}
