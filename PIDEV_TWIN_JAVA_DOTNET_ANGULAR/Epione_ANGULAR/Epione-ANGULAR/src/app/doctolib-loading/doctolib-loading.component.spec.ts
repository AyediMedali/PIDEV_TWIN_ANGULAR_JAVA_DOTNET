import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctolibLoadingComponent } from './doctolib-loading.component';

describe('DoctolibLoadingComponent', () => {
  let component: DoctolibLoadingComponent;
  let fixture: ComponentFixture<DoctolibLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctolibLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctolibLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
