export interface IDatatableColumn {
    columnName: string;
    key: string;
    sort: boolean;
    onClick: boolean;
    cellTemplate: string;
    headTemplate: string;
}

export interface IColumnClickParams {
    event: any;
    column: IDatatableColumn;
    value: boolean;
}
