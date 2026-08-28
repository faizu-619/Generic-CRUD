import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BASE_URL, DateOfBirthComponent, GENERIC_CONFIG, GenericCRUDModule, LayoutStyle, RangeDateComponent } from 'Generic-CRUD';

import { CustomControlBugComponent } from './custom-control-bug.component';
import { CustomControlProbeComponent } from '../custom-control-probe/custom-control-probe.component';

describe('CustomControlBugComponent (demo reproduction page)', () => {
  let fixture: ComponentFixture<CustomControlBugComponent>;
  let component: CustomControlBugComponent;

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
        GenericCRUDModule.forRoot({ style: LayoutStyle.Bootstrap })
      ],
      declarations: [CustomControlBugComponent, CustomControlProbeComponent],
      providers: [
        { provide: GENERIC_CONFIG, useValue: { style: LayoutStyle.Bootstrap } },
        { provide: BASE_URL, useValue: 'http://localhost/api' },
        { provide: 'BASE_URL', useValue: 'http://localhost/api' }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomControlBugComponent);
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

  it('renders the loaded date of birth in its selects', fakeAsync(() => {
    fixture.detectChanges();
    tick(400);
    fixture.detectChanges();
    // ngModel applies its write in a microtask, so the selects settle one turn later.
    tick();
    fixture.detectChanges();

    const selects = fixture.debugElement
      .query(By.directive(DateOfBirthComponent))
      .queryAll(By.css('select'))
      .map(de => de.nativeElement.value);

    expect(selects).toEqual(['5', '17', '1990']);
  }));

  it('renders the loaded date range', fakeAsync(() => {
    fixture.detectChanges();
    tick(400);
    fixture.detectChanges();

    const range: RangeDateComponent = fixture.debugElement
      .query(By.directive(RangeDateComponent)).componentInstance;
    const shown = fixture.debugElement
      .query(By.directive(RangeDateComponent))
      .query(By.css('input')).nativeElement.value;

    expect(range.selectedRange.startDate).toEqual(new Date('2024-01-10'));
    expect(shown).toBe(range.getDisplayValue());
    expect(shown).toContain('2024');
  }));
});
