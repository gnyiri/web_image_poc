import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  form: FormGroup;
  url: any;
  msg = '';
  selectedFile: File = null!;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private router: Router) {
      this.form = this.fb.group({
        img: [null]
      });
    }

  upload(event: any): void {
    console.log(event);

    this.selectedFile = event.target.files[0] as File;

    this.form.patchValue({
      img: this.selectedFile
    });

    this.form.get('img')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_) => {
      this.msg = '';
      this.url = reader.result;
    };
  }

  submit(): void {
    console.log(`Upload file ${this.selectedFile} to server`);

    const formData: any = new FormData();
    formData.append('img', this.form.get('img')?.value);

    this.http.post(`${environment.backendUrl}/upload`, formData).subscribe(response => {
        this.router.navigate(['images']);
      }
    );
  }
}
