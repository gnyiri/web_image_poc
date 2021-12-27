import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageViewerComponent } from './components/image-viewer/image-viewer.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ImagesComponent } from './components/images/images.component';
import { ImageThresholdComponent } from './components/image-threshold/image-threshold.component';
import { HistogramComponent } from './components/histogram/histogram.component';
import { ImageDeleteComponent } from './components/image-delete/image-delete.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  {path: 'images', component: ImagesComponent},
  {path: 'image-upload', component: ImageUploadComponent},
  {path: 'image-viewer', component: ImageViewerComponent},
  {path: 'image-threshold', component: ImageThresholdComponent},
  {path: 'histogram', component: HistogramComponent},
  {path: 'image-delete', component: ImageDeleteComponent},
  {path: 'about', component: AboutComponent},
  {path: '', redirectTo: 'images', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
