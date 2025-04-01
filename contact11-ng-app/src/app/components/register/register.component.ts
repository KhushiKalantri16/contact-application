import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  private authService = inject(AuthService); 
  private router = inject(Router);

  onRegister(): void {
    this.authService.register({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: () => {
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {  
        console.error('Registration failed:', err);
        alert('Registration failed: ' + err.error.message);
      }
    });
  }
  
}
