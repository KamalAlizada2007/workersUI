import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WorkTask {
  id: number;
  name: string;
  description: string;
  workerId: number | null;  
}

@Injectable({
  providedIn: 'root'
})
export class WorkTaskService {
  private apiUrl = 'https://localhost:7080/api/WorkTask/';  

  constructor(private http: HttpClient) {}

  getWorkTasks(): Observable<WorkTask[]> {
    return this.http.get<WorkTask[]>(`${this.apiUrl}getall`);
  }

  getWorkTaskById(id: number): Observable<WorkTask> {
    return this.http.get<WorkTask>(`${this.apiUrl}/${id}`);
  }

  addWorkTask(task: WorkTask): Observable<any> {
    return this.http.post(`${this.apiUrl}`, task);
  }

  updateWorkTask(task: WorkTask): Observable<any> {
    return this.http.put(this.apiUrl, task);
  }

  deleteWorkTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?id=${id}`);
  }

  getTasksByWorkerCode(): Observable<WorkTask[]>{
    return this.http.get<WorkTask[]>(`${this.apiUrl}get-mytask`);
  }
}
