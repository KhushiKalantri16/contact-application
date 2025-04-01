import { Routes } from '@angular/router';
import { AddContactComponent } from './components/add-contact/add-contact.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { UpdateContactComponent } from './components/update-contact/update-contact.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'update-contact/:id', component: UpdateContactComponent, canActivate: [AuthGuard] }, 
  { path: 'contacts', component: ContactListComponent, canActivate: [AuthGuard] }, 
  { path: 'add-contact', component: AddContactComponent, canActivate: [AuthGuard] },
  { path: 'update-profile', component: UpdateProfileComponent },
  { path: '**', redirectTo: '/login' } 

];

