import { Component, OnInit } from '@angular/core';
import {ProjectService, Project} from "../../../core/services/project";
import {CommonModule} from "@angular/common";
import {ProjectModal} from "../../../shared/components/project-modal/project-modal";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ProjectModal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  projects: Project[] = [];
  loading = true;
  errorMessage = '';

  showModal = false;
  selectedProject: Project | null = null;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
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

  openCreateModal(): void {
    this.selectedProject = null;
    this.showModal = true;
  }

  openEditModal(project: Project): void {
    this.selectedProject = project;
    this.showModal = true;
  }

  onModalClosed(): void {
    this.showModal = false;
  }

  onModalSaved(): void {
    this.showModal = false;
    this.loadProjects();
  }

  deleteProject(project: Project): void {
    const confirmed = confirm(`Delete "${project.name}"? This cannot be undone.`);
    if (!confirmed) return;

    this.projectService.deleteProject(project.id).subscribe({
      next: () => this.loadProjects(),
      error: (err) => {
        console.error('Error deleting project:', err);
        this.errorMessage = 'Failed to delete project.';
      }
    });
  }
}