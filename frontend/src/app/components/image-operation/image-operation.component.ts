import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-operation',
  templateUrl: './image-operation.component.html',
  styleUrls: ['./image-operation.component.css']
})
export class ImageOperationComponent implements OnInit {
  imagePath: string | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.imagePath = params['imagePath'];
    });
  }

  onThreshold() {

  }

  onSmooth() {
    
  }
}
