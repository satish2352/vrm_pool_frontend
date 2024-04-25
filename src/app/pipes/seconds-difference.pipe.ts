import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsDifference'
})
export class SecondsDifferencePipe implements PipeTransform {

  transform(durationString: string): string {
    const durationParts = durationString.split(',').map(part => part.trim());

    let totalSeconds = 0;

    durationParts.forEach(part => {
      if (part.includes('Days')) {
        const days = Number(part.split(' ')[0]);
        totalSeconds += days * 24 * 60 * 60;
      } else if (part.includes('Hours')) {
        const hours = Number(part.split(' ')[0]);
        totalSeconds += hours * 60 * 60;
      } else if (part.includes('Minutes')) {
        const minutes = Number(part.split(' ')[0]);
        totalSeconds += minutes * 60;
      } else if (part.includes('Seconds')) {
        const seconds = Number(part.split(' ')[0]);
        totalSeconds += seconds;
      }
    });

    const differenceSeconds = 3600 - totalSeconds;
    const differenceMinutes = Math.floor(differenceSeconds / 60);
    const remainingSeconds = differenceSeconds % 60;

    return `${differenceMinutes} minutes ${remainingSeconds} seconds`;
  }

}
