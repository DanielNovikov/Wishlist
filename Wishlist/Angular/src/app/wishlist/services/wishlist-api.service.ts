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

    getByPublicId(publicId: string): Observable<WishlistResponse | null> {
        return this.httpClient.get<WishlistResponse>(this.baseUrl + `/${publicId}`)
            .pipe(catchError(error => of(null)));
    }

    getItemsByPublicId(publicId: string): Observable<WishlistItemResponse[]> {
        return this.httpClient.get<WishlistItemResponse[]>(this.baseUrl + `/${publicId}/items`)
            .pipe(catchError(error => of([])));
    }

    create(request: WishlistCreateRequest): Observable<WishlistResponse> {
        return this.httpClient.post<WishlistResponse>(this.baseUrl, request);
    }
    
    edit(publicId: string, request: WishlistEditRequest): Observable<WishlistResponse> {
        return this.httpClient.put<WishlistResponse>(this.baseUrl + `/${publicId}`, request);
    }
}
