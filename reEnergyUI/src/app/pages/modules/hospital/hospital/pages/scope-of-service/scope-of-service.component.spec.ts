import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeOfServiceComponent } from './scope-of-service.component';

describe('ScopeOfServiceComponent', () => {
  let component: ScopeOfServiceComponent;
  let fixture: ComponentFixture<ScopeOfServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScopeOfServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopeOfServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
