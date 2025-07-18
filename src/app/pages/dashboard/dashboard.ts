import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { FoodItem } from '../../models/food-item';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements OnInit {
  goalInput: number | null = null;
  goal: number | null = null;
  dailyIntake: number = 0;

  showAddForm = false;

  // sada dohvaćamo listu iz back‑enda
  foods: FoodItem[] = [];
  selectedFood: FoodItem | null = null;
  foodGrams: number | null = null;

  enteredFoods: { name: string; grams: number; kcal: number }[] = [];

  deletingIndex: number | null = null;
  deleteDate: string | null = null;
  constructor(private foodService: FoodService) {}

  ngOnInit() {
    this.foodService.readFoodItems().subscribe({
      next: (items) => {
        console.log('Loaded foods:', items);
        this.foods = items;
      },
      error: (err) => console.error('readFoodItems error', err),
    });
  }

  setCalorieGoal() {
    if (this.goalInput && this.goalInput > 0) {
      this.goal = this.goalInput;
      this.dailyIntake = 0;
      this.enteredFoods = [];
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
    if (!this.selectedFood) {
      alert('Please select a food.');
      return;
    }
    if (!this.foodGrams || this.foodGrams <= 0) {
      alert('Please enter a valid gram amount.');
      return;
    }

    // preračunaj stvarne kcal: (caloriesPer100g * grams) / 100
    const kcal = (this.selectedFood.caloriesPer100g * this.foodGrams) / 100;

    // dodaš u listu
    this.enteredFoods.push({
      name: this.selectedFood.name,
      grams: this.foodGrams,
      kcal: Math.round(kcal), // zaokruži
    });

    // ažuriraj progress
    this.dailyIntake += kcal;
    this.toggleAddForm();

    if (this.dailyIntake > this.goal!) {
      alert('⚠️ You have exceeded your daily calorie goal!');
    }
  }
  startDelete(i: number) {
    this.deletingIndex = i;
    this.deleteDate = null;
  }

  /** Kada korisnik izabere datum, obriši entry i zatvori picker */
  confirmDelete() {
    if (this.deletingIndex === null || !this.deleteDate) return;

    // Ovdje možeš poslati i datum na backend ako budeš želeo…
    console.log(
      `Deleting entry`,
      this.enteredFoods[this.deletingIndex],
      `on`,
      this.deleteDate
    );

    // Ukloni iz lokalne liste
    this.enteredFoods.splice(this.deletingIndex, 1);
    this.dailyIntake = this.enteredFoods.reduce((sum, e) => sum + e.kcal, 0);

    // Reset stanja
    this.deletingIndex = null;
    this.deleteDate = null;
  }

  /** Ako korisnik odustane */
  cancelDelete() {
    this.deletingIndex = null;
    this.deleteDate = null;
  }
}
