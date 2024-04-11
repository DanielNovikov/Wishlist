import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { AuthSignInByEmailRequest } from "../../auth/models/auth-sign-in-by-email-request";
import { catchError, Observable, of } from "rxjs";
import { AuthResponse } from "../../auth/models/auth-response";

@Injectable({
  providedIn: 'root'
})
export class FileApiService {
  private baseUrl: string = environment.apiUrl + 'file';

  constructor(private httpClient: HttpClient) {
  }

  upload(file: File): Observable<string | null> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    
    return this.httpClient.post(this.baseUrl + '/upload', formData, {responseType: 'text'})
        .pipe(catchError(error => of(null)));
  }
}
