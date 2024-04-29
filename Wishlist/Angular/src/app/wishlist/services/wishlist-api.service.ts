import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {WishlistResponse} from "../models/wishlist-response";
import {WishlistCreateRequest} from "../models/wishlist-create-request";
import {environment} from "../../shared/core/environments/environment";
import {WishlistItemResponse} from "../models/wishlist-item-response";
import {WishlistEditRequest} from "../models/wishlist-edit-request";
import {ApiService} from "../../shared/core/services/api.service";

@Injectable({
    providedIn: 'root'
})
export class WishlistApiService {
    
    constructor(private api: ApiService) {
    }

    get(): Observable<WishlistResponse | null> {
        return this.api.get('wishlist');
    }

    getByPublicId(publicId: string): Observable<WishlistResponse | null> {        
        return this.api.get(`wishlist/${publicId}`);
    }

    getItemsByPublicId(publicId: string): Observable<WishlistItemResponse[]> {
        return this.api.get(`wishlist/${publicId}/items`);
    }

    create(request: WishlistCreateRequest): Observable<WishlistResponse> {
        return this.api.post(`wishlist`, request);
    }
    
    edit(publicId: string, request: WishlistEditRequest): Observable<WishlistResponse> {
        return this.api.put(`wishlist/${publicId}`, request);
    }
}
