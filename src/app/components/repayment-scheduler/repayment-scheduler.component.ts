import {Component} from '@angular/core';
import {LoanFormComponent} from '@components/repayment-scheduler/loan-form/loan-form.component';
import {RepaymentTableComponent} from '@components/repayment-scheduler/repayment-table/repayment-table.component';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-repayment-scheduler',
  imports: [
    LoanFormComponent,
    RepaymentTableComponent,
    MatCardModule
  ],
  templateUrl: './repayment-scheduler.component.html',
  styleUrl: './repayment-scheduler.component.scss'
})
export class RepaymentSchedulerComponent {

}
