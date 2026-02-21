import { Component } from '@angular/core';
import { NavbarComponent } from "../../component/navbar/navbar.component";
import { FooterComponent } from "../../component/footer/footer.component";
import { AboutcomponentComponent } from "../../component/aboutcomponent/aboutcomponent.component";

@Component({
  selector: 'app-about',
  imports: [NavbarComponent, FooterComponent, AboutcomponentComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
