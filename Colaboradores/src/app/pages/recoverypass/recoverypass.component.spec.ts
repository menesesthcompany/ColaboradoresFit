import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverypassComponent } from './recoverypass.component';

describe('RecoverypassComponent', () => {
  let component: RecoverypassComponent;
  let fixture: ComponentFixture<RecoverypassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoverypassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecoverypassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
