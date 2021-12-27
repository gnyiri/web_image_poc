import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  thresholdControl: FormControl = new FormControl();

  constructor(private imageService: ImageService,
    private stateService: StateService) { }

  ngOnInit(): void {
    this.iImage = this.stateService.selectedImage;
  }

  onSliderValueChange(event: any): void {
    console.log(event.value);
  }

  onThreshold(): void {
    console.log(`onThreshold called: ${this.iImage?.name} ${this.thresholdControl.value}`);

    const thresholdValue = this.thresholdControl.value ? this.thresholdControl.value : 127;

    if (this.iImage) {
      this.imageService.thresholdImage(this.iImage.name, thresholdValue).subscribe(response => {
        console.log(response);

        this.oImage = response.image;
        this.oImage.full_path = environment.imageRepositoryUrl + '/' + response.image.name;
      });
    }
  }
}
