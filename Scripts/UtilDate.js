// File: UtilDate.js
// Date: 2023-12-07
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

    // Get formatted number, i.e. starting with '0' for numbers 1 to 9
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

} // UtilDate