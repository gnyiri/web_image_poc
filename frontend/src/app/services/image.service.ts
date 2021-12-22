import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SingleImageResponse, MultiImageResponse } from '../interfaces/image'

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public imagesChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getImages(): Observable<MultiImageResponse> {
    return this.http.get<MultiImageResponse>(`${environment.backendUrl}/images`);
  }

  thresholdImage(image: string, threshold: number): Observable<SingleImageResponse> {
    return this.http.get<SingleImageResponse>(`${environment.backendUrl}/threshold/${image}/${threshold}`);
  }

  deleteImage(image: string): Observable<JSON> {
    return this.http.delete<JSON>(`${environment.backendUrl}/images/${image}`);
  }
}
