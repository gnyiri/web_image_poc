import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-operation',
  templateUrl: './image-operation.component.html',
  styleUrls: ['./image-operation.component.css']
})
export class ImageOperationComponent implements OnInit {
  imagePath: string | undefined;
  imageName: string | undefined;

  constructor(private imageService: ImageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.imagePath = params.imagePath;
      this.imageName = params.imageName;
    });
  }

  onThreshold(): void {
    console.log(`onThreshold called: ${this.imageName}`);

    if (this.imageName) {
      this.imageService.thresholdImage(this.imageName, 128).subscribe(response => {
        console.log(response);
        this.imagePath = environment.imageRepositoryUrl + '/' + response.image.name;
      });
    }
  }

  onSmooth(): void {
  }
}
