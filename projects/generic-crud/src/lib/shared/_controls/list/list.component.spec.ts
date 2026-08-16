import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ListComponent } from './list.component';
import { GenericService } from '../../_service/generic.service';
import { GENERIC_CONFIG } from '../../interfaces/generic-config.interface';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers: [
        {
          provide: GenericService,
          useValue: {
            getAll: () => of([]),
            delete: () => of({})
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {}, routeConfig: { path: 'list/:modelName' } },
            paramMap: of(convertToParamMap({ modelName: 'Posts' })),
            data: of({ 0: { title: 'Posts', tableName: 'Posts', controls: [], listColumns: [], actionButtons: [] } })
          }
        },
        {
          provide: Router,
          useValue: { navigate: () => Promise.resolve(true) }
        },
        {
          provide: GENERIC_CONFIG,
          useValue: { style: 'Material' }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
