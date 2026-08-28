import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BASE_URL, GENERIC_CONFIG, GenericCRUDModule, LayoutStyle } from 'Generic-CRUD';

import { CustomControlBugBootstrapComponent } from './custom-control-bug-bootstrap.component';
import { CustomControlProbeComponent } from '../custom-control-probe/custom-control-probe.component';
import { GenericCrudBootstrapModule } from '../../../projects/generic-crud-bootstrap/src/lib/generic-crud-bootstrap.module';

describe('CustomControlBugBootstrapComponent (Bootstrap UI reproduction page)', () => {
  let fixture: ComponentFixture<CustomControlBugBootstrapComponent>;
  let component: CustomControlBugBootstrapComponent;

  function probes(): CustomControlProbeComponent[] {
    return fixture.debugElement
      .queryAll(By.directive(CustomControlProbeComponent))
      .map(de => de.componentInstance);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        GenericCRUDModule.forRoot({ style: LayoutStyle.Bootstrap }),
        GenericCrudBootstrapModule
      ],
      declarations: [CustomControlBugBootstrapComponent, CustomControlProbeComponent],
      providers: [
        { provide: GENERIC_CONFIG, useValue: { style: LayoutStyle.Bootstrap } },
        { provide: BASE_URL, useValue: 'http://localhost/api' },
        { provide: 'BASE_URL', useValue: 'http://localhost/api' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomControlBugBootstrapComponent);
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
      .queryAll(By.directive(CustomControlProbeComponent))
      .map(de => de.query(By.css('input')).nativeElement.value);

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
