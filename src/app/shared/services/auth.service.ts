import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseCode, ResponseMessage } from 'src/app/model/responseMessage';
import { User } from 'src/app/model/user';
import { MailRequest } from '../../model/MailRequest';
import { TokenResponse } from '../../model/responseMessage';

export interface IUser {
  email: string;
  // avatarUrl?: string;
}

const defaultPath = '/';
const defaultUser = new User();

@Injectable()
export class AuthService {
  _user: IUser | null = defaultUser;
  get loggedIn(): boolean {
    return !!this._user?.email;
  }
  baseUrl = 'https://localhost:7186';
  private _lastAuthenticatedPath: string = defaultPath;
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private http: HttpClient) {}
  logInUser(user: User) {
    return this.http.post<TokenResponse>(
      this.baseUrl + '/Authorize/GenerateToken',
      user
    );
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user,
      };
    } catch {
      return {
        isOk: false,
        data: null,
      };
    }
  }

  async registerUser(user: User) {
    return this.http.post<ResponseMessage>(
      this.baseUrl + '/Account/registerUser',
      user
    );
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to change password',
      };
    }
  }

  resetPassword(mailRequest: MailRequest): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(
      this.baseUrl + '/Account/sendEmail',
      mailRequest
    );
  }

  async logOut() {
    this._user = null;
    this.router.navigate(['/login-form']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login-form',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode',
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/login-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath =
        route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
