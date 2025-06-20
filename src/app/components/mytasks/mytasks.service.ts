import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyTasksService {
  private baseUrl = 'https://localhost:7080/api/Task';

  constructor(private http: HttpClient) {}

  startTask(taskId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/start/${taskId}`, {});
  }

  pauseTask(taskId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/pause/${taskId}`, {});
  }

  continueTask(taskId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/continue/${taskId}`, {});
  }

  completeTask(taskId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/complete/${taskId}`, {});
  }

  getTaskStatus(taskId: number): Observable<{ taskId: number; status: string }> {
  return this.http.get<{ taskId: number; status: string }>(`${this.baseUrl}/status/${taskId}`);
}


}
