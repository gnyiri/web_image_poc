import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { SingleImageResponse, MultiImageResponse, Image } from 'src/app/interfaces/image';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  imageMessage$: Observable<MultiImageResponse> | undefined;
  imageColumn1: Image[] = [];
  imageColumn2: Image[] = [];
  imageColumn3: Image[] = [];

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.getImages();

    this.imageService.imagesChanged.subscribe(value => {
      this.getImages();
    });
  }

  getImages(): void {
    this.imageMessage$ = this.imageService.getImages().pipe(map(values => {
      const images: Image[] = values.images;

      let tempImagesColumn1 = [];
      let tempImagesColumn2 = [];
      let tempImagesColumn3 = [];

      if (images) {
        images.forEach(image => {
          image.full_path = environment.imageRepositoryUrl + '/' + image.name;
        });

        images.sort((a, b) => {
          return a.creation_time < b.creation_time ? 1 : -1;
        });

        for (let i = 0; i < images.length; i += 3) {
          tempImagesColumn1[i] = images[i];

          if (i < images.length - 1) {
            tempImagesColumn2[i] = images[i + 1];
          }
          if (i < images.length - 2) {
            tempImagesColumn3[i] = images[i + 2];
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
    console.log(imageName);
  }
}
