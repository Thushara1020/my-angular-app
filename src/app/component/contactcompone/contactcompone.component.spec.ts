import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ContactcomponeComponent } from './contactcompone.component';

describe('ContactcomponeComponent', () => {
  let component: ContactcomponeComponent;
  let fixture: ComponentFixture<ContactcomponeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactcomponeComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactcomponeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
