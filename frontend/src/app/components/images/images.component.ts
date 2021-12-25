import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Image, MultiImageResponse } from 'src/app/interfaces/image';
import { ImageService } from 'src/app/services/image.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  imageMessage$: Observable<MultiImageResponse> | undefined;
  images: Image[] | undefined = undefined;
  imageColumn1: Image[] = [];
  imageColumn2: Image[] = [];
  imageColumn3: Image[] = [];

  constructor(private imageService: ImageService, private stateService: StateService) { }

  ngOnInit(): void {
    this.getImages();

    this.imageService.imagesChanged.subscribe(value => {
      this.getImages();
    });
  }

  getImages(): void {
    this.imageMessage$ = this.imageService.getImages().pipe(map(values => {
      this.images = values.images;

      let tempImagesColumn1 = [];
      let tempImagesColumn2 = [];
      let tempImagesColumn3 = [];

      if (this.images) {
        this.images.sort((a, b) => {
          return a.creation_time < b.creation_time ? 1 : -1;
        });

        for (let i = 0; i < this.images.length; i += 3) {
          tempImagesColumn1[i] = this.images[i];

          if (i < this.images.length - 1) {
            tempImagesColumn2[i] = this.images[i + 1];
          }
          if (i < this.images.length - 2) {
            tempImagesColumn3[i] = this.images[i + 2];
          }
        }
      }

      this.imageColumn1 = tempImagesColumn1;
      this.imageColumn2 = tempImagesColumn2;
      this.imageColumn3 = tempImagesColumn3;

      return values;
    }));
  }

  onImageClick(imageName: string): void {
    const image = this.images?.find((image) => image.name == imageName);
    this.stateService.selectedImage = image;
  }
}
