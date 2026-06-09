import { TestBed } from '@angular/core/testing';

import { GenericCrudBootstrapService } from './generic-crud-bootstrap.service';

describe('GenericCrudBootstrapService', () => {
  let service: GenericCrudBootstrapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericCrudBootstrapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
