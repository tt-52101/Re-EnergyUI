import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenOpdregisprocessComponent } from './cen-opdregisprocess.component';

describe('CenOpdregisprocessComponent', () => {
  let component: CenOpdregisprocessComponent;
  let fixture: ComponentFixture<CenOpdregisprocessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenOpdregisprocessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenOpdregisprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
