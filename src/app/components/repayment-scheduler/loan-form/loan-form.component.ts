import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoanFormData} from '@shared/models';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {debounceTime} from 'rxjs';
import {MatListModule} from '@angular/material/list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RepaymentCalculationService} from '@shared/services';

@UntilDestroy()
@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrl: './loan-form.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInput,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule
  ],
})
export class LoanFormComponent {

  readonly MIN_LOAN_AMOUNT = 1000; // Minimum loan amount
  readonly MIN_INTEREST_RATE = 0.01; // Minimum interest rate (0.01 %)
  readonly MIN_INITIAL_REPAYMENT_RATE = 1; // Minimum initial repayment rate (1 %)
  readonly MIN_FIXED_INTEREST_PERIOD = 5; // Minimum fixed interest period (5 years)

  readonly FIXED_INTEREST_PERIODS = [5, 10, 15, 20, 25, 30]; // Fixed interest periods in years

  form!: FormGroup;

  constructor(private _fb: FormBuilder,
              private _repaymentCalculationService: RepaymentCalculationService) {
    this._createForm();

    this._fillFormWithDefaultValues();
  }

  submit(): void {
    if (this.form.valid) {
      const formData: LoanFormData = this.form.value;
      this._repaymentCalculationService.updateRepaymentPlan(formData);
    }
  }

  private _createForm(): void {
    this.form = this._fb.group({
      loanAmount: this._fb.control<number | null>(null, {validators: [Validators.required, Validators.min(this.MIN_LOAN_AMOUNT)]}),
      interestRate: this._fb.control<number | null>(null, {validators: [Validators.required, Validators.min(this.MIN_INTEREST_RATE)]}),
      initialRepaymentRate: this._fb.control<number | null>(null, {validators: [Validators.required, Validators.min(this.MIN_INITIAL_REPAYMENT_RATE)]}),
      fixedInterestPeriod: this._fb.control<number>(5, {validators: [Validators.required, Validators.min(this.MIN_FIXED_INTEREST_PERIOD)]}),
    });

    // We want to submit the form and update the data every time the user changes the any value in the form
    this.form.valueChanges
      .pipe(
        untilDestroyed(this),
        debounceTime(500)
      )
      .subscribe(() => this.submit());
  }

  // This can lead to a better user experience, as the user sees the form filled with values instead of empty fields
  private _fillFormWithDefaultValues(): void {
    this.form.patchValue({
      loanAmount: 100000,
      interestRate: 2,
      initialRepaymentRate: 2,
      fixedInterestPeriod: 10
    }, {emitEvent: false});
  }

}
