import { FilterBase } from './filterBase';
import { IDatatableColumn } from './datatable.model';
import { ButtonModel } from './button.model';

export class GenericModel {
    // new(...args: any[]): T;
    public title: string;
    public tableName: string;
    public displayProp: string;
    public controls: FilterBase<any>[];
    public listColumns: IDatatableColumn[];
    public actionButtons: ButtonModel<any>[];
    protected OnInit: EventInit;
}
