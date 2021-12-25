import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from 'src/app/interfaces/image';
import { ImageService } from 'src/app/services/image.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {
  @Input() image: Image | undefined;

  constructor(private router: Router, private imageService: ImageService, private stateService: StateService) { }

  ngOnInit(): void {
  }

  onImageSelect(pImagePath: string, pImageName: string): void {
    this.stateService.selectedImage = this.image;
    this.router.navigate(['image-viewer', { imagePath: pImagePath, imageName: pImageName }]);
  }

  onImageDelete(pImagePath: string, pImageName: string): void {
    this.imageService.deleteImage(pImageName).subscribe(result => {
      this.imageService.imagesChanged.next(true);
    });
  }
}
