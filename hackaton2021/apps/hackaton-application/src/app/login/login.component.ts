import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './user.interface';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgZone } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService
        .signin(
          this.loginForm.get('username').value,
          this.loginForm.get('password').value
        )
        .then(() => {
          this.router.navigate(['dashboard']);
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-email':
              this.openSnackBar('The email address is badly formatted.');
          }
        });
    }
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.untouched && control.value === null) {
        return { forbiddenName: true };
      }
      const forbidden = nameRe.test(control.value);
      return forbidden ? null : { forbiddenName: true };
    };
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'ERROR', {
      duration: 2000,
    });
  }
}
