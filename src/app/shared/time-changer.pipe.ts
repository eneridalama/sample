import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeChanger'
})
export class TimeChangerPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let hourtime = 0;

    if (value > 60) {
      let hours = Math.floor(value / 60);
      let minutes = Math.floor(value % 60);
      if (minutes == 0) {
        return hours + ' hrs ';
      }
      if (hours <= 1){
        return hours + ' hr ' + minutes + ' mins';
      }
      return hours + ' hrs ' + minutes + ' mins';
    } else return value + ' mins';
  }

}
