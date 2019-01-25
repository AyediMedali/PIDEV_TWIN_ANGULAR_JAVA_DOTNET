import { TestBed } from '@angular/core/testing';

import { DoctolibServicesService } from './doctolib-services.service';

describe('DoctolibServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctolibServicesService = TestBed.get(DoctolibServicesService);
    expect(service).toBeTruthy();
  });
});
