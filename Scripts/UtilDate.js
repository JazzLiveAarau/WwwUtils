// File: UtilDate.js
// Date: 2025-03-30
// Author: Gunnar Lidén

// File content
// =============
//
// Class with date functions

class UtilDate
{
    // Returns true if date is passed
    static  DateIsPassed(i_concert_year, i_concert_month, i_concert_day)
    {
        var ret_boolean = true;
        
        var i_concert_year_int = parseInt(i_concert_year);
        var i_concert_month_int = parseInt(i_concert_month);
        var i_concert_day_int = parseInt(i_concert_day);
        
        var current_date = new Date();
        var current_year = current_date.getFullYear();
        var current_month = current_date.getMonth() + 1;
        var current_day = current_date.getDate();
            
        if (current_year >  i_concert_year_int )
        {
            return ret_boolean;
        }
        else if (current_year ==  i_concert_year_int && current_month > i_concert_month_int)
        {
            return ret_boolean;
        }
        else if (current_year ==  i_concert_year_int && current_month == i_concert_month_int && current_day > i_concert_day_int)
        {
            return ret_boolean;
        }
        
        ret_boolean = false;
        
        return ret_boolean;
        
    }  // DateIsPassed

    // Calculates the number of days to the current data
    // https://www.javatpoint.com/calculate-days-between-two-dates-in-javascript
    // This function is also in class SeasonXml
    static numberOfDaysToCurrentDate(i_concert_year, i_concert_month, i_concert_day)
    {
        var current_date = new Date();

        var current_hours = current_date.getHours();

        var current_minutes = current_date.getMinutes();

        var current_seconds = current_date.getSeconds();

        // new Date(year, monthIndex, day, hours, minutes, seconds)

        var concert_date = new Date(i_concert_year, i_concert_month - 1, i_concert_day, 
                                current_hours, current_minutes, current_seconds);

        var time_difference = concert_date.getTime() - current_date.getTime();  
  
        var days_difference_float = time_difference / (1000 * 60 * 60 * 24);   

        var days_difference = Math.round(days_difference_float);

        return days_difference;

    } // numberOfDaysToCurrentDate

    // Returns an array of indices defining the date sorted array
    static sortDateArray(i_sort_date_array)
    {
        var ret_array = [];

        if (null == i_sort_date_array)
        {
            alert("UtilDate.sortDateArray Input array is null");

            return null;
        }

        if (i_sort_date_array.length == 0)
        {
            alert("UtilDate.sortDateArray Input array is empty");

            return ret_array;
        }

        if (i_sort_date_array.length == 1)
        {
            ret_array[0] = 0;

            return ret_array;
        }

        var n_records = i_sort_date_array.length;

        var compare_date = new SortDate(1996, 1, 1);

        var out_index = 0;

        for (var index_rec = 0; index_rec < n_records; index_rec++)
        {
            var index_min = UtilDate.getMinSortDateArray(compare_date.getDate(), i_sort_date_array);

            if (index_min >= 0)
            {
                ret_array[out_index] = index_min;

                out_index = out_index + 1;

                var change_rec =  i_sort_date_array[index_min];

                change_rec.m_not_used = false;

                i_sort_date_array[index_min] = change_rec;
            }
            else
            {
                // No alert because already in getMinSortDateArray
                break;
            } 

        } // index_rec

        return ret_array;

    } // sortDateArray

    // Returns the index for the minimum date record
    static getMinSortDateArray(i_compare_date, i_sort_date_array)
    {
        var ret_min_index = -1;

        var n_records = i_sort_date_array.length;

        var min_days = 5000000;

        for (var index_rec = 0; index_rec < n_records; index_rec++)
        {
            var current_rec = i_sort_date_array[index_rec];

            if (current_rec.notUsed())
            {
                var current_date = current_rec.getDate();

                var n_days = UtilDate.numberOfDaysBetweenTwoDates(i_compare_date, current_date);

                if (n_days < min_days)
                {
                    min_days = n_days;

                    ret_min_index = index_rec;
                }

            } // Record not used

        } // index_rec

        if (ret_min_index < 0)
        {
            alert("UtilDate.getMinSortDateArray Minimum not found");
        }

        return ret_min_index;

    } // getMinSortDateArray

   // Calculates the number of days between two dates
   // From i_date_one to i_date_two
   static numberOfDaysBetweenTwoDates(i_date_one, i_date_two)
   {
      // new Date(year, monthIndex, day, hours, minutes, seconds)

      var time_difference = i_date_two.getTime() - i_date_one.getTime();  

      var days_difference_float = time_difference / (1000 * 60 * 60 * 24);   

      var days_difference = Math.round(days_difference_float);

      return days_difference;

   } // numberOfDaysBetweenTwoDates 

