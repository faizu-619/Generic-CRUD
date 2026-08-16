import { Pipe, PipeTransform, Injector } from '@angular/core';

@Pipe({
  standalone: false,
  name: 'dynamic'
})
export class DynamicPipe implements PipeTransform {

  public constructor(private injector: Injector) {
  }

  transform(value: any, pipeToken: any, pipeArgs: any[]): any {
    if (!pipeToken) {
      return value;
    } else {
      const pipe = this.injector.get(pipeToken) as PipeTransform | null;
      if (pipe) {
        return pipe.transform(value, ...pipeArgs);
      }
      return value;
    }
  }

}
