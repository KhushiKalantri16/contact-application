import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 


@Component({
  selector: 'app-update-profile',
  imports: [FormsModule, CommonModule],
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  profileData: any = { name: '', email: '', phone: '' };

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const userEmail = this.authService.getUserEmail(); 
    if (userEmail) {
      this.userService.getUserByEmail(userEmail).subscribe(
        (response) => {
          console.log("User profile loaded:", response);
          this.profileData = response;
        },
        (error) => {
          console.error("Error loading profile:", error);
          alert("Failed to load profile.");
        }
      );
    } else {
      console.error("No user email found.");
      this.router.navigate(['/login']);
    }
  }

  updateProfile(): void {
    this.userService.updateProfile(this.profileData).subscribe(
      (response) => {
        console.log("Profile updated successfully:", response);
        alert("Profile updated successfully!");
        this.router.navigate(['/contacts']); 
      },
      (error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile.");
      }
    );
  }
}
