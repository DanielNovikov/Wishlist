import { ChangeDetectionStrategy, Component, Input, signal, WritableSignal } from '@angular/core';
import { switchMap, takeUntil } from "rxjs";
import { FileApiService } from "../../services/file-api.service";
import { ImageBrowsingService } from "../../services/image-browsing.service";
import { Destroyable } from "../../models/destroyable";

@Component({
    selector: 'app-input-image',
    standalone: true,
    imports: [],
    templateUrl: './input-image.component.html',
    styleUrl: './input-image.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputImageComponent extends Destroyable {

    @Input({required: true}) imageSrc!: WritableSignal<string | undefined>;
    @Input({required: true}) type!: 'avatar' | 'photo';

    constructor(private fileApiService: FileApiService, private imageBrowsingService: ImageBrowsingService) {
        super();
    }

    selectImage() {
        this.imageBrowsingService.browse()
            .pipe(
                takeUntil(this.destroy$),
                switchMap(file => this.fileApiService.upload(file))
            )
            .subscribe(src => {
                if (src) this.imageSrc.set(src);
            })
    }
}
