import { FilterBase } from "./filterBase";

export class StepperFormModel {
    form: FilterBase<any>[];
    allowBack: boolean;
    allowNext: boolean;
    allowSubmit: boolean;
    stepLabel: any;
    constructor(forms: {
        form?: FilterBase<any>[],
        allowBack?: boolean,
        allowNext?: boolean,
        allowSubmit?: boolean,
        stepLabel?: any,
    } = {}) {
        this.form = forms.form || [];
        this.allowBack = !!forms.allowBack;
        this.allowNext = !!forms.allowNext;
        this.allowSubmit = !forms.allowNext || !!forms.allowSubmit;
        this.stepLabel = null;
    }
}