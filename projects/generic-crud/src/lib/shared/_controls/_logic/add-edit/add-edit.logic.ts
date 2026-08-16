import { ButtonModel, ButtonType } from '../../_models/button.model';

export interface AddEditModeState {
  id: number;
  isEditMode: boolean;
  title: string;
}

export class AddEditLogic {
  createDefaultActions(): ButtonModel<string>[] {
    return [
      {
        hrefLink: '',
        key: 'btnSubmit',
        label: 'Save',
        order: 0,
        buttonType: ButtonType.Submit,
        isDisabled: false,
        customClass: 'btn btn-primary'
      },
      {
        hrefLink: '',
        key: 'btnReset',
        label: 'Reset',
        order: 0,
        buttonType: ButtonType.Reset,
        isDisabled: false,
        customClass: 'btn btn-default'
      }
    ];
  }

  resolveModeState(idParam: any, title: string): AddEditModeState {
    const id = Number(idParam || '0');
    const isEditMode = id > 0;

    return {
      id,
      isEditMode,
      title: `${isEditMode ? 'Edit' : 'New'} ${title}`
    };
  }

  mapModelFromRouteData(data: any): any {
    if (data && data[0]) {
      return Object.assign({}, data[0]);
    }

    return null;
  }

  shouldPatchForm(result: any, hasFormComponent: boolean): boolean {
    return !!result && hasFormComponent;
  }

  getErrorRoute(): string[] {
    return ['/error'];
  }

  getBackRoute(tableName: string, routePath?: string): string[] {
    const prefix = (routePath || '')
      .split('/')
      .filter(segment => segment && segment !== 'add' && segment !== 'edit' && segment !== ':modelName' && segment !== ':id');

    return ['/', ...prefix, 'list', tableName];
  }
}
