import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

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

  private userSession = new BehaviorSubject<UserSession | null>(null);
  public userSession$: Observable<UserSession | null> = this.userSession.asObservable();

  /**
   * Sends a sign in request to the backend.
   * @param email The user's email.
   * @param password The user's password.
   * @returns A SignInResponse object.
   */
  signIn(email: string, password: string): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.baseUrl}/auth/signin`, { email, password }).pipe(
      tap((signInResponse) => {
        this.userSession.next(signInResponse.userSession);
        // TODO: read the user session from local storage when the page is refreshed
        localStorage.setItem('userSession', JSON.stringify(signInResponse.userSession));
      }),
    );
  }
}
