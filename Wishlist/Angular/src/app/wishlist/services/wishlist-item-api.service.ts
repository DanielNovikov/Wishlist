import {Injectable} from '@angular/core';
import {environment} from "../../shared/core/environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {WishlistResponse} from "../models/wishlist-response";
import {WishlistItemScrapRequest} from "../models/wishlist-item-scrap-request";
import {WishlistItemScrapResponse} from "../models/wishlist-item-scrap-response";
import {WishlistItemCreateRequest} from "../models/wishlist-item-create-request";
import {WishlistItemUpdateRequest} from "../models/wishlist-item-update-request";

@Injectable({
    providedIn: 'root'
})
export class WishlistItemApiService {

    private baseUrl: string = environment.apiUrl + 'wishlist-item';

    constructor(private httpClient: HttpClient) {
    }

    create(request: WishlistItemCreateRequest): Observable<boolean> {
        return this.httpClient.post<boolean>(this.baseUrl + '/', request)
            .pipe(catchError(error => of(false)));
    }

    update(id: number, request: WishlistItemUpdateRequest): Observable<boolean> {
        return this.httpClient.put<boolean>(this.baseUrl + `/${id}`, request)
            .pipe(catchError(error => of(false)));
    }

    delete(id: number): Observable<any> {
        return this.httpClient.delete(this.baseUrl + `/${id}`)
            .pipe(catchError(error => of()));
    }

    scrap(request: WishlistItemScrapRequest): Observable<WishlistItemScrapResponse | null> {
        return this.httpClient.post<WishlistItemScrapResponse>(this.baseUrl + '/scrap', request)
            .pipe(catchError(error => of(null)));
    }
}
