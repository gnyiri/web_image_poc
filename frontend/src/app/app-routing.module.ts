import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageOperationComponent } from './components/image-operation/image-operation.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ImagesComponent } from './components/images/images.component';

const routes: Routes = [
  {path: 'images', component: ImagesComponent},
  {path: 'image-upload', component: ImageUploadComponent},
  {path: 'image-operation', component: ImageOperationComponent},
  {path: '', redirectTo: 'images', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
