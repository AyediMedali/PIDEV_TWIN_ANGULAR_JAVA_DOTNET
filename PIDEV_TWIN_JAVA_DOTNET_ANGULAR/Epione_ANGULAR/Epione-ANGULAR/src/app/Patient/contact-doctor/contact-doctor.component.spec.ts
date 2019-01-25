import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDoctorComponent } from './contact-doctor.component';

describe('ContactDoctorComponent', () => {
  let component: ContactDoctorComponent;
  let fixture: ComponentFixture<ContactDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
