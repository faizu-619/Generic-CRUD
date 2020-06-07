import { Pipe, PipeTransform, Injector } from '@angular/core';

@Pipe({
  name: 'dynamic'
})
export class DynamicPipe implements PipeTransform {

  public constructor(private injector: Injector) {
  }

  transform(value: any, pipeToken: any, pipeArgs: any[]): any {
    if (!pipeToken) {
      return value;
    } else {
      const pipe = this.injector.get(pipeToken);
      if (pipe) {
        return pipe.transform(value, ...pipeArgs);
      }
      return value;
    }
  }

}
