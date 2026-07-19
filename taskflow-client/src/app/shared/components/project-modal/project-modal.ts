import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project, ProjectService } from '../../../core/services/project';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './project-modal.html',
  styleUrl: './project-modal.css'
})
export class ProjectModal implements OnInit {   //onInit- executes initialization logic for a component exactly once after Angular has finished setting up its input properties
  @Input() project: Project | null = null; // null = create mode, populated = edit mode
  @Output() closed = new EventEmitter<void>(); //means the event carries no data — it's just a signal.
  @Output() saved = new EventEmitter<void>();

  form: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private projectService: ProjectService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit() {  //ngOnInit() — runs once after Angular sets @Input() values
    if (this.project) {
      this.form.patchValue({  //patchValue() pre-fills the form fields with the existing project's data.
        name: this.project.name,
        description: this.project.description
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const request = this.project
      ? this.projectService.updateProject(this.project.id, this.form.value)
      : this.projectService.createProject(this.form.value);

    request.subscribe({
      next: () => this.saved.emit(),  //on success we emit() the saved event
      error: (err) => this.errorMessage = err.error?.message || 'Something went wrong.'
    });
  }

  onCancel() {
    this.closed.emit();
  }
}