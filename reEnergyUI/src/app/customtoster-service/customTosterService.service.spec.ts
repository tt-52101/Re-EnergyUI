/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomTosterServiceService } from './customTosterService.service';

describe('Service: CustomTosterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomTosterServiceService]
    });
  });

  it('should ...', inject([CustomTosterServiceService], (service: CustomTosterServiceService) => {
    expect(service).toBeTruthy();
  }));
});
