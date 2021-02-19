import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './login/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { AngularFireModule } from '@angular/fire';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FeedComponent } from './feed/feed.component';
import { MatChipsModule } from '@angular/material/chips';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['dashboard']);
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard },
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  declarations: [AppComponent, FeedComponent],
  imports: [
    MatDividerModule,
    BrowserModule,
    MatListModule,
    MatGridListModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,

    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCtbk8P5t1Yy2mwPYCBFVnghM0Ppa-fZHo',
      authDomain: 'hackaton2021.firebaseapp.com',
      databaseURL:
        'https://hackaton2021-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'hackaton2021',
      storageBucket: 'hackaton2021.appspot.com',
      messagingSenderId: '401410430169',
      appId: '1:401410430169:web:1e7bf32be922bc1bba1ac8',
      measurementId: 'G-H7EYLQKXHW',
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
