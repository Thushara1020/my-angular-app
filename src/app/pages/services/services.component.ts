import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NavbarComponent } from "../../component/navbar/navbar.component";
import { FooterComponent } from "../../component/footer/footer.component";

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent], 
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

  services = [
    {
      icon: 'bi-laptop',
      title: 'Full Stack Development',
      description: 'Building responsive, high-performance web applications using React, Angular, and Spring Boot tailored to your business needs.'
    },
    {
      icon: 'bi-hdd-stack',
      title: 'Backend Solutions',
      description: 'Developing robust, secure, and scalable server-side applications and RESTful APIs using Java and Spring Framework.'
    },
    {
      icon: 'bi-database',
      title: 'Database Management',
      description: 'Designing efficient database architectures using SQL (MySQL) to ensure data integrity and optimized performance.'
    },
    {
      icon: 'bi-palette',
      title: 'UI/UX Design',
      description: 'Creating intuitive, user-friendly, and modern interface designs that provide a seamless digital experience.'
    },
    {
      icon: 'bi-shield-lock',
      title: 'Security Implementation',
      description: 'Integrating advanced security measures like JWT and Spring Security to protect sensitive data and applications.'
    },
    {
      icon: 'bi-graph-up-arrow',
      title: 'IT Consultation',
      description: 'Providing technical guidance, project roadmaps, and digital transformation strategies for startups and businesses.'
    }
  ];

  
  articles = [
    {
      image: 'Artical01.png', 
      title: 'The Reality of the Sri Lankan Job Market in 2026: Are You Ready for the AI ​​Revolution?',
      date: 'Jan 01, 2026',
      link: 'https://medium.com/@thusharabawantha2001/the-reality-of-the-sri-lankan-job-market-in-2026-are-you-ready-for-the-ai-revolution-c1f46a6b503e', // ඔයාගේ Medium Profile Link එක
      summary: 'Sri Lanka is currently in the midst of a major economic and technological transition. By 2026, the traditional job landscape as we have experienced it so far is predicted to undergo a major transformation. Artificial Intelligence (AI), automation (automation) and digitalization are the key drivers of this transformation.'
    },
    {
      image: 'Artical02.png',
      title: 'Mastering Data Efficiency: A Guide to Advanced Arrays and String Searching Algorithms',
      date: 'Jan 06, 2026',
      link: 'https://medium.com/@thusharabawantha2001/mastering-data-efficiency-a-guide-to-advanced-arrays-and-string-searching-algorithms-f0dad214fe19',
      summary: 'In modern software engineering, the speed at which we process and search through data is critical.To build scalable systems, developers must employ optimized algorithms that reduce time complexity from quadratic O(n²) to linear O(n).'
    },
    {
      image: 'Artical03.png',
      title: 'Strategic Enhancements in Spring Boot 4 and Spring Framework 7: A Technical Overview',
      date: 'Nov 29, 2025',
      link: 'https://medium.com/@thusharabawantha2001',
      summary: 'Spring Boot 4 and Spring Framework 7 are major strategic updates focused on improving reliability, performance, and maintainability. These changes are essential for development teams planning their future technology roadmaps.'
    }
  ];

}