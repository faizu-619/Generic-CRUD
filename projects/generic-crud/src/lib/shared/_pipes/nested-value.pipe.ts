import { PipeTransform, Pipe } from '@angular/core';
import * as _ from 'lodash';

@Pipe({ name: 'nested' })
export class NestedValuePipe implements PipeTransform {
    transform(obj: any, key: string): any {
      return _.get(obj, key);
    }
}
