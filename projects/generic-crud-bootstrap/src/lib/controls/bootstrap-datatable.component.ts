import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'gcb-datatable',
  templateUrl: './bootstrap-datatable.component.html',
  styleUrls: ['./bootstrap-datatable.component.css']
})
export class BootstrapDatatableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Output() columnClick = new EventEmitter<any>();

  loading = false;

  ngOnInit(): void {
    this.loading = true;
    if (!this.columns || this.columns.length < 1) {
      this.setDynamicColumns();
    }
    this.loading = false;
  }

  onColumnClick(event: Event, column: any, value: any): void {
    this.columnClick.emit({ event, column, value });
  }

  interpolate(htmlString: string, value: string, key: string): string {
    return (htmlString || '')
      .replace(/{{value}}/g, value || '')
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
