import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NavbarComponent } from "../../component/navbar/navbar.component";
import { FooterComponent } from "../../component/footer/footer.component";


interface Project {
  id: number;
  category: string;
  image: string;
  title: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent], 
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {

  activeFilter: string = 'all'; 

  projects: Project[] = [
    { id: 1, category: 'nature', title: 'Nature Scene', image: 'assets/img/portfolio/portfolio-1.jpg' },
    { id: 2, category: 'design', title: 'Graphic Design', image: 'assets/img/portfolio/portfolio-2.jpg' },
    { id: 3, category: 'photography', title: 'Portrait', image: 'assets/img/portfolio/portfolio-3.jpg' },
    { id: 4, category: 'automotive', title: 'Car Design', image: 'assets/img/portfolio/portfolio-4.jpg' },
    { id: 5, category: 'design', title: 'App Design', image: 'assets/img/portfolio/portfolio-5.jpg' },
    { id: 6, category: 'nature', title: 'Forest', image: 'assets/img/portfolio/portfolio-6.jpg' },
  ];


  get filteredProjects() {
    if (this.activeFilter === 'all') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === this.activeFilter);
  }

 
  setFilter(category: string) {
    this.activeFilter = category;
  }

}