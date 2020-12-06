
// Implement Mask plugin value model https://www.npmjs.com/package/ngx-mask

export class ValueMaskModel {
    public mask: string;
    public prefix: string;
    public suffix: string;
    public dropSpecialCharacters: boolean;
    public showMaskTyped?: boolean;
    public clearIfNotMatch?: boolean;
    public validation?: boolean;
    public thousandSeparator?: string;
    public hiddenInput?: boolean;
    public specialCharacters?: string;

    constructor(value: {
        mask?: string,
        prefix?: string,
        suffix?: string,
        dropSpecialCharacters?: boolean,
        showMaskTyped?: boolean,
        clearIfNotMatch?: boolean,
        validation?: boolean,
        thousandSeparator?: string,
        hiddenInput?: boolean,
        specialCharacters?: string,
    } = {}) {
        this.mask = value.mask;
        this.prefix = value.prefix || '';
        this.suffix = value.suffix || '';
        this.thousandSeparator = value.thousandSeparator || '';
        this.specialCharacters = value.specialCharacters || '';
        this.dropSpecialCharacters = value.dropSpecialCharacters || true;
        this.showMaskTyped = value.showMaskTyped || false;
        this.clearIfNotMatch = value.clearIfNotMatch || false;
        this.validation = value.validation || true;
        this.hiddenInput = value.hiddenInput || false;
    }
}
