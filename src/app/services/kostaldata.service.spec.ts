import { TestBed } from '@angular/core/testing';

import { KostaldataService } from './kostaldata.service';

describe('KostaldataService', () => {
  let service: KostaldataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KostaldataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
