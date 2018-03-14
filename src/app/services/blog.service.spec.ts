import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { BlogService } from './blog.service';

describe('BlogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [

        HttpClientModule
      ],
      providers: [BlogService]
    });
  });

  it('should be created', inject([BlogService], (service: BlogService) => {
    expect(service).toBeTruthy();
  }));
});
