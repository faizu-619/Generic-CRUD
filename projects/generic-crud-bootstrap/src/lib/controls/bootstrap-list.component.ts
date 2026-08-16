import { Component, Inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  buildListRouteCommands,
  extractResolvedModel,
  GENERIC_CONFIG,
  GenericModel,
  GenericService,
  ListActionLogic,
  ListActionType
} from 'Generic-CRUD';

@Component({
  standalone: false,
  selector: 'gcb-list',
  templateUrl: './bootstrap-list.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
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
    private readonly cdr: ChangeDetectorRef,
    @Inject(GENERIC_CONFIG) private readonly globalConfig: any
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

  ngOnInit(): void {
    if (this.modelType?.tableName) {
      this.loadData();
    }
  }

  loadData(): void {
    if (!this.modelType?.tableName) {
      return;
    }

    this.defaultService.getAll(this.modelType.tableName).subscribe(
      result => {
        this.listData = result;
        this.cdr.markForCheck();
      },
      () => {
        this.listData = [];
        this.cdr.markForCheck();
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
