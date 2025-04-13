import {Component} from '@angular/core';
import {LoanFormComponent} from '@components/repayment-scheduler/loan-form/loan-form.component';
import {RepaymentTableComponent} from '@components/repayment-scheduler/repayment-table/repayment-table.component';

@Component({
  selector: 'app-repayment-scheduler',
  imports: [
    LoanFormComponent,
    RepaymentTableComponent
  ],
  templateUrl: './repayment-scheduler.component.html',
  styleUrl: './repayment-scheduler.component.scss'
})
export class RepaymentSchedulerComponent {

}
