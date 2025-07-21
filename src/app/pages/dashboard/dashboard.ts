// src/app/components/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { AuthService } from '../../services/auth.service';
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

  dailyEntry: DailyEntryResponse | null = null;
  enteredFoods: FoodEntryDto[] = [];
  dailyIntake: number = 0;

  showAddForm = false;
  foods: FoodItem[] = [];
  selectedFood: FoodItem | null = null;
  foodGrams: number | null = null;

  deleteDate: string | null = null;

  constructor(
    private foodService: FoodService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.foodService.readFoodItems().subscribe({
      next: items => this.foods = items,
      error: err => console.error('readFoodItems error', err)
    });

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

  confirmLogout(): void {
    const ok = window.confirm('Da li ste sigurni da želite da se odjavite?');
    if (ok) {
      this.authService.logout();
      this.router.navigate(['/unos']);
    }
  }

  setCalorieGoal() {
    if (this.goalInput! > 0) {
      this.goal = this.goalInput;
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

  private updateViewFromEntry() {
    if (!this.dailyEntry) return;
    this.enteredFoods = this.dailyEntry.entries;
    this.dailyIntake = this.dailyEntry.totalCalories;
  }
}