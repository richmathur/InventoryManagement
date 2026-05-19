import { Component, signal } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { Auth } from '../../app/services/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-login',
  imports: [PasswordModule, CheckboxModule, ButtonModule, DividerModule, FormsModule, ToastModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true,
  providers: [MessageService],
})
export class Login {
  // Data model for the0 login form
  loginData = {
    username: '',
    password: '',
    rememberMe: false,
  };
  //loader
  loading: boolean = false;

  constructor(
    private authService: Auth,
    private router: Router,
    private messageService: MessageService
  ) {}
  onInit() {
    console.log('Login component initialized');
  }
  goToDashboard() {
    this.router
      .navigate(['/dashboard'])
      .then((nav) => {
        console.log(nav); // true if navigation is successful
      })
      .catch((err) => {
        console.error(err); // shows why it failed
      });
  }
  onSubmit() {
    if (!this.loginData.username || !this.loginData.password) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please enter both username and password',
      });
      return;
    }
    this.loading = true;
    this.authService
      .login(this.loginData)
      .pipe(
        finalize(() => (this.loading = false)) // ALWAYS stops the spinner
      )
      .subscribe({
        next: (res) => {
          localStorage.setItem('userName', this.loginData.username); // Save username for dashboard display
          // Show success message
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login Successful! Redirecting...',
          });
          // Small delay to allow user to see the success message
          setTimeout(() => {
            this.router
              .navigate(['/dashboard'])
              .then((nav) => {
                console.log(nav); // true if navigation is successful
              })
              .catch((err) => {
                console.error(err); // shows why it failed
              });
          }, 1000);
        },
        error: (err) => {
          // Handle failure
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: 'Invalid credentials. Please try again.',
          });
          // Small delay to allow user to see the error message
          // setTimeout(() => {
          //   this.router.navigate(['/login']);
          // }, 1000);
        },
      });
  }
}
