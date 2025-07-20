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

/** Jedan unos hrane unutar dnevnika */
export interface FoodEntryDto {
  /** Naziv namirnice */
  foodName: string;
  /** Količina u gramima */
  grams: number;
}

/** Odgovor za POST / PUT dnevnog unosa */
export interface DailyEntryResponse {
  /** Primarni ključ dnevnika */
  id: number;
  /** Datum (ISO string ili Date) */
  date: string;
  /** Ukupno unesene kalorije tog dana */
  totalCalories: number;
  /** Lista unetih namirnica */
  entries: FoodEntryDto[];
}