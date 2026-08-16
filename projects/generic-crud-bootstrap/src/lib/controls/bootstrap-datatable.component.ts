import { Component, EventEmitter, Input, OnChanges, Output, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

@Component({
  standalone: false,
  selector: 'gcb-datatable',
  templateUrl: './bootstrap-datatable.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./bootstrap-datatable.component.css']
})
export class BootstrapDatatableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Output() columnClick = new EventEmitter<any>();

  loading = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.data && !changes.columns) {
      return;
    }

    this.loading = true;
    if (!this.columns || this.columns.length < 1) {
      this.setDynamicColumns();
    }
    this.loading = false;
  }

  onColumnClick(event: Event, column: any, value: any): void {
    this.columnClick.emit({ event, column, value });
  }

  interpolate(htmlString: string, value: any, key: string): string {
    return (htmlString || '')
      .replace(/{{value}}/g, String(value ?? ''))
      .replace(/{{key}}/g, key || '');
  }

  nestedValue(item: any, key: string): any {
    if (!item || !key) {
      return '';
    }

    return key.split('.').reduce((result, segment) => (result ? result[segment] : undefined), item) ?? '';
  }

  private setDynamicColumns(): void {
    this.columns = [];
    if (this.data && this.data.length > 0) {
      Object.keys(this.data[0] || {}).forEach((element: string) => {
        this.columns.push({
          columnName: element,
          key: element,
          sort: false,
          cellTemplate: null,
          headTemplate: null,
          onClick: null
        });
      });
    }
  }
}
