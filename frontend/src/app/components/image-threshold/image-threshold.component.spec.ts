import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageThresholdComponent } from './image-threshold.component';

describe('ImageThresholdComponent', () => {
  let component: ImageThresholdComponent;
  let fixture: ComponentFixture<ImageThresholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageThresholdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
