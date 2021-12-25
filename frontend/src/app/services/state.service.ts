import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Image } from '../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private readonly _selectedImage = new BehaviorSubject<Image | undefined>(undefined);

  constructor() { }

  get selectedImage(): Image | undefined {
    return this._selectedImage.getValue();
  }

  set selectedImage(val: Image | undefined) {
    this._selectedImage.next(val);
  }
}
