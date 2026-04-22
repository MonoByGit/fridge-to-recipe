export interface Ingredient {
  id: string;
  name: string;
  category?: string;
}

export interface RecipeIngredient {
  ingredientId: string;
  ingredientName: string;
  amount?: string;
  unit?: string;
  optional: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  imageEmoji: string;
  prepTime?: number;
  cookTime?: number;
  servings: number;
  difficulty: "easy" | "medium" | "hard";
  ingredients: RecipeIngredient[];
  matchCount?: number;
  matchPercent?: number;
}
