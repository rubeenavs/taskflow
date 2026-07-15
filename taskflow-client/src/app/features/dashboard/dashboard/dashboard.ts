import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('https://localhost:7009/api/projects').subscribe({
      next: (data) => console.log('Projects:', data),
      error: (err) => console.log('Error:', err)
    });
  }
}