import { NativeDateAdapter } from '@angular/material';
import { MatDateFormats } from '@angular/material/core';
import * as dayjs from 'dayjs';
import 'dayjs/locale/de';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';

export class AppDateAdapter extends NativeDateAdapter {
  // https://gist.github.com/wottpal/4211f4c01c41b16be181110273cff5a9
  parse(value: any): Date | null {
    // Initalize DayJS-Parser
    dayjs.locale('de')
    dayjs.extend(customParseFormat)
    dayjs.extend(localizedFormat)
    return dayjs(value, 'DD.MM.YYYY').toDate();
  }

  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      let day: string = date.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    return date.toDateString();
  }
}
export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD.MM.YYYY',
    //dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'numeric' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric'
    },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  }
};