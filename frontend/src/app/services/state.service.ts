import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Image } from '../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  readonly selectedImageSubject = new BehaviorSubject<Image | undefined>(undefined);

  constructor() { }

  get selectedImage(): Image | undefined {
    return this.selectedImageSubject.getValue();
  }

  set selectedImage(val: Image | undefined) {
    this.selectedImageSubject.next(val);
  }
}
