import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {WishlistResponse} from "../models/wishlist-response";
import {WishlistCreateRequest} from "../models/wishlist-create-request";
import {environment} from "../../shared/core/environments/environment";
import {WishlistItemResponse} from "../models/wishlist-item-response";
import {WishlistEditRequest} from "../models/wishlist-edit-request";

@Injectable({
    providedIn: 'root'
})
export class WishlistApiService {

    private baseUrl: string = environment.apiUrl + 'wishlist';

    constructor(private httpClient: HttpClient) {
    }

    get(): Observable<WishlistResponse | null> {
        return this.httpClient.get<WishlistResponse>(this.baseUrl)
            .pipe(catchError(error => of(null)));
    }

    getById(id: number): Observable<WishlistResponse | null> {
        return this.httpClient.get<WishlistResponse>(this.baseUrl + `/${id}`)
            .pipe(catchError(error => of(null)));
    }

    getItemsById(id: number): Observable<WishlistItemResponse[]> {
        return this.httpClient.get<WishlistItemResponse[]>(this.baseUrl + `/${id}/items`)
            .pipe(catchError(error => of([])));
    }

    create(request: WishlistCreateRequest): Observable<WishlistResponse> {
        return this.httpClient.post<WishlistResponse>(this.baseUrl, request);
    }
    
    edit(id: number, request: WishlistEditRequest): Observable<WishlistResponse> {
        return this.httpClient.put<WishlistResponse>(this.baseUrl + `/${id}`, request);
    }
}
