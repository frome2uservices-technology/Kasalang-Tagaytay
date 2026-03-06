import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BePartComponent } from './be-part-component';

describe('BePartComponent', () => {
  let component: BePartComponent;
  let fixture: ComponentFixture<BePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BePartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BePartComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
