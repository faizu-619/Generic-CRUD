import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { AddEditComponent } from './add-edit.component';
import { GenericService } from '../../_service/generic.service';

describe('AddEditComponent', () => {
  let component: AddEditComponent;
  let fixture: ComponentFixture<AddEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditComponent ],
      providers: [
        {
          provide: GenericService,
          useValue: {
            save: () => of({}),
            get: () => of({}),
            updateModel: () => {}
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: undefined }, routeConfig: { path: 'add/:modelName' } },
            paramMap: of(convertToParamMap({ modelName: 'Posts' })),
            data: of({ 0: { title: 'Posts', tableName: 'Posts', controls: [], actionButtons: [] } })
          }
        },
        {
          provide: Router,
          useValue: { navigate: () => Promise.resolve(true) }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
