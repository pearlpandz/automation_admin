import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'AddPercentage' })
export class AddPercentagePipe implements PipeTransform {
    transform(value: string): any {
        if (value) {
            return value + '%'
        } else {
            return '0%'
        }
    }
}
