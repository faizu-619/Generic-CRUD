import { FormGroup } from "@angular/forms";
import { FilterCustomControl } from "../_controls/_models/filter-custom-control";

export interface CustomComponent {
    control: FilterCustomControl;
    form: FormGroup;
}