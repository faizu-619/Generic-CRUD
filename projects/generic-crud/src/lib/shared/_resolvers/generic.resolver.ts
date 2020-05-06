import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {
  FilterTextbox, ControlType, FilterSingleDate, FilterRangeDate,
  FilterDropdown, FilterCheckbox, FilterBase, GenericModel
} from '../_controls/_models';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { GenericService } from '../_service/generic.service';
import { Observable } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class GenericResolver implements Resolve<GenericModel> {

  constructor(private service: GenericService<GenericModel>) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.getSchema(route.paramMap.get('modelName')).pipe(catchError(error => {
      return error;
    }), map((result) => {
      console.log(result);
      if (result && result.controls) {
        const model = new GenericModel();
        model.tableName = result.tableName || '';
        model.title = result.tableName || '';
        model.listColumns = result.listColumns || '';
        model.controls = [];
        for (const key in result.controls) {
          if (result.controls.hasOwnProperty(key)) {
            const element = result.controls[key];
            switch (element.controlType as ControlType) {
              case ControlType.Number:
              case ControlType.TextBox:
                model.controls.push(new FilterTextbox(element));
                break;
              case ControlType.SingleDate:
                model.controls.push(new FilterSingleDate(element));
                break;
              case ControlType.RangeDate:
                model.controls.push(new FilterRangeDate(element));
                break;
              case ControlType.Dropdown:
                model.controls.push(new FilterDropdown(element));
                break;
              case ControlType.CheckBox:
                model.controls.push(new FilterCheckbox(element));
                break;
              default:
                model.controls.push(new FilterBase(element));
                break;
            }
          }
        }
        return model;
      }
      return new GenericModel();
    }));
  }
}
