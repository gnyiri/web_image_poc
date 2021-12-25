import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { Image } from 'src/app/interfaces/image';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit {
  image: Image | undefined = undefined;

  constructor(private router: Router,
    private stateService: StateService) { }

  ngOnInit(): void {
    this.image = this.stateService.selectedImage;
    console.log('Selected image: ' + this.stateService.selectedImage);
  }

  onClick() {
    this.router.navigate(['images', { }]);
  }
}
