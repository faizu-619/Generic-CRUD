import { AsyncValidator, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';

import { RemoteDataService } from '../_services/remote-data.service';
import { FilterBase } from 'Generic-CRUD/lib/shared/_controls/_models';
import { isBoolean, isNullOrUndefined, isObject, isArray } from 'util';
import { Injectable, Injector } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class ServerSideValidator implements AsyncValidator {
  // constructor(private remoteDataService: RemoteDataService) {}
  constructor(private injectorService: Injector) {}

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const remoteDataService = this.injectorService.get(RemoteDataService);
    return remoteDataService.getRemoteData(`/Users?username=${ctrl.value}`).pipe(
      map(isTaken => (isTaken ? { exists: true } : null)),
      catchError(() => of(null))
    );
  }
}


// export function ServerSideValidator(service: RemoteDataService, ctrlObject: FilterBase<any>): AsyncValidatorFn {
//     return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
//         if (ctrlObject.remoteValidation.mode === 'post') {
//             const params = {};
//             for (const paramKey of ctrlObject.remoteValidation.paramKeys) {
//                 const frmCtrl = control.root.get(paramKey);
//                 params[paramKey] = frmCtrl && frmCtrl.value ? frmCtrl.value : null;
//             }
//             return service.postRemoteData(ctrlObject.remoteValidation.remoteUrl, null, params)
//                 .pipe(
//                     map((result: any[]) => !isNullOrUndefined(result)
//                         || (isBoolean(result) && result)
//                         ? { exists: true } : null),
//                     catchError(() => of(null))
//                 );
//         } else {
//             let params = '?';
//             for (const paramKey of ctrlObject.remoteValidation.paramKeys) {
//                 const frmCtrl = control.root.get(paramKey);
//                 params += `${paramKey}=${(frmCtrl && frmCtrl.value ? frmCtrl.value : null)}`;
//             }
//             return service.getRemoteData(ctrlObject.remoteValidation.remoteUrl, null, params)
//                 .pipe(
//                     map((result: any[]) => !isNullOrUndefined(result)
//                         || (isBoolean(result) && result)
//                         ? { exists: true } : null),
//                     catchError(() => of(null))
//                 );
//         }
//     };
// }
