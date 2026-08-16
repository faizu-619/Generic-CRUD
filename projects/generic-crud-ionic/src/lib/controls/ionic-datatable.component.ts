import { Component, EventEmitter, Input, OnChanges, Output, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { buildDynamicColumnsFromData, interpolateTemplate, resolveNestedValue, shouldBuildDynamicColumns } from 'Generic-CRUD';

@Component({
  standalone: false,
  selector: 'gci-datatable',
  templateUrl: './ionic-datatable.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./ionic-datatable.component.css']
})
export class IonicDatatableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Output() columnClick = new EventEmitter<any>();

  loading = false;

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

  onColumnClick(event: Event, column: any, value: any): void {
    this.columnClick.emit({ event, column, value });
  }

  interpolate(htmlString: string, value: any, key: string): string {
    return interpolateTemplate(htmlString, value, key);
  }

  nestedValue(item: any, key: string): any {
    return resolveNestedValue(item, key);
  }
}
