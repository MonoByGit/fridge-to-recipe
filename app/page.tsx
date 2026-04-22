"use client";

import { useState } from "react";
import IngredientInput from "./components/IngredientInput";
import PantryView from "./components/PantryView";
import RecipeResults from "./components/RecipeResults";
import RecipeDetail from "./components/RecipeDetail";
import { Recipe } from "./types";

type Screen = "input" | "pantry" | "results" | "detail";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("input");
  const [pantry, setPantry] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const addIngredient = (name: string) => {
    const normalized = name.trim().toLowerCase();
    if (normalized && !pantry.includes(normalized)) {
      setPantry((prev) => [...prev, normalized]);
    }
  };

  const removeIngredient = (name: string) => {
    setPantry((prev) => prev.filter((i) => i !== name));
  };

  const handleFindRecipes = () => {
    if (pantry.length > 0) setScreen("results");
  };

  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setScreen("detail");
  };

  const handleBack = () => {
    if (screen === "detail") setScreen("results");
    else if (screen === "results") setScreen("pantry");
    else if (screen === "pantry") setScreen("input");
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <nav className="taf-nav sticky top-0 z-10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {screen !== "input" ? (
            <button
              onClick={handleBack}
              className="p-2 rounded-full transition-colors mr-1"
              style={{ color: "#9ca89e" }}
              aria-label="Terug"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <span className="taf-nav-logo">TAF</span>
          )}
          <span className="taf-nav-title">
            {screen === "input" && "Koelkast"}
            {screen === "pantry" && "Mijn ingrediënten"}
            {screen === "results" && "Recepten"}
            {screen === "detail" && (selectedRecipe?.title ?? "Recept")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {pantry.length > 0 && (
            <button
              onClick={() => setScreen("pantry")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold transition-colors"
              style={{ background: "rgba(52,199,89,0.18)", color: "var(--green)" }}
            >
              <span>{pantry.length}</span>
              <span>{pantry.length === 1 ? "item" : "items"}</span>
            </button>
          )}
        </div>
      </nav>

      <main className="max-w-lg mx-auto px-4 py-6">
        {screen === "input" && (
          <IngredientInput
            pantry={pantry}
            onAdd={addIngredient}
            onViewPantry={() => setScreen("pantry")}
            onFindRecipes={handleFindRecipes}
          />
        )}
        {screen === "pantry" && (
          <PantryView
            pantry={pantry}
            onRemove={removeIngredient}
            onFindRecipes={handleFindRecipes}
            onAddMore={() => setScreen("input")}
          />
        )}
        {screen === "results" && (
          <RecipeResults
            pantry={pantry}
            onSelect={handleSelectRecipe}
          />
        )}
        {screen === "detail" && selectedRecipe && (
          <RecipeDetail recipe={selectedRecipe} pantry={pantry} />
        )}
      </main>
    </div>
  );
}
