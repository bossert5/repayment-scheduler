import {Component} from '@angular/core';
import {RepaymentSchedulerComponent} from '@components/repayment-scheduler/repayment-scheduler.component';

@Component({
  selector: 'app-root',
  imports: [
    RepaymentSchedulerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
