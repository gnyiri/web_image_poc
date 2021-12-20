import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Image } from 'src/app/interfaces/image';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {
  @Input() image: Image | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onImageSelect(imageName: string) {
    this.router.navigate(['image-operation', { imagePath: imageName }]);
  }
}
