import {Component, OnInit} from '@angular/core';
import {RepaymentCalculationService} from '@shared/services';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {RepaymentPlanEntry, RepaymentPlanSummary} from '@shared/models';
import {CommonModule} from '@angular/common';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {filter} from 'rxjs';
import {MatIconModule} from '@angular/material/icon';

@UntilDestroy()
@Component({
  selector: 'app-repayment-table',
  templateUrl: './repayment-table.component.html',
  styleUrl: './repayment-table.component.scss',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule
  ],
})
export class RepaymentTableComponent implements OnInit {

  displayedColumns: string[] = ['date', 'remainingDebt', 'interestPayment', 'repayment', 'totalPayment'];
  dataSource!: MatTableDataSource<RepaymentPlanEntry>;

  repaymentPlanSummary!: RepaymentPlanSummary;

  constructor(private _repaymentCalculationService: RepaymentCalculationService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this._subscribeToRepaymentPlan();
  }

  // Subscribe to the repayment plan observable to get the latest data, then update the data source and summary
  private _subscribeToRepaymentPlan(): void {
    this._repaymentCalculationService.repaymentPlan$
      .pipe(
        untilDestroyed(this),
        filter(repaymentPlan => repaymentPlan.length > 0)
      )
      .subscribe((repaymentPlan: RepaymentPlanEntry[]) => {
        this.dataSource = new MatTableDataSource<RepaymentPlanEntry>(repaymentPlan);
        this.repaymentPlanSummary = this._repaymentCalculationService.getSummaryForRepaymentPlan(repaymentPlan);
        this._showUpdateSnackBar();
      });
  }

  private _showUpdateSnackBar(): void {
    this._snackBar.open('Tilgungsplan aktualisiert', 'OK', {
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      duration: 2000,
    });
  }

}
