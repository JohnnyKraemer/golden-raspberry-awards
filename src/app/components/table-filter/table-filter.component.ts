import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

export type FilterType = 'year' | 'winner';

@Component({
  selector: 'app-table-filter',
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './table-filter.component.html',
})
export class TableFilterComponent {
  @Input() form!: FormGroup;
  @Input() activeFilters: FilterType[] = ['year', 'winner'];
  @Input() currentYear = new Date().getFullYear();
  @Input() yearPlaceholder = 'Filter by year';
  @Output() filtersCleared = new EventEmitter<void>();

  get yearControl() {
    return this.form.get('year');
  }

  clearFilters(): void {
    this.form.patchValue({
      year: null,
      winner: null,
    });
    this.filtersCleared.emit();
  }
}
