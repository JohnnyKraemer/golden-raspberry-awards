import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pagination } from '../../interfaces/pagination';

@Component({
  selector: 'app-paginator',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './paginator.component.html',
})
export class PaginatorComponent<T> {
  @Input() pagination: Pagination<T> | null = null;
  @Input() form!: FormGroup;

  pages(): number[] {
    if (!this.pagination) return [];

    const totalPages = this.pagination.totalPages || 1;
    const currentPage = this.pagination.number;
    const visiblePages = 5;

    const start = Math.max(0, Math.min(currentPage - Math.floor(visiblePages / 2), totalPages - visiblePages));
    const end = Math.min(totalPages, start + visiblePages);

    return Array.from({ length: end - start }, (_, i) => start + i);
  }

  goToPage(page: number) {
    this.form.patchValue({ page });
  }

  changePageSizeFromValue(size: number) {
    this.form.patchValue({ size, page: 0 });
  }
}
