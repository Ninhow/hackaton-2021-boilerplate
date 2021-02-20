import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../user.interface';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  myOptions = [
    { title: 'Grupper', route: 'groups', icon: 'groups' },
    { title: 'Feed', route: 'feed', icon: 'feed' },
    { title: 'Vänner', route: 'friends', icon: 'stars' },
    { title: 'Evenemang', route: 'events', icon: 'event' },
  ];

  innerWidth: number;
  user: User = null;
  showFiller = false;
  reason = '';
  showToolbar = false;

  openMode: string = 'side';

  constructor(
    private authService: AuthService,
    private router: Router,
    private itemService: UserService
  ) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 840) {
      this.openMode = 'over';
      this.showToolbar = true;
    }
    window.onresize = () => {
      if (window.innerWidth < 840) {
        this.openMode = 'over';
        this.showToolbar = true;
      }
    };
  }

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
    if (!(this.openMode == 'side')) {
      this.reason = reason;
      this.sidenav.close();
    }
  }
}
