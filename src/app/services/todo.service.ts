import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TodoTask } from '../models/todo-task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  // Get all tasks
  getAllTasks(): Observable<TodoTask[]> {
    return this.http.get<TodoTask[]>(this.baseUrl);
  }

  // Get a specific task by ID
  getTaskById(id: number): Observable<TodoTask> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<TodoTask>(url);
  }

  // Create a new task
  createTask(task: TodoTask): Observable<TodoTask> {
    return this.http.post<TodoTask>(this.baseUrl, task);
  }

  // Update a task
  updateTask(task: TodoTask): Observable<TodoTask> {
    const url = `${this.baseUrl}/${task.id}`;
    return this.http.patch<TodoTask>(url, task);
  }

  // Delete a task
  deleteTask(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
