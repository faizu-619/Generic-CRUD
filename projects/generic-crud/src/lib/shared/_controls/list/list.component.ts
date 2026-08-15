import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GenericModel } from '../_models/generic.model';
import { GenericService } from '../../_service/generic.service';
import { IColumnClickParams } from '../_models/datatable.model';
import { GENERIC_CONFIG } from '../../interfaces/generic-config.interface';
import { ListActionLogic, ListActionType } from '../_logic';

@Component({
  selector: 'gc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public listData: any[];
  modelType: GenericModel;
  private readonly listActionLogic = new ListActionLogic();

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
    const action = this.listActionLogic.resolveAction(event.column && event.column.columnName, event.value);

    if (action.type === ListActionType.Download) {
      // this.downloadCertificate(Number(event.value));
    } else if (action.type === ListActionType.Remove && action.id !== null) {
      this.delete(action.id);
    } else if (action.type === ListActionType.Edit) {
      this.router.navigate(['edit', this.modelType.tableName, action.rawValue]);
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
