import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'StrToDate' })
export class StringToDatePipe implements PipeTransform {
    transform(value: string): any {
        if (value) {
            const date = moment(value).format('MM/DD/YYYY hh:mm:ss a');
            return date;
        } else {
            return ''
        }
    }
}
