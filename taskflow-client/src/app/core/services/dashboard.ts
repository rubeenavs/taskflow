import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';

export interface DashboardStats{
  totalProjects: number;
  totalTasks: number;
  todoCount: number;
  inProgressCount: number;
  doneCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/dashboard/stats`;

  constructor(private http: HttpClient) { }

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(this.apiUrl);
}
}
