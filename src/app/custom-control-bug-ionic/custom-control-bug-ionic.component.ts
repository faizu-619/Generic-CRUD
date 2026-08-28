import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { CustomControlProbeIonicComponent } from '../custom-control-probe-ionic/custom-control-probe-ionic.component';
import { CustomControlBugBase } from '../custom-control-bug/custom-control-bug.base';

/**
 * Reproduction harness for the "custom control never receives value updates" bug — Ionic UI.
 * Renders the same controls as the default page through IonicDynamicControlComponent, so the
 * ionic copies of the custom filter and the date controls are exercised too.
 */
@Component({
  standalone: false,
  selector: 'app-custom-control-bug-ionic',
  templateUrl: './custom-control-bug-ionic.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./custom-control-bug-ionic.component.css']
})
export class CustomControlBugIonicComponent extends CustomControlBugBase {
  readonly themeName = 'Ionic UI';

  protected get probeComponent(): Type<any> {
    return CustomControlProbeIonicComponent;
  }
}
