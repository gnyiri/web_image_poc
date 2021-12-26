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
  selected = false;

  constructor(private router: Router, private imageService: ImageService, private stateService: StateService) { }

  ngOnInit(): void {
    if (this.image) {
      if (this.image.full_path === this.stateService.selectedImage?.full_path) {
        this.selected = true;
      }
    }

    this.stateService.selectedImageSubject.subscribe(image => {
      if (image && this.image) {
        if (image.full_path === this.image.full_path) {
          this.selected = true;
        } else {
          this.selected = false;
        }
      }
    });
  }

  onImageDelete(pImagePath: string, pImageName: string): void {
    this.imageService.deleteImage(pImageName).subscribe(result => {
      this.imageService.imagesChanged.next(true);
    });
  }
}
