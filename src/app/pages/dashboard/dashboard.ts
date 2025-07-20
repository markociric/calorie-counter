// src/app/components/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { FoodItem } from '../../models/food-item';
import { FoodEntryRequest, DailyEntryResponse, FoodEntryDto } from '../../models/food-entry';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit {
  goalInput: number | null = null;
  goal: number | null = null;

  // Čuvamo ceo dnevni unos i pojedinačne unose za prikaz
  dailyEntry: DailyEntryResponse | null = null;
  enteredFoods: FoodEntryDto[] = [];
  dailyIntake: number = 0;

  showAddForm = false;
  foods: FoodItem[] = [];
  selectedFood: FoodItem | null = null;
  foodGrams: number | null = null;

  // Za delete preko query-param
  deleteDate: string | null = null;

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    // Učitamo statičku listu FoodItem-ova (da imamo kalorije po 100g)
    this.foodService.readFoodItems().subscribe({
      next: items => this.foods = items,
      error: err => console.error('readFoodItems error', err)
    });

    // Učitamo sve dnevne zapise i uzmemo onaj najnoviji
    this.foodService.readDailyEntries().subscribe({
      next: (entries: DailyEntryResponse[]) => {
        if (entries.length) {
          this.dailyEntry = entries[entries.length - 1];
          this.updateViewFromEntry();
        }
      },
      error: err => console.error('readDailyEntries error', err)
    });
  }

  setCalorieGoal() {
    if (this.goalInput! > 0) {
      this.goal = this.goalInput;
      // Resetujemo lokalni prikaz unosa
      this.dailyEntry = null;
      this.enteredFoods = [];
      this.dailyIntake = 0;
    }
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (this.showAddForm) {
      this.selectedFood = null;
      this.foodGrams = null;
    }
  }

  addFood() {
    if (!this.goal) {
      alert('Please set a daily goal first!');
      return;
    }
    if (!this.selectedFood || !this.foodGrams! || this.foodGrams! <= 0) {
      alert('Please select a food and enter valid grams.');
      return;
    }

    const req: FoodEntryRequest = {
      foodName: this.selectedFood.name,
      grams: this.foodGrams!
    };

    this.foodService.createEntry(req).subscribe({
      next: (resp: DailyEntryResponse) => {
        this.dailyEntry = resp;
        this.updateViewFromEntry();
        this.toggleAddForm();

        if (resp.totalCalories > this.goal!) {
          alert('⚠️ You have exceeded your daily calorie goal!');
        }
      },
      error: err => {
        console.error('Error creating food entry', err);
        alert('Failed to add entry. Please try again.');
      }
    });
  }

  startDelete() {
    if (!this.dailyEntry) return;
    this.deleteDate = this.dailyEntry.date;
  }

  confirmDelete() {
    if (!this.deleteDate) return;

    this.foodService.deleteEntry(this.deleteDate).subscribe({
      next: () => {
        // Izbriši lokalni prikaz
        this.dailyEntry = null;
        this.enteredFoods = [];
        this.dailyIntake = 0;
        this.deleteDate = null;
      },
      error: err => {
        console.error('Delete error', err);
        alert('Failed to delete entry.');
      }
    });
  }

  cancelDelete() {
    this.deleteDate = null;
  }

  /** Ažurira listu enteredFoods i ukupne kalorije iz dailyEntry */
  private updateViewFromEntry() {
    if (!this.dailyEntry) return;

    // Direkno preuzimamo stavke iz DTO-a
    this.enteredFoods = this.dailyEntry.entries;
    this.dailyIntake = this.dailyEntry.totalCalories;
  }
}