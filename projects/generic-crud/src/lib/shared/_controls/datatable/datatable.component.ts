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
import { buildDynamicColumnsFromData, interpolateTemplate, shouldBuildDynamicColumns } from '../_logic';

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

    if (shouldBuildDynamicColumns(this.columns)) {
      this.columns = buildDynamicColumnsFromData(this.data);
    }

    this.loading = false;
  }

  onRowClick(_event: any): void {
  }

  onColumnClick(event: any, column: any, value: any): void {
    this.columnClick.emit({ event: event, column: column, value: value });
  }

  interpolate(htmlString: string, value: any, key: string): string {
    return interpolateTemplate(htmlString, value, key);
  }

}
