import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { AuthSignInByEmailRequest } from "../../auth/models/auth-sign-in-by-email-request";
import { catchError, Observable, of } from "rxjs";
import { AuthResponse } from "../../auth/models/auth-response";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class FileApiService {
  
  constructor(private api: ApiService) {
  }

  upload(file: File): Observable<string | null> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    
    return this.api.post('file/upload', formData, null, { responseType: 'text' });
  }
}
