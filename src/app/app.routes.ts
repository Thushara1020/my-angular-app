import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: HomeComponent, data: { section: 'about' } },
  { path: 'resume', component: HomeComponent, data: { section: 'resume' } },
  { path: 'portfolio', component: HomeComponent, data: { section: 'work' } },
  { path: 'services', component: HomeComponent, data: { section: 'services' } },
  { path: 'contact', component: HomeComponent, data: { section: 'contact' } },
  { path: '**', redirectTo: '' },
];
