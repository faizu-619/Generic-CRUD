import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GenericModel } from '../_models/generic.model';
import { GenericService } from '../../_service/generic.service';
import { IColumnClickParams } from '../_models/datatable.model';
import { GENERIC_CONFIG } from '../../interfaces/generic-config.interface';

@Component({
  selector: 'lib-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public listData: any[];
  modelType: GenericModel;

  constructor(
    private defaultService: GenericService<GenericModel>,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(GENERIC_CONFIG) private globalConfig
  ) {
    this.route.data.subscribe((data: any) => {
      if (data && data[0]) {
        this.modelType = Object.assign({}, data[0]);
        this.loadData();
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.defaultService.getAll(this.modelType.tableName)
      .subscribe(result => {
        this.listData = result;
      }, error => {
        this.listData = [];
      });
  }

  columnClickHandler(event: IColumnClickParams): void {
    // console.log(event);
    if (event.column && event.column.columnName === 'Download') {
      // this.downloadCertificate(Number(event.value));
    } else if (event.column && event.column.columnName === 'Remove') {
      this.delete(Number(event.value));
    } else if (event.column && event.column.columnName === 'Edit') {
      this.router.navigate(['edit', this.modelType.tableName, event.value]);
    }
  }

  addNewHandler() {
    this.router.navigate(['add', this.modelType.tableName]);
  }

  delete(id: number): void {
    this.defaultService.delete(this.modelType.tableName, id)
      .subscribe(result => {
        this.loadData();
      }, error => {
      });
  }

}
