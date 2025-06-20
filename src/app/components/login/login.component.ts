import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ClaimTypes } from '../../shared/consts';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        const token = res.token;

        const decoded = jwtDecode<any>(token);
        console.log('Decoded token ', decoded)
        const role = decoded[ClaimTypes.role];
        console.log(role)

        if (role === 'Admin') {
          this.router.navigate(['home']);
        } else if (role === 'Worker') {
          this.router.navigate(['dashboard']);
        } else {
          this.errorMessage = "Unknown user role";
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed';
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['register']);
  }
}
