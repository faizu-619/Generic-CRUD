import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomComponent } from './add-edit-custom.component';
import { BASE_URL } from 'projects/generic-crud/src/lib/shared/_service/generic.service';

describe('AddEditCustomComponent', () => {
  let component: AddEditCustomComponent;
  let fixture: ComponentFixture<AddEditCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCustomComponent ],
      providers: [
        { provide: BASE_URL, useValue: '' },
        { provide: 'BASE_URL', useValue: '' }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
