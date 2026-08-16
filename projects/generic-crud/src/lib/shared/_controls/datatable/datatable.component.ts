import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  SimpleChanges
} from '@angular/core';
import { IDatatableColumn, IColumnClickParams } from '../_models/datatable.model';

@Component({
  standalone: false,
  selector: 'gc-datatable',
  templateUrl: './datatable.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() columns: IDatatableColumn[] = [];

  @Output() columnClick = new EventEmitter<IColumnClickParams>();

  // Show loading overlay
  loading = false;

  constructor() { }

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


  setDynamicColumns(): void {
    this.columns = [];
    if (this.data && this.data.length > 0) {
      Object.keys(this.data[0] || {}).forEach((element: string) => {
        this.columns.push({
          columnName: element, key: element, sort: false,
          cellTemplate: null, headTemplate: null, onClick: null
        });
      });
    }
  }

  onRowClick(_event: any): void {
  }

  onColumnClick(event: any, column: any, value: any): void {
    this.columnClick.emit({ event: event, column: column, value: value });
  }

  interpolate(htmlString: string, value: any, key: string): string {
    htmlString = (htmlString || '').replace(RegExp('{{value}}', 'g'), String(value ?? ''));
    htmlString = htmlString.replace(RegExp('{{key}}', 'g'), key);
    return htmlString || '';
  }

}
