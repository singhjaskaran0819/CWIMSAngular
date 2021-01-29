import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-standard-reports',
  templateUrl: './standard-reports.component.html',
  styleUrls: ['./standard-reports.component.scss']
})
export class StandardReportsComponent implements OnInit {

  role;
  constructor() { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem("roleCode");
  }

}
