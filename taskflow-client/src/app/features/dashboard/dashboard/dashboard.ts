import { Component, OnInit } from '@angular/core';
import {ProjectService, Project} from "../../../core/services/project";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  projects: Project[] = [];
  loading = true;
  errorMessage = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
        this.errorMessage = 'Failed to load projects. Please try again later.';
        this.loading = false;
      }
    });
  }
}