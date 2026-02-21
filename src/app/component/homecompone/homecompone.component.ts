import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import Typed from 'typed.js'; // Typed.js import karanna

@Component({
  selector: 'app-homecompone',
  standalone: true, // Angular modern version nam meka thiyenna ona
  imports: [],
  templateUrl: './homecompone.component.html',
  styleUrl: './homecompone.component.css'
})
export class HomecomponeComponent implements AfterViewInit, OnDestroy {
  
  private typed: any;

  ngAfterViewInit() {
    const options = {
      strings: [
        'Full Stack Developer',
        'Angular Specialist',
        'Spring Boot Expert',
        'UI/UX Enthusiast'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    };

    // 'typed' kiyana class eka thiyෙන element ekata meka apply wenawa
    this.typed = new Typed('.typed', options);
  }

  // Component eka close weddi animation eka stop karanna (Performance walata hodai)
  ngOnDestroy() {
    if (this.typed) {
      this.typed.destroy();
    }
  }
}