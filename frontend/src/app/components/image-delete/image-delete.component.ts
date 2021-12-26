import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from 'src/app/interfaces/image';
import { ImageService } from 'src/app/services/image.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-image-delete',
  templateUrl: './image-delete.component.html',
  styleUrls: ['./image-delete.component.css']
})
export class ImageDeleteComponent implements OnInit {
  image: Image | undefined = undefined;

  constructor(private router: Router,
    private imageService: ImageService,
    private stateService: StateService) { }

  ngOnInit(): void {
    this.image = this.stateService.selectedImage;
    console.log('Selected image: ' + this.stateService.selectedImage);
  }

  onDelete(): void {
    if (this.image) {
      this.imageService.deleteImage(this.image?.name).subscribe(result => {
        this.router.navigate(['images', {}]);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['images', {}]);
  }
}
