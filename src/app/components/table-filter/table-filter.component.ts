import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { CustomValidators } from '../../validators/custom.validators';

export type FilterType = 'year' | 'winner';

@Component({
  selector: 'app-table-filter',
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './table-filter.component.html',
})
export class TableFilterComponent implements OnInit, OnChanges {
  @Input() form!: FormGroup;
  @Input() activeFilters: FilterType[] = ['year', 'winner'];
  @Input() currentYear = new Date().getFullYear();
  @Output() filtersCleared = new EventEmitter<void>();

  get yearControl() {
    return this.form.get('year');
  }

  ngOnInit() {
    this.setupYearValidator();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentYear'] || changes['activeFilters']) {
      this.setupYearValidator();
    }
  }

  private setupYearValidator() {
    if (this.activeFilters.includes('year') && this.currentYear) {
      const yearControl = this.form.get('year');
      if (yearControl) {
        yearControl.setValidators([
          CustomValidators.yearValidator(this.currentYear),
        ]);
        yearControl.updateValueAndValidity();
      }
    }
  }

  clearFilters(): void {
    this.form.patchValue({
      year: null,
      winner: null,
    });
    this.filtersCleared.emit();
  }
}
