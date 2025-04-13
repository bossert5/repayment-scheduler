import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RepaymentSchedulerComponent} from './repayment-scheduler.component';

describe('RepaymentSchedulerComponent', () => {
  let component: RepaymentSchedulerComponent;
  let fixture: ComponentFixture<RepaymentSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepaymentSchedulerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RepaymentSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render loan form and repayment table components', () => {
    const loanFormElement = fixture.nativeElement.querySelector('app-loan-form');
    const repaymentTableElement = fixture.nativeElement.querySelector('app-repayment-table');

    expect(loanFormElement).not.toBeNull();
    expect(repaymentTableElement).not.toBeNull();
  });

});
