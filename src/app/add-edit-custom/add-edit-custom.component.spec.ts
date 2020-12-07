import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCustomComponent } from './add-edit-custom.component';

describe('AddEditCustomComponent', () => {
  let component: AddEditCustomComponent;
  let fixture: ComponentFixture<AddEditCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCustomComponent ]
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
