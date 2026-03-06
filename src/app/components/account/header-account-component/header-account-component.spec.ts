import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAccountComponent } from './header-account-component';

describe('HeaderAccountComponent', () => {
  let component: HeaderAccountComponent;
  let fixture: ComponentFixture<HeaderAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAccountComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
