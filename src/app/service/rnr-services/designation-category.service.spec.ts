import { TestBed } from '@angular/core/testing';

import { DesignationCategoryService } from './designation-category.service';

describe('DesignationCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DesignationCategoryService = TestBed.get(DesignationCategoryService);
    expect(service).toBeTruthy();
  });
});
