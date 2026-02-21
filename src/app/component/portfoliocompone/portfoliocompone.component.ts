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
    { image: 'assets/img/nature-1.jpg', category: 'nature' },
    { image: 'assets/img/design-1.jpg', category: 'design' },
    { image: 'assets/img/photography-1.jpg', category: 'photography' },
    { image: 'assets/img/automotive-1.jpg', category: 'automotive' },
    { image: 'assets/img/nature-2.jpg', category: 'nature' },
    { image: 'assets/img/design-2.jpg', category: 'design' },
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