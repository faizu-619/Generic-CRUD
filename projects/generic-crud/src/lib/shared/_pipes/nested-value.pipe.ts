import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'nested' })
export class NestedValuePipe implements PipeTransform {
    transform(obj: any, key: string): any {
      if (!obj || !key) {
        return undefined;
      }

      return key.split('.').reduce((current, segment) => {
        if (current === null || current === undefined) {
          return undefined;
        }

        return current[segment];
      }, obj);
    }
}
