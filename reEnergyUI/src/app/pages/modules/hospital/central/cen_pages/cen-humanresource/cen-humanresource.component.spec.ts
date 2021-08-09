import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenHumanresourceComponent } from './cen-humanresource.component';

describe('CenHumanresourceComponent', () => {
  let component: CenHumanresourceComponent;
  let fixture: ComponentFixture<CenHumanresourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenHumanresourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenHumanresourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
