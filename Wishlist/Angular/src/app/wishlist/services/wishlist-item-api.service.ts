import { Injectable } from '@angular/core';
import { environment } from "../../shared/core/environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { WishlistResponse } from "../models/wishlist-response";
import { WishlistItemScrapRequest } from "../models/wishlist-item-scrap-request";
import { WishlistItemScrapResponse } from "../models/wishlist-item-scrap-response";

@Injectable({
  providedIn: 'root'
})
export class WishlistItemApiService {

  private baseUrl: string = environment.apiUrl + 'wishlist-item';

  constructor(private httpClient: HttpClient) { }

  scrap(request: WishlistItemScrapRequest) : Observable<WishlistItemScrapResponse | null> {
    return this.httpClient.post<WishlistItemScrapResponse>(this.baseUrl + '/scrap', request)
        .pipe(catchError(error => of(null)));
  }
}
