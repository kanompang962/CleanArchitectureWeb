import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginForm } from '../../../core/models/auth-models/login.model';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { InputComponent } from "../../../shared/components/ui/input.component/input.component";

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCardSubtitle,
    InputComponent
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
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  change(event: string) {

  }

  submit() {
    console.log(this.form.invalid)
    if (this.form.invalid) return;
    return console.log(this.form.getRawValue())
    this.authService.login(this.form.getRawValue()).subscribe({
      // next: () => this.router.navigate(['/']),
      error: err => console.error(err)
    });
  }
}
