import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleChartsModule } from 'angular-google-charts';

import { AppRoutingModule } from './app-routing.module';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { MainComponent } from './components/main/main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImagesComponent } from './components/images/images.component';
import { ImageDetailComponent } from './components/image-detail/image-detail.component';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { ImageThresholdComponent } from './components/image-threshold/image-threshold.component';
import { HistogramComponent } from './components/histogram/histogram.component';
import { ImageDeleteComponent } from './components/image-delete/image-delete.component';

@NgModule({
  declarations: [
    ImageUploadComponent,
    MainComponent,
    ImagesComponent,
    ImageDetailComponent,
    ImageViewerComponent,
    ImageThresholdComponent,
    HistogramComponent,
    ImageDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    GoogleChartsModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
