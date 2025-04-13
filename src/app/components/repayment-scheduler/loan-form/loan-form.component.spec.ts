import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {LoanFormComponent} from './loan-form.component';
import {By} from '@angular/platform-browser';

describe('LoanFormComponent', () => {
  let component: LoanFormComponent;
  let fixture: ComponentFixture<LoanFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanFormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with 4 controls', () => {
    expect(component.form.contains('loanAmount')).toBeTruthy();
    expect(component.form.contains('interestRate')).toBeTruthy();
    expect(component.form.contains('initialRepaymentRate')).toBeTruthy();
    expect(component.form.contains('fixedInterestPeriod')).toBeTruthy();
  });

  it('should have required and min validators for the form controls', () => {
    component.form.get('loanAmount')?.setValue(null);
    expect(component.form.get('loanAmount')?.hasError('required')).toBeTruthy();

    component.form.get('interestRate')?.setValue(null);
    expect(component.form.get('interestRate')?.hasError('required')).toBeTruthy();

    component.form.get('initialRepaymentRate')?.setValue(null);
    expect(component.form.get('initialRepaymentRate')?.hasError('required')).toBeTruthy();

    component.form.get('fixedInterestPeriod')?.setValue(null);
    expect(component.form.get('fixedInterestPeriod')?.hasError('required')).toBeTruthy();

    component.form.get('loanAmount')?.setValue(500);
    expect(component.form.get('loanAmount')?.hasError('min')).toBeTruthy();

    component.form.get('interestRate')?.setValue(0);
    expect(component.form.get('interestRate')?.hasError('min')).toBeTruthy();

    component.form.get('initialRepaymentRate')?.setValue(0);
    expect(component.form.get('initialRepaymentRate')?.hasError('min')).toBeTruthy();

    component.form.get('fixedInterestPeriod')?.setValue(2);
    expect(component.form.get('fixedInterestPeriod')?.hasError('min')).toBeTruthy();
  });

  it('should have default values for the form controls', () => {
    expect(component.form.get('loanAmount')?.value).toBe(100000);
    expect(component.form.get('interestRate')?.value).toBe(2);
    expect(component.form.get('initialRepaymentRate')?.value).toBe(2);
    expect(component.form.get('fixedInterestPeriod')?.value).toBe(10);
  });

  it('should show success icon for loanAmount when valid', () => {
    component.form.controls['loanAmount'].setValue(200000);
    component.form.controls['loanAmount'].markAsTouched();
    fixture.detectChanges();

    const field = fixture.debugElement.query(By.css('[data-test-id="loanAmount-field"]'));
    const successIcon = field.query(By.css('mat-icon.success-icon'));

    expect(successIcon).toBeTruthy();
    expect(successIcon.nativeElement.textContent.trim()).toBe('check_circle');
  });

  it('should show success icon for interestRate when valid', () => {
    component.form.controls['interestRate'].setValue(5);
    component.form.controls['interestRate'].markAsTouched();
    fixture.detectChanges();

    const field = fixture.debugElement.query(By.css('[data-test-id="interestRate-field"]'));
    const successIcon = field.query(By.css('mat-icon.success-icon'));

    expect(successIcon).toBeTruthy();
    expect(successIcon.nativeElement.textContent.trim()).toBe('check_circle');
  });

  it('should show success icon for initialRepaymentRate when valid', () => {
    component.form.controls['initialRepaymentRate'].setValue(3);
    component.form.controls['initialRepaymentRate'].markAsTouched();
    fixture.detectChanges();

    const field = fixture.debugElement.query(By.css('[data-test-id="initialRepaymentRate-field"]'));
    const successIcon = field.query(By.css('mat-icon.success-icon'));

    expect(successIcon).toBeTruthy();
    expect(successIcon.nativeElement.textContent.trim()).toBe('check_circle');
  });

  it('should show success icon for fixedInterestPeriod when valid', () => {
    component.form.controls['fixedInterestPeriod'].setValue(5);
    component.form.controls['fixedInterestPeriod'].markAsTouched();
    fixture.detectChanges();

    const field = fixture.debugElement.query(By.css('[data-test-id="fixedInterestPeriod-field"]'));
    const successIcon = field.query(By.css('mat-icon.success-icon'));

    expect(successIcon).toBeTruthy();
    expect(successIcon.nativeElement.textContent.trim()).toBe('check_circle');
  });

  it('should show error icon for loanAmount when invalid', () => {
    component.form.controls['loanAmount'].setValue(null);
    component.form.controls['loanAmount'].markAsTouched();
    fixture.detectChanges();

    const field = fixture.debugElement.query(By.css('[data-test-id="loanAmount-field"]'));
    const errorIcon = field.query(By.css('mat-icon.error-icon'));

    expect(errorIcon).toBeTruthy();
    expect(errorIcon.nativeElement.textContent.trim()).toBe('error');
  });

  it('should show error icon for interestRate when invalid', () => {
    component.form.controls['interestRate'].setValue(null);
    component.form.controls['interestRate'].markAsTouched();
    fixture.detectChanges();

    const field = fixture.debugElement.query(By.css('[data-test-id="interestRate-field"]'));
    const errorIcon = field.query(By.css('mat-icon.error-icon'));

    expect(errorIcon).toBeTruthy();
    expect(errorIcon.nativeElement.textContent.trim()).toBe('error');
  });

  it('should show error icon for initialRepaymentRate when invalid', () => {
    component.form.controls['initialRepaymentRate'].setValue(null);
    component.form.controls['initialRepaymentRate'].markAsTouched();
    fixture.detectChanges();

    const field = fixture.debugElement.query(By.css('[data-test-id="initialRepaymentRate-field"]'));
    const errorIcon = field.query(By.css('mat-icon.error-icon'));

    expect(errorIcon).toBeTruthy();
    expect(errorIcon.nativeElement.textContent.trim()).toBe('error');
  });

  it('should show error icon for fixedInterestPeriod when invalid', () => {
    component.form.controls['fixedInterestPeriod'].setValue(null);
    component.form.controls['fixedInterestPeriod'].markAsTouched();
    fixture.detectChanges();

    const field = fixture.debugElement.query(By.css('[data-test-id="fixedInterestPeriod-field"]'));
    const errorIcon = field.query(By.css('mat-icon.error-icon'));

    expect(errorIcon).toBeTruthy();
    expect(errorIcon.nativeElement.textContent.trim()).toBe('error');
  });

  it('should call submit method on form value change', fakeAsync(() => {
    spyOn(component, 'submit');
    component.form.get('loanAmount')?.setValue(200000);
    fixture.detectChanges();

    tick(500); // debounceTime is set to 500ms
    expect(component.submit).toHaveBeenCalled();
  }));

});