    // Get the date string normally is used in Switzerland
    static getSwissDateString(i_year, i_month, i_day)
    {
        var ret_swiss_date_str = '';
    
        var concert_month_name = UtilDate.getMonthName(i_month);
    
        ret_swiss_date_str = ret_swiss_date_str + i_day.toString() + '. ';
    
        ret_swiss_date_str = ret_swiss_date_str + concert_month_name + ' ';
    
        ret_swiss_date_str = ret_swiss_date_str + i_year.toString();
    
        return ret_swiss_date_str;
    
    } // getSwissDateString

    // Get the ISO standard date string
    static getIsoDateString(i_year, i_month, i_day)
    {
        var ret_iso_date_str = '';
    
        var month_formatted = UtilDate.getFormattedTenNumber(i_month);
    
        var day_formatted = UtilDate.getFormattedTenNumber(i_day);
    
        ret_iso_date_str = ret_iso_date_str + i_year.toString() + '-';
    
        ret_iso_date_str = ret_iso_date_str + month_formatted.toString() + '-';
    
        ret_iso_date_str = ret_iso_date_str + day_formatted.toString();
    
        return ret_iso_date_str;
    
    } // getIsoDateString

    // Get the ISO reverse date string with points. Also standard in Switzerland
    static getIsoReverseDateString(i_year, i_month, i_day)
    {
        var ret_iso_reverse_str = '';
    
        var month_formatted = UtilDate.getFormattedTenNumber(i_month);
    
        var day_formatted = UtilDate.getFormattedTenNumber(i_day);

        ret_iso_reverse_str = ret_iso_reverse_str + day_formatted.toString() + '.';

        ret_iso_reverse_str = ret_iso_reverse_str + month_formatted.toString() + '.';
    
        ret_iso_reverse_str = ret_iso_reverse_str + i_year.toString();
        
        return ret_iso_reverse_str;
    
    } // getIsoReverseDateString

    // Returns the date as an array from an ISO standard date string
    static getDateArrayFromIsoDateString(i_iso_date)
    {
        var ret_array = [];

        var n_chars = i_iso_date.length;

        if (n_chars != 10)
        {
            alert("UtilDate.getDateArrayFromIsoDateString Not an ISO date. n_chars= " + n_chars.toString());

            return ret_array;            
        }

        var first_minus = i_iso_date.substring(4, 5);

        if (first_minus != '-')
        {
            alert("UtilDate.getDateArrayFromIsoDateString Not an ISO date (1) string Character= " + first_minus);

            return ret_array;
        }

        var second_minus = i_iso_date.substring(7, 8);

        if (second_minus != '-')
        {
            alert("UtilDate.getDateArrayFromIsoDateString Not an ISO date (2) string Character= " + second_minus);

            return ret_array;
        }

        var year_str = i_iso_date.substring(0, 4);

        var month_str = i_iso_date.substring(5, 7);

        if (month_str.substring(0, 1) == '0')
        {
            month_str = month_str.substring(1, 2);
        }

        var day_str = i_iso_date.substring(8, 10);

        if (day_str.substring(0, 1) == '0')
        {
            day_str = day_str.substring(1, 2);
        }

        ret_array[0] = year_str;

        ret_array[1] = month_str;

        ret_array[2] = day_str;

        return ret_array;

    } // getDateArrayFromIsoDateString

    // Get a yyyymmdd date string
    static  getYyyyMmDdDateString(i_year, i_month, i_day)
    {
        var ret_iso_date_str = '';
    
        var month_formatted = UtilDate.getFormattedTenNumber(i_month);
    
        var day_formatted = UtilDate.getFormattedTenNumber(i_day);
    
        ret_iso_date_str = ret_iso_date_str + i_year.toString();
    
        ret_iso_date_str = ret_iso_date_str + month_formatted.toString();
    
        ret_iso_date_str = ret_iso_date_str + day_formatted.toString();
    
        return ret_iso_date_str;
    
    } // getYyyyMmDdDateString

