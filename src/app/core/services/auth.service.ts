import { Injectable, signal } from "@angular/core";
import { environment } from "../../../environments/environment";
import { LoginRequest, LoginResponse } from "../models/auth-models/login.model";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";
import { APIResponse } from "../models/http.model";

 
 @Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl = `${environment.apiUrl}/auth`;
    // user state (optional)
    // private _user = signal<LoginResponse['user'] | null>(null);
    // user = this._user.asReadonly();

    constructor(
        private http: HttpClient,
    ) {}

    login(payload: LoginRequest) {
        return this.http
            .post<APIResponse<LoginResponse>>(`${this.apiUrl}/login`, payload)
            .pipe(
            tap(res => {
                console.log(res)
            })
        );
    }
}
 
