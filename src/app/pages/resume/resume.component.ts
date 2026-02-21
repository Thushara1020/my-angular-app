import { Component } from '@angular/core';
import { NavbarComponent } from "../../component/navbar/navbar.component";
import { FooterComponent } from "../../component/footer/footer.component";
import { ResumecomponeComponent } from "../../component/resumecompone/resumecompone.component";

@Component({
  selector: 'app-resume',
  imports: [NavbarComponent, FooterComponent, ResumecomponeComponent],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {

}
