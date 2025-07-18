import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FoodItem } from '../models/food-item';

@Injectable({ providedIn: 'root' })
export class FoodService {
  // Pretpostavka: back ti stoji na localhost:8080
  private baseUrl = 'http://localhost:8080/food';

  constructor(private http: HttpClient) {}

  /** GET /food/readFoodItems -> List<FoodItem> */
  readFoodItems(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(`${this.baseUrl}/readFoodItems`);
  }
}
