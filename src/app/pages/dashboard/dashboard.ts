import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  standalone: false,
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent {
  goalInput: number | null = null;
  goal: number | null = null;
  dailyIntake: number = 0;

  showAddForm: boolean = false;
  foodName: string = '';
  foodCalories: number | null = null;

  // nova polja za evidenciju
  enteredFoods: { name: string; calories: number }[] = [];

  setCalorieGoal() {
    if (this.goalInput && this.goalInput > 0) {
      this.goal = this.goalInput;
      this.dailyIntake = 0;
      this.enteredFoods = []; // resetuj listu kad postaviš novi cilj
    }
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (this.showAddForm) {
      this.foodName = '';
      this.foodCalories = null;
    }
  }

  addFood() {
    if (!this.goal) {
      alert('Please set a daily goal first!');
      return;
    }
    if (!this.foodName.trim() || !this.foodCalories || this.foodCalories <= 0) {
      alert('Please enter a valid name and calorie amount.');
      return;
    }

    // ubaci novi unos u listu
    this.enteredFoods.push({
      name: this.foodName.trim(),
      calories: this.foodCalories,
    });

    // ažuriraj ukupni unos
    this.dailyIntake += this.foodCalories;

    this.toggleAddForm();

    if (this.dailyIntake > this.goal!) {
      alert('⚠️ You have exceeded your daily calorie goal!');
    }
  }
}
