import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ResumecomponeComponent } from './resumecompone.component';

describe('ResumecomponeComponent', () => {
  let component: ResumecomponeComponent;
  let fixture: ComponentFixture<ResumecomponeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumecomponeComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumecomponeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
