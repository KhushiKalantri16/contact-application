import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/api/contacts';

  constructor(private http: HttpClient, private authService: AuthService) {}

  
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found, user might not be logged in.");
      return new HttpHeaders();
    }
  
    console.log("Sending request with token:", token); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  


  getContacts(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error fetching contacts:', error);
        return throwError(error);
      })
    );
  }

 
  addContact(contact: any): Observable<any> {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('No userId found! Ensure user is logged in.');
      return throwError('User ID is missing');
    }

    return this.http.post(`${this.apiUrl}/add?userId=${userId}`, contact, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error('Error adding contact:', error);
        return throwError(error);
      })
    );
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() }).pipe(
      catchError(error => {
        console.error(`Error deleting contact with ID ${id}:`, error);
        return throwError(error);
      })
    );
  }

  deleteAllContacts(): Observable<any> {
    const headers = this.getAuthHeaders();
    console.log("Deleting all contacts with headers:", headers.get('Authorization')); 
    return this.http.delete(`${this.apiUrl}/delete-all`, { headers });
  }

  getContactById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
  
  updateContact(id: number, contact: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, contact, { headers: this.getAuthHeaders() });
  }
  
}

