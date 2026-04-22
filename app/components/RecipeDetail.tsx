"use client";

import { useState } from "react";
import { Recipe } from "../types";
import { Lang, getT } from "../lib/i18n";

interface Props {
  recipe: Recipe;
  pantry: string[];
  isSaved?: boolean;
  onToggleSave?: () => void;
  onNewSearch?: () => void;
  lang?: Lang;
}

export default function RecipeDetail({
  recipe,
  pantry,
  isSaved = false,
  onToggleSave,
  onNewSearch,
  lang = "nl",
}: Props) {
  const t = getT(lang);
  const [shareMsg, setShareMsg] = useState<string | null>(null);

  const pantryLower = pantry.map((i) => i.toLowerCase());

  const haveIngredient = (name: string) =>
    pantryLower.some(
      (p) => p.includes(name.toLowerCase()) || name.toLowerCase().includes(p)
    );

  const missing = recipe.ingredients.filter(
    (i) => !i.optional && !haveIngredient(i.ingredientName)
  );

  const handleShare = async () => {
    const text = `${recipe.imageEmoji} ${recipe.title} — ${recipe.description ?? ""}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: recipe.title, text });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(text);
        setShareMsg(t.linkCopied);
        setTimeout(() => setShareMsg(null), 2000);
      } catch {}
    }
  };

  return (
    <div className="animate-slide-up">
      <div className="card p-6 mb-4 text-center">
        <div className="text-6xl mb-3">{recipe.imageEmoji}</div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
          {recipe.title}
        </h1>
        {recipe.description && (
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {recipe.description}
          </p>
        )}

        <div className="flex justify-center gap-4 mt-4">
          {recipe.prepTime !== undefined && (
            <div className="text-center">
              <div className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                {recipe.prepTime}
              </div>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {t.minPrep}
              </div>
            </div>
          )}
          {recipe.cookTime !== undefined && recipe.cookTime > 0 && (
            <div className="text-center">
              <div className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                {recipe.cookTime}
              </div>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                {t.minCook}
              </div>
            </div>
          )}
          <div className="text-center">
            <div className="text-lg font-semibold" style={{ color: "var(--text)" }}>
              {recipe.servings}
            </div>
            <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
              {t.persons}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-2 mt-5 flex-wrap">
          {onToggleSave && (
            <button
              onClick={onToggleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all"
              style={
                isSaved
                  ? { background: "var(--green)", color: "#fff" }
                  : { background: "rgba(52,199,89,0.12)", color: "var(--green)" }
              }
            >
              <svg width="16" height="16" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24">
                <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {isSaved ? t.saved : t.save}
            </button>
          )}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all"
            style={{ background: "rgba(0,113,227,0.10)", color: "#0071e3" }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
              <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2"/>
              <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="2"/>
            </svg>
            {shareMsg ?? t.share}
          </button>
          {onNewSearch && (
            <button
              onClick={onNewSearch}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all"
              style={{ background: "var(--surface-alt)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {t.newSearch}
            </button>
          )}
        </div>
      </div>

      <div className="card p-4 mb-4">
        <h2 className="font-semibold text-base mb-3" style={{ color: "var(--text)" }}>
          {t.ingredients}
        </h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((ing) => {
            const have = haveIngredient(ing.ingredientName);
            return (
              <li key={ing.ingredientId} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: have ? "#e8f8ed" : ing.optional ? "#f5f5f7" : "#ffe8e7",
                      color: have ? "#1a7a34" : ing.optional ? "#6e6e73" : "#cc2e26",
                    }}
                  >
                    {have ? "✓" : ing.optional ? "~" : "✗"}
                  </span>
                  <span
                    className="text-sm"
                    style={{
                      color: have ? "var(--text)" : ing.optional ? "var(--text-secondary)" : "var(--text)",
                    }}
                  >
                    {ing.amount && `${ing.amount} ${ing.unit ?? ""} `}
                    <span className={have ? "font-medium" : ""}>
                      {ing.ingredientName}
                    </span>
                    {ing.optional && (
                      <span className="text-xs ml-1" style={{ color: "var(--text-secondary)" }}>
                        {t.optional}
                      </span>
                    )}
                  </span>
                </div>
                {!have && !ing.optional && (
                  <span
                    className="text-xs px-2 py-1 rounded-lg font-medium"
                    style={{ background: "#f5f5f7", color: "var(--text-secondary)" }}
                  >
                    {t.missing}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {missing.length > 0 && (
        <div className="card p-4 mb-4" style={{ borderLeft: "3px solid var(--orange)" }}>
          <h2 className="font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>
            💡 {t.missingCount(missing.length)}
          </h2>
          <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
            {t.tryAlternative}
          </p>
          <div className="flex gap-2 flex-wrap">
            {missing.map((ing) => (
              <span
                key={ing.ingredientId}
                className="text-sm px-3 py-1.5 rounded-lg font-medium"
                style={{ background: "#f5f5f7", color: "var(--text-secondary)" }}
              >
                {ing.ingredientName}
              </span>
            ))}
          </div>
        </div>
      )}

      {missing.length === 0 && (
        <div
          className="card p-4 mb-4 text-center"
          style={{ background: "#e8f8ed", border: "none" }}
        >
          <div className="text-2xl mb-1">🎉</div>
          <p className="font-semibold text-sm" style={{ color: "#1a7a34" }}>
            {t.allIngredients}
          </p>
          <p className="text-xs mt-1" style={{ color: "#2db14e" }}>
            {t.canMakeNow}
          </p>
        </div>
      )}
    </div>
  );
}
