import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { HomecomponeComponent } from './homecompone.component';

describe('HomecomponeComponent', () => {
  let component: HomecomponeComponent;
  let fixture: ComponentFixture<HomecomponeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomecomponeComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomecomponeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
