import { Subject, BehaviorSubject, Observable } from 'rxjs';

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
    remoteUrl: string | Observable<any> | any;
    remoteKey: string;
    remoteValue: string;
    customClass: Subject<string>;
    minLength: number;
    maxLength: number;
    validationRegex: string;
    validationRegexMessage: string;
    compareWith: string;
    remoteValidation: { remoteUrl: string | Observable<any> | any, paramKeys: string[], mode: string }; // mode = [post, get]

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
        remoteUrl?: string | Observable<any>,
        remoteKey?: string,
        remoteValue?: string,
        customClass?: Subject<string>,
        minLength?: number,
        maxLength?: number,
        validationRegex?: string,
        validationRegexMessage?: string,
        compareWith?: string,
        remoteValidation?: { remoteUrl: string, paramKeys: string[], mode: string }
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
        this.customClass = options.customClass || new BehaviorSubject('');
        this.minLength = options.minLength || 0;
        this.maxLength = options.maxLength || 0;
        this.validationRegex = options.validationRegex || '';
        this.validationRegexMessage = options.validationRegexMessage || '';
        this.compareWith = options.compareWith || '';
        this.remoteValidation = options.remoteValidation || null;
    }
}

export enum ControlType {
    TextBox = 1,
    Number = 2,
    SingleDate = 3,
    RangeDate = 4,
    Dropdown = 5,
    CheckBox = 6,
    TextArea = 7,
    DateOfBirth = 8,
    AutocompleteTextbox = 9
}
