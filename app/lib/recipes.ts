import { Recipe } from "../types";

export const RECIPES: Recipe[] = [
  {
    id: "1",
    title: "Pasta Aglio e Olio",
    description: "Simpele maar heerlijke Italiaanse pasta met knoflook en olijfolie.",
    imageEmoji: "🍝",
    prepTime: 5,
    cookTime: 15,
    servings: 2,
    difficulty: "easy",
    ingredients: [
      { ingredientId: "pasta", ingredientName: "pasta", amount: "200", unit: "g", optional: false },
      { ingredientId: "knoflook", ingredientName: "knoflook", amount: "4", unit: "teentjes", optional: false },
      { ingredientId: "olijfolie", ingredientName: "olijfolie", amount: "4", unit: "el", optional: false },
      { ingredientId: "peterselie", ingredientName: "peterselie", amount: "1", unit: "handvol", optional: true },
      { ingredientId: "peper", ingredientName: "peper", optional: false },
    ],
  },
  {
    id: "2",
    title: "Roerei met toast",
    description: "Luchtig roerei op geroosterd brood — het perfecte ontbijt.",
    imageEmoji: "🍳",
    prepTime: 5,
    cookTime: 5,
    servings: 1,
    difficulty: "easy",
    ingredients: [
      { ingredientId: "eieren", ingredientName: "eieren", amount: "3", unit: "stuks", optional: false },
      { ingredientId: "boter", ingredientName: "boter", amount: "1", unit: "el", optional: false },
      { ingredientId: "melk", ingredientName: "melk", amount: "2", unit: "el", optional: true },
      { ingredientId: "brood", ingredientName: "brood", amount: "2", unit: "sneden", optional: false },
      { ingredientId: "zout", ingredientName: "zout", optional: false },
    ],
  },
  {
    id: "3",
    title: "Tomatensoep",
    description: "Warme zelfgemaakte tomatensoep, troostvoedsel op zijn best.",
    imageEmoji: "🍅",
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { ingredientId: "tomaten", ingredientName: "tomaten", amount: "800", unit: "g", optional: false },
      { ingredientId: "ui", ingredientName: "ui", amount: "1", unit: "stuks", optional: false },
      { ingredientId: "knoflook", ingredientName: "knoflook", amount: "2", unit: "teentjes", optional: false },
      { ingredientId: "olijfolie", ingredientName: "olijfolie", amount: "2", unit: "el", optional: false },
      { ingredientId: "basilicum", ingredientName: "basilicum", optional: true },
      { ingredientId: "room", ingredientName: "room", optional: true },
    ],
  },
  {
    id: "4",
    title: "Gebakken rijst",
    description: "Snelle gebakken rijst met groenten en ei.",
    imageEmoji: "🍚",
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: "easy",
    ingredients: [
      { ingredientId: "rijst", ingredientName: "rijst", amount: "300", unit: "g gekookt", optional: false },
      { ingredientId: "eieren", ingredientName: "eieren", amount: "2", unit: "stuks", optional: false },
      { ingredientId: "ui", ingredientName: "ui", amount: "1", unit: "stuks", optional: false },
      { ingredientId: "wortel", ingredientName: "wortel", amount: "1", unit: "stuks", optional: true },
      { ingredientId: "sojasaus", ingredientName: "sojasaus", amount: "2", unit: "el", optional: false },
      { ingredientId: "sesamolie", ingredientName: "sesamolie", optional: true },
    ],
  },
  {
    id: "5",
    title: "Aardappelsoep",
    description: "Romige aardappelsoep, makkelijk en voedzaam.",
    imageEmoji: "🥔",
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: "easy",
    ingredients: [
      { ingredientId: "aardappelen", ingredientName: "aardappelen", amount: "500", unit: "g", optional: false },
      { ingredientId: "ui", ingredientName: "ui", amount: "1", unit: "stuks", optional: false },
      { ingredientId: "bouillon", ingredientName: "bouillon", amount: "1", unit: "liter", optional: false },
      { ingredientId: "room", ingredientName: "room", optional: true },
      { ingredientId: "bieslook", ingredientName: "bieslook", optional: true },
      { ingredientId: "boter", ingredientName: "boter", amount: "1", unit: "el", optional: false },
    ],
  },
  {
    id: "6",
    title: "Caprese salade",
    description: "Frisse Italiaanse salade met tomaat, mozzarella en basilicum.",
    imageEmoji: "🥗",
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: "easy",
    ingredients: [
      { ingredientId: "tomaten", ingredientName: "tomaten", amount: "3", unit: "stuks", optional: false },
      { ingredientId: "mozzarella", ingredientName: "mozzarella", amount: "125", unit: "g", optional: false },
      { ingredientId: "basilicum", ingredientName: "basilicum", amount: "1", unit: "handvol", optional: false },
      { ingredientId: "olijfolie", ingredientName: "olijfolie", amount: "2", unit: "el", optional: false },
      { ingredientId: "zout", ingredientName: "zout", optional: false },
    ],
  },
  {
    id: "7",
    title: "Bananenbrood",
    description: "Vochtig en zoet bananenbrood — perfect voor overrijpe bananen.",
    imageEmoji: "🍌",
    prepTime: 15,
    cookTime: 55,
    servings: 8,
    difficulty: "medium",
    ingredients: [
      { ingredientId: "bananen", ingredientName: "bananen", amount: "3", unit: "rijpe", optional: false },
      { ingredientId: "bloem", ingredientName: "bloem", amount: "200", unit: "g", optional: false },
      { ingredientId: "eieren", ingredientName: "eieren", amount: "2", unit: "stuks", optional: false },
      { ingredientId: "suiker", ingredientName: "suiker", amount: "100", unit: "g", optional: false },
      { ingredientId: "boter", ingredientName: "boter", amount: "80", unit: "g", optional: false },
      { ingredientId: "bakpoeder", ingredientName: "bakpoeder", amount: "1", unit: "tl", optional: false },
    ],
  },
  {
    id: "8",
    title: "Omelet met kaas",
    description: "Snelle en voedzame omelet met smeltende kaas.",
    imageEmoji: "🧀",
    prepTime: 5,
    cookTime: 5,
    servings: 1,
    difficulty: "easy",
    ingredients: [
      { ingredientId: "eieren", ingredientName: "eieren", amount: "3", unit: "stuks", optional: false },
      { ingredientId: "kaas", ingredientName: "kaas", amount: "40", unit: "g", optional: false },
      { ingredientId: "boter", ingredientName: "boter", amount: "1", unit: "el", optional: false },
      { ingredientId: "zout", ingredientName: "zout", optional: false },
      { ingredientId: "peper", ingredientName: "peper", optional: false },
    ],
  },
  {
    id: "9",
    title: "Avocado toast",
    description: "Trendy en voedzaam — avocado op knapperig toast.",
    imageEmoji: "🥑",
    prepTime: 5,
    cookTime: 2,
    servings: 1,
    difficulty: "easy",
    ingredients: [
      { ingredientId: "avocado", ingredientName: "avocado", amount: "1", unit: "stuks", optional: false },
      { ingredientId: "brood", ingredientName: "brood", amount: "2", unit: "sneden", optional: false },
      { ingredientId: "citroen", ingredientName: "citroen", amount: "½", unit: "stuks", optional: true },
      { ingredientId: "zout", ingredientName: "zout", optional: false },
      { ingredientId: "peper", ingredientName: "peper", optional: false },
    ],
  },
  {
    id: "10",
    title: "Groente curry",
    description: "Aromatische Indiase curry met seizoensgroenten en kokosmelk.",
    imageEmoji: "🍛",
    prepTime: 15,
    cookTime: 25,
    servings: 3,
    difficulty: "medium",
    ingredients: [
      { ingredientId: "kokosmelk", ingredientName: "kokosmelk", amount: "400", unit: "ml", optional: false },
      { ingredientId: "currypasta", ingredientName: "currypasta", amount: "2", unit: "el", optional: false },
      { ingredientId: "ui", ingredientName: "ui", amount: "1", unit: "stuks", optional: false },
      { ingredientId: "knoflook", ingredientName: "knoflook", amount: "3", unit: "teentjes", optional: false },
      { ingredientId: "bloemkool", ingredientName: "bloemkool", optional: true },
      { ingredientId: "spinazie", ingredientName: "spinazie", optional: true },
      { ingredientId: "rijst", ingredientName: "rijst", optional: false },
    ],
  },
];

export function matchRecipes(pantry: string[]): Recipe[] {
  const pantryLower = pantry.map((i) => i.toLowerCase());

  return RECIPES.map((recipe) => {
    const required = recipe.ingredients.filter((i) => !i.optional);
    const matched = required.filter((i) =>
      pantryLower.some(
        (p) =>
          p.includes(i.ingredientName.toLowerCase()) ||
          i.ingredientName.toLowerCase().includes(p)
      )
    );

    const matchPercent = required.length > 0
      ? Math.round((matched.length / required.length) * 100)
      : 0;

    return { ...recipe, matchCount: matched.length, matchPercent };
  })
    .filter((r) => (r.matchCount ?? 0) >= 1)
    .sort((a, b) => (b.matchPercent ?? 0) - (a.matchPercent ?? 0));
}

export const ALBERT_HEIJN_URL = (ingredient: string) =>
  `https://www.ah.nl/zoeken?query=${encodeURIComponent(ingredient)}`;

export const BOL_URL = (ingredient: string) =>
  `https://www.bol.com/nl/nl/s/?searchtext=${encodeURIComponent(ingredient)}`;
