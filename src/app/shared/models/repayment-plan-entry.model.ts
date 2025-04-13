export interface RepaymentPlanEntry {
  date: Date;
  remainingDebt: number;
  interestPayment: number;
  repayment: number;
  totalPayment: number;
}
