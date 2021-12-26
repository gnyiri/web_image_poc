import { Component, OnInit } from '@angular/core';
import { ChartType } from "angular-google-charts";
import { Row } from "angular-google-charts"
import { Image } from 'src/app/interfaces/image';
import { ImageService } from 'src/app/services/image.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.css']
})
export class HistogramComponent implements OnInit {
  title = 'Histogram';
  type = ChartType.Bar;
  data: Row[] = [];
  columnNames = ["Intensity", "# of Pixels"];
  options = {
    legend: 'none'
  };
  width = 850;
  height = 400;
  image: Image | undefined = undefined;
  min: number = 0;
  max: number = 255;
  values: [] = [];

  constructor(private imageService: ImageService,
    private stateService: StateService) { }

  ngOnInit(): void {
    this.image = this.stateService.selectedImage;

    if (this.image) {
      this.imageService.histogram(this.image.name).subscribe(result => {
        console.log(result);
        this.min = result.histogram.min;
        this.max = result.histogram.max;
       
        var histogram: Row[] = [];
        var i = 0;
        result.histogram.values.forEach(v => {
          var row: Array<string | number> = [i, v];
          histogram.push(row);
          i = i +1;
        });

        this.data = histogram;
      })
    }
  }

}
