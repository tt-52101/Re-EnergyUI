import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsrlistComponent } from './asrlist.component';

describe('AsrlistComponent', () => {
  let component: AsrlistComponent;
  let fixture: ComponentFixture<AsrlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsrlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsrlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
