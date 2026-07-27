// features/tasks/task-modal/task-modal.ts
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskService } from '../../../core/services/task';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-modal.html',
  styleUrl: './task-modal.css'
})
export class TaskModal implements OnChanges {
  @Input() task: Task | null = null;
  @Input() projectId!: number; // projectId! is a non-null assertion operator, indicating that projectId will be assigned a value before it's used.

  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  taskForm: FormGroup;
  isSaving = false; //indicates whether the form submission is in progress. It can be used to disable the submit button or show a loading indicator while the request is being processed.
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({ //this.fb.group() creates a new FormGroup instance, which represents the form and its controls. 
                                    //The object passed to this method defines the form controls and their initial values, along with any validators that should be applied to them.
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      status: ['Todo', Validators.required],
      priority: ['Medium', Validators.required],
      dueDate: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['task']) {
      if (this.task) {
        this.taskForm.patchValue({
          title: this.task.title,
          description: this.task.description,
          status: this.task.status,
          priority: this.task.priority,
          dueDate: this.task.dueDate ? this.task.dueDate.substring(0, 10) : ''
        });
      } else {
        this.taskForm.reset({
          title: '',
          description: '',
          status: 'Todo',
          priority: 'Medium',
          dueDate: ''
        });
      }
    }
  }

  get isEditMode(): boolean {
    return this.task !== null;
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    const formValue = this.taskForm.value;

    const request$ = this.isEditMode
      ? this.taskService.updateTask(this.projectId, this.task!.id, formValue) //the ! operator is used to assert that this.task is not null when accessing its id property.
      : this.taskService.createTask(this.projectId, formValue);

    request$.subscribe({
      next: () => {
        this.isSaving = false; 
        this.saved.emit(); // Emit the saved event when the task is successfully saved
      },
      error: (err) => {
        this.isSaving = false;
        this.errorMessage = 'Failed to save task. Please try again.';
      }
    });
  }

  onCancel(): void {
    this.closed.emit();
  }
}