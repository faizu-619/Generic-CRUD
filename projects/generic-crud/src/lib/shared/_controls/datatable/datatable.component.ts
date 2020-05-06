import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { IDatatableColumn, IColumnClickParams } from '../_models/datatable.model';

@Component({
  selector: 'lib-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  @Input() data = [];
  @Input() columns: IDatatableColumn[] = [];

  @Output() columnClick = new EventEmitter<IColumnClickParams>();

  // Show loading overlay
  loading = false;

  constructor() { }

  ngOnInit() {
    this.loading = true;
    if (!this.columns || this.columns.length < 1) {
      this.setDynamicColumns();
    }

    this.loading = false;
  }


  setDynamicColumns() {
    this.columns = [];
    Object.keys(this.data[0] || []).forEach(element => {
      this.columns.push({
        columnName: element, key: element, sort: false,
        cellTemplate: null, headTemplate: null, onClick: null
      });
    });
  }

  onRowClick(event: any): void {
    // console.log(event);
  }

  onColumnClick(event: any, column: any, value: any): void {
    // console.log(event);
    this.columnClick.emit({ event: event, column: column, value: value });
  }

  interpolate(htmlString: string, value: string, key: string): string {
    htmlString = _.replace(htmlString, RegExp('{{value}}', 'g'), value);
    htmlString = _.replace(htmlString, RegExp('{{key}}', 'g'), key);
    return htmlString || '';
  }

}
