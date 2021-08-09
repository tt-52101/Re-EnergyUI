import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenralformComponent } from './genralform.component';

describe('GenralformComponent', () => {
  let component: GenralformComponent;
  let fixture: ComponentFixture<GenralformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenralformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenralformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
