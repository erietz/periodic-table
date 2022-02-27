import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToHomePage(): void {
    this.router.navigate(['home']);
  }

  goToCreatePage(): void {
    this.router.navigate(['create']);
  }

  goToDeletePage(): void {
    this.router.navigate(['delete']);
  }

}
