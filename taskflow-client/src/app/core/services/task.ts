import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Task {  //interface is a shape of an object, it defines the properties and their types that an object should have
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string | null;
   createdAt: string;
  projectId: number;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string | null;
}

export interface UpdateTaskDto {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTasks(projectId: number): Observable<Task[]> {  //whatever comes back from this HTTP call will be an array of objects shaped like Task
    return this.http.get<Task[]>(`${this.apiUrl}/projects/${projectId}/tasks`);
  }

  createTask(projectId: number, task: CreateTaskDto): Observable<Task> {
  return this.http.post<Task>(`${this.apiUrl}/projects/${projectId}/tasks`, task);
}

updateTask(projectId: number, taskId: number, task: UpdateTaskDto): Observable<Task> {
  return this.http.put<Task>(`${this.apiUrl}/projects/${projectId}/tasks/${taskId}`, task);
}

deleteTask(projectId: number, taskId: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/projects/${projectId}/tasks/${taskId}`);
}
}