import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FoodItem } from '../models/food-item';
import { FoodEntryRequest, DailyEntryResponse } from '../models/food-entry';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  // @RequestMapping("/food") na backend-u
  private baseUrl = 'http://localhost:8080/food';

  constructor(private http: HttpClient) {}

  /**
   * GET  /food/readFoodItems -> List<FoodItem>
   */
  readFoodItems(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(`${this.baseUrl}/food-items`);
  }

  /**
   * POST /food/createEntry -> DailyEntryResponse
   */
  createEntry(req: FoodEntryRequest): Observable<DailyEntryResponse> {
    return this.http.post<DailyEntryResponse>(
      `${this.baseUrl}/food-entry`,
      req
    );
  }

  /**
   * GET  /food/readDailyEntries -> List<DailyEntryResponse>
   */
  readDailyEntries(): Observable<DailyEntryResponse[]> {
    return this.http.get<DailyEntryResponse[]>(
      `${this.baseUrl}/daily-entries`
    );
  }

  /**
   * DELETE /food/deleteEntry/{id} -> void
   */
  deleteEntry(date: string): Observable<void> {
    const params = new HttpParams().set('date', date);
    return this.http.delete<void>(
      `${this.baseUrl}/daily-entry`,
      { params }
    );
  }
}