import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  ControlType,
  DynamicControlLogic,
  DynamicControlService,
  FilterBase,
  RemoteDataService
} from 'Generic-CRUD';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'gci-dynamic-control',
  templateUrl: './ionic-dynamic-control.component.html',
  styleUrls: ['./ionic-dynamic-control.component.css']
})
export class IonicDynamicControlComponent {
  @Input() form: FormGroup;
  @Input() dataType: any;
  @Input() parentFormSubmitted: any;
  @Input() isRenderedAsParameter = false;
  @Input() param: any;
  @Input() controlObject: FilterBase<any>;

  control: FilterBase<any>;
  options$: Observable<any[]>;

  readonly ControlType = ControlType;
  private readonly dynamicControlLogic = new DynamicControlLogic();

  constructor(
    private readonly fcs: DynamicControlService,
    private readonly remote: RemoteDataService
  ) {}

  ngOnInit(): void {
    const resolved = this.dynamicControlLogic.resolveInitialControl(
      {
        isRenderedAsParameter: this.isRenderedAsParameter,
        param: this.param,
        dataType: this.dataType,
        controlObject: this.controlObject
      },
      this.fcs.fromParameterType.bind(this.fcs),
      this.fcs.fromDataType.bind(this.fcs)
    );

    this.control = resolved.control;
    if (resolved.shouldSetControl) {
      this.setControl(this.control);
      this.onChanges();
    }
  }

  get isValid(): boolean {
    return this.dynamicControlLogic.isValid(
      this.parentFormSubmitted,
      this.form.controls[this.control.key].valid
    );
  }

  get hasValue(): boolean {
    const currentControl = this.form.controls[this.control.key];
    if (!currentControl) {
      return true;
    }

    return this.dynamicControlLogic.hasValue(
      currentControl.value,
      this.control.controlType,
      currentControl.valid
    );
  }

  private setControl(ctrl: FilterBase<any>, param?: any): void {
    this.control = ctrl;

    if (this.dynamicControlLogic.canLoadRemote(ctrl)) {
      const handleResult = (result: any) => {
        if (this.dynamicControlLogic.shouldUpdateRemoteControlData(result)) {
          this.remote.updateDataToControl(result);
        }
      };

      const sourceType = this.dynamicControlLogic.resolveRemoteSourceType(ctrl.remoteUrl);
      if (sourceType === 'url') {
        this.remote.getRemoteData(ctrl.remoteUrl, param).subscribe(handleResult);
      } else if (sourceType === 'observable') {
        (ctrl.remoteUrl as Observable<any>).pipe(delay(1000)).subscribe(handleResult);
      }
    }
  }

  private onChanges(): void {
    if (this.dynamicControlLogic.shouldSubscribeToOnChange(this.control)) {
      this.form.get(this.control.onChangeKey).valueChanges.subscribe(val => {
        this.setControl(this.control, val);
      });
    }
  }
}
