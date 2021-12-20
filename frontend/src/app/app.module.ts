import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { MainComponent } from './components/main/main.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImagesComponent } from './components/images/images.component';
import { ImageDetailComponent } from './components/image-detail/image-detail.component';
import { ImageOperationComponent } from './components/image-operation/image-operation.component';

@NgModule({
  declarations: [
    ImageUploadComponent,
    MainComponent,
    ImagesComponent,
    ImageDetailComponent,
    ImageOperationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
