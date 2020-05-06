export class FilterBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: ControlType;
    isDisabled: boolean;
    onChangeKey: string;
    isRemote: boolean;
    remoteUrl: string;
    remoteKey: string;
    remoteValue: string;

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: ControlType,
        isDisabled?: boolean,
        onChangeKey?: string,
        isRemote?: boolean,
        remoteUrl?: string,
        remoteKey?: string,
        remoteValue?: string

    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.required = !!options.required;
        this.order = options.order === undefined ? 1 : options.order;
        this.controlType = options.controlType || ControlType.TextBox;
        this.isDisabled = !!options.isDisabled;
        this.onChangeKey = options.onChangeKey || '';
        this.isRemote = !!options.isRemote;
        this.remoteUrl = options.remoteUrl || '';
        this.remoteKey = options.remoteKey || '';
        this.remoteValue = options.remoteValue || '';
    }
}

export enum ControlType {
    TextBox = 1,
    Number = 2,
    SingleDate = 3,
    RangeDate = 4,
    Dropdown = 5,
    CheckBox = 6,
    TextArea = 7
}
