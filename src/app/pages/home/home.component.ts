import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NavbarComponent } from "../../component/navbar/navbar.component";
import Typed from 'typed.js';
import { FooterComponent } from "../../component/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit, OnDestroy {


  @ViewChild('typedElement') typedElement!: ElementRef;
  typed!: Typed;

  ngAfterViewInit() {
    const options = {
      strings: ['UI/UX Designer', 'Web Developer', 'Software Engineer'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true
    };

    if (this.typedElement) {
      this.typed = new Typed(this.typedElement.nativeElement, options);
    }
  }

  ngOnDestroy() {
    if (this.typed) {
      this.typed.destroy();
    }
  }
}