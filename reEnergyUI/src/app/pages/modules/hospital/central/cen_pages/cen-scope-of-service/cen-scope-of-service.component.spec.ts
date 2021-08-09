import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenScopeOfServiceComponent } from './cen-scope-of-service.component';

describe('CenScopeOfServiceComponent', () => {
  let component: CenScopeOfServiceComponent;
  let fixture: ComponentFixture<CenScopeOfServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenScopeOfServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenScopeOfServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
