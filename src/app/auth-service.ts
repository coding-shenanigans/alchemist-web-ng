import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:9000/auth/signin';

  constructor(private http: HttpClient) {}

  /**
   * Sends a sign-in request to the backend.
   * @param credentials - The user's email and password.
   * @returns An Observable of the API response (e.g., a JWT token or user object).
   */
  // TODO: update docstring and create a sign in response object
  signIn(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password });
  }
}
