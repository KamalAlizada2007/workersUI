import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Worker {
  id: number;
  name: string;
  surname: string;
  salary: number;
  workExperienceYears: number;
  dateOfBirth: string;  
}


@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private apiUrl = 'https://localhost:7080/api/Worker/';  

  constructor(private http: HttpClient) {
    
  }

  getWorkers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}getall`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}get?id=${id}`);
  }

  add(worker: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, worker);
  }

  update(worker: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}`, worker);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`);
  }
}

