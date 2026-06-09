import { ControlValueAccessor } from '@angular/forms';
import { FilterCustomControl } from '../_controls/_models';

export interface CustomComponent extends ControlValueAccessor {
  control: FilterCustomControl;
  valueChange?: (value: any) => void;
}
