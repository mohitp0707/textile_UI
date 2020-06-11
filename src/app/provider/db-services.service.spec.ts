import { TestBed, inject } from '@angular/core/testing';

import { DbServicesService } from './db-services.service';

describe('DbServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbServicesService]
    });
  });

  it('should be created', inject([DbServicesService], (service: DbServicesService) => {
    expect(service).toBeTruthy();
  }));
});
