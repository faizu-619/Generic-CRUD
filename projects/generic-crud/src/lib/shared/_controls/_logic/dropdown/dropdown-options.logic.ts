export interface DropdownOption {
  key: string;
  value: string;
}

export class DropdownOptionsLogic {
  mapOptions(result: any[], remoteKey: string, remoteValue: string): DropdownOption[] {
    if (!Array.isArray(result)) {
      return [];
    }

    return result.map(item => ({
      key: item?.[remoteKey] || '',
      value: item?.[remoteValue] || ''
    }));
  }
}