"use client";

import { Recipe } from "../types";

interface Props {
  recipe: Recipe;
  pantry: string[];
}

export default function RecipeDetail({ recipe, pantry }: Props) {
  const pantryLower = pantry.map((i) => i.toLowerCase());

  const haveIngredient = (name: string) =>
    pantryLower.some(
      (p) => p.includes(name.toLowerCase()) || name.toLowerCase().includes(p)
    );

  const missing = recipe.ingredients.filter(
    (i) => !i.optional && !haveIngredient(i.ingredientName)
  );

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
                min prep
              </div>
            </div>
          )}
          {recipe.cookTime !== undefined && recipe.cookTime > 0 && (
            <div className="text-center">
              <div className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                {recipe.cookTime}
              </div>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                min koken
              </div>
            </div>
          )}
          <div className="text-center">
            <div className="text-lg font-semibold" style={{ color: "var(--text)" }}>
              {recipe.servings}
            </div>
            <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
              personen
            </div>
          </div>
        </div>
      </div>

      <div className="card p-4 mb-4">
        <h2 className="font-semibold text-base mb-3" style={{ color: "var(--text)" }}>
          Ingrediënten
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
                        (optioneel)
                      </span>
                    )}
                  </span>
                </div>
                {!have && !ing.optional && (
                  <span
                    className="text-xs px-2 py-1 rounded-lg font-medium"
                    style={{ background: "#f5f5f7", color: "var(--text-secondary)" }}
                  >
                    ontbreekt
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
            💡 {missing.length} ingredient{missing.length > 1 ? "en" : ""} ontbreekt
          </h2>
          <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
            Probeer een alternatief uit je koelkast, of kies een recept dat beter past bij wat je hebt.
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
            Je hebt alle ingrediënten!
          </p>
          <p className="text-xs mt-1" style={{ color: "#2db14e" }}>
            Je kunt dit recept direct maken
          </p>
        </div>
      )}
    </div>
  );
}
