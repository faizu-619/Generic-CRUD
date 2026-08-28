import { ChangeDetectionStrategy, Component, Type } from '@angular/core';
import { CustomControlProbeComponent } from '../custom-control-probe/custom-control-probe.component';
import { CustomControlBugBase } from './custom-control-bug.base';

/**
 * Reproduction harness for the "custom control never receives value updates" bug — default UI.
 *
 * The page mimics an edit screen: it renders the form first, then an async load resolves and
 * patches the record in. Before the fix the FormGroup held the record while every custom control
 * still rendered blank; the panel below shows both sides so the divergence is visible.
 */
@Component({
  standalone: false,
  selector: 'app-custom-control-bug',
  templateUrl: './custom-control-bug.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./custom-control-bug.component.css']
})
export class CustomControlBugComponent extends CustomControlBugBase {
  readonly themeName = 'Default UI';

  protected get probeComponent(): Type<any> {
    return CustomControlProbeComponent;
  }
}
