import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'StrToDate' })
export class StringToDatePipe implements PipeTransform {
    transform(value: string): any {
        if (value) {
            const date = moment(value).format('MM/DD/YYYY');
            return date;
        } else {
            return ''
        }
    }
}
