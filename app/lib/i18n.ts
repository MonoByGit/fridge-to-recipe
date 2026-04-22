export type Lang = "nl" | "en";

const nl = {
  back: "Terug",
  fridge: "Koelkast",
  myIngredients: "Mijn ingrediënten",
  recipes: "Recepten",
  recipe: "Recept",
  save: "Recept opslaan",
  saved: "Opgeslagen",
  unsave: "Verwijder",
  newSearch: "Nieuw zoeken",
  share: "Delen",
  linkCopied: "Link gekopieerd!",
  minPrep: "min prep",
  minCook: "min koken",
  persons: "personen",
  ingredients: "Ingrediënten",
  optional: "(optioneel)",
  missing: "ontbreekt",
  allIngredients: "Je hebt alle ingrediënten!",
  canMakeNow: "Je kunt dit recept direct maken",
  missingCount: (n: number) => `${n} ingredient${n > 1 ? "en" : ""} ontbreekt`,
  tryAlternative:
    "Probeer een alternatief uit je koelkast, of kies een recept dat beter past bij wat je hebt.",
  recipesFound: (n: number) => `${n} recepten gevonden`,
  noRecipes: "Geen recepten gevonden",
  noRecipesHint: "Voeg meer ingrediënten toe om recepten te ontdekken",
  perfectMatch: "Perfecte match",
  goodMatch: "Goede match",
  partialMatch: "Gedeeltelijke match",
  easy: "😊 Makkelijk",
  medium: "🔥 Gemiddeld",
  hard: "⭐ Uitdagend",
};

const en: typeof nl = {
  back: "Back",
  fridge: "Fridge",
  myIngredients: "My ingredients",
  recipes: "Recipes",
  recipe: "Recipe",
  save: "Save recipe",
  saved: "Saved",
  unsave: "Remove",
  newSearch: "New search",
  share: "Share",
  linkCopied: "Link copied!",
  minPrep: "min prep",
  minCook: "min cook",
  persons: "servings",
  ingredients: "Ingredients",
  optional: "(optional)",
  missing: "missing",
  allIngredients: "You have all ingredients!",
  canMakeNow: "You can make this recipe right now",
  missingCount: (n: number) => `${n} ingredient${n > 1 ? "s" : ""} missing`,
  tryAlternative:
    "Try an alternative from your fridge, or choose a recipe that better matches what you have.",
  recipesFound: (n: number) => `${n} recipes found`,
  noRecipes: "No recipes found",
  noRecipesHint: "Add more ingredients to discover recipes",
  perfectMatch: "Perfect match",
  goodMatch: "Good match",
  partialMatch: "Partial match",
  easy: "😊 Easy",
  medium: "🔥 Medium",
  hard: "⭐ Challenging",
};

export type Translations = typeof nl;

const translations: Record<Lang, Translations> = { nl, en };

export function detectLang(): Lang {
  if (typeof navigator === "undefined") return "nl";
  return navigator.language.toLowerCase().startsWith("nl") ? "nl" : "en";
}

export function getT(lang: Lang): Translations {
  return translations[lang];
}
