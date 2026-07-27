import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskService, Task } from '../../../core/services/task';
import { TaskModal } from '../task-modal/task-modal';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, TaskModal],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  tasks: Task[] = [];
  loading = true;
  errorMessage = '';
  projectId!: number;

  showModal = false;
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService.getTasks(this.projectId).subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
        this.errorMessage = 'Failed to load tasks. Please try again later.';
        this.loading = false;
      }
    });
  }

  openCreateModal(): void {
    this.selectedTask = null;
    this.showModal = true;
  }

  openEditModal(task: Task): void {
    this.selectedTask = task;
    this.showModal = true;
  }

  onModalClosed(): void {
    this.showModal = false;
    this.selectedTask = null;
  }

  onModalSaved(): void {
    this.showModal = false;
    this.selectedTask = null;
    this.loadTasks();
  }

  deleteTask(task: Task): void {
    if (!confirm(`Delete task "${task.title}"?`)) return;

    this.taskService.deleteTask(this.projectId, task.id).subscribe({
      next: () => this.loadTasks(),
      error: (err) => {
        console.error('Error deleting task:', err);
        this.errorMessage = 'Failed to delete task. Please try again later.';
      }
    });
  }
}