import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
})
export class AddContactComponent {
  name = '';
  email = '';
  phone = '';

  private contactService = inject(ContactService);
  private router = inject(Router);

  addContact(): void {
    const userId = localStorage.getItem('userId');
    
    this.contactService.addContact({
      name: this.name,
      email: this.email,
      phone: this.phone,
      userId: userId 
    }).subscribe(() => {
      this.router.navigate(['/contacts']);
    });
  }  
}
