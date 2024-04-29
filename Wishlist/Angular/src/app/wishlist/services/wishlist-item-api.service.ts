import {Injectable} from '@angular/core';
import {environment} from "../../shared/core/environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {WishlistResponse} from "../models/wishlist-response";
import {WishlistItemScrapRequest} from "../models/wishlist-item-scrap-request";
import {WishlistItemScrapResponse} from "../models/wishlist-item-scrap-response";
import {WishlistItemCreateRequest} from "../models/wishlist-item-create-request";
import {WishlistItemUpdateRequest} from "../models/wishlist-item-update-request";
import {ApiService} from "../../shared/core/services/api.service";

@Injectable({
    providedIn: 'root'
})
export class WishlistItemApiService {

    constructor(private api: ApiService) {
    }

    create(request: WishlistItemCreateRequest): Observable<boolean> {
        return this.api.post('wishlist-item', request, false);
    }

    update(id: number, request: WishlistItemUpdateRequest): Observable<boolean> {
        return this.api.put(`wishlist-item/${id}`, request, false);
    }

    delete(id: number): Observable<any> {
        return this.api.delete(`wishlist-item/${id}`);
    }

    scrap(request: WishlistItemScrapRequest): Observable<WishlistItemScrapResponse | null> {
        return this.api.post('wishlist-item/scrap', request);
    }
    
    book(id: number) : Observable<boolean> {
        return this.api.post(`wishlist-item/${id}/book`, null, false);
    }
}
