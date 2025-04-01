import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-update-contact',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './update-contact.component.html',
  styleUrls: ['./update-contact.component.css']
})
export class UpdateContactComponent implements OnInit {
  contactId!: number;
  contactData: any = { name: '', email: '', phone: '' };

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadContact();
  }

  loadContact(): void {
    this.contactService.getContactById(this.contactId).subscribe(
      (data) => {
        this.contactData = data;
      },
      (error) => {
        console.error('Error loading contact:', error);
      }
    );
  }

  updateContact(): void {
    this.contactService.updateContact(this.contactId, this.contactData).subscribe(
      () => {
        alert('Contact updated successfully!');
        this.router.navigate(['/contacts']);
        
      },
      (error) => {
        console.error('Error updating contact:', error);
        alert('Failed to update contact.');
      }
    );
  }
}
