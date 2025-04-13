import { Component, EventEmitter, Output  } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
}
