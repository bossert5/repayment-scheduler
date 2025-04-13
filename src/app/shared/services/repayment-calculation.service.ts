import {Injectable} from '@angular/core';
import {LoanFormData, RepaymentPlanEntry, RepaymentPlanSummary} from '@shared/models';
import {BehaviorSubject} from 'rxjs';
import {roundNumber} from '@shared/utils';

@Injectable({
  providedIn: 'root'
})
export class RepaymentCalculationService {

  private _repaymentPlan$: BehaviorSubject<RepaymentPlanEntry[]> = new BehaviorSubject<RepaymentPlanEntry[]>([]);

  get repaymentPlan$() {
    return this._repaymentPlan$.asObservable();
  }

  constructor() {
  }

  /*
  * This function updates the repayment plan based on the provided form data.
  *
  * It takes the form data and an optional date parameter (defaulting to the current date).
  *
  * It creates an initial repayment entry with the last day of the current month and the loan amount as the remaining debt.
  * The function then calculates the total payment, interest payment, and remaining debt for each month until the maximum number of months is reached.
  *
  * The repayment plan is stored in a BehaviorSubject, which allows other components to subscribe to it and receive updates.
  *
  * @param formData - The loan form data containing loan amount, interest rate, and initial repayment rate.
  * @param date - The date to start the repayment plan from (default is the current date).
  * @return void
  */
  updateRepaymentPlan(formData: LoanFormData, date = new Date()): void {

    const lastDayOfCurrentMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const initialRepaymentEntry: RepaymentPlanEntry = {
      date: lastDayOfCurrentMonth,
      remainingDebt: formData.loanAmount * (-1),
      interestPayment: 0,
      repayment: formData.loanAmount * (-1),
      totalPayment: formData.loanAmount * (-1)
    };

    const repaymentPlan: RepaymentPlanEntry[] = [initialRepaymentEntry];

    const totalRate = (formData.interestRate + formData.initialRepaymentRate) / 1200;

    let totalPayment = roundNumber(Math.abs(initialRepaymentEntry.remainingDebt) * totalRate);

    const maxMonths = formData.fixedInterestPeriod * 12;
    let monthsCount = 0;

    do {

      monthsCount++;

      const previousRepaymentEntry: RepaymentPlanEntry = repaymentPlan[repaymentPlan.length - 1];
      const previousDate = previousRepaymentEntry.date;
      const previousRemainingDebt = previousRepaymentEntry.remainingDebt;

      const nextDate = new Date(previousDate.getFullYear(), previousDate.getMonth() + 2, 0);
      const nextInterestPayment = roundNumber(Math.abs(previousRemainingDebt) * (formData.interestRate / 1200));

      let nextRepayment = roundNumber(totalPayment - nextInterestPayment);
      let nextRemainingDebt = roundNumber(previousRemainingDebt + nextRepayment);

      if (nextRemainingDebt >= 0) {
        nextRepayment = Math.abs(previousRemainingDebt);
        totalPayment = nextRepayment + nextInterestPayment;
        nextRemainingDebt = 0;
      }

      const repaymentEntry: RepaymentPlanEntry = {
        date: nextDate,
        remainingDebt: nextRemainingDebt,
        interestPayment: nextInterestPayment,
        repayment: nextRepayment,
        totalPayment: totalPayment
      };

      repaymentPlan.push(repaymentEntry);

    } while (monthsCount < maxMonths)

    this._repaymentPlan$.next(repaymentPlan);
  }

  /*
  * This function calculates the summary of the repayment plan.
  * It takes the repayment plan as input and returns an object containing the total interest, total repayment, total payment, and remaining debt.
  * It iterates through the repayment plan entries, summing up the respective values.
  * The remaining debt is taken from the last entry in the repayment plan.
  *
  * @param repaymentPlan - An array of repayment plan entries.
  * @return An object containing the total interest, total repayment, total payment, and remaining debt.
  */
  getSummaryForRepaymentPlan(repaymentPlan: RepaymentPlanEntry[]): RepaymentPlanSummary {

    const result: RepaymentPlanSummary = {
      totalInterest: 0,
      totalRepayment: 0,
      totalPayment: 0,
      remainingDebt: 0
    };

    if (repaymentPlan.length === 0) {
      return result;
    }

    for (let i = 1; i < repaymentPlan.length; i++) {
      const entry = repaymentPlan[i];
      result.totalInterest += entry.interestPayment;
      result.totalRepayment += entry.repayment;
      result.totalPayment += entry.totalPayment;
    }

    result.remainingDebt = repaymentPlan[repaymentPlan.length - 1].remainingDebt;

    return {
      totalInterest: roundNumber(result.totalInterest),
      totalRepayment: roundNumber(result.totalRepayment),
      totalPayment: roundNumber(result.totalPayment),
      remainingDebt: roundNumber(result.remainingDebt)
    };
  }

}
