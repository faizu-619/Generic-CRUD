import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-advance-datatable',
  templateUrl: './advance-datatable.component.html',
  styleUrls: ['./advance-datatable.component.scss']
})
export class AdvanceDatatableComponent implements OnInit {
  @Input() set data(values: any[]) {
    this.rows = [...values];
  }
  @Input() columns = [];
  @Output() columnClick = new EventEmitter<any>();
  @Input() set groupBy(value: any) {
    this._groupBy = value;
    if (this.rows) {
      this.rows = [...this.rows];
      if (this.table) {
        this.table.recalculate();
      }
    }
  }
  get groupBy() {
    return this._groupBy;
  }
  // Show loading overlay
  loading = false;
  private _groupBy: any;

  @ViewChild('myTable') table: any;
  funder = [];
  calculated = [];
  pending = [];
  groups = [];

  editing = {};
  rows = [];

  ColumnMode = ColumnMode;
  SortType = SortType;

  constructor() {
  }

  ngOnInit() {
    this.loading = true;
    if (!this.columns || this.columns.length < 1) {
      this.setDynamicColumns();
    }
    this.rows = [...this.rows];
    this.loading = false;
  }


  setDynamicColumns() {
    this.columns = [];
    Object.keys(this.rows[0] || []).forEach(element => {
      this.columns.push({
        columnName: element, key: element, sort: false,
        cellTemplate: null, headTemplate: null, onClick: null
      });
    });
  }

  onRowClick(event: any): void {
    console.log(event);
  }

  onColumnClick(event: any, column: any, value: any): void {
    console.log(event);
    this.columnClick.emit({ event: event, column: column, value: value });
  }

  interpolate(htmlString: string, value: string, key: string): string {
    htmlString = _.replace(htmlString, RegExp('{{value}}', 'g'), value);
    htmlString = _.replace(htmlString, RegExp('{{key}}', 'g'), key);
    return htmlString || '';
  }

  // -----------------------------------------------------------------------------------------


  getGroupRowHeight(group, rowHeight) {
    let style = {};

    style = {
      height: group.length * 40 + 'px',
      width: '100%'
    };

    return style;
  }

  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  toggleExpandGroup(group) {
    console.log('Toggled Expand Group!', group);
    this.table.groupHeader.toggleExpandGroup(group);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

}
