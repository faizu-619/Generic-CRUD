import { ValidatorFn, AbstractControl } from '@angular/forms';

export function compareValidator(compareWith: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const controlToCompare = control.root.get(compareWith);
        return (controlToCompare && control.value === controlToCompare.value) ? null
            : { 'compare': { compareWith: compareWith, value: control.value } };
    };
}
