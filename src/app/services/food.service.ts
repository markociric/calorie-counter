import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<FoodItem[]>(`${this.baseUrl}/readFoodItems`);
  }

  /**
   * POST /food/createEntry -> DailyEntryResponse
   */
  createEntry(req: FoodEntryRequest): Observable<DailyEntryResponse> {
    return this.http.post<DailyEntryResponse>(
      `${this.baseUrl}/createEntry`,
      req
    );
  }

  /**
   * GET  /food/readDailyEntries -> List<DailyEntryResponse>
   */
  readDailyEntries(): Observable<DailyEntryResponse[]> {
    return this.http.get<DailyEntryResponse[]>(
      `${this.baseUrl}/readDailyEntries`
    );
  }

  /**
   * DELETE /food/deleteEntry/{id} -> void
   */
  //popraviti jer ne ide po id nego po datumu
  deleteEntry(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/deleteEntry/${id}`
    );
  }
}