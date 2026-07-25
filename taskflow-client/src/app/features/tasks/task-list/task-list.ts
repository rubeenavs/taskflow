import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';  //to read URL parameters- "what's actually in the address bar that got me here?"
import { TaskService, Task } from '../../../core/services/task';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  tasks: Task[] = [];
  loading = true;
  errorMessage = '';
  projectId!: number; //It tells TypeScript "trust me, this will be set before it's used" — because it's set in ngOnInit, not in the constructor

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));  //The 'id' string here has to match that :id placeholder(app.router). 
                                                                      //paramMap.get() always returns a string | null, which is why you wrap it in Number(...)
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
}