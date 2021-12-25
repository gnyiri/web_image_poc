import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/interfaces/image';
import { ImageService } from 'src/app/services/image.service';
import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-threshold',
  templateUrl: './image-threshold.component.html',
  styleUrls: ['./image-threshold.component.css']
})
export class ImageThresholdComponent implements OnInit {
  iImage: Image | undefined = undefined;
  oImage: Image | undefined = undefined;

  constructor(private imageService: ImageService,
    private stateService: StateService) { }

  ngOnInit(): void {
    this.iImage = this.stateService.selectedImage;
  }

  onThreshold(): void {
    console.log(`onThreshold called: ${this.iImage?.name}`);

    if (this.iImage) {
      this.imageService.thresholdImage(this.iImage.name, 128).subscribe(response => {
        console.log(response);

        this.oImage = response.image;
        this.oImage.path = environment.imageRepositoryUrl + '/' + response.image.name;
      });
    }
  }
}
