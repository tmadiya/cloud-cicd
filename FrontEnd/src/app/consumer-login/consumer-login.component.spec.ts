import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerLoginComponent } from './consumer-login.component';

describe('ConsumerLoginComponent', () => {
  let component: ConsumerLoginComponent;
  let fixture: ComponentFixture<ConsumerLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
