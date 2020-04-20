import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { COnsumerRegistrationComponent } from './consumer-registration.component';

describe('COnsumerRegistrationComponent', () => {
  let component: COnsumerRegistrationComponent;
  let fixture: ComponentFixture<COnsumerRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ COnsumerRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(COnsumerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
