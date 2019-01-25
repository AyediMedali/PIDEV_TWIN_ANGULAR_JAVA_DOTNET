import { TestBed, async, inject } from '@angular/core/testing';

import { AuthPatientGuard } from './auth-patient.guard';

describe('AuthPatientGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthPatientGuard]
    });
  });

  it('should ...', inject([AuthPatientGuard], (guard: AuthPatientGuard) => {
    expect(guard).toBeTruthy();
  }));
});
