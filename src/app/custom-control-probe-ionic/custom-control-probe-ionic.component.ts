import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CustomControlProbeComponent } from '../custom-control-probe/custom-control-probe.component';

/**
 * Ionic-flavoured version of the probe control. Behaviour is identical to
 * CustomControlProbeComponent — only the markup differs, so the Ionic page does not render
 * Bootstrap widgets inside an Ionic form.
 */
@Component({
  standalone: false,
  selector: 'app-custom-control-probe-ionic',
  templateUrl: './custom-control-probe-ionic.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: ['./custom-control-probe-ionic.component.css']
})
export class CustomControlProbeIonicComponent extends CustomControlProbeComponent {
  onIonInput(value: string | null | undefined): void {
    this.received = value ?? '';
    this.emit(this.received);
  }
}
