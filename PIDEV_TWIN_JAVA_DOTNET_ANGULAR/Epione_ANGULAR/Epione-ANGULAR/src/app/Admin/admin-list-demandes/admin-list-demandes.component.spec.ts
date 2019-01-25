import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListDemandesComponent } from './admin-list-demandes.component';

describe('AdminListDemandesComponent', () => {
  let component: AdminListDemandesComponent;
  let fixture: ComponentFixture<AdminListDemandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListDemandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListDemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
