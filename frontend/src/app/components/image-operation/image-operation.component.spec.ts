import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageOperationComponent } from './image-operation.component';

describe('ImageOperationComponent', () => {
  let component: ImageOperationComponent;
  let fixture: ComponentFixture<ImageOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
