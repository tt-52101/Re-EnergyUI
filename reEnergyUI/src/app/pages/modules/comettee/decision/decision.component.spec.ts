import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CCDecisionComponent } from './decision.component';


describe('CCDecisionComponent', () => {
  let component: CCDecisionComponent;
  let fixture: ComponentFixture<CCDecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CCDecisionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CCDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
