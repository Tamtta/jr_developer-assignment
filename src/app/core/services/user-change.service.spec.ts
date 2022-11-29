import { TestBed } from '@angular/core/testing';
import { UserChangeService } from './user-change.service';

// import { UserChangeService } from './services/user-change.service';

describe('UserChangeService', () => {
  let service: UserChangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserChangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
