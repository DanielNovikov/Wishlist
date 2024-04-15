import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ImageBrowsingService {

    constructor(@Inject(DOCUMENT) private document: Document) {
    }

    browse(): Observable<File> {
        return new Observable<File>(observer => {
            const fileInput = this.document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';

            const onChange = (event: Event) => {
                const target = event.target as HTMLInputElement;
                
                if (target.files && target.files.length > 0) {
                    observer.next(target.files[0]);
                    observer.complete();
                }
                
                cleanup();
            };

            const cleanup = () => {
                fileInput.removeEventListener('change', onChange);
                fileInput.remove();
            };

            fileInput.addEventListener('change', onChange);
            this.document.body.appendChild(fileInput);
            fileInput.click();

            return {unsubscribe: cleanup};
        });
    }
}
