import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Task from './models/task';
import { Observable } from 'rxjs';
import { CreateTaskDto } from './models/create-task.dto';
import { UpdateTaskDto } from './models/update-task.dto';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private apiUrl = 'http://localhost:5141/api/TaskItems';
  constructor(private _httpClient: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this._httpClient.get<Task[]>(this.apiUrl);
  }

  createTask(task: CreateTaskDto): Observable<Task> {
    return this._httpClient.post<Task>(this.apiUrl, task);
  }

  updateTask(id: string, task: UpdateTaskDto): Observable<Task> {
    return this._httpClient.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: string) {
    return this._httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
