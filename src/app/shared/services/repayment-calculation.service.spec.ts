import {TestBed} from '@angular/core/testing';
import {RepaymentCalculationService} from './repayment-calculation.service';
import {LoanFormData, RepaymentPlanEntry} from '@shared/models';
import {firstValueFrom} from 'rxjs';

import repaymentPlanMockData from '@test-data/payment-plan-entries.mock.json';

describe('RepaymentCalculationService', () => {
  let service: RepaymentCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepaymentCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create repayment plan correctly', async () => {

    const loanFormData: LoanFormData = {
      "loanAmount": 100000,
      "interestRate": 2.12,
      "initialRepaymentRate": 2,
      "fixedInterestPeriod": 10
    };

    service.updateRepaymentPlan(loanFormData, new Date('2025-04-13'));

    const result = await firstValueFrom(service.repaymentPlan$);

    const expectingRepaymentPlan: RepaymentPlanEntry[] = repaymentPlanMockData
      .map(entry => ({
        ...entry,
        date: new Date(entry.date),
      }));

    expect(result).toEqual(expectingRepaymentPlan);

  });

  it('should calculate repayment plan summary correctly', () => {

    const repaymentPlan: RepaymentPlanEntry[] = repaymentPlanMockData
      .map(entry => ({
        ...entry,
        date: new Date(entry.date),
      }));

    const summary = service.getSummaryForRepaymentPlan(repaymentPlan);

    expect(summary.remainingDebt).toEqual(-77744.14);
    expect(summary.totalInterest).toEqual(18943.74);
    expect(summary.totalRepayment).toEqual(22255.86);
    expect(summary.totalPayment).toEqual(41199.60);
  });

});
