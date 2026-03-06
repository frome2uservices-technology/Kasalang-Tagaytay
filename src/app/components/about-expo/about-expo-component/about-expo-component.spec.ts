import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutExpoComponent } from './about-expo-component';

describe('AboutExpoComponent', () => {
  let component: AboutExpoComponent;
  let fixture: ComponentFixture<AboutExpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutExpoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutExpoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
