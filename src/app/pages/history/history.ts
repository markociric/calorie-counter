import { Component, OnInit } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { DailyEntryResponse } from '../../models/food-entry';

@Component({
  selector: 'app-history',
  standalone: false,
  templateUrl: './history.html',
  styleUrl: './history.css'
})
export class HistoryComponent implements OnInit {
  entries: DailyEntryResponse[] = [];

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.foodService.readDailyEntries().subscribe({
      next: data => this.entries = data,
      error: err => console.error('Greška pri učitavanju istorije', err)
    });
  }
}