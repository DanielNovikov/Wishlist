import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {WishlistResponse} from "../models/wishlist-response";
import {WishlistCreateRequest} from "../models/wishlist-create-request";
import {environment} from "../../shared/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WishlistApiService {
  
  private baseUrl: string = environment.apiUrl + 'wishlist';

  constructor(private httpClient: HttpClient) { }

  get() : Observable<WishlistResponse | null> {
    return this.httpClient.get<WishlistResponse>(this.baseUrl)
      .pipe(catchError(error => of(null)));
  }
  
  create(request: WishlistCreateRequest) : Observable<WishlistResponse> {
    return this.httpClient.post<WishlistResponse>(this.baseUrl, request);
  }
}
