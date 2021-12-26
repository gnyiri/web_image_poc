import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
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
  imagesSubject = new Subject();
  imageColumn1: Image[] = [];
  imageColumn2: Image[] = [];
  imageColumn3: Image[] = [];

  constructor(
    private router: Router,
    private imageService: ImageService, 
    private stateService: StateService) { }

  ngOnInit(): void {
    this.getImages();

    this.imageService.imagesChanged.subscribe(value => {
      this.getImages();
    });
  }

  selectDefaultImage(): void {
    console.log(this.stateService.selectedImage);
    console.log(this.images);

    if (this.images && this.images.length > 0 && this.stateService.selectedImage === undefined) {
      this.stateService.selectedImage = this.images[0];
    }
  }

  getImages(): void {
    this.imageMessage$ = this.imageService.getImages().pipe(map(values => {
      this.images = values.images;

      const tempImagesColumn1 = [];
      const tempImagesColumn2 = [];
      const tempImagesColumn3 = [];

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

      this.selectDefaultImage();

      return values;
    }));
  }

  onImageClick(pImage: Image): void {
    const image = this.images?.find((result) => result.name === pImage.name);
    this.stateService.selectedImage = image;
  }

  onImageDblClick(pImage: Image): void {
    const image = this.images?.find((result) => result.name === pImage.name);
    this.stateService.selectedImage = image;
    this.router.navigate(['image-viewer', { imagePath: pImage.path, imageName: pImage.name }]);
  }
}
