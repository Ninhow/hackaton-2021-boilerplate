import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ItemService } from '../../services/item.service';
import { User } from '../user.interface';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  innerWidth: number;
  user: User = null;
  showFiller = false;
  reason = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if (!(this.user = this.authService.GetUser())) {
      this.authService.userLoggedIn.subscribe((value) => {
        this.user = value;
      });
    }
    this.itemService.getItems().subscribe((items) => console.log(items));
    this.itemService.getById('test2').subscribe((value) => console.log(value));
  }

  onLogout() {
    this.authService.logout().then(() => {
      console.log('onLogout');
      this.router.navigate(['login']);
    });
  }

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }
}
