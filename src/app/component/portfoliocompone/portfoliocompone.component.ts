import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // NgFor saha NgIf pavichchi karanna meka ona

@Component({
  selector: 'app-portfoliocompone',
  standalone: true, // Angular 17+ nam standalone use karanna puluwan
  imports: [CommonModule], // CommonModule ekathu karanna ona (TitleCasePipe eka methana thiyenawa)
  templateUrl: './portfoliocompone.component.html',
  styleUrl: './portfoliocompone.component.css'
})
export class PortfoliocomponeComponent {

  // Default active filter eka 'all' karanna
  activeFilter: string = 'all';

  // Sample data array ekak (Images path oyaage project ekata anuwa wenas karanna)
  projects = [
    { image: 'Artical01.png', category: 'nature' },
    { image: 'Artical02.png', category: 'design' },
    { image: 'Artical03.png', category: 'photography' },
    { image: 'my-photo.png', category: 'automotive' },
    { image: 'Artical02.png', category: 'nature' },
    { image: 'Artical01.png', category: 'design' },
  ];

  // Filtered projects mathaka thiyaganna variable eka
  filteredProjects = [...this.projects];

  // Filter eka change karana function eka
  setFilter(filter: string) {
    this.activeFilter = filter;
    
    if (filter === 'all') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(p => p.category === filter);
    }
  }
}