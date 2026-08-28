import { Component, OnInit, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GenericModel } from '../_models/generic.model';
import { GenericService } from '../../_service/generic.service';
import { IColumnClickParams } from '../_models/datatable.model';
import { GENERIC_CONFIG } from '../../interfaces/generic-config.interface';
import { buildListRouteCommands, extractResolvedModel, ListActionLogic, ListActionType } from '../_logic';

@Component({
  standalone: false,
  selector: 'gc-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
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
    private cdr: ChangeDetectorRef,
    @Inject(GENERIC_CONFIG) private globalConfig
  ) {
    this.route.data.subscribe((data: any) => {
      const resolvedModel = extractResolvedModel(data);
      if (resolvedModel) {
        this.modelType = Object.assign({}, resolvedModel);
        this.loadData();
      } else {
        this.listData = [];
        this.cdr.markForCheck();
      }
    });
  }

  ngOnInit() {
    if (this.modelType?.tableName) {
      this.loadData();
    }
  }

  loadData(): void {
    if (!this.modelType || !this.modelType.tableName) {
      this.listData = [];
      return;
    }

    this.defaultService.getAll(this.modelType.tableName)
      .subscribe(result => {
        this.listData = result;
        this.cdr.markForCheck();
      }, error => {
        this.listData = [];
        this.cdr.markForCheck();
      });
  }

  columnClickHandler(event: IColumnClickParams): void {
    const action = this.listActionLogic.resolveAction(event.column && event.column.columnName, event.value);

    if (action.type === ListActionType.Download) {
      // this.downloadCertificate(Number(event.value));
    } else if (action.type === ListActionType.Remove && action.id !== null) {
      this.delete(action.id);
    } else if (action.type === ListActionType.Edit) {
      this.router.navigate(buildListRouteCommands(this.route.snapshot.routeConfig?.path, 'edit', this.modelType.tableName, action.rawValue));
    }
  }

  addNewHandler() {
    this.router.navigate(buildListRouteCommands(this.route.snapshot.routeConfig?.path, 'add', this.modelType.tableName));
  }

  delete(id: number): void {
    this.defaultService.delete(this.modelType.tableName, id)
      .subscribe(result => {
        this.loadData();
      }, error => {
      });
  }

}
