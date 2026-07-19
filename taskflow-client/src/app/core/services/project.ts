import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environment";

export interface Project{
  id: number;
  name: string;
  description: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/projects`;

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get<Project[]>(this.apiUrl);
  }

  createProject(project: {name: string; description: string}) {
    return this.http.post<Project>(this.apiUrl, project);
  }

  updateProject(id: number, project: {name: string; description: string}) {
    return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
