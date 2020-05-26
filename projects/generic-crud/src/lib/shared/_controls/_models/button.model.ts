export class ButtonModel<T> {
    hrefLink: string;
    key: string;
    label: string;
    order: number;
    buttonType: ButtonType;
    isDisabled: boolean;
    customClass: string;
    // onChangeKey: string;
    // isRemote: boolean;
    // remoteUrl: string;
    // remoteKey: string;
    // remoteValue: string;

    constructor(options: {
        hrefLink?: string;
        key?: string,
        label?: string,
        order?: number,
        buttonType?: ButtonType,
        isDisabled?: boolean,
        customClass?: string,
        // onChangeKey?: string,
        // isRemote?: boolean,
        // remoteUrl?: string,
        // remoteKey?: string,
        // remoteValue?: string

    } = {}) {
        this.hrefLink = options.hrefLink || '';
        this.key = options.key || '';
        this.label = options.label || '';
        this.order = options.order === undefined ? 1 : options.order;
        this.buttonType = options.buttonType || ButtonType.Button;
        this.isDisabled = !!options.isDisabled;
        this.customClass = options.customClass || '';
        // this.onChangeKey = options.onChangeKey || '';
        // this.isRemote = !!options.isRemote;
        // this.remoteUrl = options.remoteUrl || '';
        // this.remoteKey = options.remoteKey || '';
        // this.remoteValue = options.remoteValue || '';
    }
}

export enum ButtonType {
    Anchor = 1,
    Button = 2,
    Submit = 3,
    Reset = 4,
    Back = 5
}
