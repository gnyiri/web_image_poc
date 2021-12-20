import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImageMessage } from '../interfaces/image'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  getImages(): Observable<ImageMessage> {
    return this.http.get<ImageMessage>(`${environment.backendUrl}/images`);
  }
}
