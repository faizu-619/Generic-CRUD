import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  buildListRouteCommands,
  GENERIC_CONFIG,
  GenericModel,
  GenericService,
  ListActionLogic,
  ListActionType
} from 'Generic-CRUD';

@Component({
  selector: 'gcb-list',
  templateUrl: './bootstrap-list.component.html',
  styleUrls: ['./bootstrap-list.component.css']
})
export class BootstrapListComponent implements OnInit {
  public listData: any[];
  modelType: GenericModel;
  private readonly listActionLogic = new ListActionLogic();

  constructor(
    private readonly defaultService: GenericService<GenericModel>,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    @Inject(GENERIC_CONFIG) private readonly globalConfig: any
  ) {
    this.route.data.subscribe((data: any) => {
      if (data && data[0]) {
        this.modelType = Object.assign({}, data[0]);
        this.loadData();
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    if (!this.modelType?.tableName) {
      return;
    }

    this.defaultService.getAll(this.modelType.tableName).subscribe(
      result => {
        this.listData = result;
      },
      () => {
        this.listData = [];
      }
    );
  }

  columnClickHandler(event: any): void {
    const action = this.listActionLogic.resolveAction(event.column && event.column.columnName, event.value);
    if (action.type === ListActionType.Download) {
      return;
    }

    if (action.type === ListActionType.Remove && action.id !== null) {
      this.delete(action.id);
      return;
    }

    if (action.type === ListActionType.Edit) {
      this.router.navigate(buildListRouteCommands(this.route.snapshot.routeConfig?.path, 'edit', this.modelType.tableName, action.rawValue));
    }
  }

  addNewHandler(): void {
    this.router.navigate(buildListRouteCommands(this.route.snapshot.routeConfig?.path, 'add', this.modelType.tableName));
  }

  delete(id: number): void {
    this.defaultService.delete(this.modelType.tableName, id).subscribe(() => {
      this.loadData();
    });
  }
}
