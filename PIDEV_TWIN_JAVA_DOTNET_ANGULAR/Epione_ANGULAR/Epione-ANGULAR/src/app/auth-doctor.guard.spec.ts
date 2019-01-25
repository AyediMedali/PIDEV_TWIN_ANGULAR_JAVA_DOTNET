import { TestBed, async, inject } from '@angular/core/testing';

import { AuthDoctorGuard } from './auth-doctor.guard';

describe('AuthDoctorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthDoctorGuard]
    });
  });

  it('should ...', inject([AuthDoctorGuard], (guard: AuthDoctorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
