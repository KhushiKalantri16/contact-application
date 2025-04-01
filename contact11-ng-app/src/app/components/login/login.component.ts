import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';

  private authService = inject(AuthService); 
  private router = inject(Router);



  onLogin(): void {
    const loginData = { email: this.email, password: this.password };
  
    this.authService.login(loginData).subscribe(
      (response: any) => {
        console.log("Login successful", response);
        this.authService.storeToken(response.token); 
        this.router.navigate(['/contacts']); 
      },
      (error) => {
        console.error("Login error:", error); 
        alert("Invalid credentials or server error.");
      }
    );
  } 

  onRegister(): void {
    this.router.navigate(['/register']); 
  }
  
}
