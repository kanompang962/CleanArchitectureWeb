import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginForm } from '../../../core/models/auth-models/login.model';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCardSubtitle,
    MatError
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit{
  form!: FormGroup<LoginForm>

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initFormLogin();
  }

  initFormLogin(): void {
    this.form = this.fb.nonNullable.group({
      userNameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.authService.login(this.form.getRawValue()).subscribe({
      // next: () => this.router.navigate(['/']),
      error: err => console.error(err)
    });
  }
}
