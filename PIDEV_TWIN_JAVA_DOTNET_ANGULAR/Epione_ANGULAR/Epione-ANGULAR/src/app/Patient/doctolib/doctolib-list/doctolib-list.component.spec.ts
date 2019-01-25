import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctolibListComponent } from './doctolib-list.component';

describe('DoctolibListComponent', () => {
  let component: DoctolibListComponent;
  let fixture: ComponentFixture<DoctolibListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctolibListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctolibListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
