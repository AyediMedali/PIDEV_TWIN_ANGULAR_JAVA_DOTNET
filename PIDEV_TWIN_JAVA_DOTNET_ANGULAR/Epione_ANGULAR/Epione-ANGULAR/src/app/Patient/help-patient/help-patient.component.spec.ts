import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPatientComponent } from './help-patient.component';

describe('HelpPatientComponent', () => {
  let component: HelpPatientComponent;
  let fixture: ComponentFixture<HelpPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
