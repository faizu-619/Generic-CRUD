import { TestBed, inject } from '@angular/core/testing';

import { GenericCRUDService } from './generic-crud.service';

describe('GenericCRUDService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenericCRUDService]
    });
  });

  it('should be created', inject([GenericCRUDService], (service: GenericCRUDService) => {
    expect(service).toBeTruthy();
  }));
});
