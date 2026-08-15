import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';
import {ControlType, FilterBase} from '../_models';
import {DynamicControlService} from '../_services/filter-control.service';
import {RemoteDataService} from '../_services/remote-data.service';
import {DynamicControlLogic} from '../_logic';

@Component({
  selector: 'gc-dynamic-control',
  templateUrl: './dynamic-control.component.html',
  styleUrls: ['./dynamic-control.component.css'],
  providers: [RemoteDataService]
})
export class DynamicControlComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() dataType: any;
  @Input() parentFormSubmitted: any;
  @Input() isRenderedAsParameter = false;
  @Input() param: any;
  @Input() controlObject: FilterBase<any>;

  control: FilterBase<any>;
  options$: Observable<any[]>;
  private readonly dynamicControlLogic = new DynamicControlLogic();

  constructor(
    private fcs: DynamicControlService,
    private remote: RemoteDataService,
  ) {
  }

  ngOnInit() {
    const resolvedControl = this.dynamicControlLogic.resolveInitialControl(
      {
        isRenderedAsParameter: this.isRenderedAsParameter,
        param: this.param,
        dataType: this.dataType,
        controlObject: this.controlObject
      },
      this.fcs.fromParameterType.bind(this.fcs),
      this.fcs.fromDataType.bind(this.fcs)
    );

    this.control = resolvedControl.control;
    if (resolvedControl.shouldSetControl) {
      this.setControl(this.control);
      this.onChanges();
    }
  }

  searchOptions(value: string): void {
    const sourceType = this.dynamicControlLogic.resolveRemoteSourceType(this.control.remoteUrl);

    if (sourceType === 'url') {
      this.options$ = this.remote.getRemoteData(this.control.remoteUrl, value);
    } else if (sourceType === 'observable') {
      this.options$ = (this.control.remoteUrl as Observable<any>);
    }
  }

  private setControl(ctrl: FilterBase<any>, param?: any): void {
    this.control = ctrl;

    if (this.dynamicControlLogic.canLoadRemote(ctrl)) {
      const handleResult = (result) => {
        if (this.dynamicControlLogic.shouldUpdateRemoteControlData(result)) {
          this.remote.updateDataToControl(result);
        }
      };

      const handleError = (error) => {
        // Error handling can be implemented by the consumer
      };

      const sourceType = this.dynamicControlLogic.resolveRemoteSourceType(ctrl.remoteUrl);

      if (sourceType === 'url') {
        this.remote.getRemoteData(ctrl.remoteUrl, param)
          .subscribe(handleResult, handleError);

      } else if (sourceType === 'observable') {
        (ctrl.remoteUrl as Observable<any>)
          .pipe(delay(1000))
          .subscribe(handleResult, handleError);
      }
    }
  }

  onChanges(): void {
    if (this.dynamicControlLogic.shouldSubscribeToOnChange(this.control)) {
      this.form.get(this.control.onChangeKey).valueChanges.subscribe(val => {
        this.setControl(this.control, val);
      });
    }
  }

  public changeType(dataType: any) {
    this.control = this.fcs.fromDataType(dataType);
  }

  get isValid() {
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
}
