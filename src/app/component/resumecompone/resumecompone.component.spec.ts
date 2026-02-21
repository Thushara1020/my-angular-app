import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumecomponeComponent } from './resumecompone.component';

describe('ResumecomponeComponent', () => {
  let component: ResumecomponeComponent;
  let fixture: ComponentFixture<ResumecomponeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumecomponeComponent]
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
