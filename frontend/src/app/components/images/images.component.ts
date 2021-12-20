import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Image, ImageMessage } from 'src/app/interfaces/image'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  imageMessage$: Observable<ImageMessage> | undefined;
  imageColumn1: Image[] = [];
  imageColumn2: Image[] = [];
  imageColumn3: Image[] = [];

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.getImages();
  }

  getImages() {
    this.imageMessage$ = this.imageService.getImages().pipe(map(values => {
      let images: Image[] = values.images;

      images.forEach(image => {
        image.full_path = environment.imageRepositoryUrl + "/" + image.name;
      })

      images.sort((a, b) => {
        return a.creation_time < b.creation_time ? 1 : -1;
      });

      for (let i = 0; i < images.length; i += 3) {
        this.imageColumn1[i] = images[i];
        if (i < images.length - 1) {
          this.imageColumn2[i] = images[i + 1];
        }
        if (i < images.length - 2) {
          this.imageColumn3[i] = images[i + 2];
        }
      }
      return values;
    }));
  }

  onImageClick(imageName: string) {
    console.log(imageName);
  }
}