    // Returns the name of the month for a given month number
    static getMonthName(i_concert_month)
    {
        var ret_month = 'Undefined';
    
        if (1 == i_concert_month)
        {
            ret_month = 'Januar';
        }
        else if (2 == i_concert_month)
        {
            ret_month = 'Februar';
        }
        else if (3 == i_concert_month)
        {
            ret_month = 'März';
        }
        else if (4 == i_concert_month)
        {
            ret_month = 'April';
        }
        else if (5 == i_concert_month)
        {
            ret_month = 'Mai';
        }
        else if (6 == i_concert_month)
        {
            ret_month = 'Juni';
        }
        else if (7 == i_concert_month)
        {
            ret_month = 'Juli';
        }
        else if (8 == i_concert_month)
        {
            ret_month = 'August';
        }
        else if (9 == i_concert_month)
        {
            ret_month = 'September';
        }
        else if (10 == i_concert_month)
        {
            ret_month = 'Oktober';
        }
        else if (11 == i_concert_month)
        {
            ret_month = 'November';
        }
        else if (12 == i_concert_month)
        {
            ret_month = 'Dezember';
        }
    
        return ret_month;
    
    } // getMonthName

    // Get formatted ten number, i.e. starting with '0' for numbers 1 to 9
    static getFormattedTenNumber(i_number)
    {
        var ret_number = '';
    
        if (i_number >= 100)
        {
            //alert('getFormattedTenNumber Input number greater than or equal 100');
    
            // Should not occur
    
            return  i_number.toString();
        }
     
        if (i_number <= 9)
        {
            ret_number = '0' + i_number.toString();
        }
        else
        {
            ret_number = i_number.toString();
        }
     
        return ret_number;
    
    } // getFormattedTenNumber

    // Get formatted hundred number, i.e. starting with '00' for 1 to 9 an '00' for numbers 99 to 999
    static getFormattedHundredNumber(i_number)
    {
        var ret_number = '';
    
        if (i_number >= 1000)
        {
            //alert('getFormattedTenNumber Input number greater than or equal 1000');
    
            // Should not occur
    
            return  i_number.toString();
        }
     
        if (i_number <= 9)
        {
            ret_number = '00' + i_number.toString();
        }
        else if (i_number <= 99)
        {
            ret_number = '0' + i_number.toString();
        }
        else
        {
            ret_number = i_number.toString();
        }
     
        return ret_number;
    
    } // getFormattedHundredNumber

    // Get formatted thousand number, i.e. starting with '000' for 1 to 9 an '00' for numbers 99 to 999 and '0'  for ....
    static getFormattedThousandNumber(i_number)
    {
        var ret_number = '';
    
        if (i_number >= 10000)
        {
            //alert('getFormattedTenNumber Input number greater than or equal 10000');
    
            // Should not occur
    
            return  i_number.toString();
        }
     
        if (i_number <= 9)
        {
            ret_number = '000' + i_number.toString();
        }
        else if (i_number <= 99)
        {
            ret_number = '00' + i_number.toString();
        }
        else if (i_number <= 999)
        {
            ret_number = '0' + i_number.toString();
        } 
        else
        {
            ret_number = i_number.toString();
        }
     
        return ret_number;
    
    } // getFormattedThousandNumber

    // Returns a time stamp string: yyyyymmddmmss
    static getTimeStamp()
    {
        var ret_time_stamp = '';

        const current_date = new Date();

        var month_formatted = UtilDate.getFormattedTenNumber(current_date.getMonth() + 1);
    
        var day_formatted = UtilDate.getFormattedTenNumber(current_date.getDate());

        var hour_formatted = UtilDate.getFormattedTenNumber(current_date.getHours());

        var minute_formatted = UtilDate.getFormattedTenNumber(current_date.getMinutes());

        var second_formatted = UtilDate.getFormattedTenNumber(current_date.getSeconds());
    
        ret_time_stamp = ret_time_stamp + current_date.getFullYear();
    
        ret_time_stamp = ret_time_stamp + month_formatted;
    
        ret_time_stamp = ret_time_stamp + day_formatted;

        ret_time_stamp = ret_time_stamp + '_';

        ret_time_stamp = ret_time_stamp + hour_formatted;

        ret_time_stamp = ret_time_stamp + '_';

        ret_time_stamp = ret_time_stamp + minute_formatted;

        ret_time_stamp = ret_time_stamp + '_';

        ret_time_stamp = ret_time_stamp + second_formatted;

        return ret_time_stamp;

    } // getTimeStamp

} // UtilDate

// Class holding date data for sorting
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
class SortDate
{
    constructor(i_year, i_month, i_day)
    {
        // Hour=12, Minute=0, Second=0
        this.m_date = new Date(i_year, i_month - 1, i_day, 12, 0, 0);

        this.m_not_used = true;
    }

    // Returns the Date object
    getDate()
    {
        return  this.m_date;
    }

    notUsed()
    {
        return this.m_not_used;

    } // notUsed

} // DateData
