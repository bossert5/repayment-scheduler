import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {RepaymentTableComponent} from './repayment-table.component';
import {RepaymentCalculationService} from '@shared/services';
import {BehaviorSubject} from 'rxjs';
import {RepaymentPlanEntry, RepaymentPlanSummary} from '@shared/models';
import {MatTableDataSource} from '@angular/material/table';

import repaymentPlanMockData from '@test-data/payment-plan-entries.mock.json';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import {LOCALE_ID} from '@angular/core';

registerLocaleData(localeDe, 'de');

describe('RepaymentTableComponent', () => {
  let component: RepaymentTableComponent;
  let fixture: ComponentFixture<RepaymentTableComponent>;

  let mockService: jasmine.SpyObj<RepaymentCalculationService>;
  let mockRepaymentPlan: RepaymentPlanEntry[];

  const mockSummary: RepaymentPlanSummary = {
    remainingDebt: -77744.14,
    totalInterest: 18943.74,
    totalRepayment: 22255.86,
    totalPayment: 41199.60
  };

  beforeEach(async () => {

    mockRepaymentPlan = repaymentPlanMockData
      .map(entry => ({
        ...entry,
        date: new Date(entry.date),
      }));

    mockService = jasmine.createSpyObj('RepaymentCalculationService', ['getSummaryForRepaymentPlan'], {
      repaymentPlan$: new BehaviorSubject<RepaymentPlanEntry[]>(mockRepaymentPlan).asObservable(),
    });

    mockService.getSummaryForRepaymentPlan.and.returnValue(mockSummary);

    await TestBed.configureTestingModule({
      imports: [RepaymentTableComponent],
      providers: [
        {provide: LOCALE_ID, useValue: 'de'},
        {provide: RepaymentCalculationService, useValue: mockService},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RepaymentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have displayed columns', () => {
    expect(component.displayedColumns).toEqual(['date', 'remainingDebt', 'interestPayment', 'repayment', 'totalPayment']);
  });

  it('should subscribe to repaymentPlan$ and update dataSource and summary', () => {
    fixture.detectChanges();

    expect(component.dataSource).toBeDefined();
    expect(component.dataSource!.data).toEqual(mockRepaymentPlan);

    expect(component.repaymentPlanSummary).toEqual(mockSummary);
  });

  it('should display table with correct repayment data', fakeAsync(() => {

    component.dataSource = new MatTableDataSource<RepaymentPlanEntry>(mockRepaymentPlan);
    component.repaymentPlanSummary = mockSummary;

    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tr');

    const dataRowLength = mockRepaymentPlan.length;

    expect(rows.length).toBe(dataRowLength + 2); // +1 for header +1 for footer -> +2

    const headerCells = rows[0].querySelectorAll('th');
    expect(headerCells.length).toBe(5);
    expect(headerCells[0].textContent).toContain('Datum');
    expect(headerCells[1].textContent).toContain('Restschuld');
    expect(headerCells[2].textContent).toContain('Zinsen');
    expect(headerCells[3].textContent).toContain('Tilgung / Auszahlung');
    expect(headerCells[4].textContent).toContain('Rate');

    const firstRowCells = rows[1].querySelectorAll('td');

    expect(firstRowCells.length).toBe(5);
    expect(firstRowCells[0].textContent).toContain('30.04.2025');
    expect(firstRowCells[1].textContent).toContain('-100.000,00');
    expect(firstRowCells[2].textContent).toContain('0,00');
    expect(firstRowCells[3].textContent).toContain('-100.000,00');
    expect(firstRowCells[4].textContent).toContain('-100.000,00');

    const footerCells = rows[rows.length - 1].querySelectorAll('td');

    expect(footerCells.length).toBe(5);
    expect(footerCells[0].textContent).toContain('Zinsbindungsende:');
    expect(footerCells[1].textContent).toContain('-77.744,14');
    expect(footerCells[2].textContent).toContain('18.943,74');
    expect(footerCells[3].textContent).toContain('22.255,86');
    expect(footerCells[4].textContent).toContain('41.199,60');
  }));

});
