import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfoliocomponeComponent } from './portfoliocompone.component';

describe('PortfoliocomponeComponent', () => {
  let component: PortfoliocomponeComponent;
  let fixture: ComponentFixture<PortfoliocomponeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfoliocomponeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfoliocomponeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
