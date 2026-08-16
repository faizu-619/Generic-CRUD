import { IDatatableColumn } from '../../_models/datatable.model';

export function shouldBuildDynamicColumns(columns: IDatatableColumn[] | null | undefined): boolean {
  return !columns || columns.length < 1;
}

export function buildDynamicColumnsFromData(data: any[]): IDatatableColumn[] {
  if (!data || data.length < 1) {
    return [];
  }

  return Object.keys(data[0] || {}).map((element: string) => ({
    columnName: element,
    key: element,
    sort: false,
    cellTemplate: null,
    headTemplate: null,
    onClick: null
  }));
}

export function interpolateTemplate(htmlString: string, value: any, key: string): string {
  return (htmlString || '')
    .replace(/{{value}}/g, String(value ?? ''))
    .replace(/{{key}}/g, key || '');
}

export function resolveNestedValue(item: any, key: string): any {
  if (!item || !key) {
    return '';
  }

  return key
    .split('.')
    .reduce((result, segment) => (result ? result[segment] : undefined), item) ?? '';
}
