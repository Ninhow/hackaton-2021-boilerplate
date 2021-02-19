import { Component, OnInit } from '@angular/core';
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
  user: User = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    if (!(this.user = this.authService.GetUser())) {
      this.authService.userLoggedIn.subscribe((value) => (this.user = value));
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
}
