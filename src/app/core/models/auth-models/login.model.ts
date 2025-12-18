
import { FormControl } from '@angular/forms';

export type LoginForm = {
  userNameOrEmail: FormControl<string>;
  password: FormControl<string>;
};


export interface LoginRequest {
  userNameOrEmail: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  userId: string;
  email: string;
  userName: string;
}

