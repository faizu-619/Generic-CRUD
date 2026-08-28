import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BASE_URL, GENERIC_CONFIG, GenericCRUDModule, LayoutStyle } from 'Generic-CRUD';

import { CustomControlBugIonicComponent } from './custom-control-bug-ionic.component';
import { CustomControlProbeComponent } from '../custom-control-probe/custom-control-probe.component';
import { CustomControlProbeIonicComponent } from '../custom-control-probe-ionic/custom-control-probe-ionic.component';
import { GenericCrudIonicModule } from '../../../projects/generic-crud-ionic/src/lib/generic-crud-ionic.module';

describe('CustomControlBugIonicComponent (Ionic UI reproduction page)', () => {
  let fixture: ComponentFixture<CustomControlBugIonicComponent>;
  let component: CustomControlBugIonicComponent;

  function probes(): CustomControlProbeIonicComponent[] {
    return fixture.debugElement
      .queryAll(By.directive(CustomControlProbeIonicComponent))
      .map(de => de.componentInstance);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        IonicModule.forRoot(), GenericCRUDModule.forRoot({ style: LayoutStyle.Bootstrap }),
        GenericCrudIonicModule
      ],
      declarations: [CustomControlBugIonicComponent, CustomControlProbeComponent, CustomControlProbeIonicComponent],
      providers: [
        { provide: GENERIC_CONFIG, useValue: { style: LayoutStyle.Bootstrap } },
        { provide: BASE_URL, useValue: 'http://localhost/api' },
        { provide: 'BASE_URL', useValue: 'http://localhost/api' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomControlBugIonicComponent);
    component = fixture.componentInstance;
  });

  it('renders both custom controls', () => {
    fixture.detectChanges();
    expect(probes().length).toBe(2);
  });

  it('delivers the async-loaded record to every custom control', fakeAsync(() => {
    fixture.detectChanges();
    tick(400);
    fixture.detectChanges();

    const [colour, nickname] = probes();
    expect(colour.received).toBe('teal');
    expect(nickname.received).toBe('The Analyst');
    expect(component.loaded).toBeTrue();
  }));

  it('renders the loaded value in the control markup, not just its state', fakeAsync(() => {
    fixture.detectChanges();
    tick(400);
    fixture.detectChanges();

    const inputs = fixture.debugElement
      .queryAll(By.directive(CustomControlProbeIonicComponent))
      .map(de => de.query(By.css('ion-input')).nativeElement.value);

    expect(inputs).toContain('teal');
    expect(inputs).toContain('The Analyst');
  }));

  it('forwards a later patchValue', fakeAsync(() => {
    fixture.detectChanges();
    tick(400);
    fixture.detectChanges();

    component.patchAgain();
    fixture.detectChanges();

    expect(probes()[0].received).toBe('magenta');
  }));

  it('forwards reset', fakeAsync(() => {
    fixture.detectChanges();
    tick(400);
    fixture.detectChanges();

    component.resetForm();
    fixture.detectChanges();

    expect(probes()[0].received).toBeNull();
  }));

  it('forwards the disabled state', fakeAsync(() => {
    fixture.detectChanges();
    tick(400);
    fixture.detectChanges();

    component.toggleDisabled();
    fixture.detectChanges();

    expect(probes()[0].disabled).toBeTrue();
  }));
});
