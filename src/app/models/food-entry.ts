// src/app/models/food-entry.ts

/**
 * Request payload for creating a daily food entry.
 */
export interface FoodEntryRequest {
  /** Name of the food item */
  foodName: string;
  /** Amount in grams */
  grams: number;
}

/**
 * Response payload representing a saved daily entry.
 */
export interface DailyEntryResponse {
  /** Unique identifier of the entry */
  id: number;
  /** Name of the food item */
  name: string;
  /** Amount in grams */
  grams: number;
  /** Calculated calories for this entry */
  calories: number;
  /** Total calories consumed today (after this entry) */
  totalCalories: number;
}