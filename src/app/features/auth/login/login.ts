import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginForm } from '../../../core/models/auth-models/login.model';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
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
      userNameOrEmail: 'def',
      password: 'Def@0931177457'
    });
    console.log(this.form)
  }

  submit() {
    if (this.form.invalid) return;

    this.authService.login(this.form.getRawValue()).subscribe({
      // next: () => this.router.navigate(['/']),
      error: err => console.error(err)
    });
  }
}
