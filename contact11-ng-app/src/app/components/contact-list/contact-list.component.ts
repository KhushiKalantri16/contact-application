import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http'; 
import { ContactService } from '../../services/contact.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule], 
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: any[] = [];
  private contactService = inject(ContactService);

  constructor(private router: Router){};

  ngOnInit(): void {
    this.loadContacts();
  }


  loadContacts(): void {
    this.contactService.getContacts().subscribe(
      (data) => {
        this.contacts = data || [];
      },
      (error) => {
        console.error("Error loading contacts:", error);
        this.contacts = [];
      }
    );
  }



  deleteContact(id: string): void {
    const contactId = Number(id);
    this.contactService.deleteContact(contactId).subscribe(
      () => {
        this.loadContacts();
      },
      (error) => {
        console.error("Error deleting contact:", error);
        alert("Failed to delete contact.");
      }
    );
  }
  
  addContact(): void {
    this.router.navigate(['/add-contact']);
  }

  deleteAllContacts(): void {
    if (confirm("Are you sure you want to delete all contacts? This action cannot be undone.")) {
      this.contactService.deleteAllContacts().subscribe(
        (response) => {
          console.log("Contacts deleted successfully:", response);
          this.contacts = [];
          alert(response.message || "All contacts deleted successfully."); 
        },
        (error) => {
          console.error(" Error deleting all contacts:", error);
          alert("Failed to delete contacts.");
        }
      );
    }
  }

  updateContact(contact: any): void {
    this.router.navigate(['/update-contact', contact.id]); 
  }
  
  
  
}



