import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface UserSession {
  email: string;
  username: string;
  accessToken: string;
}

interface SignInResponse {
  userSession: UserSession;
}

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private readonly http = inject(HttpClient);
  // TODO: move the base url to a config file
  private readonly baseUrl = 'http://localhost:9000';

  /**
   * Sends a sign in request to the backend.
   * @param email The user's email.
   * @param password The user's password.
   * @returns A SignInResponse object.
   */
  signIn(email: string, password: string): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.baseUrl}/auth/signin`, { email, password });
  }
}
