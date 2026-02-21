import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NavbarComponent } from "../../component/navbar/navbar.component";
import { FooterComponent } from "../../component/footer/footer.component";
import { PortfoliocomponeComponent } from "../../component/portfoliocompone/portfoliocompone.component";

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FooterComponent, PortfoliocomponeComponent], 
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
}