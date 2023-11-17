import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu-employee',
  templateUrl: './nav-menu-employee.component.html',
  styleUrls: ['./nav-menu-employee.component.css']
})
export class NavMenuEmployeeComponent {
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
