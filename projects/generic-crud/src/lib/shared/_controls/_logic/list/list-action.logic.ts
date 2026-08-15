export enum ListActionType {
  None = 'none',
  Download = 'download',
  Remove = 'remove',
  Edit = 'edit'
}

export interface ListActionResult {
  type: ListActionType;
  rawValue: any;
  id: number | null;
}

export class ListActionLogic {
  resolveAction(columnName: string | undefined, value: any): ListActionResult {
    if (!columnName) {
      return { type: ListActionType.None, rawValue: value, id: this.toNumber(value) };
    }

    if (columnName === 'Download') {
      return { type: ListActionType.Download, rawValue: value, id: this.toNumber(value) };
    }

    if (columnName === 'Remove') {
      return { type: ListActionType.Remove, rawValue: value, id: this.toNumber(value) };
    }

    if (columnName === 'Edit') {
      return { type: ListActionType.Edit, rawValue: value, id: this.toNumber(value) };
    }

    return { type: ListActionType.None, rawValue: value, id: this.toNumber(value) };
  }

  private toNumber(value: any): number | null {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }
}