import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctoDetailComponent } from './docto-detail.component';

describe('DoctoDetailComponent', () => {
  let component: DoctoDetailComponent;
  let fixture: ComponentFixture<DoctoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
