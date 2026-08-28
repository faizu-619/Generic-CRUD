import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { CustomControlProbeComponent } from '../custom-control-probe/custom-control-probe.component';
import { CustomControlBugBase } from '../custom-control-bug/custom-control-bug.base';

/**
 * Reproduction harness for the "custom control never receives value updates" bug — Bootstrap UI.
 * Renders the same controls as the default page through BootstrapDynamicControlComponent, so the
 * bootstrap copies of the custom filter and the date controls are exercised too.
 */
@Component({
  standalone: false,
  selector: 'app-custom-control-bug-bootstrap',
  templateUrl: './custom-control-bug-bootstrap.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./custom-control-bug-bootstrap.component.css']
})
export class CustomControlBugBootstrapComponent extends CustomControlBugBase {
  readonly themeName = 'Bootstrap UI';

  protected get probeComponent(): Type<any> {
    return CustomControlProbeComponent;
  }
}
