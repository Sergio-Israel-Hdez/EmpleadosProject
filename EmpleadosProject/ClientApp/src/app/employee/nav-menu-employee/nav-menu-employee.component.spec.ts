import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuEmployeeComponent } from './nav-menu-employee.component';

describe('NavMenuEmployeeComponent', () => {
  let component: NavMenuEmployeeComponent;
  let fixture: ComponentFixture<NavMenuEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavMenuEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavMenuEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
