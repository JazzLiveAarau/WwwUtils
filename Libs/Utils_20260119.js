// File: UtilSearch.js
// Date: 2023-12-06
// Author: Gunnar Lidén

// File content
// =============
//
// Class with search utility functions

class UtilSearch
{
    // Returns true if the search criterion is fulfilled
    static searchCriterionFulfilled(i_photo_text, i_search_words_array)
    {
        var ret_fulfilled = true;

        var n_words = i_search_words_array.length;

        for (var index_word=0; index_word < n_words; index_word++)
        {
            var current_word = i_search_words_array[index_word];

            if (!UtilSearch.stringContainsSearchString(current_word, i_photo_text))
            {
                ret_fulfilled = false;

                break;
            }

        } // index_word

        return ret_fulfilled;

    } // searchCriterionFulfilled

    // Returns false for an unvalid search string
    static checkSearchString(i_search_str)
    {
        var ret_valid = true;
    
        if (i_search_str.length == 0)
        {
            ret_valid = false;
    
            alert("Such-Text ist leer");
        }
    
        var b_only_spaces = true;
    
        for (var index_char=0; index_char<i_search_str.length; index_char++)
        {
            var current_char = i_search_str.substring(index_char, 1);
    
            if (current_char != ' ')
            {
                b_only_spaces = false;
    
                break;
            }
        }
    
        if (b_only_spaces)
        {
            ret_valid = false;
    
            // alert("Nur Leerschlag im Such-Text");        
        }
    
        return ret_valid;
    
    } // checkSearchString

    // Get the search words array from the input search text
    static getSearchWordArray(i_search_str)
    {
        var ret_word_array = [];
    
        var n_char = i_search_str.length;
    
        var n_words = 0;
    
        var current_word = '';
        for (var index_char=0; index_char<n_char;index_char++)
        {
            var current_char = i_search_str.substring(index_char, index_char + 1);
    
            if (current_char == ' ')
            {
                if (current_word.length > 0)
                {
                    ret_word_array[n_words] = current_word;
    
                    n_words = n_words + 1;
    
                    current_word = '';
                }
            }
            else
            {
                current_word = current_word + current_char;
            }
        }
    
        if (current_word.length > 0)
        {
            ret_word_array[n_words] = current_word;
    
            n_words = n_words + 1; // Not used
    
            current_word = '';   // Not used 
        }
    
        return ret_word_array;
    
    } // getSearchWordArray

    // Returns true if search string is contained in the text string
    // 1. Convert input strings to upper case. Calls of toUpperCase
    // 2. Unify special characters like apostrohes. Calls of unifyApostrophes
    // 2. Determine if string contains search string. Call of indexOf
    static stringContainsSearchString(i_search_str, i_text_str)
    {
        var search_string_upper_case = i_search_str.toUpperCase();
    
        var text_string_upper_case = i_text_str.toUpperCase();
    
        search_string_upper_case = UtilSearch.unifyApostrophes(search_string_upper_case);
    
        text_string_upper_case = UtilSearch.unifyApostrophes(text_string_upper_case);
    
        var index_pos = text_string_upper_case.indexOf(search_string_upper_case);
    
        if (index_pos >= 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    
    } // stringContainsSearchString

    // Returns a string with unified apostrophes 
    static unifyApostrophes(i_str)
    {
        var ret_str = i_str;

        // Array with codes defining apostrophes
        var apostrophe_codes = [];

        // Apostrophe codes 
        apostrophe_codes[0] = 39; 
        apostrophe_codes[1] = 180; 
        apostrophe_codes[2] = 8217; 
        apostrophe_codes[3] = 96; 
    
        for (var index_code=0; index_code < apostrophe_codes.length; index_code++)
        {
            var current_ascii_to_replace = apostrophe_codes[index_code];
    
            ret_str = UtilSearch.unifyOneApostrophe(ret_str, current_ascii_to_replace);
    
        } // index_code
    
        return ret_str;
    
    } // unifyApostrophes

    // Unify one apostroph, i.e. let it be ASCII 39
    static unifyOneApostrophe(i_str, i_current_ascii_to_replace)
    {
        var ret_str = "";
    
        var unified_apostrophe_code = 39;
    
        var char_unify_apostrophe = String.fromCharCode(unified_apostrophe_code);
    
        for (var index_char=0; index_char < i_str.length; index_char++)
        {
            var current_char = i_str.substr(index_char, 1);
    
            var current_ascii_code = current_char.charCodeAt(0);
    
            if (current_ascii_code == i_current_ascii_to_replace)
            {   
                ret_str = ret_str + char_unify_apostrophe;
            }
            else
            {
                ret_str = ret_str + current_char;
            }
    
        } // index_char
    
        return ret_str;
    
    } // unifyOneApostrophe

    // Returns a PhotoData object for a given guest item (that is an image) number
    static getPhotoDataForGuestImage(i_jazz_guests_obj, i_guest_item_number)
    {
        if (null == i_jazz_guests_obj)
        {
            alert("UtilSearch.getPhotoDataForGuestImage Input XML object is null");

            return null;
        }

        var band_name =   "";
    
        var concert_year = i_jazz_guests_obj.getGuestYear(i_guest_item_number);
    
        var concert_month = i_jazz_guests_obj.getGuestMonth(i_guest_item_number);
    
        var concert_day = i_jazz_guests_obj.getGuestDay(i_guest_item_number);
    
        var swiss_date = UtilDate.getSwissDateString(concert_year, concert_month, concert_day);
    
        var gallery_name = '';
    
        var photographer_name = "";
    
        var zip_file_name = '';
    
        var photo_text = 'Kommer denna text med?';
    
        var guest_names =  i_jazz_guests_obj.getGuestNames(i_guest_item_number);
    
        var row_one =  i_jazz_guests_obj.getGuestHeader(i_guest_item_number) + '<br>' + swiss_date;
    
        var row_two =  '<br>' + guest_names;
    
        var guest_remark =  "";
    
        var url_photo = i_jazz_guests_obj.getGuestFileName(i_guest_item_number);
    
        var url_image_small = "";
    
        var url_image_big = "";
    
        var image_publish = true;
    
        var ret_photo_data = new PhotoData(url_photo);
    
        var photo_show_concert_text =  i_jazz_guests_obj.getGuestHeader(i_guest_item_number) + '<br>' + guest_names;
        
        ret_photo_data.setText(photo_show_concert_text);
    
        ret_photo_data.setUrlSmall(url_image_small);
        
        ret_photo_data.setUrlBig(url_image_big);
    
        ret_photo_data.setBand(band_name);
    
        ret_photo_data.setYear(concert_year);
    
        ret_photo_data.setMonth(concert_month);
    
        ret_photo_data.setDay(concert_day);
    
        ret_photo_data.setPhotographer(photographer_name);
    
        ret_photo_data.setZip(zip_file_name);
    
        ret_photo_data.setGalleryName(gallery_name);
    
        ret_photo_data.setActivePhotoXmlName('AudiencePhotos'); // TODO Verify  ImageList
    
        ret_photo_data.setAudienceRowOne(row_one);
    
        ret_photo_data.setAudienceRowTwo(row_two);
    
        ret_photo_data.setAudienceNames(guest_names);
    
        ret_photo_data.setAudienceRemark(guest_remark);
    
        ret_photo_data.setPublish(image_publish);
        
        return ret_photo_data;
    
    } // getPhotoDataForGuestImage


} // UtilSearch

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

// File: UtilDate.js
// Date: 2024-01-06
// Author: Gunnar Lidén

// File content
// =============
//
// Class with string functions

class UtilString
{
    // Returns true if there are two or more words in the input string
    static twoOrMoreWordsInString(i_string) 
    {
        var ret_bool_two = false;
        
        var string_trimmed = i_string.trim();
        
        var index_space =  string_trimmed.indexOf(" ");
        
        if (string_trimmed.length <= 2)
        {
            ret_bool_two = false;
        }
        else if (index_space < 0)
        {
            ret_bool_two = false;
        }	
        else
        {
            ret_bool_two = true;
        }
    
        return ret_bool_two;
      
    } // twoOrMoreWordsInString

    // Returns true if the input email address is valid
    static validEmailAddress(i_email_address)
    {
        var ret_bool_valid = true;
    
        if (UtilString.twoOrMoreWordsInString(i_email_address))
        {
            ret_bool_valid = false;	
            return ret_bool_valid;
        }	
        
        var index_pos_end = i_email_address.length;	
        if (index_pos_end <= 5)
        {
            ret_bool_valid = false;	
            return ret_bool_valid;
        }	
       
        // includes() does not work in Internet Explorer.
        var index_pos_amp = i_email_address.indexOf('@');
    
        if (index_pos_amp < 0)
        {
            ret_bool_valid = false;	
            return ret_bool_valid;
        }
        else if (index_pos_amp == 0)
        {
            ret_bool_valid = false;	
            return ret_bool_valid;
        }
        
        var after_at_str = i_email_address.substring(index_pos_amp);
        
        var index_pos_point = after_at_str.indexOf('.');
        
        if (index_pos_point < 0)
        {
            ret_bool_valid = false;	
            return ret_bool_valid;
        }
    
        return ret_bool_valid;
       
    } // validEmailAddress

    // Returns error message if the input string contains illegal XML characters
    static stringContainsIllegalCharacter(i_string, i_string_beschreibung)
    {
        var ret_error_msg = '';
        
        var illegal_chars = [];
        illegal_chars[0] = '&';
        illegal_chars[1] = '<';
        illegal_chars[2] = '>';
        
        for (var index_illegal=0; index_illegal<illegal_chars.length; index_illegal++)
        {
            var current_illegal_char = illegal_chars[index_illegal];
            
            var index_pos_illegal = i_string.indexOf(current_illegal_char);
            if (index_pos_illegal >= 0)
            {
                ret_error_msg = current_illegal_char + ' ist nicht erlaubt ' + i_string_beschreibung;
                break;
            }
            
        }
        
        return ret_error_msg;
        
    } // stringContainsIllegalCharacter

    // Replaces windows row ends with html row ends
    static rowEndsWindowsToHtml(i_string)
    {
        // https://stackoverflow.com/questions/784539/how-do-i-replace-all-line-breaks-in-a-string-with-br-tags
        
        var ret_string = '';
        
        ret_string = i_string.replace(/(?:\r\n|\r|\n)/g, '<br>');
        
        return ret_string;
        
    } // rowEndsWindowsToHtml

    // Replaces space with HTML space
    static spacesWindowsToHtml(i_string)
    {
        var ret_string = '';
    
        ret_string = i_string.replace(/ /g, '&nbsp;')
    
        return ret_string;
    
    } // spacesWindowsToHtml

    // Input is a Windows string and output is a HTML string
    static stringWindowsToHtml(i_string)
    {
        var ret_string = i_string;
    
        ret_string = UtilString.rowEndsWindowsToHtml(ret_string);
    
        //?????ret_string = spacesWindowsToHtml(ret_string);
    
        return ret_string;
    
    } // stringWindowsToHtml
    
    // Returns italic 'live'
    static stringConvertJazzLiveAarauToHtml(i_input_str)
    {
    
        return i_input_str.replace(/JAZZ live AARAU/g, "JAZZ <i>live</i> AARAU");
    
    } // stringConvertJazzLiveAarauToHtml

} // UtilString
// File: UtilServer.js
// Date: 2025-04-19
// Author: Gunnar Lidén

// File content
// =============
//
// Class with server utility functions based on the asynchronous jQuery function $.post.
// Implemented functions are:
// - Save (create) a file on the server defined by the file content and the file URL
// - Copy a file. Input data are two URLs
// - Move a file. Input data are two URLs
// - Delete a file. Input data is an URL TODO Not yet implemented
//
// For debug there are also two function
// - Initialize a debug file with a given name
// - Append text the to the debug file. A name defines which debug file
//
// For the JAZZ live AARAU the absolute (full) URL may be given as input. The browsers
// (the jQuery function $.post) only accept relative URLs, but these may be difficult
// to set. In the class there are functions that convert the absolute URL to a relative
// URL.
//
// Please also note that the functions only will execute if running on the server
// for a jazz application. This is checked with UtilServer.execApplicationOnServer.
//
// The server executing PHP files (functions) are in the dirextory /www/JazzScripts/Php
//
// Syntax for the jScript $.post function is: $.post(URL, data, callback); 
// Parameter URL is the requested PHP file that processes the data on the server
// Parameter data are object properties written as name:value pairs separated by commas 
// within curly braces {}. 
// Parameter callback is the name of the function that will be called when the data has 
// been processed. In this class it is implemented as an anonymous function.
// The callback function has two arguments: ret_data and status.
// Argument ret_data is text written by the PHP function with echo.
// Argument status returns the text 'success' if the PHP function has been executed.
// Please note that the returned 'success' not means that from the calling function
// requested result was achieved, like for instance that a file was actually saved. 
// When the opening of a new file failed the reurned status is 'success' and for 
// such a case the returned ret_data is returned woth a failure code that is examined
// here. 

class UtilServer
{
    // Save a file with the JQuery asynchronous function $.post and UtilServerSaveFile.php 
    // The function returns true (for success) or false when finished.
    // Please note that it is an async function with await, but the
    // UtilServer.saveFile function will not stop until the file is saved
    static async saveFile(i_path_file_name, i_content_string)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("saveFile UtilServerSaveFile.php cannot be executed on the local (live) server");

            return false;
        }

        var b_save_success = false;

        var rel_path_file_name = UtilServer.replaceAbsoluteWithRelativePath(i_path_file_name);

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerSaveFile.php');
    
        await $.post
          (rel_path_file_php,
            {
              file_content: i_content_string,
              file_name: rel_path_file_name
            },
            function(data_save,status_save)
            {   
                // Do not return true or false from this anonymous function. 
                // It will not be the return value for saveFile! (undefined will be returned if one tries)
                // Parameter b_save_success works fine because of await
                if (status_save == "success")
                {
                    // The PHP function returns succed for an opening failure. Therefore the returned
                    // string Unable_to_open_file is used to handle this error.
                    var index_fail_open = data_save.indexOf('Unable_to_open_file');
                    var index_fail_write = data_save.indexOf('Unable_to_write_file');

                    if (index_fail_open >= 0 || index_fail_write >= 0)
                    {
                        console.log(" UtilServer.saveFile failure. data_save= " + data_save);
                        alert("UtilServer.saveFileWithJQueryPostFunction Unable to create file " + rel_path_file_name);

                        b_save_success = false;
                    }

                    console.log(" UtilServer.saveFile Filed is saved. data_save= " + data_save);

                    b_save_success = true;

                }
                else
                {
                    console.log(" UtilServer.saveFile failure. data_save= " + data_save);
                    alert("Execution of UtilServer.saveFile failed");

                    b_save_success = false;
                }          
            } // function
          ); // post 

        // console.log("UtilServer.saveFile Exit b_save_success= " + b_save_success.toString());

        return b_save_success;
        
    } // saveFile

    // Save a file with the JQuery asynchronous function $.post and UtilServerSaveFile.php 
    // Input parameters
	//
	// This function is the same as SaveCallback except that there is a 
	// check and failure if the file not exists
	//
    // i_path_file_name: A relative or absolute URL for the created file
    // i_content_string: The content of the file. Row ends defined as \n are not allowed
    // i_callback_fctn:  The name of the callback function
    //
    // For an error the function UtilServer.saveFileError will be called
    static saveFileCallback(i_path_file_name, i_content_string, i_callback_fctn)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("saveFileCallback UtilServerSaveFile.php cannot be executed on the local (live) server");

            return;
        }

        var rel_path_file_name = UtilServer.replaceAbsoluteWithRelativePath(i_path_file_name);

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerSaveFile.php');
    
        $.post
          (rel_path_file_php,
            {
              file_content: i_content_string,
              file_name: rel_path_file_name
            },
            function(data_save, status_save)
            {   
                if (status_save == "success")
                {
                    // The PHP function returns succed for an opening failure. Therefore the returned
                    // string Unable_to_open_file is used to handle this error.
                    var index_fail_open = data_save.indexOf('Unable_to_open_file');
                    var index_fail_write = data_save.indexOf('Unable_to_write_file');

                    if (index_fail_open >= 0 || index_fail_write >= 0)
                    {

                        if (index_fail_open >= 0 || index_fail_write >= 0)
                        {
                            var file_name = UtilServer.getFileName(rel_path_file_name);
    
                            var data_save_display = '';
    
                            if (index_fail_open >= 0)
                            {
                                data_save_display = 'Unable_to_open_file';
                            }
                            else if (index_fail_write >= 0)
                            {
                                data_save_display = 'File does not exist';
                            }
                            else
                            {
                                data_save_display = data_save.trim();
                            }
                        }
 
                        UtilServer.saveFileError(file_name, data_save_display, status_save);

                        return;
                    }

                    console.log(" UtilServer.saveFileCallback Saved file: " + rel_path_file_name);
                    // console.log(" UtilServer.saveFileCallback Filed is saved. data_save= " + data_save.trim());

                    i_callback_fctn();
                }
                else
                {
                    UtilServer.saveFileError(rel_path_file_name, data_save.trim(), status_save);
                }  

            } // function
        ); // post 

        // console.log("saveFileCallback The function comes here, but without a return it won't come further");
       
    } // saveFileCallback

    // Save a file with the JQuery asynchronous function $.post and UtilSaveFile.php 
	//
	// This function is the same as SaveFileCallback except that there is no 
	// check and failure if the file not existed
	//
    // Input parameters
    // i_path_file_name: A relative or absolute URL for the created file
    // i_content_string: The content of the file. Row ends defined as \n are not allowed
    // i_callback_fctn:  The name of the callback function
    //
    // For an error the function UtilServer.saveFileError will be called
    static saveCallback(i_path_file_name, i_content_string, i_callback_fctn)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("saveCallback UtilSaveFile.php cannot be executed on the local (live) server");

            return;
        }

        var rel_path_file_name = UtilServer.replaceAbsoluteWithRelativePath(i_path_file_name);

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilSaveFile.php');
    
        $.post
          (rel_path_file_php,
            {
              file_content: i_content_string,
              file_name: rel_path_file_name
            },
            function(data_save, status_save)
            {   
                if (status_save == "success")
                {
                    // The PHP function returns succed for an opening failure. Therefore the returned
                    // string Unable_to_open_file is used to handle this error.
                    var index_fail_open = data_save.indexOf('Unable_to_open_file');
                    var index_fail_dir = data_save.indexOf('Directory_is_missing');

                    if (index_fail_open >= 0 || index_fail_dir >= 0)
                    {
                        var file_name = UtilServer.getFileName(rel_path_file_name);

                        var data_save_display = '';

                        if (index_fail_open >= 0)
                        {
                            data_save_display = 'Unable_to_open_file';
                        }
                        else if (index_fail_dir >= 0)
                        {
                            data_save_display = 'Directory_is_missing';
                        }
                        else
                        {
                            data_save_display = data_save.trim();
                        }
 
                        UtilServer.saveFileError(file_name, data_save_display, status_save);

                        return;
                    }

                    console.log(" UtilServer.saveCallback Saved file: " + rel_path_file_name);
                    // console.log(" UtilServer.saveCallback File is saved. data_save= " + data_save.trim());

                    i_callback_fctn();
                }
                else
                {
                    UtilServer.saveFileError(rel_path_file_name, data_save.trim(), status_save);
                }  

            } // function
        ); // post 

        // console.log("saveCallback The function comes here, but without a return it won't come further");
       
    } // saveCallback




    // Save a file with the JQuery asynchronous function $.post and UtilSaveDirFile.php 
	// The directories (path) will be created if not existing
	//
    // Input parameters
    // i_path_file_name: A relative or absolute URL for the created file
    // i_content_string: The content of the file. Row ends defined as \n are not allowed
    // i_callback_fctn:  The name of the callback function
    //
    // For an error the function UtilServer.saveFileError will be called
    static saveDirFile(i_path_file_name, i_content_string, i_callback_fctn)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("saveDirFile UtilSaveFile.php cannot be executed on the local (live) server");

            return;
        }

        var rel_path_file_name = UtilServer.replaceAbsoluteWithRelativePath(i_path_file_name);

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilSaveDirFile.php');
    
        $.post
          (rel_path_file_php,
            {
              file_content: i_content_string,
              file_name: rel_path_file_name
            },
            function(data_save, status_save)
            {   
                if (status_save == "success")
                {
                    // The PHP function returns succed for an opening failure. Therefore the returned
                    // string Unable_to_open_file is used to handle this error.
                    var index_fail_open = data_save.indexOf('Unable_to_open_file');
                    

                    if (index_fail_open >= 0)
                    {
                        var file_name = UtilServer.getFileName(rel_path_file_name);

                        var data_save_display = '';

                        if (index_fail_open >= 0)
                        {
                            data_save_display = 'Unable_to_open_file';
                        }
                        else
                        {
                            data_save_display = data_save.trim();
                        }
 
                        UtilServer.saveFileError(file_name, data_save_display, status_save);

                        return;
                    }

                    console.log(" UtilServer.saveDirFile Saved file: " + rel_path_file_name);
                    // console.log(" UtilServer.saveDirFile File is saved. data_save= " + data_save.trim());

                    i_callback_fctn();
                }
                else
                {
                    UtilServer.saveFileError(rel_path_file_name, data_save.trim(), status_save);
                }  

            } // function
        ); // post 

        // console.log("saveDirFile The function comes here, but without a return it won't come further");
       
    } // saveDirFile









    // Failure saving file
    static saveFileError(i_file_name, i_data_save, i_status_save)
    {
        console.log(" UtilServer.saveFileCallback failure. data_save= " + i_data_save + ' status_save= ' + i_status_save);
        console.log(" UtilServer.saveFileCallback failure. i_file_name= " + i_file_name);

        alert("UtilServer.saveFileCallback Unable to save file " + i_file_name + '. ' + i_data_save);

    } // saveFileError

    // Copy a file with the JQuery asynchronous function $.post and UtilServerCopyFile.php 
    // The function returns true (for success) or false when finished.
    // Please note that it is an async function with await, but the
    // UtilServer.copyFile function will not await until the file is saved
    // Input parameters:
    // i_url_file_input: The url (relative or absolute) for the server file to copy
    // i_url_file_copy:  The url (relative or absolute) for the copied file
    static async copyFile(i_url_file_input, i_url_file_copy)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("copyFile UtilServerCopyFile.php cannot be executed on the local (live) server");

            return false;
        }

        var b_copy_success = false;

        var rel_path_file_input = UtilServer.replaceAbsoluteWithRelativePath(i_url_file_input);

        var rel_path_file_copy = UtilServer.replaceAbsoluteWithRelativePath(i_url_file_copy);

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerCopyFile.php');

        await $.post
        (rel_path_file_php,
            {
            file_input: rel_path_file_input,
            file_copy: rel_path_file_copy
            },
            function(data_copy,status_copy)
            {
                if (status_copy == "success")
                {
                    var index_fail_copy = data_copy.indexOf('Unable_to_copy_file_');
                    var index_fail_exist = data_copy.indexOf('File_exists_not');

                    if (index_fail_copy >= 0 || index_fail_exist >= 0)
                    {
                        console.log(" UtilServer.copyFile Failure copying file. data_copy= " + data_copy);

                        if (index_fail_exist >= 0)
                        {
                            alert("UtilServer.copyFile There is no file " + rel_path_file_input);
                        }
                        else
                        {
                            alert("UtilServer.copyFile Unable to copy file " + rel_path_file_input);
                        }

                        b_copy_success = false;
                    }

                    console.log(" UtilServer.copyFile File is copied data_copy= " + data_copy.trim());

                    b_copy_success = true;
                }
                else
                {
                    alert("Execution of UtilServerCopyFile.php failed. data_copy= " + data_copy);

                    b_copy_success = false;
                }          
            } // function

        ); // post

        return b_copy_success;
        
    } // copyFile

    // Copy a file with the JQuery asynchronous function $.post and UtilServerCopyFile.php 
    // Input parameters:
    // i_url_file_input: The url (relative or absolute) for the server file to copy
    // i_url_file_copy:  The url (relative or absolute) for the copied file
    // i_callback_fctn:  The name of the callback function
    static copyFileCallback(i_url_file_input, i_url_file_copy, i_callback_fctn)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("copyFile UtilServerCopyFile.php cannot be executed on the local (live) server");

            return false;
        }

        var rel_path_file_input = UtilServer.replaceAbsoluteWithRelativePath(i_url_file_input);

        var rel_path_file_copy = UtilServer.replaceAbsoluteWithRelativePath(i_url_file_copy);

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerCopyFile.php');

        $.post
        (rel_path_file_php,
            {
            file_input: rel_path_file_input,
            file_copy: rel_path_file_copy
            },
            function(data_copy,status_copy)
            {
                if (status_copy == "success")
                {
                    var index_fail_copy = data_copy.indexOf('Unable_to_copy_file_');
                    var index_fail_exist = data_copy.indexOf('File_exists_not');

                    if (index_fail_copy >= 0 || index_fail_exist >= 0)
                    {
                        console.log(" UtilServer.copyFile Failure copying file. data_copy= " + data_copy);

                        if (index_fail_exist >= 0)
                        {
                            alert("UtilServer.copyFile There is no file " + rel_path_file_input);
                        }
                        else
                        {
                            alert("UtilServer.copyFile Unable to copy file " + rel_path_file_input);
                        }

                        UtilServer.copyFileError(rel_path_file_input, data_copy, status_copy);
                    }

                    console.log(" UtilServer.copyFile File is copied data_copy= " + data_copy.trim());

                    i_callback_fctn();
                }
                else
                {
                    alert("Execution of UtilServerCopyFile.php failed. data_copy= " + data_copy);

                    UtilServer.copyFileError(rel_path_file_input, data_copy, status_copy);
                }          
            } // function

        ); // post
        
    } // copyFileCallback

    // Failure copying file
    static copyFileError(i_rel_path_file_name, i_data_copy, i_status_copy)
    {
        console.log(" UtilServer.copyFileCallback failure. data_copy= " + i_data_copy + ' status_copy= ' + i_status_copy);

        alert("UtilServer.copyFileCallback Unable to copy file " + i_rel_path_file_name + ' status_copy= ' + i_status_copy);

    } // copyFileError

    // Move a file with the JQuery asynchronous function $.post and UtilServerMoveFile.php 
    // The function returns true (for success) or false when finished.
    // Please note that it is an async function with await, but the
    // UtilServer.moveFile function will not await until the file has been moved
    // Input parameters:
    // i_url_file_input: The url (relative or absolute) for the server file to move
    // i_url_file_move:  The url (relative or absolute) for the moved file
    static async moveFile(i_url_file_input, i_url_file_move)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("moveFile UtilServerMoveFile.php cannot be executed on the local (live) server");

            return false;
        }

        var b_move_success = false;

        var rel_path_file_input = UtilServer.replaceAbsoluteWithRelativePath(i_url_file_input);

        var rel_path_file_move = UtilServer.replaceAbsoluteWithRelativePath(i_url_file_move);

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerMoveFile.php');

        await $.post
        (rel_path_file_php,
            {
            file_input: rel_path_file_input,
            file_move: rel_path_file_move
            },
            function(data_move,status_move)
            {
                if (status_move == "success")
                {
                    
                    var index_fail_copy = data_move.indexOf('Unable_to_copy_file_');
                    var index_fail_exist = data_move.indexOf('File_exists_not');
                    var index_fail_delete = data_move.indexOf('Unable_to_delete_file_');

                    if (index_fail_copy >= 0 || index_fail_exist >= 0 ||  index_fail_delete >= 0)
                    {
                        console.log(" UtilServer.UtilServermoveFile.php failure. data_move= " + data_move.trim());

                        if (index_fail_exist >= 0)
                        {
                            alert("UtilServer.moveFile There is no file " + rel_path_file_input);
                        }
                        else if (index_fail_delete >= 0)
                        {
                            alert("UtilServer.moveFile Failure deleting file " + rel_path_file_input);
                        }
                        else
                        {
                            alert("UtilServer.moveFile Unable to copy file " + rel_path_file_input);
                        }

                        b_move_success = false;
                    }

                    b_move_success = true;
                }
                else
                {
                    alert("Execution of UtilServermoveFile.php failed. data_move= " + data_move.trim());

                    b_move_success = false;
                }          
            } // function

        ); // post

        return b_move_success;
        
    } // moveFile

    // Move a file with the JQuery asynchronous function $.post and UtilServerMoveFile.php 
    // Input parameters:
    // i_url_file_input: The url (relative or absolute) for the server file to move
    // i_url_file_move:  The url (relative or absolute) for the moved file
    // i_callback_fctn:  The name of the callback function
    static moveFileCallback(i_url_file_input, i_url_file_move, i_callback_fctn)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("moveFile UtilServerMoveFile.php cannot be executed on the local (live) server");

            return;
        }

        var rel_path_file_input = UtilServer.replaceAbsoluteWithRelativePath(i_url_file_input);

        var rel_path_file_move = UtilServer.replaceAbsoluteWithRelativePath(i_url_file_move);

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerMoveFile.php');

        $.post
        (rel_path_file_php,
            {
            file_input: rel_path_file_input,
            file_move: rel_path_file_move
            },
            function(data_move,status_move)
            {
                if (status_move == "success")
                {
                    
                    var index_fail_copy = data_move.indexOf('Unable_to_copy_file_');
                    var index_fail_exist = data_move.indexOf('File_exists_not');
                    var index_fail_delete = data_move.indexOf('Unable_to_delete_file_');

                    if (index_fail_copy >= 0 || index_fail_exist >= 0 ||  index_fail_delete >= 0)
                    {
                        console.log(" UtilServer.UtilServermoveFile.php failure. data_move= " + data_move.trim());

                        if (index_fail_exist >= 0)
                        {
                            alert("UtilServer.moveFile There is no file " + rel_path_file_input);
                        }
                        else if (index_fail_delete >= 0)
                        {
                            alert("UtilServer.moveFile Failure deleting file " + rel_path_file_input);
                        }
                        else
                        {
                            alert("UtilServer.moveFile Unable to copy file " + rel_path_file_input);
                        }

                        UtilServer.moveFileError(rel_path_file_input, data_move, status_move);
                    }

                    i_callback_fctn();
                }
                else
                {
                    alert("Execution of UtilServermoveFile.php failed. data_move= " + data_move.trim());

                    UtilServer.moveFileError(rel_path_file_input, data_move, status_move);
                }          
            } // function

        ); // post
        
    } // moveFileCallback

    // Failure moving file
    static moveFileError(i_rel_path_file_name, i_data_move, i_status_move)
    {
        console.log(" UtilServer.copyFileCallback failure. data_move= " + i_data_move + ' status_move= ' + i_status_move);

        alert("UtilServer.copyFileCallback Unable to move file " + i_rel_path_file_name + ' status_move= ' + i_status_move);

    } // moveFileError

    // Upload image to the server
    // i_image_file: Input file object (selected with <input type="file">) 
    // i_abs_file_upload_name: Full (relative?) name and path for the upploaded file
    // i_file_uploaded_callback: Name of function that shall be called when file is uploaded
    static async uploadFile(i_image_file, i_abs_file_upload_name, i_file_uploaded_callback) 
    {
        if (null == i_image_file)
        {
            alert("UtilServer.uploadFile Input image file is null");
    
            return;
        }
        var rel_path_file_upload = UtilServer.replaceAbsoluteWithRelativePath(i_abs_file_upload_name);


        var form_data = new FormData(); 
        
        form_data.append("file_input", i_image_file);

        form_data.append("to_file_name", rel_path_file_upload);
    
        console.log("UtilServer.uploadFile Sent to PHP is FormData where the following data has been appended ");

        console.log(i_abs_file_upload_name);
    
        console.log(i_image_file);

        if (!UtilServer.execApplicationOnServer())
        {
            alert("UtilServer.uploadFile File cannot be uploaded with PHP functions. Please upload and execute the application on the server");
    
            return;
        }

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerUploadFile.php');
    
        var response = null;
    
        try
        {
            response = await fetch(rel_path_file_php, 
            {
            method: "POST", 
            body: form_data
            }
          );    
        }
        catch (error) 
        {
            console.log(error);
    
            alert('UtilServer.uploadFile Failure uploading file: ' + error);
    
            return;
        }
    
        console.log("UtilServer.uploadFile response=");
        console.log(response);
    
        if (response.ok)
        {
            console.log("UtilServer.uploadFile The file has been uploaded successfully");

            i_file_uploaded_callback(i_abs_file_upload_name);
        }
        else
        {
            console.log("UtilServer.uploadFile Failure uploading file. response=");
            console.log(response);

            alert('UtilServer.uploadFile Failure uploading file (respons).');
        }

    } // uploadFile

    // Returns the relative path (URL) to the executing HTML file 
    // If the input URL not is an absolute path starting with 
    // https://jazzliveaarau.ch the input URL is returned
    //
    // These library function may be called from any level. For instance
    // https://www.jazzliveaarau.ch/WwwUtils/LevelThree/LevelFour/TestUtilsLevelFour.htm
    // The functions are executed by the PHP functions (files), e.g. UtilServerSaveFile.php
    // The PHP files are in the directory https://www.jazzliveaarau.ch/JazzScripts/Php
    // The JQuery function post do not accept an absolute URL. Therefore this function
    // dertermines the execute level and constructs the relative path to the file
    // UtilServerSaveFile.php. For the above example the relative URL. For the above example:
    // ../../../../JazzScripts/Php/UtilServerSaveFile.php
    static getRelativeExecuteLevelPath(i_path_file_name)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("UtilServer.getRelativeExecuteLevelPath  Please upload and execute the application on the server");
    
            return;
        }

        if (UtilServer.isRelativePath(i_path_file_name))
        {
            return i_path_file_name;
        }

        //console.log("UtilServer.getRelativeExecuteLevelPath i_path_file_name= " + i_path_file_name);

        var path_file_without_homepage = UtilServer.getPathWithoutHomepage(i_path_file_name);

        //console.log("UtilServer.getRelativeExecuteLevelPath path_file_without_homepage= " + path_file_without_homepage);

        var current_base = window.location.href;

        //console.log("UtilServer.getRelativeExecuteLevelPath current_base= " + current_base);

        var n_levels_base = UtilServer.getNumberOfPathLevels(current_base);

        // console.log("UtilServer.getRelativeExecuteLevelPath n_levels_base= " + n_levels_base.toString());

        var full_relative_path = UtilServer.addRelativePathSlashes(n_levels_base, path_file_without_homepage)

        // console.log("UtilServer.getRelativeExecuteLevelPath full_relative_path= " + full_relative_path);

        return full_relative_path;

    } // getRelativeExecuteLevelPath

    // Replaces the first homepage part of an URL with a relative path, 
    // i.e. replace https://www.jazzliveaarau.ch/ with ../../
    // Browser do not accept https://www.jazzliveaarau.ch/
    // If input is a relative path do nothing. Just return the path
    static replaceAbsoluteWithRelativePath(i_path_file_name)
    {
        if (UtilServer.isRelativePath(i_path_file_name))
        {
            return i_path_file_name;
        }

        // console.log("UtilServer.replaceAbsoluteWithRelativePath i_path_file_name= " + i_path_file_name);
        
        var path_file_without_homepage = UtilServer.getPathWithoutHomepage(i_path_file_name);

        // console.log("UtilServer.replaceAbsoluteWithRelativePath path_file_without_homepage= " + path_file_without_homepage);

        var full_relative_path = '../..' + path_file_without_homepage;

        // console.log("UtilServer.replaceAbsoluteWithRelativePath full_relative_path= " + full_relative_path);

        return full_relative_path;

    } // replaceAbsoluteWithRelativePath

    // Adds ../ and returns the full relative path
    static addRelativePathSlashes(i_levels, i_path_file_without_homepage)
    {
        if (i_levels <= 1)
        {
            alert("UtilServer.addRelativePathSlashes Invalid i_levels= " + i_levels.toString());

            return '';
        }

        var path_php = '';

        for (var level_number=1; level_number <= i_levels; level_number++)
        {
            if (level_number < i_levels)
            {
                path_php = path_php + '../';
            }
            else
            {
                path_php = path_php + '..';
            }
        }
        var full_relative_path = path_php + i_path_file_without_homepage;

        // console.log("UtilServer.addRelativePathSlashes full_relative_path= " + full_relative_path);

        return full_relative_path;

    } // addRelativePathSlashes

    // Returns the end path without homepage, i.e. https://www.jazzliveaarau.ch/ is removed
    static getPathWithoutHomepage(i_path_file_name)
    {
        var server_url = 'jazzliveaarau.ch';

        var server_url_length = server_url.length;
    
        var index_url = i_path_file_name.indexOf(server_url);

        // console.log("UtilServer.getPathWithoutHomepage i_path_file_name= " + i_path_file_name);

        var path_file_without_homepage = i_path_file_name.substring(index_url + server_url_length);

        // console.log("UtilServer.getPathWithoutHomepage path_file_without_homepage= " + path_file_without_homepage);

        return path_file_without_homepage;

    } // getPathWithoutHomepage

    // Returns true if it is a relative path, i.e. not containing jazzliveaarau.ch
    static isRelativePath(i_path_file_name)
    {
        var server_url = 'jazzliveaarau.ch';
    
        var index_url = i_path_file_name.indexOf(server_url);

        if (index_url < 0)
        {
            // console.log("getRelativeExecuteLevelPath.isRelativePath Relative URL i_path_file_name= " + i_path_file_name);

            return true;
        }
        else
        {
            // console.log("getRelativeExecuteLevelPath.isRelativePath Absolute URL i_path_file_name= " + i_path_file_name);

            return false;
        }

    } // isRelativePath

    // Returns true if it is an (JAZZ live AARAU) absolute path, i.e. containing jazzliveaarau.ch
    static isAbsolutePath(i_path_file_name)
    {
        var server_url = 'jazzliveaarau.ch';
    
        var index_url = i_path_file_name.indexOf(server_url);

        if (index_url > 0)
        {
            return true;
        }
        else
        {
            return false;
        }

    } // isAbsolutePath


    // Returns the file extension
    static getFileExtension(i_file_name)
    {
        var index_last_point = i_file_name.lastIndexOf('.');

        if (index_last_point < 0)
        {
            alert("UtilServer.getFileExtension No extension i.e. point in file name " + i_file_name);

            return '';
        }

        return i_file_name.substring(index_last_point);

    } // getFileExtension

    // Returns the file name with extension
    static getFileName(i_path_file_name)
    {
        var ret_file_name = '';

        var index_last_slash = i_path_file_name.lastIndexOf('/');

        if (index_last_slash > 0)
        {

            ret_file_name = i_path_file_name.substring(index_last_slash + 1);

        }
        else
        {
            // Input file name without a path

            ret_file_name = i_path_file_name;
        }

        var index_last_point = ret_file_name.lastIndexOf('.');

        if (index_last_point < 0)
        {
            alert("UtilServer.getFileName No extension point in input name= " + i_path_file_name);

            return "";
        }

        return ret_file_name;

    } // getFileName

    // Returns the file name
    static getFileNameWithoutExtension(i_path_file_name)
    {
        var ret_file_name_no_ext = '';

        var file_name = null;

        var index_last_slash = i_path_file_name.lastIndexOf('/');

        if (index_last_slash > 0)
        {

            file_name = i_path_file_name.substring(index_last_slash + 1);

        }
        else
        {
            // Input file name did not have a path.

            file_name = i_path_file_name;

        }

        var index_last_point = file_name.lastIndexOf('.');

        if (index_last_point < 0)
        {
            alert("UtilServer.getFileNameWithoutExtension No extension point in input name= " + i_path_file_name);

            return "";
        }

        ret_file_name_no_ext = file_name.substring(0, index_last_point);

        return ret_file_name_no_ext;

    } // getFileNameWithoutExtension

    // Returns the file path
    static getFilePath(i_path_file_name)
    {
        var ret_file_path = '';

        var index_last_slash = i_path_file_name.lastIndexOf('/');

        if (index_last_slash > 0)
        {

            ret_file_path = i_path_file_name.substring(0, index_last_slash + 1);

            return ret_file_path;
        }
        else
        {
            return ret_file_path;
        }

    } // getFilePath

    // Returns the number of path levels from https://jazzliveaarau.ch
    static getNumberOfPathLevels(i_url)
    {
        // console.log("UtilServer.getNumberOfPathLevels i_url= " + i_url);

        var server_url = 'jazzliveaarau.ch';

        var server_url_length = server_url.length;
    
        var index_url = i_url.indexOf(server_url);

        // console.log("UtilServer.getNumberOfPathLevels index_url= " + index_url.toString());

        if (index_url < 0)
        {
            console.log("UtilServer.getNumberOfPathLevels Not an absolute URL i_url= " + i_url);

            return -1;
        }

        var homepage_sub_path = i_url.substring(index_url + server_url_length);

        // console.log("UtilServer.getNumberOfPathLevels homepage_sub_path= " + homepage_sub_path);

        var n_levels = 0;

        for (var index_char=0; index_char < homepage_sub_path.length; index_char++)
        {
            var current_char = homepage_sub_path[index_char];

            if (current_char == '/')
            {
                n_levels = n_levels + 1;
            }

        }

        // console.log("UtilServer.getNumberOfPathLevels n_levels= " + n_levels.toString());

        return n_levels;

    } // getNumberOfPathLevels

    // Downloads a file from the server
    // https://byby.dev/node-download-image
    // https://www.youtube.com/watch?v=DDYkcydo1WA

    // Open with an application
    // https://www.makeuseof.com/node-js-open-files-urls-npm-package/

    static async download(i_url)
    {
        alert("UtilServer.download Not yet implemented");

    } // download

    // Initialization (creation) of the debug file in the directory /www/JazzScripts/Php/Debug
    static async initDebugFile(i_unigue_str)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            console.log("UtilServer.initDebugFile Do nothing. Not running on the server");

            return;
        }

        var util_server_key = 'jazz_util_server';
        var util_server_value = 'util_server_debug_initialized';

        var session_debug_value = window.sessionStorage.getItem(util_server_key);

        if (session_debug_value != null || session_debug_value == util_server_value)
        {
            console.log("UtilServer.initDebugFile Do nothing. Debug already initialized for this session");

            return;
        }

        var b_init_debug_success = false;

        var file_name = './Debug/debug_server_utils_' + i_unigue_str + '.txt';

        // console.log("UtilServer.initDebugFile Input file= " + file_name + "-------- 1");

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerInitDebug.php');
    
        await $.post
          (rel_path_file_php,
            {
              file_name: file_name
            },
            function(data_save,status_save)
            {   
                if (status_save == "success")
                {
                    // The PHP function returns succed for an opening failure. Therefore the returned
                    // string Unable_to_open_file is used to handle this error.
                    var index_fail_open = data_save.indexOf('Unable_to_open_file');
                    var index_fail_write = data_save.indexOf('Unable_to_write_file');

                    if (index_fail_open >= 0 || index_fail_write >= 0)
                    {
                        console.log(" UtilServer.UtilServerInitDebug.php failure. data_save= " + data_save);

                        alert("UtilServer.saveFileWithJQueryPostFunction Unable to create file " + file_name);

                        b_init_debug_success = false;
                    }
                    else
                    {
                        console.log("UtilServer.initDebugFile. File " + file_name + " is created " + "--- 2");

                        b_init_debug_success = true;
                    }
                }
                else
                {
                    console.log(" UtilServer.UtilServerInitDebug.php failure. data_save= " + data_save);
                    alert("Execution of UtilServer.UtilServerInitDebug.php failed");

                    b_init_debug_success = false;
                }          
            } // function
          ); // post

          window.sessionStorage.setItem(util_server_key, util_server_value);
        
          return b_init_debug_success;

    } // initDebugFile

    // Append text to the debug file in the directory /www/JazzScripts/Php/Debug
    static async appendDebugFile(i_content_str, i_unigue_str)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            console.log("UtilServer.appendDebugFile Do nothing. Not running on the server");

            return;
        }

        var b_append_debug_success = false;

        var file_name = './Debug/debug_server_utils_' + i_unigue_str + '.txt';

        // console.log("UtilServer.appendDebugFile Input file= " + file_name + "----------------------------------------------------------------- 1");

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerAppendDebug.php');

        var content_str = i_content_str +  '\n';
    
         await $.post
          (rel_path_file_php,
            {
              file_content: content_str,
              file_name: file_name
            },
            function(data_save,status_save)
            {   
                if (status_save == "success")
                {
                    // The PHP function returns succed for an opening failure. Therefore the returned
                    // string Unable_to_open_file is used to handle this error.
                    var index_fail_open = data_save.indexOf('Unable_to_open_file');
                    var index_fail_write = data_save.indexOf('Unable_to_write_file');

                    if (index_fail_open >= 0 || index_fail_write >= 0)
                    {
                        console.log(" UtilServer.UtilServerAppendDebug.php failure. data_save= " + data_save);
                        alert("UtilServer.appendDebugFile Unable to create file " + file_name);

                        b_append_debug_success = false;
                    }
                    else
                    {
                        // console.log("UtilServer.appendDebug. Data added to " + file_name + "----------------------------------------------------------------- 2");

                        b_append_debug_success = true;
                    }
                }
                else
                {
                    console.log(" UtilServer.UtilServerInitDebug.php failure. data_save= " + data_save);
                    alert("Execution of UtilServer.UtilServerAppendDebug.php failed");

                    b_append_debug_success = false;
                }          
            } // function
          ); // post
          
          return b_append_debug_success;

    } // appendDebugFile
	

    // Returns true if the application is running on the server
    // Returns false if it is running on the Visual Studio Code Live Server
    // Please note that window.location.href can return
    // https://jazzliveaarau.ch or
    // https://www.jazzliveaarau.ch
    static execApplicationOnServer()
    {
        var current_base = window.location.href;
    
        var server_url = 'jazzliveaarau.ch';
    
        var index_url = current_base.indexOf(server_url);
    
        if (index_url >= 0) 
        {
            return true;
        }
        else
        {
            return false;
        }
    
    } // execApplicationOnServer


    // https://bobbyhadz.com/blog/get-browser-type-and-version-using-javascript#get-browser-name-chrome-firefox-safari-in-javascript

    // Returns the browser type
    static getBrowserType() 
    {

        var user_agent_str = navigator.userAgent;
        console.log("UtilServer.getBrowserType user_agent_str= " + user_agent_str);

        if (UtilServer.isOpera()) {
        return 'Opera';
        } else if (UtilServer.isEdge() || UtilServer.isEdgeChromium()) {
        return 'Microsoft Edge';
        } else if (UtilServer.isChrome()) {
        return 'Google Chrome';
        } else if (UtilServer.isFirefox()) {
        return 'Mozilla Firefox';
        } else if (UtilServer.isSafari()) {
        return 'Apple Safari';
        } else if (UtilServer.isInternetExplorer()) {
        return 'Microsoft Internet Explorer';
        } else if (UtilServer.isUCBrowser()) {
        return 'UC Browser';
        } else if (UtilServer.isSamsungBrowser()) {
        return 'Samsung browser';
        } else {
        return 'Unknown browser';
        }

    } // getBrowserType
  
    // Returns true if the browser is Opera
    static isOpera() 
    {
        return (
          !!window.opr ||
          !!window.opera ||
          navigator.userAgent.toLowerCase().includes('opr/')
        );

    } // isOpera

    // Returns true if the browser is Mozilla Firefox
    static isFirefox() 
    {
        return (
          navigator.userAgent.toLowerCase().includes('firefox') ||
          typeof InstallTrigger !== 'undefined'
        );

    } // isFirefox


    // Returns true if the browser is Apple Safari
    static isSafari() 
    {
        if (UtilServer.isChrome())
        {
            return false;
        }

        // String from iPhone     navigator.userAgent= 
        // Mozilla/5.0 (iPhone; CPU iPhone OS 12_5_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Mobile/15E148 Safari/604.1
        var user_agent_str = navigator.userAgent.toLowerCase();
        var ret_includes = user_agent_str.includes('safari');
        console.log("UtilServer.isSafari user_agent_str= " + user_agent_str);
        console.log("UtilServer.isSafari ret_includes= " + ret_includes);

        return ret_includes;

    } // isSafari

    // Returns true if the browser is Microsoft Internet Explorer
    static isInternetExplorer() 
    {
        return false || !!document.documentMode;

    } // isInternetExplorer
      
    // Returns true if the browser is Microsoft Edge
    static isEdge() 
    {
        return !UtilServer.isInternetExplorer() && !!window.StyleMedia;

    } // isEdge

    // Returns true if the browser is 
    static isChrome() 
    {
        const userAgent = navigator.userAgent.toLowerCase();

        console.log("UtilServer.isChrome user_agent_str= " + userAgent);
      
        return (
          userAgent.includes('chrome') ||
          userAgent.includes('chromium') ||
          userAgent.includes('crios')
        );

    } // isChrome
      
    // Returns true if the browser is Microsoft Edge
    static isEdgeChromium() 
    {
        console.log("UtilServer.isEdgeChromium user_agent_str= " + navigator.userAgent);
        
        return UtilServer.isChrome() && navigator.userAgent.includes('Edg');

    } // isEdgeChromium

    // Returns true if the browser is UC Browser
    static isUCBrowser() 
    {
        return navigator.userAgent.toLowerCase().includes('ucbrowser');

    } // isUCBrowser

    // Returns true if the browser is Samsung browser
    static isSamsungBrowser() 
    {
        return navigator.userAgent
          .toLowerCase()
          .includes('samsungbrowser');
    } // isSamsungBrowser

} // UtilServer

// Returns a compressed image file. 
// Input image file is returned uncompressed for Apple Safari
// TODO Convert to a member function in UtilServer
const compressImage = async (i_image_file, { quality = 1, type = file_type }) => 
{
    console.log("compressImage Enter quality= " + quality.toString() + ' type= ' + type);

    await UtilServer.appendDebugFile("compressImage Enter quality= " + quality.toString(), "CompressPhoto");

    if (UtilServer.isSafari())
    {
        console.log("compressImage Browser is Apple Safari and createImageBitmap is not implemented. Uncompressed input image is returned");

        await UtilServer.appendDebugFile("compressImage Browser is Apple Safari and createImageBitmap is not implemented. Uncompressed input image is returned", "CompressPhoto");

        return i_image_file;
    }

    // Get as image data
    const imageBitmap = await createImageBitmap(i_image_file);

    console.log("compressImage Bitmap= ");
    console.log(imageBitmap);

    await UtilServer.appendDebugFile("compressImage Bitmap created", "CompressPhoto");

    // Draw to canvas
    const canvas = document.createElement('canvas');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageBitmap, 0, 0);

    console.log("compressImage canvas= ");
    console.log(canvas);

    await UtilServer.appendDebugFile("compressImage canvas created", "CompressPhoto");

    // Turn into Blob
    const blob = await new Promise
    ((resolve) =>
        canvas.toBlob(resolve, type, quality)
    );

    console.log("compressImage blob= ");
    console.log(blob);

    await UtilServer.appendDebugFile("compressImage Blob created", "CompressPhoto");

    // Turn Blob into File
    var ret_file = new File([blob], i_image_file.name, {type: blob.type,});

    console.log("compressImage Returned file= ");
    console.log(ret_file);

    await UtilServer.appendDebugFile("compressImage File to return created", "CompressPhoto");

    return ret_file;
};


// File: UtilRandom.js
// Date: 2024-01-06
// Author: Gunnar Lidén

// File content
// =============
//
// Random functions
//
// Same as class Random (Random.js) in project WwwHomepage

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Random Class  /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class with random functions
class UtilRandom
{
    // Creates the instance of the class
    constructor()
    {
        // Member variables
        // ================

        // Seed table 0
        this.m_seed_table_0 = [];

        // Seed table 1
        this.m_seed_table_1 = [];

        // Seed value 1
        this.m_lSeed1;

        // Seed value 2
        this.m_lSeed2;

        // Initializations
        // ===============

        // Init seed tables
        this.initSeedTables();

        // Init seed values
        this.initSeedValues();
        
    } // constructor

    // Initialization of seed values m_lSeed1 and m_lSeed2
    initSeedValues()
    {
        var today=new Date();
        var ltime=today.getMilliseconds();
        
        if ( ltime < 1 )
        {
           ltime = 1;
        }
       
        this.m_lSeed1 = this.m_seed_table_0[ltime];
        this.m_lSeed2 = this.m_seed_table_1[ltime];
          
        // For debug
        var random_value = this.getUniform();

    } // initSeedValues

    // Returns a uniform random value between 0.0 and 1.0
    getUniform()
    {
    var  random_value =  -0.123456789;

    var    Z       =  0;  
    var    k       =  0; 

    k = Math.floor(this.m_lSeed1 / 53668);
    
    this.m_lSeed1 = 40014 * this.m_lSeed1 - k * 2147483563;

    if ( this.m_lSeed1 < 0 )
    {
        this.m_lSeed1 = this.m_lSeed1 + 2147483563;
    }
    
    k = Math.floor(this.m_lSeed2 / 52774);

    this.m_lSeed2 = 40692 * this.m_lSeed2 - k * 2147483399;

    if (  this.m_lSeed2 < 0  )
    {
        this.m_lSeed2 = this.m_lSeed2 + 2147483399;
    }
    
    Z = (this.m_lSeed1 - this.m_lSeed2);

    if (  Z < 1  )
    {
        Z = Z + 2147483562;
    }
        
    random_value = Z * 4.656613e-10;

    return random_value;
    
    } // getUniform
 
    // Initialisation of seed tables m_seed_table_0 and m_seed_table_1
    initSeedTables()
    {
		this.m_seed_table_0[   0]=     -12345; this.m_seed_table_1[   0]=     -12345; // Not used.
		this.m_seed_table_0[   1]= 1883545052; this.m_seed_table_1[   1]=  390024915;
		this.m_seed_table_0[   2]= 1204100045; this.m_seed_table_1[   2]= 1291679277;
		this.m_seed_table_0[   3]=  845088597; this.m_seed_table_1[   3]= 1514904766;
		this.m_seed_table_0[   4]=  656812099; this.m_seed_table_1[   4]=   22272323;
		this.m_seed_table_0[   5]=  726596746; this.m_seed_table_1[   5]=  527420064;
		this.m_seed_table_0[   6]= 1003281818; this.m_seed_table_1[   6]= 1646167670;
		this.m_seed_table_0[   7]= 1627246041; this.m_seed_table_1[   7]=  740196756;
		this.m_seed_table_0[   8]=  605145795; this.m_seed_table_1[   8]= 2001764376;
		this.m_seed_table_0[   9]=  249655736; this.m_seed_table_1[   9]= 1166114503;
		this.m_seed_table_0[  10]= 1624951455; this.m_seed_table_1[  10]= 1126636411;
		this.m_seed_table_0[  11]=  220055809; this.m_seed_table_1[  11]= 1440983212;
		this.m_seed_table_0[  12]= 1888180790; this.m_seed_table_1[  12]=  725525557;
		this.m_seed_table_0[  13]= 1875779574; this.m_seed_table_1[  13]= 1069220914;
		this.m_seed_table_0[  14]=   56420768; this.m_seed_table_1[  14]=  501509165;
		this.m_seed_table_0[  15]=   17015510; this.m_seed_table_1[  15]= 1474717889;
		this.m_seed_table_0[  16]= 2038335097; this.m_seed_table_1[  16]=  931164404;
		this.m_seed_table_0[  17]=  178145762; this.m_seed_table_1[  17]= 1242712709;
		this.m_seed_table_0[  18]= 1497686858; this.m_seed_table_1[  18]= 1284472618;
		this.m_seed_table_0[  19]=  657973339; this.m_seed_table_1[  19]=  208669762;
		this.m_seed_table_0[  20]= 1374006537; this.m_seed_table_1[  20]= 1073680611;
		this.m_seed_table_0[  21]= 1724418547; this.m_seed_table_1[  21]=  167890108;
		this.m_seed_table_0[  22]=  341198267; this.m_seed_table_1[  22]= 1955847699;
		this.m_seed_table_0[  23]=  106336914; this.m_seed_table_1[  23]=  429407526;
		this.m_seed_table_0[  24]= 1313085302; this.m_seed_table_1[  24]= 1270995410;
		this.m_seed_table_0[  25]=  487134787; this.m_seed_table_1[  25]=   50380526;
		this.m_seed_table_0[  26]= 1609858332; this.m_seed_table_1[  26]= 1052301799;
		this.m_seed_table_0[  27]= 1171358140; this.m_seed_table_1[  27]=   30301812;
		this.m_seed_table_0[  28]= 1382610677; this.m_seed_table_1[  28]= 1247580746;
		this.m_seed_table_0[  29]=  805059876; this.m_seed_table_1[  29]= 1854337591;
		this.m_seed_table_0[  30]=  238630950; this.m_seed_table_1[  30]=  210591218;
		this.m_seed_table_0[  31]= 1986747249; this.m_seed_table_1[  31]=  615776232;
		this.m_seed_table_0[  32]=  833533200; this.m_seed_table_1[  32]=  533843651;
		this.m_seed_table_0[  33]=  902622892; this.m_seed_table_1[  33]=  793811300;
		this.m_seed_table_0[  34]= 1705368487; this.m_seed_table_1[  34]= 1257405242;
		this.m_seed_table_0[  35]= 1951289701; this.m_seed_table_1[  35]=  257573367;
		this.m_seed_table_0[  36]=   54677829; this.m_seed_table_1[  36]= 1523627691;
		this.m_seed_table_0[  37]= 1296386278; this.m_seed_table_1[  37]= 1884072916;
		this.m_seed_table_0[  38]= 1671153482; this.m_seed_table_1[  38]= 1457219850;
		this.m_seed_table_0[  39]= 1322048457; this.m_seed_table_1[  39]= 1189895739;
		this.m_seed_table_0[  40]=  538435166; this.m_seed_table_1[  40]=  704566489;
		this.m_seed_table_0[  41]= 1578737324; this.m_seed_table_1[  41]=  827364879;
		this.m_seed_table_0[  42]= 1561211224; this.m_seed_table_1[  42]= 1966592957;
		this.m_seed_table_0[  43]=  696999042; this.m_seed_table_1[  43]= 2033730236;
		this.m_seed_table_0[  44]= 1817564667; this.m_seed_table_1[  44]= 1710634282;
		this.m_seed_table_0[  45]=  504277821; this.m_seed_table_1[  45]= 1480237238;
		this.m_seed_table_0[  46]=  520389520; this.m_seed_table_1[  46]=  969645890;
		this.m_seed_table_0[  47]= 1119545511; this.m_seed_table_1[  47]= 1978443587;
		this.m_seed_table_0[  48]= 1424790702; this.m_seed_table_1[  48]=  173330549;
		this.m_seed_table_0[  49]=  665701506; this.m_seed_table_1[  49]=  854912468;
		this.m_seed_table_0[  50]= 1717791818; this.m_seed_table_1[  50]= 1397379556;
		this.m_seed_table_0[  51]= 1994897024; this.m_seed_table_1[  51]= 1985885633;
		this.m_seed_table_0[  52]=  960372634; this.m_seed_table_1[  52]=  419136895;
		this.m_seed_table_0[  53]=  739392451; this.m_seed_table_1[  53]= 1931716670;
		this.m_seed_table_0[  54]= 1967292273; this.m_seed_table_1[  54]=  403436984;
		this.m_seed_table_0[  55]= 1222383405; this.m_seed_table_1[  55]=  414801352;
		this.m_seed_table_0[  56]=   11186465; this.m_seed_table_1[  56]=  334808268;
		this.m_seed_table_0[  57]=  169062950; this.m_seed_table_1[  57]=  288438438;
		this.m_seed_table_0[  58]= 1778217041; this.m_seed_table_1[  58]=  709568451;
		this.m_seed_table_0[  59]=  845304016; this.m_seed_table_1[  59]= 1191572332;
		this.m_seed_table_0[  60]= 1686059969; this.m_seed_table_1[  60]= 1950132937;
		this.m_seed_table_0[  61]= 1321705634; this.m_seed_table_1[  61]= 1918242037;
		this.m_seed_table_0[  62]= 1556769796; this.m_seed_table_1[  62]= 1914442686;
		this.m_seed_table_0[  63]=  539035944; this.m_seed_table_1[  63]=  248353509;
		this.m_seed_table_0[  64]= 1798236093; this.m_seed_table_1[  64]= 1010362676;
		this.m_seed_table_0[  65]= 1315569424; this.m_seed_table_1[  65]= 1823553232;
		this.m_seed_table_0[  66]=  659459085; this.m_seed_table_1[  66]= 2063403428;
		this.m_seed_table_0[  67]=  694704853; this.m_seed_table_1[  67]=  266358795;
		this.m_seed_table_0[  68]= 1992648045; this.m_seed_table_1[  68]=  820302705;
		this.m_seed_table_0[  69]=  573304469; this.m_seed_table_1[  69]= 1174890328;
		this.m_seed_table_0[  70]= 1685047035; this.m_seed_table_1[  70]=    3269736;
		this.m_seed_table_0[  71]=  629817089; this.m_seed_table_1[  71]= 2121795189;
		this.m_seed_table_0[  72]=  142521977; this.m_seed_table_1[  72]=    2831052;
		this.m_seed_table_0[  73]=  523569076; this.m_seed_table_1[  73]=  230732514;
		this.m_seed_table_0[  74]=  695205532; this.m_seed_table_1[  74]= 1306697577;
		this.m_seed_table_0[  75]=  324685824; this.m_seed_table_1[  75]= 1007736601;
		this.m_seed_table_0[  76]=   29191244; this.m_seed_table_1[  76]=  412727359;
		this.m_seed_table_0[  77]= 1984900328; this.m_seed_table_1[  77]=  936994889;
		this.m_seed_table_0[  78]=  658809129; this.m_seed_table_1[  78]= 1904289320;
		this.m_seed_table_0[  79]= 1967445164; this.m_seed_table_1[  79]=  156953064;
		this.m_seed_table_0[  80]= 2048809906; this.m_seed_table_1[  80]=   61079133;
		this.m_seed_table_0[  81]= 1909289115; this.m_seed_table_1[  81]= 1946878479;
		this.m_seed_table_0[  82]= 1913393636; this.m_seed_table_1[  82]= 1727087347;
		this.m_seed_table_0[  83]= 1159633056; this.m_seed_table_1[  83]= 1494561736;
		this.m_seed_table_0[  84]= 1887883795; this.m_seed_table_1[  84]=  619751396;
		this.m_seed_table_0[  85]= 2030157134; this.m_seed_table_1[  85]=  913975660;
		this.m_seed_table_0[  86]= 1036499937; this.m_seed_table_1[  86]=  173825807;
		this.m_seed_table_0[  87]= 1413884410; this.m_seed_table_1[  87]=  839049836;
		this.m_seed_table_0[  88]=  266333478; this.m_seed_table_1[  88]=  997753107;
		this.m_seed_table_0[  89]=  784788361; this.m_seed_table_1[  89]=  827501371;
		this.m_seed_table_0[  90]= 1276249572; this.m_seed_table_1[  90]=  607045612;
		this.m_seed_table_0[  91]=  842952722; this.m_seed_table_1[  91]=  493005157;
		this.m_seed_table_0[  92]= 1320757571; this.m_seed_table_1[  92]= 1169031454;
		this.m_seed_table_0[  93]=  538534725; this.m_seed_table_1[  93]= 1343638683;
		this.m_seed_table_0[  94]=  811002184; this.m_seed_table_1[  94]=  269327705;
		this.m_seed_table_0[  95]= 1673936278; this.m_seed_table_1[  95]= 1250875630;
		this.m_seed_table_0[  96]= 1204595166; this.m_seed_table_1[  96]= 2034805504;
		this.m_seed_table_0[  97]= 2072117095; this.m_seed_table_1[  97]=  349506968;
		this.m_seed_table_0[  98]=  610840928; this.m_seed_table_1[  98]= 1525587302;
		this.m_seed_table_0[  99]= 1117739873; this.m_seed_table_1[  99]= 1800521265;
		this.m_seed_table_0[ 100]= 1302614066; this.m_seed_table_1[ 100]=  336625985;
		this.m_seed_table_0[ 101]= 1650068147; this.m_seed_table_1[ 101]=  563568679;
		this.m_seed_table_0[ 102]= 2101050841; this.m_seed_table_1[ 102]=  985356689;
		this.m_seed_table_0[ 103]=  304228735; this.m_seed_table_1[ 103]= 1854537138;
		this.m_seed_table_0[ 104]=   81376553; this.m_seed_table_1[ 104]= 2107127829;
		this.m_seed_table_0[ 105]= 1504423158; this.m_seed_table_1[ 105]=  126228090;
		this.m_seed_table_0[ 106]= 1096104829; this.m_seed_table_1[ 106]=  134617222;
		this.m_seed_table_0[ 107]= 1117816048; this.m_seed_table_1[ 107]=   36563981;
		this.m_seed_table_0[ 108]= 1439628411; this.m_seed_table_1[ 108]=  971977858;
		this.m_seed_table_0[ 109]=  352625504; this.m_seed_table_1[ 109]= 1193371250;
		this.m_seed_table_0[ 110]=  338317602; this.m_seed_table_1[ 110]=  328010610;
		this.m_seed_table_0[ 111]= 1347663000; this.m_seed_table_1[ 111]=  954685990;
		this.m_seed_table_0[ 112]= 1083128162; this.m_seed_table_1[ 112]=  188718050;
		this.m_seed_table_0[ 113]= 1245779123; this.m_seed_table_1[ 113]= 1517460394;
		this.m_seed_table_0[ 114]= 1135464871; this.m_seed_table_1[ 114]=  894106412;
		this.m_seed_table_0[ 115]= 1538020103; this.m_seed_table_1[ 115]= 1458602745;
		this.m_seed_table_0[ 116]=  202059613; this.m_seed_table_1[ 116]= 1498803527;
		this.m_seed_table_0[ 117]= 1353718450; this.m_seed_table_1[ 117]= 1443667195;
		this.m_seed_table_0[ 118]=  972519273; this.m_seed_table_1[ 118]= 1233491822;
		this.m_seed_table_0[ 119]= 1943822680; this.m_seed_table_1[ 119]=  832197318;
		this.m_seed_table_0[ 120]= 1805424393; this.m_seed_table_1[ 120]=  163588672;
		this.m_seed_table_0[ 121]=  253595336; this.m_seed_table_1[ 121]=  278262282;
		this.m_seed_table_0[ 122]= 1499653367; this.m_seed_table_1[ 122]= 2006516214;
		this.m_seed_table_0[ 123]= 1712552138; this.m_seed_table_1[ 123]=  183521777;
		this.m_seed_table_0[ 124]= 1453521868; this.m_seed_table_1[ 124]= 1269162273;
		this.m_seed_table_0[ 125]= 1813061401; this.m_seed_table_1[ 125]=  883294368;
		this.m_seed_table_0[ 126]=  911541832; this.m_seed_table_1[ 126]=  369257195;
		this.m_seed_table_0[ 127]= 1683483366; this.m_seed_table_1[ 127]=  852837202;
		this.m_seed_table_0[ 128]=  371706184; this.m_seed_table_1[ 128]=  779014881;
		this.m_seed_table_0[ 129]= 1190851380; this.m_seed_table_1[ 129]=  265001845;
		this.m_seed_table_0[ 130]= 1433020740; this.m_seed_table_1[ 130]=  388572360;
		this.m_seed_table_0[ 131]= 1066729902; this.m_seed_table_1[ 131]= 1417657719;
		this.m_seed_table_0[ 132]= 1042903417; this.m_seed_table_1[ 132]= 1852251785;
		this.m_seed_table_0[ 133]= 1032781595; this.m_seed_table_1[ 133]=  561290058;
		this.m_seed_table_0[ 134]= 1492575398; this.m_seed_table_1[ 134]= 1106599388;
		this.m_seed_table_0[ 135]=  172437779; this.m_seed_table_1[ 135]=   22941915;
		this.m_seed_table_0[ 136]= 1949812205; this.m_seed_table_1[ 136]= 2080572835;
		this.m_seed_table_0[ 137]=   20069677; this.m_seed_table_1[ 137]= 1241711178;
		this.m_seed_table_0[ 138]= 1360551069; this.m_seed_table_1[ 138]= 1893935791;
		this.m_seed_table_0[ 139]= 1891607347; this.m_seed_table_1[ 139]= 1974579354;
		this.m_seed_table_0[ 140]=  685879019; this.m_seed_table_1[ 140]=  925371638;
		this.m_seed_table_0[ 141]=  655715936; this.m_seed_table_1[ 141]=  636982271;
		this.m_seed_table_0[ 142]=  368066441; this.m_seed_table_1[ 142]= 1025899555;
		this.m_seed_table_0[ 143]=  201926456; this.m_seed_table_1[ 143]=  738442583;
		this.m_seed_table_0[ 144]= 1877636215; this.m_seed_table_1[ 144]=  114070887;
		this.m_seed_table_0[ 145]=  780036793; this.m_seed_table_1[ 145]= 1301817155;
		this.m_seed_table_0[ 146]=  148144353; this.m_seed_table_1[ 146]= 1265854498;
		this.m_seed_table_0[ 147]= 1517469887; this.m_seed_table_1[ 147]= 1742366032;
		this.m_seed_table_0[ 148]=  674672028; this.m_seed_table_1[ 148]=  348620855;
		this.m_seed_table_0[ 149]=  252816043; this.m_seed_table_1[ 149]= 1072922784;
		this.m_seed_table_0[ 150]=   47774920; this.m_seed_table_1[ 150]= 1039625398;
		this.m_seed_table_0[ 151]= 1219950113; this.m_seed_table_1[ 151]= 2106394465;
		this.m_seed_table_0[ 152]= 1299688596; this.m_seed_table_1[ 152]=  255500284;
		this.m_seed_table_0[ 153]=   76233966; this.m_seed_table_1[ 153]= 1677442103;
		this.m_seed_table_0[ 154]= 1670646434; this.m_seed_table_1[ 154]= 1251134837;
		this.m_seed_table_0[ 155]= 1857521958; this.m_seed_table_1[ 155]=  683243293;
		this.m_seed_table_0[ 156]=  216054668; this.m_seed_table_1[ 156]= 1619465498;
		this.m_seed_table_0[ 157]=  817838514; this.m_seed_table_1[ 157]=  442674407;
		this.m_seed_table_0[ 158]=  916246922; this.m_seed_table_1[ 158]= 1705604620;
		this.m_seed_table_0[ 159]=  399939811; this.m_seed_table_1[ 159]=  109478446;
		this.m_seed_table_0[ 160]=  436440935; this.m_seed_table_1[ 160]= 1733529539;
		this.m_seed_table_0[ 161]= 1057918305; this.m_seed_table_1[ 161]= 1186083650;
		this.m_seed_table_0[ 162]=  234655488; this.m_seed_table_1[ 162]= 1189646781;
		this.m_seed_table_0[ 163]= 1632563007; this.m_seed_table_1[ 163]= 1204487158;
		this.m_seed_table_0[ 164]= 1536719431; this.m_seed_table_1[ 164]= 2008163523;
		this.m_seed_table_0[ 165]=  999008240; this.m_seed_table_1[ 165]= 1925120951;
		this.m_seed_table_0[ 166]=  727402784; this.m_seed_table_1[ 166]=  990006078;
		this.m_seed_table_0[ 167]= 1413666454; this.m_seed_table_1[ 167]= 1040170628;
		this.m_seed_table_0[ 168]= 1834733982; this.m_seed_table_1[ 168]=  906739625;
		this.m_seed_table_0[ 169]= 1261681175; this.m_seed_table_1[ 169]=  182991439;
		this.m_seed_table_0[ 170]=  930573800; this.m_seed_table_1[ 170]= 1861634385;
		this.m_seed_table_0[ 171]= 1229260735; this.m_seed_table_1[ 171]=  657240585;
		this.m_seed_table_0[ 172]= 1692505433; this.m_seed_table_1[ 172]=  503511872;
		this.m_seed_table_0[ 173]=  105252853; this.m_seed_table_1[ 173]= 1410052801;
		this.m_seed_table_0[ 174]=  569520009; this.m_seed_table_1[ 174]= 1781029757;
		this.m_seed_table_0[ 175]=   54674356; this.m_seed_table_1[ 175]= 1389698650;
		this.m_seed_table_0[ 176]=  723350402; this.m_seed_table_1[ 176]=  445653863;
		this.m_seed_table_0[ 177]= 1991698095; this.m_seed_table_1[ 177]= 1673890053;
		this.m_seed_table_0[ 178]= 1133356490; this.m_seed_table_1[ 178]= 1938126006;
		this.m_seed_table_0[ 179]=  269982512; this.m_seed_table_1[ 179]= 1685491857;
		this.m_seed_table_0[ 180]=  332504067; this.m_seed_table_1[ 180]=  989302499;
		this.m_seed_table_0[ 181]= 1056818007; this.m_seed_table_1[ 181]= 1113281736;
		this.m_seed_table_0[ 182]= 1933711224; this.m_seed_table_1[ 182]=  950856872;
		this.m_seed_table_0[ 183]= 1616007892; this.m_seed_table_1[ 183]=   99118028;
		this.m_seed_table_0[ 184]= 1616245737; this.m_seed_table_1[ 184]=  434594785;
		this.m_seed_table_0[ 185]= 1881951630; this.m_seed_table_1[ 185]=  381904890;
		this.m_seed_table_0[ 186]=  718249905; this.m_seed_table_1[ 186]=  847566046;
		this.m_seed_table_0[ 187]= 1764240143; this.m_seed_table_1[ 187]= 1124913463;
		this.m_seed_table_0[ 188]=  982372446; this.m_seed_table_1[ 188]=  864303813;
		this.m_seed_table_0[ 189]= 1271030691; this.m_seed_table_1[ 189]=  311352650;
		this.m_seed_table_0[ 190]= 1997068306; this.m_seed_table_1[ 190]=  456460236;
		this.m_seed_table_0[ 191]= 1918959102; this.m_seed_table_1[ 191]= 1590487475;
		this.m_seed_table_0[ 192]= 1736836419; this.m_seed_table_1[ 192]=  152301551;
		this.m_seed_table_0[ 193]= 1261184776; this.m_seed_table_1[ 193]= 1865339017;
		this.m_seed_table_0[ 194]=  577859671; this.m_seed_table_1[ 194]=  405562248;
		this.m_seed_table_0[ 195]=  620883805; this.m_seed_table_1[ 195]= 2045403252;
		this.m_seed_table_0[ 196]= 1296852499; this.m_seed_table_1[ 196]=  416501822;
		this.m_seed_table_0[ 197]= 2132251743; this.m_seed_table_1[ 197]=  734904884;
		this.m_seed_table_0[ 198]=  879578081; this.m_seed_table_1[ 198]=  670467666;
		this.m_seed_table_0[ 199]=   21029363; this.m_seed_table_1[ 199]=  135354617;
		this.m_seed_table_0[ 200]= 2064354906; this.m_seed_table_1[ 200]=     197831;
		this.m_seed_table_0[ 201]=  404046883; this.m_seed_table_1[ 201]=  839981766;
		this.m_seed_table_0[ 202]= 2005592523; this.m_seed_table_1[ 202]=  437765226;
		this.m_seed_table_0[ 203]=  886009488; this.m_seed_table_1[ 203]=  631764177;
		this.m_seed_table_0[ 204]= 2024269196; this.m_seed_table_1[ 204]= 1332166495;
		this.m_seed_table_0[ 205]=  334001136; this.m_seed_table_1[ 205]= 1061282638;
		this.m_seed_table_0[ 206]= 1689896830; this.m_seed_table_1[ 206]= 1925702286;
		this.m_seed_table_0[ 207]= 1598981924; this.m_seed_table_1[ 207]=  962384760;
		this.m_seed_table_0[ 208]=  411045622; this.m_seed_table_1[ 208]=  889266135;
		this.m_seed_table_0[ 209]=   39253023; this.m_seed_table_1[ 209]=  520599144;
		this.m_seed_table_0[ 210]=  695971220; this.m_seed_table_1[ 210]=  341600737;
		this.m_seed_table_0[ 211]= 1571667980; this.m_seed_table_1[ 211]=  505748757;
		this.m_seed_table_0[ 212]= 1031768588; this.m_seed_table_1[ 212]=  175051873;
		this.m_seed_table_0[ 213]= 1833631167; this.m_seed_table_1[ 213]= 1703152511;
		this.m_seed_table_0[ 214]=    9639476; this.m_seed_table_1[ 214]= 1397656217;
		this.m_seed_table_0[ 215]=   84025604; this.m_seed_table_1[ 215]= 1672162615;
		this.m_seed_table_0[ 216]= 1405766916; this.m_seed_table_1[ 216]=   81134286;
		this.m_seed_table_0[ 217]= 1662384835; this.m_seed_table_1[ 217]= 1369989055;
		this.m_seed_table_0[ 218]= 2042208569; this.m_seed_table_1[ 218]= 1327160117;
		this.m_seed_table_0[ 219]=   44415130; this.m_seed_table_1[ 219]= 1372033683;
		this.m_seed_table_0[ 220]=  907384246; this.m_seed_table_1[ 220]= 1895721808;
		this.m_seed_table_0[ 221]= 2036624638; this.m_seed_table_1[ 221]=  547369899;
		this.m_seed_table_0[ 222]= 1135353062; this.m_seed_table_1[ 222]=  505985185;
		this.m_seed_table_0[ 223]=  372341245; this.m_seed_table_1[ 223]=   67185546;
		this.m_seed_table_0[ 224]=   51306219; this.m_seed_table_1[ 224]= 1586871467;
		this.m_seed_table_0[ 225]= 1085192829; this.m_seed_table_1[ 225]= 1844044765;
		this.m_seed_table_0[ 226]= 1205619265; this.m_seed_table_1[ 226]= 2049089757;
		this.m_seed_table_0[ 227]= 1311084721; this.m_seed_table_1[ 227]= 1339400518;
		this.m_seed_table_0[ 228]= 1630252150; this.m_seed_table_1[ 228]=  764412481;
		this.m_seed_table_0[ 229]= 2074952178; this.m_seed_table_1[ 229]=  263390118;
		this.m_seed_table_0[ 230]=  488624121; this.m_seed_table_1[ 230]= 1815923115;
		this.m_seed_table_0[ 231]=  199944895; this.m_seed_table_1[ 231]=  699654180;
		this.m_seed_table_0[ 232]=  383119947; this.m_seed_table_1[ 232]= 1842232588;
		this.m_seed_table_0[ 233]=  629252052; this.m_seed_table_1[ 233]= 1545773104;
		this.m_seed_table_0[ 234]= 1438041703; this.m_seed_table_1[ 234]= 1343624234;
		this.m_seed_table_0[ 235]= 1383288323; this.m_seed_table_1[ 235]=  712513982;
		this.m_seed_table_0[ 236]= 2063677200; this.m_seed_table_1[ 236]= 1580357018;
		this.m_seed_table_0[ 237]=  759282045; this.m_seed_table_1[ 237]= 1207418791;
		this.m_seed_table_0[ 238]=  748475088; this.m_seed_table_1[ 238]= 1060689454;
		this.m_seed_table_0[ 239]=  309295079; this.m_seed_table_1[ 239]=  808663084;
		this.m_seed_table_0[ 240]= 1034509466; this.m_seed_table_1[ 240]=  232976150;
		this.m_seed_table_0[ 241]= 1205786820; this.m_seed_table_1[ 241]=  122342760;
		this.m_seed_table_0[ 242]=  271958960; this.m_seed_table_1[ 242]=  315178243;
		this.m_seed_table_0[ 243]=  984625441; this.m_seed_table_1[ 243]=  241597507;
		this.m_seed_table_0[ 244]=  725419468; this.m_seed_table_1[ 244]=  328321615;
		this.m_seed_table_0[ 245]=  953438797; this.m_seed_table_1[ 245]=  176846575;
		this.m_seed_table_0[ 246]= 1617144426; this.m_seed_table_1[ 246]=  468655590;
		this.m_seed_table_0[ 247]= 2076568646; this.m_seed_table_1[ 247]=  459789588;
		this.m_seed_table_0[ 248]= 2145980808; this.m_seed_table_1[ 248]= 1042793138;
		this.m_seed_table_0[ 249]=  837167790; this.m_seed_table_1[ 249]=  782079326;
		this.m_seed_table_0[ 250]= 1409226725; this.m_seed_table_1[ 250]=  667929245;
		this.m_seed_table_0[ 251]=  287592172; this.m_seed_table_1[ 251]= 1987655797;
		this.m_seed_table_0[ 252]=  621788832; this.m_seed_table_1[ 252]= 1108594679;
		this.m_seed_table_0[ 253]= 1238715671; this.m_seed_table_1[ 253]=  648264907;
		this.m_seed_table_0[ 254]= 1898485197; this.m_seed_table_1[ 254]= 1802048950;
		this.m_seed_table_0[ 255]= 1981205674; this.m_seed_table_1[ 255]=   77638163;
		this.m_seed_table_0[ 256]=  532163430; this.m_seed_table_1[ 256]=  263533778;
		this.m_seed_table_0[ 257]=  572695929; this.m_seed_table_1[ 257]=  294479396;
		this.m_seed_table_0[ 258]=  363537981; this.m_seed_table_1[ 258]=  541474587;
		this.m_seed_table_0[ 259]=   90540143; this.m_seed_table_1[ 259]= 1539277220;
		this.m_seed_table_0[ 260]=  888663404; this.m_seed_table_1[ 260]=   19853123;
		this.m_seed_table_0[ 261]=  276001588; this.m_seed_table_1[ 261]= 1480361314;
		this.m_seed_table_0[ 262]=  485887113; this.m_seed_table_1[ 262]= 1040963728;
		this.m_seed_table_0[ 263]= 1960998482; this.m_seed_table_1[ 263]= 1801048168;
		this.m_seed_table_0[ 264]=  378241007; this.m_seed_table_1[ 264]=  598881270;
		this.m_seed_table_0[ 265]=  831173578; this.m_seed_table_1[ 265]= 1054029534;
		this.m_seed_table_0[ 266]= 2060748424; this.m_seed_table_1[ 266]=  129164183;
		this.m_seed_table_0[ 267]= 1779880610; this.m_seed_table_1[ 267]=   81058758;
		this.m_seed_table_0[ 268]=  540963044; this.m_seed_table_1[ 268]=   99106561;
		this.m_seed_table_0[ 269]=  641072193; this.m_seed_table_1[ 269]= 1489906810;
		this.m_seed_table_0[ 270]=  855519879; this.m_seed_table_1[ 270]=  841950630;
		this.m_seed_table_0[ 271]=  845964379; this.m_seed_table_1[ 271]= 1277088175;
		this.m_seed_table_0[ 272]= 1596204358; this.m_seed_table_1[ 272]=  142431793;
		this.m_seed_table_0[ 273]=  156616666; this.m_seed_table_1[ 273]=  885677891;
		this.m_seed_table_0[ 274]=  423863737; this.m_seed_table_1[ 274]=   34571013;
		this.m_seed_table_0[ 275]= 1672241160; this.m_seed_table_1[ 275]=   58707429;
		this.m_seed_table_0[ 276]=  483390510; this.m_seed_table_1[ 276]=  892345066;
		this.m_seed_table_0[ 277]=  270386637; this.m_seed_table_1[ 277]=  384233977;
		this.m_seed_table_0[ 278]=  567454300; this.m_seed_table_1[ 278]=  464905785;
		this.m_seed_table_0[ 279]=  777448352; this.m_seed_table_1[ 279]=  283511752;
		this.m_seed_table_0[ 280]=  642666492; this.m_seed_table_1[ 280]= 1806484516;
		this.m_seed_table_0[ 281]= 1875624873; this.m_seed_table_1[ 281]=  610804621;
		this.m_seed_table_0[ 282]= 2101561584; this.m_seed_table_1[ 282]=  674711837;
		this.m_seed_table_0[ 283]= 1671981026; this.m_seed_table_1[ 283]=  116986700;
		this.m_seed_table_0[ 284]=  660654333; this.m_seed_table_1[ 284]= 2037053353;
		this.m_seed_table_0[ 285]=  579529992; this.m_seed_table_1[ 285]= 1745363832;
		this.m_seed_table_0[ 286]= 1383611501; this.m_seed_table_1[ 286]= 1364603261;
		this.m_seed_table_0[ 287]= 1524501457; this.m_seed_table_1[ 287]= 2044084011;
		this.m_seed_table_0[ 288]= 1185788326; this.m_seed_table_1[ 288]= 1343474344;
		this.m_seed_table_0[ 289]= 1465458303; this.m_seed_table_1[ 289]=   17469842;
		this.m_seed_table_0[ 290]=  946082853; this.m_seed_table_1[ 290]=  780179767;
		this.m_seed_table_0[ 291]= 1888741122; this.m_seed_table_1[ 291]=  547981324;
		this.m_seed_table_0[ 292]=  789576002; this.m_seed_table_1[ 292]= 1487258195;
		this.m_seed_table_0[ 293]= 1575005790; this.m_seed_table_1[ 293]=  460306600;
		this.m_seed_table_0[ 294]=  562659626; this.m_seed_table_1[ 294]=  182075019;
		this.m_seed_table_0[ 295]= 1887454843; this.m_seed_table_1[ 295]=  325284932;
		this.m_seed_table_0[ 296]=  496172621; this.m_seed_table_1[ 296]= 1722189287;
		this.m_seed_table_0[ 297]= 1521038485; this.m_seed_table_1[ 297]=  206092861;
		this.m_seed_table_0[ 298]=  807585812; this.m_seed_table_1[ 298]= 1944803638;
		this.m_seed_table_0[ 299]=  569048054; this.m_seed_table_1[ 299]= 1571881551;
		this.m_seed_table_0[ 300]= 1066414559; this.m_seed_table_1[ 300]= 1000695719;
		this.m_seed_table_0[ 301]= 1651145131; this.m_seed_table_1[ 301]=  556600053;
		this.m_seed_table_0[ 302]=  139744544; this.m_seed_table_1[ 302]=  916129073;
		this.m_seed_table_0[ 303]= 1917310446; this.m_seed_table_1[ 303]= 1006275219;
		this.m_seed_table_0[ 304]=  564833070; this.m_seed_table_1[ 304]= 1237194450;
		this.m_seed_table_0[ 305]=  671294941; this.m_seed_table_1[ 305]=  968515820;
		this.m_seed_table_0[ 306]=  113667388; this.m_seed_table_1[ 306]=  295543606;
		this.m_seed_table_0[ 307]= 1074612316; this.m_seed_table_1[ 307]= 1494898848;
		this.m_seed_table_0[ 308]=  529282736; this.m_seed_table_1[ 308]=  517141651;
		this.m_seed_table_0[ 309]=  518149939; this.m_seed_table_1[ 309]=     823794;
		this.m_seed_table_0[ 310]= 1925105673; this.m_seed_table_1[ 310]= 1379054277;
		this.m_seed_table_0[ 311]= 1761510606; this.m_seed_table_1[ 311]= 1864942412;
		this.m_seed_table_0[ 312]= 1579448129; this.m_seed_table_1[ 312]= 1755411296;
		this.m_seed_table_0[ 313]=  626692311; this.m_seed_table_1[ 313]=  958629250;
		this.m_seed_table_0[ 314]=  203895968; this.m_seed_table_1[ 314]=  963476172;
		this.m_seed_table_0[ 315]= 1830538277; this.m_seed_table_1[ 315]= 1589016407;
		this.m_seed_table_0[ 316]= 1212471870; this.m_seed_table_1[ 316]= 1062517198;
		this.m_seed_table_0[ 317]= 1956297171; this.m_seed_table_1[ 317]=  808789523;
		this.m_seed_table_0[ 318]=  876120161; this.m_seed_table_1[ 318]= 1247369972;
		this.m_seed_table_0[ 319]= 2054388985; this.m_seed_table_1[ 319]= 1956803334;
		this.m_seed_table_0[ 320]=  901387158; this.m_seed_table_1[ 320]= 1676237679;
		this.m_seed_table_0[ 321]=  874914810; this.m_seed_table_1[ 321]=  819774574;
		this.m_seed_table_0[ 322]= 1686091944; this.m_seed_table_1[ 322]=  271678821;
		this.m_seed_table_0[ 323]= 2055813139; this.m_seed_table_1[ 323]=  702018580;
		this.m_seed_table_0[ 324]= 1042464792; this.m_seed_table_1[ 324]=  161672783;
		this.m_seed_table_0[ 325]= 1050111596; this.m_seed_table_1[ 325]= 1714730653;
		this.m_seed_table_0[ 326]= 1358061464; this.m_seed_table_1[ 326]= 1200167808;
		this.m_seed_table_0[ 327]= 1523216379; this.m_seed_table_1[ 327]= 1242095064;
		this.m_seed_table_0[ 328]=  872273914; this.m_seed_table_1[ 328]= 1078821853;
		this.m_seed_table_0[ 329]= 1120707296; this.m_seed_table_1[ 329]=  578785079;
		this.m_seed_table_0[ 330]=  655855717; this.m_seed_table_1[ 330]= 1490052965;
		this.m_seed_table_0[ 331]= 1633956801; this.m_seed_table_1[ 331]=  675238406;
		this.m_seed_table_0[ 332]=   95917478; this.m_seed_table_1[ 332]=   85994225;
		this.m_seed_table_0[ 333]=   36893385; this.m_seed_table_1[ 333]=  860869201;
		this.m_seed_table_0[ 334]= 1139132848; this.m_seed_table_1[ 334]=  899622017;
		this.m_seed_table_0[ 335]= 1449789079; this.m_seed_table_1[ 335]=  948905532;
		this.m_seed_table_0[ 336]=  569101221; this.m_seed_table_1[ 336]= 1915054409;
		this.m_seed_table_0[ 337]= 1729961629; this.m_seed_table_1[ 337]=  629701540;
		this.m_seed_table_0[ 338]= 1411240292; this.m_seed_table_1[ 338]= 1167359961;
		this.m_seed_table_0[ 339]= 1753974946; this.m_seed_table_1[ 339]= 1361011985;
		this.m_seed_table_0[ 340]=  638776178; this.m_seed_table_1[ 340]= 1017763405;
		this.m_seed_table_0[ 341]= 1039723107; this.m_seed_table_1[ 341]=  911984205;
		this.m_seed_table_0[ 342]= 2124184606; this.m_seed_table_1[ 342]= 1424797003;
		this.m_seed_table_0[ 343]= 1927687522; this.m_seed_table_1[ 343]=   95844103;
		this.m_seed_table_0[ 344]=  907108150; this.m_seed_table_1[ 344]= 2054658805;
		this.m_seed_table_0[ 345]= 1912566649; this.m_seed_table_1[ 345]= 1831839838;
		this.m_seed_table_0[ 346]=  940905332; this.m_seed_table_1[ 346]=  998659272;
		this.m_seed_table_0[ 347]=   93717240; this.m_seed_table_1[ 347]=  561232944;
		this.m_seed_table_0[ 348]=  104970142; this.m_seed_table_1[ 348]=  353350605;
		this.m_seed_table_0[ 349]= 1205304654; this.m_seed_table_1[ 349]=  641937785;
		this.m_seed_table_0[ 350]=  269188035; this.m_seed_table_1[ 350]= 1720157597;
		this.m_seed_table_0[ 351]= 1132170195; this.m_seed_table_1[ 351]= 1493995407;
		this.m_seed_table_0[ 352]= 1020204187; this.m_seed_table_1[ 352]= 1079000827;
		this.m_seed_table_0[ 353]= 1312931265; this.m_seed_table_1[ 353]= 1065129585;
		this.m_seed_table_0[ 354]= 2138507737; this.m_seed_table_1[ 354]= 1440650254;
		this.m_seed_table_0[ 355]=  677633529; this.m_seed_table_1[ 355]= 1646274522;
		this.m_seed_table_0[ 356]= 1268004538; this.m_seed_table_1[ 356]= 2020222424;
		this.m_seed_table_0[ 357]=  356876958; this.m_seed_table_1[ 357]=   79306061;
		this.m_seed_table_0[ 358]=  464261583; this.m_seed_table_1[ 358]=  471760987;
		this.m_seed_table_0[ 359]= 1709866406; this.m_seed_table_1[ 359]=  182243515;
		this.m_seed_table_0[ 360]=  982701515; this.m_seed_table_1[ 360]=  574928327;
		this.m_seed_table_0[ 361]= 1979632666; this.m_seed_table_1[ 361]= 1673471059;
		this.m_seed_table_0[ 362]= 1717853594; this.m_seed_table_1[ 362]=  964894650;
		this.m_seed_table_0[ 363]=  806668350; this.m_seed_table_1[ 363]= 1930111696;
		this.m_seed_table_0[ 364]= 1164418559; this.m_seed_table_1[ 364]= 2050359191;
		this.m_seed_table_0[ 365]= 1138865113; this.m_seed_table_1[ 365]= 1573918743;
		this.m_seed_table_0[ 366]= 1276916212; this.m_seed_table_1[ 366]=  569992080;
		this.m_seed_table_0[ 367]= 2069510509; this.m_seed_table_1[ 367]= 1602810798;
		this.m_seed_table_0[ 368]= 2040397501; this.m_seed_table_1[ 368]=  414879411;
		this.m_seed_table_0[ 369]= 2094489756; this.m_seed_table_1[ 369]= 1706111597;
		this.m_seed_table_0[ 370]= 1813537570; this.m_seed_table_1[ 370]=  995546164;
		this.m_seed_table_0[ 371]= 1372349864; this.m_seed_table_1[ 371]= 1308338388;
		this.m_seed_table_0[ 372]=  940569071; this.m_seed_table_1[ 372]= 1519169611;
		this.m_seed_table_0[ 373]=  131374867; this.m_seed_table_1[ 373]=  281150936;
		this.m_seed_table_0[ 374]=  153245649; this.m_seed_table_1[ 374]= 1258612735;
		this.m_seed_table_0[ 375]=  941217224; this.m_seed_table_1[ 375]= 1133119815;
		this.m_seed_table_0[ 376]= 2042998581; this.m_seed_table_1[ 376]=  937491993;
		this.m_seed_table_0[ 377]= 1588589464; this.m_seed_table_1[ 377]= 1040228304;
		this.m_seed_table_0[ 378]= 1973200569; this.m_seed_table_1[ 378]= 1883374451;
		this.m_seed_table_0[ 379]= 1094048846; this.m_seed_table_1[ 379]= 1828264696;
		this.m_seed_table_0[ 380]=  510109899; this.m_seed_table_1[ 380]= 1188589547;
		this.m_seed_table_0[ 381]=  481058687; this.m_seed_table_1[ 381]= 1052200979;
		this.m_seed_table_0[ 382]=  240627148; this.m_seed_table_1[ 382]= 1423022436;
		this.m_seed_table_0[ 383]=  409209667; this.m_seed_table_1[ 383]=  105617834;
		this.m_seed_table_0[ 384]=  256662292; this.m_seed_table_1[ 384]=  161032752;
		this.m_seed_table_0[ 385]= 1070827097; this.m_seed_table_1[ 385]=  513129195;
		this.m_seed_table_0[ 386]= 1490030432; this.m_seed_table_1[ 386]=  196929832;
		this.m_seed_table_0[ 387]= 2032801866; this.m_seed_table_1[ 387]=  661502003;
		this.m_seed_table_0[ 388]= 1215795529; this.m_seed_table_1[ 388]=  145335847;
		this.m_seed_table_0[ 389]=  506467887; this.m_seed_table_1[ 389]= 1635443717;
		this.m_seed_table_0[ 390]= 1180526151; this.m_seed_table_1[ 390]=   95722386;
		this.m_seed_table_0[ 391]=  751826851; this.m_seed_table_1[ 391]=  441082870;
		this.m_seed_table_0[ 392]=  563162379; this.m_seed_table_1[ 392]= 1184970565;
		this.m_seed_table_0[ 393]=  554895469; this.m_seed_table_1[ 393]=  660036410;
		this.m_seed_table_0[ 394]= 1786926689; this.m_seed_table_1[ 394]=  705999997;
		this.m_seed_table_0[ 395]=  850248512; this.m_seed_table_1[ 395]= 1479708974;
		this.m_seed_table_0[ 396]= 1702414175; this.m_seed_table_1[ 396]=  644057901;
		this.m_seed_table_0[ 397]=   55785872; this.m_seed_table_1[ 397]=  181094962;
		this.m_seed_table_0[ 398]= 2087175242; this.m_seed_table_1[ 398]=   62662267;
		this.m_seed_table_0[ 399]=  116478317; this.m_seed_table_1[ 399]=  323472293;
		this.m_seed_table_0[ 400]= 1809244122; this.m_seed_table_1[ 400]=  851820045;
		this.m_seed_table_0[ 401]= 1634903409; this.m_seed_table_1[ 401]=  129595807;
		this.m_seed_table_0[ 402]=  521629419; this.m_seed_table_1[ 402]=  518569226;
		this.m_seed_table_0[ 403]= 1232970467; this.m_seed_table_1[ 403]=  973517479;
		this.m_seed_table_0[ 404]= 1273421382; this.m_seed_table_1[ 404]= 1911104385;
		this.m_seed_table_0[ 405]= 1890406912; this.m_seed_table_1[ 405]= 1927507689;
		this.m_seed_table_0[ 406]=  946918056; this.m_seed_table_1[ 406]=  546155580;
		this.m_seed_table_0[ 407]= 2021744277; this.m_seed_table_1[ 407]=  761284235;
		this.m_seed_table_0[ 408]=  351322357; this.m_seed_table_1[ 408]=  167211938;
		this.m_seed_table_0[ 409]=   60949042; this.m_seed_table_1[ 409]= 1731296241;
		this.m_seed_table_0[ 410]=  406880691; this.m_seed_table_1[ 410]= 1519782703;
		this.m_seed_table_0[ 411]=  744262254; this.m_seed_table_1[ 411]= 1401533035;
		this.m_seed_table_0[ 412]= 1498173289; this.m_seed_table_1[ 412]= 1952288963;
		this.m_seed_table_0[ 413]=  117272817; this.m_seed_table_1[ 413]= 1187117669;
		this.m_seed_table_0[ 414]= 2037338606; this.m_seed_table_1[ 414]=  119638890;
		this.m_seed_table_0[ 415]= 1953829326; this.m_seed_table_1[ 415]=  503843462;
		this.m_seed_table_0[ 416]=   48584594; this.m_seed_table_1[ 416]=  908474138;
		this.m_seed_table_0[ 417]=  897131145; this.m_seed_table_1[ 417]= 1539250325;
		this.m_seed_table_0[ 418]= 1039881918; this.m_seed_table_1[ 418]= 1507507867;
		this.m_seed_table_0[ 419]= 1199293775; this.m_seed_table_1[ 419]=  155876116;
		this.m_seed_table_0[ 420]= 1328544347; this.m_seed_table_1[ 420]= 1258824341;
		this.m_seed_table_0[ 421]= 2057322305; this.m_seed_table_1[ 421]=  436643761;
		this.m_seed_table_0[ 422]= 1067082407; this.m_seed_table_1[ 422]=  974496686;
		this.m_seed_table_0[ 423]= 1022905032; this.m_seed_table_1[ 423]= 1247409292;
		this.m_seed_table_0[ 424]=  654521845; this.m_seed_table_1[ 424]=  872189141;
		this.m_seed_table_0[ 425]=  644463098; this.m_seed_table_1[ 425]= 2113085411;
		this.m_seed_table_0[ 426]= 2127587545; this.m_seed_table_1[ 426]= 1544067338;
		this.m_seed_table_0[ 427]= 1923607171; this.m_seed_table_1[ 427]=  305771642;
		this.m_seed_table_0[ 428]= 1518984021; this.m_seed_table_1[ 428]= 1255162665;
		this.m_seed_table_0[ 429]= 1504774846; this.m_seed_table_1[ 429]= 1767335185;
		this.m_seed_table_0[ 430]= 1075482667; this.m_seed_table_1[ 430]=  923076903;
		this.m_seed_table_0[ 431]= 1448757450; this.m_seed_table_1[ 431]= 1231227499;
		this.m_seed_table_0[ 432]= 2005165666; this.m_seed_table_1[ 432]= 1715032588;
		this.m_seed_table_0[ 433]=  625817946; this.m_seed_table_1[ 433]=  997480401;
		this.m_seed_table_0[ 434]=  306471130; this.m_seed_table_1[ 434]= 1257417672;
		this.m_seed_table_0[ 435]=  466046353; this.m_seed_table_1[ 435]=    9185571;
		this.m_seed_table_0[ 436]= 1348237592; this.m_seed_table_1[ 436]=  423045133;
		this.m_seed_table_0[ 437]= 1553369382; this.m_seed_table_1[ 437]= 1739468964;
		this.m_seed_table_0[ 438]= 1704212119; this.m_seed_table_1[ 438]= 1244619816;
		this.m_seed_table_0[ 439]= 2114548815; this.m_seed_table_1[ 439]= 1126087970;
		this.m_seed_table_0[ 440]= 1152551707; this.m_seed_table_1[ 440]=  940169651;
		this.m_seed_table_0[ 441]= 1782977689; this.m_seed_table_1[ 441]=  971428308;
		this.m_seed_table_0[ 442]= 1841031348; this.m_seed_table_1[ 442]=  438983961;
		this.m_seed_table_0[ 443]=  794303648; this.m_seed_table_1[ 443]= 1848990028;
		this.m_seed_table_0[ 444]= 1042034852; this.m_seed_table_1[ 444]= 1278580601;
		this.m_seed_table_0[ 445]=  464260834; this.m_seed_table_1[ 445]= 1447360924;
		this.m_seed_table_0[ 446]=  452872095; this.m_seed_table_1[ 446]=  281953495;
		this.m_seed_table_0[ 447]=  379080956; this.m_seed_table_1[ 447]= 1147755410;
		this.m_seed_table_0[ 448]=  439472020; this.m_seed_table_1[ 448]= 1137873573;
		this.m_seed_table_0[ 449]= 1894926072; this.m_seed_table_1[ 449]= 1061971702;
		this.m_seed_table_0[ 450]= 2097346391; this.m_seed_table_1[ 450]= 1016208000;
		this.m_seed_table_0[ 451]=  527579664; this.m_seed_table_1[ 451]=  622650677;
		this.m_seed_table_0[ 452]=  852785965; this.m_seed_table_1[ 452]= 1176552502;
		this.m_seed_table_0[ 453]= 1276731307; this.m_seed_table_1[ 453]= 2078419177;
		this.m_seed_table_0[ 454]=  913735550; this.m_seed_table_1[ 454]=  116999784;
		this.m_seed_table_0[ 455]=  177896734; this.m_seed_table_1[ 455]= 1192683690;
		this.m_seed_table_0[ 456]= 1880567492; this.m_seed_table_1[ 456]= 1567840787;
		this.m_seed_table_0[ 457]= 1995571759; this.m_seed_table_1[ 457]=  376548330;
		this.m_seed_table_0[ 458]=  989258454; this.m_seed_table_1[ 458]= 1140290487;
		this.m_seed_table_0[ 459]= 2036372188; this.m_seed_table_1[ 459]=  300871599;
		this.m_seed_table_0[ 460]= 1076661701; this.m_seed_table_1[ 460]= 1054665010;
		this.m_seed_table_0[ 461]=  508997104; this.m_seed_table_1[ 461]= 2076571634;
		this.m_seed_table_0[ 462]= 2094346535; this.m_seed_table_1[ 462]= 1803769636;
		this.m_seed_table_0[ 463]= 1449224386; this.m_seed_table_1[ 463]=  725779402;
		this.m_seed_table_0[ 464]=   56476379; this.m_seed_table_1[ 464]= 2095300070;
		this.m_seed_table_0[ 465]=  369637203; this.m_seed_table_1[ 465]= 2071047382;
		this.m_seed_table_0[ 466]= 1732389292; this.m_seed_table_1[ 466]= 1035368996;
		this.m_seed_table_0[ 467]= 1992560119; this.m_seed_table_1[ 467]=  927612716;
		this.m_seed_table_0[ 468]= 1473460815; this.m_seed_table_1[ 468]=  292939614;
		this.m_seed_table_0[ 469]=  479472147; this.m_seed_table_1[ 469]=  183893595;
		this.m_seed_table_0[ 470]=  188476707; this.m_seed_table_1[ 470]= 1213155266;
		this.m_seed_table_0[ 471]= 2049191454; this.m_seed_table_1[ 471]=  632738463;
		this.m_seed_table_0[ 472]=  455276607; this.m_seed_table_1[ 472]=  565707578;
		this.m_seed_table_0[ 473]= 1539394305; this.m_seed_table_1[ 473]= 2139627293;
		this.m_seed_table_0[ 474]= 1608734479; this.m_seed_table_1[ 474]= 1055482538;
		this.m_seed_table_0[ 475]=  428953763; this.m_seed_table_1[ 475]=  345965313;
		this.m_seed_table_0[ 476]=    4442359; this.m_seed_table_1[ 476]=  807586428;
		this.m_seed_table_0[ 477]=  957737565; this.m_seed_table_1[ 477]=  324020356;
		this.m_seed_table_0[ 478]=  709413468; this.m_seed_table_1[ 478]= 1637995142;
		this.m_seed_table_0[ 479]= 1223533325; this.m_seed_table_1[ 479]= 1379454898;
		this.m_seed_table_0[ 480]= 1627755044; this.m_seed_table_1[ 480]=  414801050;
		this.m_seed_table_0[ 481]= 1529981794; this.m_seed_table_1[ 481]=  596882565;
		this.m_seed_table_0[ 482]=  946245286; this.m_seed_table_1[ 482]= 1983408320;
		this.m_seed_table_0[ 483]= 1752536834; this.m_seed_table_1[ 483]= 1066215793;
		this.m_seed_table_0[ 484]= 1698779625; this.m_seed_table_1[ 484]=  683276640;
		this.m_seed_table_0[ 485]= 1336591799; this.m_seed_table_1[ 485]= 1771660873;
		this.m_seed_table_0[ 486]= 1848445554; this.m_seed_table_1[ 486]=  142701241;
		this.m_seed_table_0[ 487]= 1224314524; this.m_seed_table_1[ 487]=  154256173;
		this.m_seed_table_0[ 488]=  202882472; this.m_seed_table_1[ 488]=  230528746;
		this.m_seed_table_0[ 489]= 1795345360; this.m_seed_table_1[ 489]=  449214719;
		this.m_seed_table_0[ 490]= 1489923585; this.m_seed_table_1[ 490]= 1735919253;
		this.m_seed_table_0[ 491]= 1404496747; this.m_seed_table_1[ 491]=  847582877;
		this.m_seed_table_0[ 492]= 1841268689; this.m_seed_table_1[ 492]=    8368811;
		this.m_seed_table_0[ 493]=   13482195; this.m_seed_table_1[ 493]=  448997029;
		this.m_seed_table_0[ 494]=  134466560; this.m_seed_table_1[ 494]= 1810040346;
		this.m_seed_table_0[ 495]= 1296748825; this.m_seed_table_1[ 495]= 1365164890;
		this.m_seed_table_0[ 496]= 1556310678; this.m_seed_table_1[ 496]= 1894712045;
		this.m_seed_table_0[ 497]= 1797142054; this.m_seed_table_1[ 497]= 1644750792;
		this.m_seed_table_0[ 498]= 1379220603; this.m_seed_table_1[ 498]=  247920130;
		this.m_seed_table_0[ 499]=  159209403; this.m_seed_table_1[ 499]= 1590961711;
		this.m_seed_table_0[ 500]=  771112715; this.m_seed_table_1[ 500]=  530950641;
		this.m_seed_table_0[ 501]=  357987043; this.m_seed_table_1[ 501]=  841983310;
		this.m_seed_table_0[ 502]=  160525586; this.m_seed_table_1[ 502]= 2000992400;
		this.m_seed_table_0[ 503]= 1597276486; this.m_seed_table_1[ 503]= 2050036432;
		this.m_seed_table_0[ 504]=  247088931; this.m_seed_table_1[ 504]= 1714859439;
		this.m_seed_table_0[ 505]=  414325865; this.m_seed_table_1[ 505]= 1806234886;
		this.m_seed_table_0[ 506]= 2007494750; this.m_seed_table_1[ 506]=  186379088;
		this.m_seed_table_0[ 507]=  669257210; this.m_seed_table_1[ 507]= 2128549979;
		this.m_seed_table_0[ 508]= 1204764350; this.m_seed_table_1[ 508]= 1395318619;
		this.m_seed_table_0[ 509]=  810812668; this.m_seed_table_1[ 509]= 1526231216;
		this.m_seed_table_0[ 510]=  632923283; this.m_seed_table_1[ 510]= 1331970528;
		this.m_seed_table_0[ 511]=  726712371; this.m_seed_table_1[ 511]=  893430557;
		this.m_seed_table_0[ 512]=  889166740; this.m_seed_table_1[ 512]=  270402486;
		this.m_seed_table_0[ 513]= 1372620273; this.m_seed_table_1[ 513]=  632354063;
		this.m_seed_table_0[ 514]=  342704866; this.m_seed_table_1[ 514]=  916676859;
		this.m_seed_table_0[ 515]= 1388045583; this.m_seed_table_1[ 515]=  944866277;
		this.m_seed_table_0[ 516]= 1989647270; this.m_seed_table_1[ 516]=  969814564;
		this.m_seed_table_0[ 517]= 1231397652; this.m_seed_table_1[ 517]=   82575139;
		this.m_seed_table_0[ 518]=  345945823; this.m_seed_table_1[ 518]=  704203962;
		this.m_seed_table_0[ 519]=  198378934; this.m_seed_table_1[ 519]=  720861167;
		this.m_seed_table_0[ 520]=  785640818; this.m_seed_table_1[ 520]=  800530964;
		this.m_seed_table_0[ 521]= 1461853586; this.m_seed_table_1[ 521]= 1488702845;
		this.m_seed_table_0[ 522]= 1734480409; this.m_seed_table_1[ 522]= 1597996644;
		this.m_seed_table_0[ 523]=  613660848; this.m_seed_table_1[ 523]= 1503508208;
		this.m_seed_table_0[ 524]= 2037974202; this.m_seed_table_1[ 524]= 2110368545;
		this.m_seed_table_0[ 525]= 1098570512; this.m_seed_table_1[ 525]= 1419883628;
		this.m_seed_table_0[ 526]= 1972614422; this.m_seed_table_1[ 526]= 1267807817;
		this.m_seed_table_0[ 527]= 1829351889; this.m_seed_table_1[ 527]=  648091148;
		this.m_seed_table_0[ 528]= 2101932979; this.m_seed_table_1[ 528]=  480692607;
		this.m_seed_table_0[ 529]= 1795201542; this.m_seed_table_1[ 529]= 1363583414;
		this.m_seed_table_0[ 530]=  218322489; this.m_seed_table_1[ 530]= 1823321586;
		this.m_seed_table_0[ 531]= 1350717431; this.m_seed_table_1[ 531]=  197397675;
		this.m_seed_table_0[ 532]= 1464830735; this.m_seed_table_1[ 532]= 1162373435;
		this.m_seed_table_0[ 533]= 1904725478; this.m_seed_table_1[ 533]= 1240163177;
		this.m_seed_table_0[ 534]= 1867147251; this.m_seed_table_1[ 534]= 2048545536;
		this.m_seed_table_0[ 535]=   36915705; this.m_seed_table_1[ 535]=  788812233;
		this.m_seed_table_0[ 536]= 2081405696; this.m_seed_table_1[ 536]= 1673263100;
		this.m_seed_table_0[ 537]=  537371495; this.m_seed_table_1[ 537]= 1532862261;
		this.m_seed_table_0[ 538]= 1434266479; this.m_seed_table_1[ 538]= 1619258306;
		this.m_seed_table_0[ 539]=  148985132; this.m_seed_table_1[ 539]=  295266622;
		this.m_seed_table_0[ 540]= 1707300278; this.m_seed_table_1[ 540]= 1370721782;
		this.m_seed_table_0[ 541]= 2106699794; this.m_seed_table_1[ 541]=    8510090;
		this.m_seed_table_0[ 542]= 1339448995; this.m_seed_table_1[ 542]=  759116055;
		this.m_seed_table_0[ 543]= 2008590339; this.m_seed_table_1[ 543]=  836103771;
		this.m_seed_table_0[ 544]= 1148260215; this.m_seed_table_1[ 544]=  603053753;
		this.m_seed_table_0[ 545]= 1403042415; this.m_seed_table_1[ 545]= 1978923993;
		this.m_seed_table_0[ 546]= 1808575187; this.m_seed_table_1[ 546]= 1995674066;
		this.m_seed_table_0[ 547]=  934921666; this.m_seed_table_1[ 547]= 1197771310;
		this.m_seed_table_0[ 548]= 1696921866; this.m_seed_table_1[ 548]= 1963906698;
		this.m_seed_table_0[ 549]=   46994931; this.m_seed_table_1[ 549]=  414748424;
		this.m_seed_table_0[ 550]=  879395287; this.m_seed_table_1[ 550]=  955020762;
		this.m_seed_table_0[ 551]=  854011279; this.m_seed_table_1[ 551]=   11932043;
		this.m_seed_table_0[ 552]=  343392112; this.m_seed_table_1[ 552]= 1478375230;
		this.m_seed_table_0[ 553]= 2128292707; this.m_seed_table_1[ 553]= 1748199291;
		this.m_seed_table_0[ 554]=   85833237; this.m_seed_table_1[ 554]= 1233954942;
		this.m_seed_table_0[ 555]=  480695686; this.m_seed_table_1[ 555]=  774046493;
		this.m_seed_table_0[ 556]= 1543204806; this.m_seed_table_1[ 556]=  972407079;
		this.m_seed_table_0[ 557]=  803971453; this.m_seed_table_1[ 557]= 1604265712;
		this.m_seed_table_0[ 558]= 2146519125; this.m_seed_table_1[ 558]=  894126271;
		this.m_seed_table_0[ 559]= 1700272975; this.m_seed_table_1[ 559]=  544499886;
		this.m_seed_table_0[ 560]= 1141482537; this.m_seed_table_1[ 560]=  543456288;
		this.m_seed_table_0[ 561]=  962232436; this.m_seed_table_1[ 561]= 1073043183;
		this.m_seed_table_0[ 562]=  979149602; this.m_seed_table_1[ 562]=  853054963;
		this.m_seed_table_0[ 563]=   95735098; this.m_seed_table_1[ 563]= 1333034896;
		this.m_seed_table_0[ 564]=   42214250; this.m_seed_table_1[ 564]=  159572964;
		this.m_seed_table_0[ 565]=  204820674; this.m_seed_table_1[ 565]=  679638926;
		this.m_seed_table_0[ 566]=  665057295; this.m_seed_table_1[ 566]= 1920017561;
		this.m_seed_table_0[ 567]= 2009231349; this.m_seed_table_1[ 567]=   57333762;
		this.m_seed_table_0[ 568]= 1700753361; this.m_seed_table_1[ 568]=  468486815;
		this.m_seed_table_0[ 569]= 1061410973; this.m_seed_table_1[ 569]= 1341120212;
		this.m_seed_table_0[ 570]=  441021892; this.m_seed_table_1[ 570]= 1377437145;
		this.m_seed_table_0[ 571]= 1958508090; this.m_seed_table_1[ 571]=  964298003;
		this.m_seed_table_0[ 572]= 1349783582; this.m_seed_table_1[ 572]= 1450328516;
		this.m_seed_table_0[ 573]= 2095002795; this.m_seed_table_1[ 573]= 1059863449;
		this.m_seed_table_0[ 574]=  551915498; this.m_seed_table_1[ 574]=  587441744;
		this.m_seed_table_0[ 575]=   68969706; this.m_seed_table_1[ 575]= 1049560623;
		this.m_seed_table_0[ 576]= 1465515822; this.m_seed_table_1[ 576]= 1760211090;
		this.m_seed_table_0[ 577]=  658807578; this.m_seed_table_1[ 577]=  314172508;
		this.m_seed_table_0[ 578]= 1380105736; this.m_seed_table_1[ 578]=  104754733;
		this.m_seed_table_0[ 579]=  191023521; this.m_seed_table_1[ 579]= 2038349084;
		this.m_seed_table_0[ 580]= 1162782885; this.m_seed_table_1[ 580]= 1523151930;
		this.m_seed_table_0[ 581]=  250137362; this.m_seed_table_1[ 581]=  475113554;
		this.m_seed_table_0[ 582]= 1120009813; this.m_seed_table_1[ 582]=  856843248;
		this.m_seed_table_0[ 583]= 2034248247; this.m_seed_table_1[ 583]=  343007486;
		this.m_seed_table_0[ 584]=  290901882; this.m_seed_table_1[ 584]= 1247770390;
		this.m_seed_table_0[ 585]=  775207825; this.m_seed_table_1[ 585]= 1614348752;
		this.m_seed_table_0[ 586]= 2125657090; this.m_seed_table_1[ 586]= 1002842767;
		this.m_seed_table_0[ 587]= 1338143298; this.m_seed_table_1[ 587]= 1728743182;
		this.m_seed_table_0[ 588]= 1600478418; this.m_seed_table_1[ 588]= 1810467529;
		this.m_seed_table_0[ 589]= 1119911901; this.m_seed_table_1[ 589]= 1439808793;
		this.m_seed_table_0[ 590]= 1236655550; this.m_seed_table_1[ 590]= 1639924526;
		this.m_seed_table_0[ 591]= 1066825794; this.m_seed_table_1[ 591]=  526781755;
		this.m_seed_table_0[ 592]= 1770612880; this.m_seed_table_1[ 592]= 2007897080;
		this.m_seed_table_0[ 593]= 1232293659; this.m_seed_table_1[ 593]= 1990084740;
		this.m_seed_table_0[ 594]=  953817959; this.m_seed_table_1[ 594]= 1663051993;
		this.m_seed_table_0[ 595]=  918317884; this.m_seed_table_1[ 595]=  343461905;
		this.m_seed_table_0[ 596]=  333044180; this.m_seed_table_1[ 596]= 1792987702;
		this.m_seed_table_0[ 597]=  570246022; this.m_seed_table_1[ 597]=  187098191;
		this.m_seed_table_0[ 598]=   88540287; this.m_seed_table_1[ 598]= 1141578924;
		this.m_seed_table_0[ 599]=   68845659; this.m_seed_table_1[ 599]=  335676583;
		this.m_seed_table_0[ 600]= 1050129457; this.m_seed_table_1[ 600]=  712872697;
		this.m_seed_table_0[ 601]=  617319112; this.m_seed_table_1[ 601]= 1837670634;
		this.m_seed_table_0[ 602]= 1713647932; this.m_seed_table_1[ 602]= 1084583921;
		this.m_seed_table_0[ 603]=  355582078; this.m_seed_table_1[ 603]=  361919101;
		this.m_seed_table_0[ 604]=  232632335; this.m_seed_table_1[ 604]= 1758419560;
		this.m_seed_table_0[ 605]= 1310143849; this.m_seed_table_1[ 605]= 1028835380;
		this.m_seed_table_0[ 606]= 1968555796; this.m_seed_table_1[ 606]= 1671205814;
		this.m_seed_table_0[ 607]=  418099621; this.m_seed_table_1[ 607]= 1282550083;
		this.m_seed_table_0[ 608]= 2068366639; this.m_seed_table_1[ 608]=  799397129;
		this.m_seed_table_0[ 609]=  186626184; this.m_seed_table_1[ 609]=  705133183;
		this.m_seed_table_0[ 610]= 1979485720; this.m_seed_table_1[ 610]=   58480895;
		this.m_seed_table_0[ 611]=  257240861; this.m_seed_table_1[ 611]= 1302831109;
		this.m_seed_table_0[ 612]= 1013147976; this.m_seed_table_1[ 612]=  890506535;
		this.m_seed_table_0[ 613]= 1371785382; this.m_seed_table_1[ 613]=  891983730;
		this.m_seed_table_0[ 614]= 1266596461; this.m_seed_table_1[ 614]= 1014792777;
		this.m_seed_table_0[ 615]= 1360957070; this.m_seed_table_1[ 615]= 1403414493;
		this.m_seed_table_0[ 616]=   56732804; this.m_seed_table_1[ 616]= 1147876552;
		this.m_seed_table_0[ 617]= 1958521298; this.m_seed_table_1[ 617]=  356307049;
		this.m_seed_table_0[ 618]=  994506509; this.m_seed_table_1[ 618]=  427725767;
		this.m_seed_table_0[ 619]= 1007042319; this.m_seed_table_1[ 619]= 1777886555;
		this.m_seed_table_0[ 620]= 2090672098; this.m_seed_table_1[ 620]=  790059084;
		this.m_seed_table_0[ 621]=  633576612; this.m_seed_table_1[ 621]=  378810036;
		this.m_seed_table_0[ 622]= 2000934225; this.m_seed_table_1[ 622]= 1483178315;
		this.m_seed_table_0[ 623]= 1432499929; this.m_seed_table_1[ 623]=  971290994;
		this.m_seed_table_0[ 624]=  779489249; this.m_seed_table_1[ 624]= 1089684923;
		this.m_seed_table_0[ 625]= 1438620439; this.m_seed_table_1[ 625]= 1461173769;
		this.m_seed_table_0[ 626]=  198110698; this.m_seed_table_1[ 626]= 1382972840;
		this.m_seed_table_0[ 627]= 1847779900; this.m_seed_table_1[ 627]=  797765925;
		this.m_seed_table_0[ 628]= 1107736061; this.m_seed_table_1[ 628]=  951592544;
		this.m_seed_table_0[ 629]=  848421581; this.m_seed_table_1[ 629]= 1636183438;
		this.m_seed_table_0[ 630]= 1432555456; this.m_seed_table_1[ 630]= 1098538510;
		this.m_seed_table_0[ 631]= 1673517572; this.m_seed_table_1[ 631]= 1319756373;
		this.m_seed_table_0[ 632]=  101621758; this.m_seed_table_1[ 632]= 2105433934;
		this.m_seed_table_0[ 633]= 1619027420; this.m_seed_table_1[ 633]= 2091214769;
		this.m_seed_table_0[ 634]= 1421943716; this.m_seed_table_1[ 634]= 1050117283;
		this.m_seed_table_0[ 635]= 1475382605; this.m_seed_table_1[ 635]= 1748833914;
		this.m_seed_table_0[ 636]=  414338100; this.m_seed_table_1[ 636]=  927914924;
		this.m_seed_table_0[ 637]= 1123146525; this.m_seed_table_1[ 637]=  599985564;
		this.m_seed_table_0[ 638]=  523168965; this.m_seed_table_1[ 638]= 1027817894;
		this.m_seed_table_0[ 639]= 1585688986; this.m_seed_table_1[ 639]=   77110633;
		this.m_seed_table_0[ 640]=  481531676; this.m_seed_table_1[ 640]= 1804010764;
		this.m_seed_table_0[ 641]=  336274418; this.m_seed_table_1[ 641]=  308035610;
		this.m_seed_table_0[ 642]= 1435767049; this.m_seed_table_1[ 642]= 1526588653;
		this.m_seed_table_0[ 643]=  458803100; this.m_seed_table_1[ 643]= 1020161195;
		this.m_seed_table_0[ 644]= 1395710657; this.m_seed_table_1[ 644]= 1941772907;
		this.m_seed_table_0[ 645]=  505767515; this.m_seed_table_1[ 645]= 1180440314;
		this.m_seed_table_0[ 646]=  164778982; this.m_seed_table_1[ 646]= 1080833235;
		this.m_seed_table_0[ 647]=  455138232; this.m_seed_table_1[ 647]= 2009689219;
		this.m_seed_table_0[ 648]=  823933682; this.m_seed_table_1[ 648]=   99844927;
		this.m_seed_table_0[ 649]= 1792736187; this.m_seed_table_1[ 649]=  788682854;
		this.m_seed_table_0[ 650]= 1135382769; this.m_seed_table_1[ 650]= 1446692292;
		this.m_seed_table_0[ 651]=  692042819; this.m_seed_table_1[ 651]=  356078641;
		this.m_seed_table_0[ 652]= 1763343445; this.m_seed_table_1[ 652]= 1468938819;
		this.m_seed_table_0[ 653]= 1709250151; this.m_seed_table_1[ 653]= 1780100472;
		this.m_seed_table_0[ 654]=  659388644; this.m_seed_table_1[ 654]=  941434808;
		this.m_seed_table_0[ 655]= 1232335607; this.m_seed_table_1[ 655]= 1810057536;
		this.m_seed_table_0[ 656]=  657282772; this.m_seed_table_1[ 656]= 1579693061;
		this.m_seed_table_0[ 657]=  410429936; this.m_seed_table_1[ 657]= 2081324808;
		this.m_seed_table_0[ 658]= 1519524795; this.m_seed_table_1[ 658]= 1994167950;
		this.m_seed_table_0[ 659]=  490379263; this.m_seed_table_1[ 659]= 1092435095;
		this.m_seed_table_0[ 660]=  901265220; this.m_seed_table_1[ 660]= 1495808462;
		this.m_seed_table_0[ 661]=  211431269; this.m_seed_table_1[ 661]=  578623214;
		this.m_seed_table_0[ 662]= 1761592573; this.m_seed_table_1[ 662]= 1892952216;
		this.m_seed_table_0[ 663]=  687884599; this.m_seed_table_1[ 663]=  924990932;
		this.m_seed_table_0[ 664]= 1703326340; this.m_seed_table_1[ 664]= 1607963524;
		this.m_seed_table_0[ 665]= 1133353392; this.m_seed_table_1[ 665]=  132586056;
		this.m_seed_table_0[ 666]= 1421528195; this.m_seed_table_1[ 666]=  485754490;
		this.m_seed_table_0[ 667]=  960996179; this.m_seed_table_1[ 667]=  123356755;
		this.m_seed_table_0[ 668]=  400632506; this.m_seed_table_1[ 668]=  181574672;
		this.m_seed_table_0[ 669]= 2000939996; this.m_seed_table_1[ 669]= 1081038889;
		this.m_seed_table_0[ 670]= 1613015493; this.m_seed_table_1[ 670]= 1102513715;
		this.m_seed_table_0[ 671]=  748319139; this.m_seed_table_1[ 671]= 1941632774;
		this.m_seed_table_0[ 672]=  274340458; this.m_seed_table_1[ 672]= 1027788726;
		this.m_seed_table_0[ 673]=  255876488; this.m_seed_table_1[ 673]= 1780879541;
		this.m_seed_table_0[ 674]=  731089534; this.m_seed_table_1[ 674]= 1077108114;
		this.m_seed_table_0[ 675]=  535447909; this.m_seed_table_1[ 675]= 1503589576;
		this.m_seed_table_0[ 676]=  701594133; this.m_seed_table_1[ 676]=  574581590;
		this.m_seed_table_0[ 677]=  791742063; this.m_seed_table_1[ 677]= 1645343763;
		this.m_seed_table_0[ 678]= 1160158138; this.m_seed_table_1[ 678]= 1628019407;
		this.m_seed_table_0[ 679]= 1899764465; this.m_seed_table_1[ 679]= 1083910925;
		this.m_seed_table_0[ 680]=  371480006; this.m_seed_table_1[ 680]= 1208094813;
		this.m_seed_table_0[ 681]=  429381426; this.m_seed_table_1[ 681]=  248030194;
		this.m_seed_table_0[ 682]= 1921203557; this.m_seed_table_1[ 682]= 1434693352;
		this.m_seed_table_0[ 683]= 1831315650; this.m_seed_table_1[ 683]= 1828482840;
		this.m_seed_table_0[ 684]=  620540794; this.m_seed_table_1[ 684]=  805819679;
		this.m_seed_table_0[ 685]=  356811946; this.m_seed_table_1[ 685]= 1385548563;
		this.m_seed_table_0[ 686]=  932439394; this.m_seed_table_1[ 686]= 1361336802;
		this.m_seed_table_0[ 687]=  440440011; this.m_seed_table_1[ 687]=  754843279;
		this.m_seed_table_0[ 688]=   47541367; this.m_seed_table_1[ 688]= 1792347610;
		this.m_seed_table_0[ 689]= 1617274361; this.m_seed_table_1[ 689]= 1349465729;
		this.m_seed_table_0[ 690]= 1458193434; this.m_seed_table_1[ 690]= 1447781031;
		this.m_seed_table_0[ 691]= 1444924964; this.m_seed_table_1[ 691]= 1846609261;
		this.m_seed_table_0[ 692]= 1804827643; this.m_seed_table_1[ 692]=  316696190;
		this.m_seed_table_0[ 693]= 1785123670; this.m_seed_table_1[ 693]= 2118749572;
		this.m_seed_table_0[ 694]= 1794613510; this.m_seed_table_1[ 694]=  725348566;
		this.m_seed_table_0[ 695]=  473799549; this.m_seed_table_1[ 695]= 1642388587;
		this.m_seed_table_0[ 696]= 1280058626; this.m_seed_table_1[ 696]= 1566727669;
		this.m_seed_table_0[ 697]= 1950632081; this.m_seed_table_1[ 697]=  280894931;
		this.m_seed_table_0[ 698]=  309594641; this.m_seed_table_1[ 698]=  329254214;
		this.m_seed_table_0[ 699]= 1770524415; this.m_seed_table_1[ 699]= 1361558584;
		this.m_seed_table_0[ 700]= 1669422682; this.m_seed_table_1[ 700]=  557142633;
		this.m_seed_table_0[ 701]= 1722254702; this.m_seed_table_1[ 701]= 1376154303;
		this.m_seed_table_0[ 702]=  994302725; this.m_seed_table_1[ 702]= 2125528386;
		this.m_seed_table_0[ 703]=  199586143; this.m_seed_table_1[ 703]= 1877220170;
		this.m_seed_table_0[ 704]=  427262254; this.m_seed_table_1[ 704]=  692917132;
		this.m_seed_table_0[ 705]= 1638499637; this.m_seed_table_1[ 705]=   43032530;
		this.m_seed_table_0[ 706]=  504786198; this.m_seed_table_1[ 706]=  979563077;
		this.m_seed_table_0[ 707]= 1389549094; this.m_seed_table_1[ 707]=  660339624;
		this.m_seed_table_0[ 708]=  574786936; this.m_seed_table_1[ 708]=   83156510;
		this.m_seed_table_0[ 709]=  511712559; this.m_seed_table_1[ 709]= 1569755383;
		this.m_seed_table_0[ 710]= 1452348803; this.m_seed_table_1[ 710]=  325242051;
		this.m_seed_table_0[ 711]= 1043597808; this.m_seed_table_1[ 711]= 1609167990;
		this.m_seed_table_0[ 712]= 1074046212; this.m_seed_table_1[ 712]= 1963895081;
		this.m_seed_table_0[ 713]= 1390285500; this.m_seed_table_1[ 713]= 1685560268;
		this.m_seed_table_0[ 714]= 1165944151; this.m_seed_table_1[ 714]= 1360969065;
		this.m_seed_table_0[ 715]=  723922126; this.m_seed_table_1[ 715]=  831923057;
		this.m_seed_table_0[ 716]= 1006189740; this.m_seed_table_1[ 716]= 1324281384;
		this.m_seed_table_0[ 717]=  748435442; this.m_seed_table_1[ 717]= 1481823883;
		this.m_seed_table_0[ 718]=  392050930; this.m_seed_table_1[ 718]=  615708467;
		this.m_seed_table_0[ 719]= 1880869673; this.m_seed_table_1[ 719]= 1037977253;
		this.m_seed_table_0[ 720]= 1650644779; this.m_seed_table_1[ 720]=  620954920;
		this.m_seed_table_0[ 721]= 1387396612; this.m_seed_table_1[ 721]=  490851438;
		this.m_seed_table_0[ 722]=   32714535; this.m_seed_table_1[ 722]=  260805657;
		this.m_seed_table_0[ 723]=  492980550; this.m_seed_table_1[ 723]= 1951826665;
		this.m_seed_table_0[ 724]= 1055276184; this.m_seed_table_1[ 724]= 1954114877;
		this.m_seed_table_0[ 725]=  764419578; this.m_seed_table_1[ 725]= 1239361821;
		this.m_seed_table_0[ 726]=  228802751; this.m_seed_table_1[ 726]= 1762534020;
		this.m_seed_table_0[ 727]= 1937370134; this.m_seed_table_1[ 727]=  659574236;
		this.m_seed_table_0[ 728]=   93579364; this.m_seed_table_1[ 728]= 1208951352;
		this.m_seed_table_0[ 729]=  212610645; this.m_seed_table_1[ 729]=  324870382;
		this.m_seed_table_0[ 730]= 1071800734; this.m_seed_table_1[ 730]=  291470808;
		this.m_seed_table_0[ 731]=  679956480; this.m_seed_table_1[ 731]= 1022647402;
		this.m_seed_table_0[ 732]= 2134738414; this.m_seed_table_1[ 732]=  886495786;
		this.m_seed_table_0[ 733]= 1137960496; this.m_seed_table_1[ 733]=  310738879;
		this.m_seed_table_0[ 734]=  328651013; this.m_seed_table_1[ 734]= 1041718340;
		this.m_seed_table_0[ 735]=  893346356; this.m_seed_table_1[ 735]= 1038477194;
		this.m_seed_table_0[ 736]= 1887932467; this.m_seed_table_1[ 736]= 2080574523;
		this.m_seed_table_0[ 737]= 1549503783; this.m_seed_table_1[ 737]= 2080794648;
		this.m_seed_table_0[ 738]= 1457564431; this.m_seed_table_1[ 738]=  441128219;
		this.m_seed_table_0[ 739]=  557265776; this.m_seed_table_1[ 739]= 1445972953;
		this.m_seed_table_0[ 740]= 1349282311; this.m_seed_table_1[ 740]=  737210049;
		this.m_seed_table_0[ 741]=  931619761; this.m_seed_table_1[ 741]=  553682163;
		this.m_seed_table_0[ 742]=  272011524; this.m_seed_table_1[ 742]= 1919306664;
		this.m_seed_table_0[ 743]=  472773135; this.m_seed_table_1[ 743]=  507841063;
		this.m_seed_table_0[ 744]= 1673962164; this.m_seed_table_1[ 744]= 1223444538;
		this.m_seed_table_0[ 745]=  433180893; this.m_seed_table_1[ 745]= 1409068226;
		this.m_seed_table_0[ 746]= 1980677725; this.m_seed_table_1[ 746]=   20623396;
		this.m_seed_table_0[ 747]= 1256701992; this.m_seed_table_1[ 747]= 1711640956;
		this.m_seed_table_0[ 748]= 1400293452; this.m_seed_table_1[ 748]=  396900149;
		this.m_seed_table_0[ 749]= 1933460378; this.m_seed_table_1[ 749]=  929708084;
		this.m_seed_table_0[ 750]=  218006765; this.m_seed_table_1[ 750]=  120538071;
		this.m_seed_table_0[ 751]= 2113749685; this.m_seed_table_1[ 751]=  908218988;
		this.m_seed_table_0[ 752]=  190199551; this.m_seed_table_1[ 752]=  884781215;
		this.m_seed_table_0[ 753]=  467971840; this.m_seed_table_1[ 753]= 1829553687;
		this.m_seed_table_0[ 754]= 1128216262; this.m_seed_table_1[ 754]=  771079210;
		this.m_seed_table_0[ 755]=  622001797; this.m_seed_table_1[ 755]= 1597403221;
		this.m_seed_table_0[ 756]= 2132036478; this.m_seed_table_1[ 756]=  600983047;
		this.m_seed_table_0[ 757]=  289407098; this.m_seed_table_1[ 757]= 2110808377;
		this.m_seed_table_0[ 758]= 1316184081; this.m_seed_table_1[ 758]= 1489855683;
		this.m_seed_table_0[ 759]=  442709623; this.m_seed_table_1[ 759]=   34369666;
		this.m_seed_table_0[ 760]= 1154800457; this.m_seed_table_1[ 760]=  748168646;
		this.m_seed_table_0[ 761]=  527059230; this.m_seed_table_1[ 761]=  732723964;
		this.m_seed_table_0[ 762]=  232013796; this.m_seed_table_1[ 762]= 1174120228;
		this.m_seed_table_0[ 763]= 2004944706; this.m_seed_table_1[ 763]=  425389997;
		this.m_seed_table_0[ 764]= 1103726380; this.m_seed_table_1[ 764]= 1410912102;
		this.m_seed_table_0[ 765]=  418169759; this.m_seed_table_1[ 765]= 1068075375;
		this.m_seed_table_0[ 766]=  876008331; this.m_seed_table_1[ 766]= 1156690910;
		this.m_seed_table_0[ 767]= 2097803566; this.m_seed_table_1[ 767]= 1469414965;
		this.m_seed_table_0[ 768]=  492870545; this.m_seed_table_1[ 768]=  273711893;
		this.m_seed_table_0[ 769]= 1044885671; this.m_seed_table_1[ 769]=  177423119;
		this.m_seed_table_0[ 770]= 1281918510; this.m_seed_table_1[ 770]=  581000618;
		this.m_seed_table_0[ 771]= 1559612114; this.m_seed_table_1[ 771]= 1200942704;
		this.m_seed_table_0[ 772]= 1592025027; this.m_seed_table_1[ 772]=   28580110;
		this.m_seed_table_0[ 773]= 1639181197; this.m_seed_table_1[ 773]=  684702239;
		this.m_seed_table_0[ 774]=  567796372; this.m_seed_table_1[ 774]= 1202339373;
		this.m_seed_table_0[ 775]=  560232486; this.m_seed_table_1[ 775]= 1937792506;
		this.m_seed_table_0[ 776]= 1054198435; this.m_seed_table_1[ 776]= 1924624790;
		this.m_seed_table_0[ 777]=  753767660; this.m_seed_table_1[ 777]=  971737913;
		this.m_seed_table_0[ 778]= 2110676583; this.m_seed_table_1[ 778]= 1672476190;
		this.m_seed_table_0[ 779]=  861412261; this.m_seed_table_1[ 779]= 1624018156;
		this.m_seed_table_0[ 780]=  413716157; this.m_seed_table_1[ 780]= 1717802656;
		this.m_seed_table_0[ 781]=   33226216; this.m_seed_table_1[ 781]=   21905945;
		this.m_seed_table_0[ 782]=  825820453; this.m_seed_table_1[ 782]=  498907205;
		this.m_seed_table_0[ 783]=  263076368; this.m_seed_table_1[ 783]= 2140670571;
		this.m_seed_table_0[ 784]= 1728185846; this.m_seed_table_1[ 784]= 1415125270;
		this.m_seed_table_0[ 785]= 1779730653; this.m_seed_table_1[ 785]= 1309539027;
		this.m_seed_table_0[ 786]= 1972028659; this.m_seed_table_1[ 786]= 1160606783;
		this.m_seed_table_0[ 787]=  396436561; this.m_seed_table_1[ 787]=  830895127;
		this.m_seed_table_0[ 788]= 1964689946; this.m_seed_table_1[ 788]=  217732490;
		this.m_seed_table_0[ 789]= 1840357067; this.m_seed_table_1[ 789]= 1414935781;
		this.m_seed_table_0[ 790]= 1725166537; this.m_seed_table_1[ 790]=  682599700;
		this.m_seed_table_0[ 791]= 1022683295; this.m_seed_table_1[ 791]=  209507579;
		this.m_seed_table_0[ 792]=  771732699; this.m_seed_table_1[ 792]=  388185362;
		this.m_seed_table_0[ 793]= 1956340439; this.m_seed_table_1[ 793]= 1377915739;
		this.m_seed_table_0[ 794]= 1582050853; this.m_seed_table_1[ 794]=   64120504;
		this.m_seed_table_0[ 795]=  568892013; this.m_seed_table_1[ 795]= 1225589655;
		this.m_seed_table_0[ 796]= 1215384616; this.m_seed_table_1[ 796]= 1618791244;
		this.m_seed_table_0[ 797]= 1890747328; this.m_seed_table_1[ 797]=  261497181;
		this.m_seed_table_0[ 798]= 1892862831; this.m_seed_table_1[ 798]=  514612106;
		this.m_seed_table_0[ 799]= 1434157303; this.m_seed_table_1[ 799]= 2072082081;
		this.m_seed_table_0[ 800]=  675441324; this.m_seed_table_1[ 800]= 1565408671;
		this.m_seed_table_0[ 801]= 1662891326; this.m_seed_table_1[ 801]= 1331204094;
		this.m_seed_table_0[ 802]=  239373353; this.m_seed_table_1[ 802]= 1718091415;
		this.m_seed_table_0[ 803]= 2119867357; this.m_seed_table_1[ 803]= 1482956111;
		this.m_seed_table_0[ 804]= 1641112308; this.m_seed_table_1[ 804]= 2032962472;
		this.m_seed_table_0[ 805]=  402010427; this.m_seed_table_1[ 805]= 1869080123;
		this.m_seed_table_0[ 806]= 2088319384; this.m_seed_table_1[ 806]= 1354133562;
		this.m_seed_table_0[ 807]= 1239734624; this.m_seed_table_1[ 807]= 1537444948;
		this.m_seed_table_0[ 808]=  967928440; this.m_seed_table_1[ 808]= 1972283081;
		this.m_seed_table_0[ 809]= 2113377129; this.m_seed_table_1[ 809]=  465033577;
		this.m_seed_table_0[ 810]= 1874499826; this.m_seed_table_1[ 810]=  685536914;
		this.m_seed_table_0[ 811]= 1692064946; this.m_seed_table_1[ 811]= 1423074889;
		this.m_seed_table_0[ 812]=  670517483; this.m_seed_table_1[ 812]= 1241563133;
		this.m_seed_table_0[ 813]= 1202319850; this.m_seed_table_1[ 813]= 1339972296;
		this.m_seed_table_0[ 814]= 1630770226; this.m_seed_table_1[ 814]= 2054548918;
		this.m_seed_table_0[ 815]=  407130019; this.m_seed_table_1[ 815]=  831875383;
		this.m_seed_table_0[ 816]=  882053442; this.m_seed_table_1[ 816]= 1182301092;
		this.m_seed_table_0[ 817]= 1695423006; this.m_seed_table_1[ 817]= 1639881670;
		this.m_seed_table_0[ 818]=  987019498; this.m_seed_table_1[ 818]= 1451585521;
		this.m_seed_table_0[ 819]=  705439968; this.m_seed_table_1[ 819]=  553490441;
		this.m_seed_table_0[ 820]=  494971728; this.m_seed_table_1[ 820]=  592021523;
		this.m_seed_table_0[ 821]=  643587837; this.m_seed_table_1[ 821]=  598247070;
		this.m_seed_table_0[ 822]=  846888217; this.m_seed_table_1[ 822]= 1654303090;
		this.m_seed_table_0[ 823]=  298635718; this.m_seed_table_1[ 823]= 1185924240;
		this.m_seed_table_0[ 824]= 1036580908; this.m_seed_table_1[ 824]= 1716254106;
		this.m_seed_table_0[ 825]= 1112972679; this.m_seed_table_1[ 825]= 2124886063;
		this.m_seed_table_0[ 826]= 2002527641; this.m_seed_table_1[ 826]=  360683836;
		this.m_seed_table_0[ 827]= 1650238605; this.m_seed_table_1[ 827]=  237459694;
		this.m_seed_table_0[ 828]= 1934174632; this.m_seed_table_1[ 828]=  704340554;
		this.m_seed_table_0[ 829]=  931561435; this.m_seed_table_1[ 829]= 1365130675;
		this.m_seed_table_0[ 830]= 1005515462; this.m_seed_table_1[ 830]= 1443354242;
		this.m_seed_table_0[ 831]= 1813354063; this.m_seed_table_1[ 831]=  686787427;
		this.m_seed_table_0[ 832]=  409522690; this.m_seed_table_1[ 832]=  193311740;
		this.m_seed_table_0[ 833]= 1205349085; this.m_seed_table_1[ 833]=  279195214;
		this.m_seed_table_0[ 834]= 1404451987; this.m_seed_table_1[ 834]=  178788214;
		this.m_seed_table_0[ 835]= 1036944402; this.m_seed_table_1[ 835]=  692752806;
		this.m_seed_table_0[ 836]=  365384683; this.m_seed_table_1[ 836]= 1962931083;
		this.m_seed_table_0[ 837]= 1216613593; this.m_seed_table_1[ 837]= 1673196694;
		this.m_seed_table_0[ 838]= 1430706117; this.m_seed_table_1[ 838]= 1931403226;
		this.m_seed_table_0[ 839]=  824051659; this.m_seed_table_1[ 839]=  261487654;
		this.m_seed_table_0[ 840]= 1551620410; this.m_seed_table_1[ 840]=   71283178;
		this.m_seed_table_0[ 841]= 1832951210; this.m_seed_table_1[ 841]= 1513801287;
		this.m_seed_table_0[ 842]=  710117855; this.m_seed_table_1[ 842]= 1239833352;
		this.m_seed_table_0[ 843]= 1261915862; this.m_seed_table_1[ 843]=  229158002;
		this.m_seed_table_0[ 844]= 1814194299; this.m_seed_table_1[ 844]= 1022893154;
		this.m_seed_table_0[ 845]= 2105068345; this.m_seed_table_1[ 845]=  182161768;
		this.m_seed_table_0[ 846]=  267323600; this.m_seed_table_1[ 846]= 1237872448;
		this.m_seed_table_0[ 847]=   24099640; this.m_seed_table_1[ 847]= 1697871745;
		this.m_seed_table_0[ 848]= 1858858113; this.m_seed_table_1[ 848]= 1806016116;
		this.m_seed_table_0[ 849]=  142749399; this.m_seed_table_1[ 849]= 1382602198;
		this.m_seed_table_0[ 850]= 1038909928; this.m_seed_table_1[ 850]= 1397637086;
		this.m_seed_table_0[ 851]=  444039890; this.m_seed_table_1[ 851]= 1798071027;
		this.m_seed_table_0[ 852]= 2115256765; this.m_seed_table_1[ 852]= 1814430435;
		this.m_seed_table_0[ 853]= 1490674954; this.m_seed_table_1[ 853]= 1563524131;
		this.m_seed_table_0[ 854]=  606088278; this.m_seed_table_1[ 854]= 1667157303;
		this.m_seed_table_0[ 855]= 1032322595; this.m_seed_table_1[ 855]=  234789326;
		this.m_seed_table_0[ 856]= 1581089611; this.m_seed_table_1[ 856]=  178272982;
		this.m_seed_table_0[ 857]= 1201806091; this.m_seed_table_1[ 857]= 1573186485;
		this.m_seed_table_0[ 858]=  783786500; this.m_seed_table_1[ 858]= 1773191690;
		this.m_seed_table_0[ 859]= 1462848349; this.m_seed_table_1[ 859]=  280339348;
		this.m_seed_table_0[ 860]=   52103481; this.m_seed_table_1[ 860]=   38883061;
		this.m_seed_table_0[ 861]=  179884587; this.m_seed_table_1[ 861]=  406091410;
		this.m_seed_table_0[ 862]= 1066808692; this.m_seed_table_1[ 862]=  909066986;
		this.m_seed_table_0[ 863]= 2067718420; this.m_seed_table_1[ 863]=   46633027;
		this.m_seed_table_0[ 864]= 1768227055; this.m_seed_table_1[ 864]=  225952827;
		this.m_seed_table_0[ 865]= 1881512494; this.m_seed_table_1[ 865]=  508959754;
		this.m_seed_table_0[ 866]= 1523739415; this.m_seed_table_1[ 866]=  656954553;
		this.m_seed_table_0[ 867]= 1799938569; this.m_seed_table_1[ 867]=  665182166;
		this.m_seed_table_0[ 868]=  118330730; this.m_seed_table_1[ 868]=  129344583;
		this.m_seed_table_0[ 869]=  434718496; this.m_seed_table_1[ 869]=  752101053;
		this.m_seed_table_0[ 870]= 1409309672; this.m_seed_table_1[ 870]=  735788823;
		this.m_seed_table_0[ 871]=  237896502; this.m_seed_table_1[ 871]=   37375432;
		this.m_seed_table_0[ 872]=  842471703; this.m_seed_table_1[ 872]=  283996969;
		this.m_seed_table_0[ 873]= 1032356002; this.m_seed_table_1[ 873]=  883148299;
		this.m_seed_table_0[ 874]= 1879959634; this.m_seed_table_1[ 874]= 1357308885;
		this.m_seed_table_0[ 875]= 1084629231; this.m_seed_table_1[ 875]= 1817249008;
		this.m_seed_table_0[ 876]=  231214654; this.m_seed_table_1[ 876]= 1125198685;
		this.m_seed_table_0[ 877]=  506369622; this.m_seed_table_1[ 877]= 1007339182;
		this.m_seed_table_0[ 878]= 1788910826; this.m_seed_table_1[ 878]= 1729431388;
		this.m_seed_table_0[ 879]= 1489840922; this.m_seed_table_1[ 879]= 1446437520;
		this.m_seed_table_0[ 880]= 1259900335; this.m_seed_table_1[ 880]= 1563731394;
		this.m_seed_table_0[ 881]=  811559368; this.m_seed_table_1[ 881]=  295222797;
		this.m_seed_table_0[ 882]= 1652499752; this.m_seed_table_1[ 882]=  981825296;
		this.m_seed_table_0[ 883]=  590466787; this.m_seed_table_1[ 883]=  309167739;
		this.m_seed_table_0[ 884]= 1164914756; this.m_seed_table_1[ 884]= 2098230175;
		this.m_seed_table_0[ 885]= 1055094206; this.m_seed_table_1[ 885]=  913616729;
		this.m_seed_table_0[ 886]= 1553340027; this.m_seed_table_1[ 886]=  999925954;
		this.m_seed_table_0[ 887]= 2081331492; this.m_seed_table_1[ 887]=  282689045;
		this.m_seed_table_0[ 888]=  428146991; this.m_seed_table_1[ 888]=  970308615;
		this.m_seed_table_0[ 889]= 1154825635; this.m_seed_table_1[ 889]=  125730666;
		this.m_seed_table_0[ 890]=  330745650; this.m_seed_table_1[ 890]= 1887907865;
		this.m_seed_table_0[ 891]=   40205866; this.m_seed_table_1[ 891]= 1201211487;
		this.m_seed_table_0[ 892]=  561316311; this.m_seed_table_1[ 892]=   37792583;
		this.m_seed_table_0[ 893]= 1989463959; this.m_seed_table_1[ 893]= 1285073021;
		this.m_seed_table_0[ 894]=  436944050; this.m_seed_table_1[ 894]=  102700288;
		this.m_seed_table_0[ 895]=  869032318; this.m_seed_table_1[ 895]=  154601409;
		this.m_seed_table_0[ 896]= 1673789348; this.m_seed_table_1[ 896]= 1255449862;
		this.m_seed_table_0[ 897]=  458946337; this.m_seed_table_1[ 897]=  146697970;
		this.m_seed_table_0[ 898]=  327504182; this.m_seed_table_1[ 898]= 1979696862;
		this.m_seed_table_0[ 899]= 2018032024; this.m_seed_table_1[ 899]=  301256229;
		this.m_seed_table_0[ 900]= 1935535123; this.m_seed_table_1[ 900]=  802759353;
		this.m_seed_table_0[ 901]= 1691671272; this.m_seed_table_1[ 901]= 2065792014;
		this.m_seed_table_0[ 902]= 1437119123; this.m_seed_table_1[ 902]= 1290718653;
		this.m_seed_table_0[ 903]=  912837714; this.m_seed_table_1[ 903]=  864299392;
		this.m_seed_table_0[ 904]= 1592572279; this.m_seed_table_1[ 904]= 1637739495;
		this.m_seed_table_0[ 905]=  185515241; this.m_seed_table_1[ 905]=  622964830;
		this.m_seed_table_0[ 906]=  450502936; this.m_seed_table_1[ 906]= 2146741744;
		this.m_seed_table_0[ 907]=  575779934; this.m_seed_table_1[ 907]= 1002600852;
		this.m_seed_table_0[ 908]= 1564255365; this.m_seed_table_1[ 908]= 1172608960;
		this.m_seed_table_0[ 909]=  829023337; this.m_seed_table_1[ 909]= 1107505363;
		this.m_seed_table_0[ 910]=  726580366; this.m_seed_table_1[ 910]=  888633285;
		this.m_seed_table_0[ 911]= 1350880081; this.m_seed_table_1[ 911]= 1328857728;
		this.m_seed_table_0[ 912]=  287906580; this.m_seed_table_1[ 912]= 1885237727;
		this.m_seed_table_0[ 913]= 1182515238; this.m_seed_table_1[ 913]=  774207539;
		this.m_seed_table_0[ 914]= 1392570072; this.m_seed_table_1[ 914]= 1187791156;
		this.m_seed_table_0[ 915]=  749581825; this.m_seed_table_1[ 915]= 1016191512;
		this.m_seed_table_0[ 916]=  723211580; this.m_seed_table_1[ 916]= 1718865424;
		this.m_seed_table_0[ 917]=  629285471; this.m_seed_table_1[ 917]= 1586713088;
		this.m_seed_table_0[ 918]=  125651091; this.m_seed_table_1[ 918]=  331104317;
		this.m_seed_table_0[ 919]= 1413404731; this.m_seed_table_1[ 919]= 1150885312;
		this.m_seed_table_0[ 920]= 1874102668; this.m_seed_table_1[ 920]= 1517813166;
		this.m_seed_table_0[ 921]= 1394093026; this.m_seed_table_1[ 921]=  627142913;
		this.m_seed_table_0[ 922]=  566561131; this.m_seed_table_1[ 922]= 1468759824;
		this.m_seed_table_0[ 923]=  284768471; this.m_seed_table_1[ 923]=  593781585;
		this.m_seed_table_0[ 924]=  397848416; this.m_seed_table_1[ 924]=  596716866;
		this.m_seed_table_0[ 925]=  130260189; this.m_seed_table_1[ 925]=  678938724;
		this.m_seed_table_0[ 926]= 1376078002; this.m_seed_table_1[ 926]=  534533181;
		this.m_seed_table_0[ 927]=  511881455; this.m_seed_table_1[ 927]=  589220285;
		this.m_seed_table_0[ 928]=  206595482; this.m_seed_table_1[ 928]= 1687029215;
		this.m_seed_table_0[ 929]= 1825608857; this.m_seed_table_1[ 929]=  620293104;
		this.m_seed_table_0[ 930]=  561017426; this.m_seed_table_1[ 930]=  736987780;
		this.m_seed_table_0[ 931]= 1440589316; this.m_seed_table_1[ 931]= 1493988556;
		this.m_seed_table_0[ 932]= 1840652702; this.m_seed_table_1[ 932]= 1172021262;
		this.m_seed_table_0[ 933]=  928396901; this.m_seed_table_1[ 933]= 1643745739;
		this.m_seed_table_0[ 934]=  529235590; this.m_seed_table_1[ 934]= 1880050263;
		this.m_seed_table_0[ 935]=  469011618; this.m_seed_table_1[ 935]=  454576099;
		this.m_seed_table_0[ 936]=  907483026; this.m_seed_table_1[ 936]=  531420812;
		this.m_seed_table_0[ 937]=  818821430; this.m_seed_table_1[ 937]=  403478958;
		this.m_seed_table_0[ 938]=  276224387; this.m_seed_table_1[ 938]=  155841170;
		this.m_seed_table_0[ 939]=  579767001; this.m_seed_table_1[ 939]=  268531274;
		this.m_seed_table_0[ 940]=  799673981; this.m_seed_table_1[ 940]= 1405478620;
		this.m_seed_table_0[ 941]=  836786543; this.m_seed_table_1[ 941]=  460541590;
		this.m_seed_table_0[ 942]= 1281112736; this.m_seed_table_1[ 942]= 1023442256;
		this.m_seed_table_0[ 943]=   61230516; this.m_seed_table_1[ 943]= 1751973855;
		this.m_seed_table_0[ 944]=  330021856; this.m_seed_table_1[ 944]= 2046402761;
		this.m_seed_table_0[ 945]=  378652473; this.m_seed_table_1[ 945]=  822190818;
		this.m_seed_table_0[ 946]=  535514876; this.m_seed_table_1[ 946]=  902641256;
		this.m_seed_table_0[ 947]= 1693725822; this.m_seed_table_1[ 947]= 1357833731;
		this.m_seed_table_0[ 948]=  287893947; this.m_seed_table_1[ 948]= 1212204694;
		this.m_seed_table_0[ 949]= 1462004855; this.m_seed_table_1[ 949]=  744954350;
		this.m_seed_table_0[ 950]=  948398721; this.m_seed_table_1[ 950]= 1855054874;
		this.m_seed_table_0[ 951]= 1929975507; this.m_seed_table_1[ 951]=  120364581;
		this.m_seed_table_0[ 952]=  530150623; this.m_seed_table_1[ 952]= 1906228719;
		this.m_seed_table_0[ 953]=  854845150; this.m_seed_table_1[ 953]=  163207472;
		this.m_seed_table_0[ 954]= 1085190023; this.m_seed_table_1[ 954]=  326868889;
		this.m_seed_table_0[ 955]=  372871255; this.m_seed_table_1[ 955]= 1965833854;
		this.m_seed_table_0[ 956]= 1228745895; this.m_seed_table_1[ 956]=  357784519;
		this.m_seed_table_0[ 957]= 1932894892; this.m_seed_table_1[ 957]= 1229193512;
		this.m_seed_table_0[ 958]=  777204002; this.m_seed_table_1[ 958]= 1191945206;
		this.m_seed_table_0[ 959]= 1757212947; this.m_seed_table_1[ 959]=  892403220;
		this.m_seed_table_0[ 960]=  503509171; this.m_seed_table_1[ 960]=  931840721;
		this.m_seed_table_0[ 961]=   59695542; this.m_seed_table_1[ 961]=  650482158;
		this.m_seed_table_0[ 962]=  267300420; this.m_seed_table_1[ 962]=   84159453;
		this.m_seed_table_0[ 963]= 1454704649; this.m_seed_table_1[ 963]= 2109996011;
		this.m_seed_table_0[ 964]=  805192409; this.m_seed_table_1[ 964]= 1130153729;
		this.m_seed_table_0[ 965]= 1895890811; this.m_seed_table_1[ 965]=  658843271;
		this.m_seed_table_0[ 966]=  962430482; this.m_seed_table_1[ 966]= 1026988870;
		this.m_seed_table_0[ 967]=  933219703; this.m_seed_table_1[ 967]= 1487353234;
		this.m_seed_table_0[ 968]=   47887976; this.m_seed_table_1[ 968]= 1488844487;
		this.m_seed_table_0[ 969]=  126072038; this.m_seed_table_1[ 969]= 1429555776;
		this.m_seed_table_0[ 970]= 1724282482; this.m_seed_table_1[ 970]= 1820128466;
		this.m_seed_table_0[ 971]= 1916923823; this.m_seed_table_1[ 971]= 1047567726;
		this.m_seed_table_0[ 972]=  727006393; this.m_seed_table_1[ 972]= 1475081769;
		this.m_seed_table_0[ 973]= 1029539674; this.m_seed_table_1[ 973]=  425299456;
		this.m_seed_table_0[ 974]=  407854528; this.m_seed_table_1[ 974]=  190904501;
		this.m_seed_table_0[ 975]=  281302850; this.m_seed_table_1[ 975]= 1099199085;
		this.m_seed_table_0[ 976]= 1907514074; this.m_seed_table_1[ 976]=  408390792;
		this.m_seed_table_0[ 977]= 1078598037; this.m_seed_table_1[ 977]=  897131254;
		this.m_seed_table_0[ 978]= 1895386255; this.m_seed_table_1[ 978]= 1591784276;
		this.m_seed_table_0[ 979]= 1184386755; this.m_seed_table_1[ 979]=  110844326;
		this.m_seed_table_0[ 980]= 1133971311; this.m_seed_table_1[ 980]=  502751001;
		this.m_seed_table_0[ 981]=  939162377; this.m_seed_table_1[ 981]=  727943570;
		this.m_seed_table_0[ 982]=  658124104; this.m_seed_table_1[ 982]= 1864551233;
		this.m_seed_table_0[ 983]= 1688881066; this.m_seed_table_1[ 983]= 1838263091;
		this.m_seed_table_0[ 984]= 1149383076; this.m_seed_table_1[ 984]= 2000538541;
		this.m_seed_table_0[ 985]=  767356004; this.m_seed_table_1[ 985]= 1559279822;
		this.m_seed_table_0[ 986]= 1747917832; this.m_seed_table_1[ 986]=  767093686;
		this.m_seed_table_0[ 987]= 1555063756; this.m_seed_table_1[ 987]=  209748225;
		this.m_seed_table_0[ 988]= 1391848684; this.m_seed_table_1[ 988]=   61618970;
		this.m_seed_table_0[ 989]= 1226547346; this.m_seed_table_1[ 989]= 1580263920;
		this.m_seed_table_0[ 990]=  164940497; this.m_seed_table_1[ 990]= 1985927720;
		this.m_seed_table_0[ 991]=  100067649; this.m_seed_table_1[ 991]=   40783184;
		this.m_seed_table_0[ 992]= 1202620118; this.m_seed_table_1[ 992]=  918350715;
		this.m_seed_table_0[ 993]= 1702313994; this.m_seed_table_1[ 993]= 1870568959;
		this.m_seed_table_0[ 994]=  946585563; this.m_seed_table_1[ 994]=   85751458;
		this.m_seed_table_0[ 995]=  782199819; this.m_seed_table_1[ 995]= 1356975279;
		this.m_seed_table_0[ 996]= 1552529193; this.m_seed_table_1[ 996]= 1693272464;
		this.m_seed_table_0[ 997]= 2108872932; this.m_seed_table_1[ 997]=   38613212;
		this.m_seed_table_0[ 998]= 1481989370; this.m_seed_table_1[ 998]=  553974942;
		this.m_seed_table_0[ 999]=   17590335; this.m_seed_table_1[ 999]= 1470431799;
		this.m_seed_table_0[1000]=   35336791; this.m_seed_table_1[1000]=  485230883;

    } // initSeedTables

} // UtilRandom


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Random Class  ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
// File: UtilEmail.js
// Date: 2024-11-11
// Author: Gunnar Lidén

// File content
// =============
//
// Email functions
//

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Email Class  //////////////////////////(///////////////////
///////////////////////////////////////////////////////////////////////////////////////////

class UtilEmail
{
    // Sends an email with JQuery post function
    // Please refer to UtilEmailSecure.php for a description
    // i_from    Sender address e.g. guestbook@jazzlivaarau.ch
    // i_subject Email subject
    // i_message Email text in HTML format e.g. JAZZ <i>live</i>
    //           Escape characters and other special characters are not allowed
    // i_to      Reciever addresses TO. Separate with comma ','
    // i_bcc     Hidden addresses BCC.  Separate with comma ','
    // i_secure_to Email address if PHP file has been used to send spam
    // i_callback_fctn Callback function name
    // This function is calling the PHP function UtilEmailSecure.php in the directory 
    // /www/JazzScripts/Php/
    static sendSecureCallback(i_from, i_subject, i_message, i_to, i_bcc, i_secure_to, i_callback_fctn)
    {
        if (!UtilEmail.checkInput(i_from, i_subject, i_message, i_to, i_bcc, i_secure_to))
        {
            // Please note that the user gets alert error messsages from checkInput
            return;
        }

        if (!UtilServer.execApplicationOnServer())
        {
            alert("UtilEmail.sendSecureCallback UtilEmailSecure.php cannot be executed on the local (live) server");

            return;
        }

        // ('https://jazzliveaarau.ch/JazzScripts/Php/UtilEmailSecure.php',

        $.post
        ('Php/UtilEmailSecure.php',
          {
              a_from: i_from, 
              a_subject: i_subject,
              a_msg: i_message,
              a_to: i_to,
              a_bcc: i_bcc,
              s_to: i_secure_to
          },
          function(data_send, status_send)
          {	
              if (status_send == "success")
              {
                    var b_ok = false;
                    var b_failure_sent = false;
                    var b_failure_too_many_calls = false;
                    var b_failure_too_many_to_and_bcc = false;
                    var b_failure_too_many_to = false;
                    var b_failure_too_many_bcc = false;
                    if (data_send.indexOf("MailIsSent") >= 0)
                    {
                        b_ok = true;
                    }
                    if (data_send.indexOf("MailIsNotSent") >= 0)
                    {
                        b_failure_sent = true;
                    }
                    if (data_send.indexOf("TooManyCalls") >= 0)
                    {
                        b_failure_too_many_calls = true;
                    }
                    if (data_send.indexOf("TooManyToAndBccAddresses") >= 0)
                    {
                        b_failure_too_many_to_and_bcc = true;
                    }
                    if (data_send.indexOf("TooManyToAddresses") >= 0)
                    {
                        b_failure_too_many_to = true;
                    }
                    if (data_send.indexOf("TooManyBccAddresses") >= 0)
                    {
                        b_failure_too_many_bcc = true;
                    }                    
                    if (b_ok)			
                    {
                        console.log("UtilEmail.sendSecure Mail is sent to " + i_to);

                        i_callback_fctn();
                    }
                    else if (b_failure_sent)
                    {
                        UtilEmail.errorSent(i_subject, data_send, status_send);
                    }
                    else if (b_failure_too_many_calls)
                    {
                        UtilEmail.errorTooManyCalls(i_subject, data_send, status_send);
                    }
                    else if (b_failure_too_many_to_and_bcc)
                    {
                        UtilEmail.errorTooManyToAndBcc(i_subject, data_send, status_send);
                    }
                    else if (b_failure_too_many_to)
                    {
                        UtilEmail.errorTooManyTo(i_subject, data_send, status_send);
                    }
                    else if (b_failure_too_many_bcc)
                    {
                        UtilEmail.errorTooManyBcc(i_subject, data_send, status_send);
                    }
                    else 
                    {
                        UtilEmail.sendError(i_subject, data_send, status_send);
                    }			
              }
              else
              {
                  UtilEmail.sendError(i_subject, data_send, status_send);
              }   
              
          });	

    } // sendSecureCallback

    // Returns true if input email data is OK
    static checkInput(i_from, i_subject, i_message, i_to, i_bcc, i_secure_to)
    {
        var ret_b_check = true;

        if (i_subject.length == 0 || i_to.length == 0)
        {
            alert("UtilEmail.checkInput Subject and send to address must be set");

            ret_b_check = false;
        }

        var b_from_valid = UtilEmail.validateAddress(i_from);

        if (!b_from_valid)
        {
            alert("UtilEmail.checkInput Not a valid email address i_from= " + i_from);

            ret_b_check = false;
        }  

        var b_i_to_valid = UtilEmail.validateMultipleAddresses(i_to);

        if (!b_i_to_valid)
        {
            ret_b_check = false;
        }  

        if (i_bcc.length > 0)
        {
            var b_i_bcc_valid = UtilEmail.validateMultipleAddresses(i_bcc);

            if (!b_i_bcc_valid)
            {
                ret_b_check = false;
            }  
        }        

        if (i_secure_to.length > 0)
        {
            var b_secure_to_valid = UtilEmail.validateAddress(i_secure_to);

            if (!b_secure_to_valid)
            {
                alert("UtilEmail.checkInput Not a valid email address i_secure_to= " + i_secure_to);
    
                ret_b_check = false;
            }  
        }

        var b_escaped_chars = UtilEmail.containsEscapedRowEnds(i_message);

        if (b_escaped_chars)
        {
            alert("UtilEmail.checkInput Message contains escaped (windows) chars or other special characters");

            ret_b_check = false;
        }

        var b_max_exceeded = UtilEmail.rowHtmlLengthMaxIsExceeded(i_message);

        if (b_max_exceeded)
        {
            alert("UtilEmail.checkInput Message row lengths exceeds 998 characters");

            ret_b_check = false;
        }

        return ret_b_check;

    } // checkInput

    // Check email adresses separated with semicolon 
    static validateMultipleAddresses(i_addresses)
    {
        var b_adresses_valid = true;

        var all_adresses = UtilEmail.getAdressesArray(i_addresses);

        var n_adresses = UtilEmail.getNumberOfAdresses(i_addresses);

        if (n_adresses == 0)
        {
            alert("UtilEmail.validateMultipleAddresses No adresses in the input string i_addresses= " + i_addresses);

            b_adresses_valid = false;

            return b_adresses_valid;
        }

        for (var index_valid=0; index_valid < n_adresses; index_valid++)
        {
            var check_address = all_adresses[index_valid];

            var b_valid = UtilEmail.validateAddress(check_address);

            if (!b_valid)
            {
                alert("UtilEmail.validateMultipleAddresses Not a valid email address check_address= " + check_address);
    
                b_adresses_valid = false;
            }  

        } // index_valid

        return b_adresses_valid;

    } // validateMultipleAddresses

    // Get addresses as an array
    static getAdressesArray(i_addresses)
    {
        var all_adresses = [];

        var remaining_adresses = i_addresses;

        var n_max_adresses = 100; // TODO Find out 

        var current_adresse = '';

        var index_out = 0;

        for (var i_adress = 1; i_adress <= n_max_adresses; i_adress++)
        {
            var index_separator = remaining_adresses.indexOf(',');

            if (index_separator >= 0)
            {
                current_adresse = remaining_adresses.substr(0, index_separator);

                remaining_adresses = remaining_adresses.substr(index_separator + 1);

                all_adresses[index_out] = current_adresse.trim();

                index_out = index_out + 1;
                
            }
            else
            {
                current_adresse = remaining_adresses;

                all_adresses[index_out] = current_adresse.trim();

                break;

            }

            if (i_adress == n_max_adresses)
            {
                alert("UtilEmail.getAdressesArray WARNING Only the first " + n_max_adresses.toString() + "addresses are in the output array" );
            }

        } // i_adress

        return all_adresses;

    } // getAdressesArray

    // Returns the number of addresses
    static getNumberOfAdresses(i_addresses)
    {
        var address_array = UtilEmail.getAdressesArray(i_addresses);

        return address_array.length;

    } // getNumberOfAdresses

    // Determines if a string contains window (escaped) row ends
    static containsEscapedRowEnds(i_string)
    {
        // TODO This should be the solution, but the special_chars variable has to be modified TODO
        // https://onecompiler.com/questions/3xnp9df38/-javascript-how-to-check-for-special-characters-present-in-a-string
        // var special_chars =/[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
        // var ret_b_escape = special_chars.test(i_string);
        // return ret_b_escape;

        var i_string_witout_row_ends = UtilEmail.removeEscapedRowEnds(i_string);

        if (i_string.length > i_string_witout_row_ends)
        {
            return true;
        }
        else
        {
            return false;
        }
        
    } // containsSpecialChars

    // Removes windows (escapped) row ends
    static removeEscapedRowEnds(i_string)
    {
        // https://stackoverflow.com/questions/784539/how-do-i-replace-all-line-breaks-in-a-string-with-br-tags
        
        var ret_string = '';
        
        ret_string = i_string.replace(/(?:\r\n|\r|\n)/g, '');
        
        return ret_string;
        
    } // removeEscapedRowEnds

    // Check that the row length (number of chars) not exceeds maximum 998
    // The SMTP line length limit is 998 characters per line, including the CRLF 
    // (carriage return and line feed) characters
    // The function also returns true with an error message if the number of rows exceeds 1000
    static rowHtmlLengthMaxIsExceeded(i_string)
    {
        var max_n_chars = 998;

        var max_n_rows = 1000;

        var between_br_string = '';

        var remaining_str = i_string;

        for (var i_row= 1; i_row <= max_n_rows; i_row++)
        {
            var index_br = remaining_str.indexOf('<br>');

            if (index_br >= 0)
            {
                between_br_string = remaining_str.substr(0, index_br);

                remaining_str = remaining_str.substr(index_br+4);

            }
            else
            {
                between_br_string = remaining_str;

                remaining_str = '';

            }

            var row_length = between_br_string.length;

            if (row_length >= max_n_chars)
            {
                return true;
            }

            if (remaining_str.length == 0)
            {
                return false;
            }

        }

        alert("UtilEmail.rowHtmlLengthMaxIsExceeded Number of rows exceeds " + max_n_rows.toString());

        return true;

    } // rowHtmlLengthMaxIsExceeded

    // Validate an email address
    // https://www.zerobounce.net/email-guides/email-validation-javascript/
    static validateAddress(i_email_address) 
    {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/;

        return pattern.test(i_email_address);

        // https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
        // var valid_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        //if (i_email_address.value.match(valid_regex)) 
        //{
        //  return true;
        //} 
        //else 
        //{
        //  return false;
        //}
      
    } // validateAddress

    // Failure sending mail
    static sendError(i_subject, i_data_send, i_status_send)
    {
        console.log(" UtilEmail.sendCallbackSecure failure. data_send= " + i_data_send + ' status_send= ' + i_status_send);

        alert("UtilEmail.sendCallbackSecure Failure sending mail. Subject= " + i_subject + ' status_copy= ' + i_status_send);

    } // sendError

    // Failure sending mail
    static errorSent(i_subject, i_data_send, i_status_send)
    {
        console.log(" UtilEmail.sendCallbackSecure failure. data_send= " + i_data_send + ' status_send= ' + i_status_send);

        alert("UtilEmail.sendCallbackSecure Failure sending mail with subject " + i_subject);

    } // sendError

    // Failure too many calls within a sgort time
    static errorTooManyCalls(i_subject, i_data_send, i_status_send)
    {
        console.log(" UtilEmail.sendCallbackSecure failure. data_send= " + i_data_send + ' status_send= ' + i_status_send);

        alert("E-Mail mit Betreff '" + i_subject + "' wurde nicht gesendet wegen Überbelastung. Bitte warte eine kurze Zeit und versuch wieder");

    } // errorTooManyCalls

    // Failure too many TO and BCC addresses
    static errorTooManyToAndBcc(i_subject, i_data_send, i_status_send)
    {
        console.log(" UtilEmail.sendCallbackSecure failure. data_send= " + i_data_send + ' status_send= ' + i_status_send);

        alert("E-Mail mit Betreff '" + i_subject + "' wurde nicht gesendet. Zu viele To und BCC Adressen");

    } // errorTooManyToAndBcc

    // Failure too many TO addresses
    static errorTooManyTo(i_subject, i_data_send, i_status_send)
    {
        console.log(" UtilEmail.sendCallbackSecure failure. data_send= " + i_data_send + ' status_send= ' + i_status_send);

        alert("E-Mail mit Betreff '" + i_subject + "' wurde nicht gesendet. Zu viele To Adressen");

    } // errorTooManyTo

    // Failure too many BCC addresses
    static errorTooManyBcc(i_subject, i_data_send, i_status_send)
    {
        console.log(" UtilEmail.sendCallbackSecure failure. data_send= " + i_data_send + ' status_send= ' + i_status_send);

        alert("E-Mail mit Betreff '" + i_subject + "' nicht gesendet. Zu viele BCC Adressen");

    } // errorTooManyBcc

    // REMOVE UtilEmail.send and UtilEmail.sendCallback later REMOVE REMOVE 2024-11-06 REMOVE

    // Sends an email with JQuery post function
    // Please refer to UtilEmailSend.php for a description
    // i_from    Sender address e.g. guestbook@jazzlivaarau.ch
    // i_subject Email subject
    // i_message Email text in HTML format e.g. JAZZ <i>live</i>
    // i_to      Reciever addresses TO. Separate with ;
    // i_bcc     Hidden addresses BCC
    // This function is calling the PHP function UtilEmailSend.php in the directory 
    // /www/JazzScripts/Php/
    static async send(i_from, i_subject, i_message, i_to, i_bcc)
    {

        if (!UtilServer.execApplicationOnServer())
        {
            alert("UtilEmail.send UtilEmailSend.php cannot be executed on the local (live) server");

            return false;
        }

        if (i_subject.length == 0 || i_to.length == 0)
        {
            alert("UtilEmail.send Subject and send to address must be set");

            return false;
        }

        var b_send_success = false;

        // TODO Check i_to E-Mail addresses with UtilString.validEmailAddress, 
        // i.e. for mutiple addresses separated with ,

        await $.post
        ('https://jazzliveaarau.ch/JazzScripts/Php/UtilEmailSend.php',
          {
              a_from: i_from, 
              a_subject: i_subject,
              a_msg: i_message,
              a_to: i_to,
              a_bcc: i_bcc
          },
          function(data_send, status_send)
          {	
              if (status_send == "success")
              {
                    var b_ok = false;
                    var b_failure = false;
                    if (data_send.indexOf("MailIsSent") >= 0)
                    {
                        b_ok = true;
                    }
                    if (data_send.indexOf("MailIsNotSent") >= 0)
                    {
                        b_failure = true;
                    }
                    
                    if (b_ok)			
                    {
                        console.log("UtilEmail.send Mail is sent to " + i_to);

                        b_send_success = true;
                    }
                    else if (b_failure)
                    {
                        alert("UtilEmail.send Mail is not sent");

                        b_send_success = false;
                    }
                    else 
                    {
                        alert("Fehler: data_send= " + data_send);
                        b_send_success = false;
                    }			
              }
              else
              {
                  alert("Execution of UtilEmailSend.php failed. status_send= " + status_send);
                  b_send_success = false;
              }   
              
          });	

          return b_send_success;

    } // send

    // Sends an email with JQuery post function
    // Please refer to UtilEmailSend.php for a description
    // i_from    Sender address e.g. guestbook@jazzlivaarau.ch
    // i_subject Email subject
    // i_message Email text in HTML format e.g. JAZZ <i>live</i>
    // i_to      Reciever addresses TO. Separate with ;
    // i_bcc     Hidden addresses BCC
    // i_callback_fctn Callback function name
    // This function is calling the PHP function UtilEmailSend.php in the directory 
    // /www/JazzScripts/Php/
    static sendCallback(i_from, i_subject, i_message, i_to, i_bcc, i_callback_fctn)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("UtilEmail.sendCallback UtilEmailSend.php cannot be executed on the local (live) server");

            return;
        }

        if (i_subject.length == 0 || i_to.length == 0)
        {
            alert("UtilEmail.send Subject and send to address must be set");

            return;
        }

        // TODO Check i_to E-Mail addresses with UtilString.validEmailAddress, 
        // i.e. for mutiple addresses separated with ,

        $.post
        ('https://jazzliveaarau.ch/JazzScripts/Php/UtilEmailSend.php',
          {
              a_from: i_from, 
              a_subject: i_subject,
              a_msg: i_message,
              a_to: i_to,
              a_bcc: i_bcc
          },
          function(data_send, status_send)
          {	
              if (status_send == "success")
              {
                    var b_ok = false;
                    var b_failure = false;
                    if (data_send.indexOf("MailIsSent") >= 0)
                    {
                        b_ok = true;
                    }
                    if (data_send.indexOf("MailIsNotSent") >= 0)
                    {
                        b_failure = true;
                    }
                    
                    if (b_ok)			
                    {
                        console.log("UtilEmail.send Mail is sent to " + i_to);

                        i_callback_fctn();
                    }
                    else if (b_failure)
                    {
                        UtilEmail.sendError(i_subject, data_send, status_send);
                    }
                    else 
                    {
                        UtilEmail.sendError(i_subject, data_send, status_send);
                    }			
              }
              else
              {
                  UtilEmail.sendError(i_subject, data_send, status_send);
              }   
              
          });	

    } // sendCallback

} // UtilEmail



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Email Class  ////////////////////////////(///////////////////
///////////////////////////////////////////////////////////////////////////////////////////
// File: UtilPayment.js
// Date: 2024-02-05
// Author: Gunnar Lidén

// File content
// =============
//
// Class with strings for payment options

class UtilPayment
{
    static twintAdmissionFeeString(i_width)
    {
        var ret_twint_str = '';
    
        ret_twint_str = ret_twint_str + UtilPayment.twintDivStart(i_width);
    
        ret_twint_str = ret_twint_str + UtilPayment.twintAdmissionHeaderString();
    
        ret_twint_str = ret_twint_str + UtilPayment.twintAdmissionTextString();
    
        ret_twint_str = ret_twint_str + UtilPayment.divEnd();
    
        return ret_twint_str;
    
    } // twintAdmissionFeeString

    static twintAdmissionHeaderString()
    {
        var ret_twint_h_str = '';
    
        ret_twint_h_str = ret_twint_h_str + UtilPayment.twintFontHeader();

        ret_twint_h_str = ret_twint_h_str + UtilPayment.twintTitleAdmissionFee();

        ret_twint_h_str = ret_twint_h_str + UtilPayment.fontEnd();

        return ret_twint_h_str;

    } // twintAdmissionHeaderString

    static twintAdmissionTextString()
    {
        var ret_twint_t_str = '';
    
        ret_twint_t_str = ret_twint_t_str + UtilPayment.twintFontHeader();

        ret_twint_t_str = ret_twint_t_str + UtilPayment.paragraphStart();

        ret_twint_t_str = ret_twint_t_str + UtilPayment.twintTextAdmissionFee();

        ret_twint_t_str = ret_twint_t_str + ' ' + UtilPayment.admissionFees();

        ret_twint_t_str = ret_twint_t_str + UtilPayment.newLine();

        ret_twint_t_str = ret_twint_t_str + UtilPayment.newLine();

        ret_twint_t_str = ret_twint_t_str +  ' ' + UtilPayment.twintPayerAdmissionFee();

        ret_twint_t_str = ret_twint_t_str +  ' ' + UtilPayment.twintAccountPayee();

        ret_twint_t_str = ret_twint_t_str + UtilPayment.paragraphEnd();

        ret_twint_t_str = ret_twint_t_str + UtilPayment.fontEnd();

        return ret_twint_t_str;

    } // twintAdmissionTextString

    // TWINT addmission fee title
    static twintTitleAdmissionFee()
    {
        return '<b>Eintritt mit TWINT zahlen</b>';

    } // twintTitleAdmissionFee

    // TWINT addmission text
    static twintTextAdmissionFee()
    {
        return 'Eintritte können mit TWINT im Voraus oder im Konzertsaal bezahlt werden.';

    } // twintTextAdmissionFee

    // Addmission fees
    static admissionFees()
    {
        return 'Der reguläre Eintritt beträgt Fr. 25.-, Supporter bezahlen Fr. 15.-.';

    } // admissionFees

    // TWINT addmission fee payer
    static twintPayerAdmissionFee()
    {
        return 'Bitte geben Sie Ihren Namen und das Konzertdatum bei der Bezahlung an.';

    } // twintPayerAdmissionFee

    // TWINT account payee
    static twintAccountPayee()
    {
        return 'Empfänger ist Hanni Heller, Telefonnummer +41 79 368 56 93.';

    } // twintAccountPayee

    // Credit card is not accepted
    static noCreditCard()
    {
        return '(Bezahlung mit Kreditkarte ist leider nicht möglich.)';

    } // noCreditCard

    // TWINT font header
    static twintFontHeader()
    {
        return  '<font size=3 face="Arial">';

    } // twintFontHeader

    // TWINT font text
    static twintFontText()
    {
        return  '<font size=3 face="Arial">';

    } // twintFontText

    // Font end
    static fontEnd()
    {
        return  '</font>';

    } // fontEnd

    // TWINT start <div> with styles
    static twintDivStart(i_width)
    {
        return  '<div style="margin:5px;  width:' + i_width + '; border: 1px solid blue; padding-left:15px;  padding-right:15px;  padding-top:10px; padding-bottom:5px;" >';

    } // twintDivStart

    // Returns div end tag </div>
    static divEnd()
    {
        return  '</div>';

    } // divEnd

    // Returns new line tag <br>
    static newLine()
    {
        return  '<br>';

    } // newLine

   // Returns start paragraph tag <p>
   static paragraphStart()
   {
       return  '<p>';

   } // paragraphStart

   // Returns end paragraph tag </p>
   static paragraphEnd()
   {
       return  '</p>';

   } // paragraphEnd


} // UtilPayment

// File: UtilImage.js
// Date: 2026-01-19
// Author: Gunnar Lidén

// File content
// =============
//
// Class UtilImage
// One function that replaces, scales and positions an image in a container div
// The image will be scaled as much as possible and centered in the container
//
class UtilImage
{
    // Replaces. scales and position an image in a <div> container. 
    // Input data:
    // i_image_file_name:  URL for the image that shall replace the existing image
    // i_el_div_container: Container <div> element. Container width and height must be set
    //                     (with no height set will multiple calls make div height smaller)
    //
    // The image will be scaled to fit the container and the picture will be centered
    // horizontally and vertically
    // 1. Check input file name
    // 2. Get existing element in the div container. Call of UtilImage.getImageElement
    // 3. Create a new Image <img> object for the input image
    //    Call of new Image()
    // 4. Define an Image.onload event function calling UtilImage.callbackAfterLoad
    //    The input image must be loaded before the calculation of scale factor and translations
    //    (This statement must come prior to setting the Image.src to the new image)
    // 5. Add an Image event listener 'error' calling UtilImage.callbackImageNotFound
    //    Call of Image.addEventListener
    // 6. Set the input image file name for the new Image
    //    Call of Image.src
    //
    // Refences
    // https://bytes.com/topic/javascript/answers/848200-how-pass-parameter-via-image-onload-function-call
    // https://stackoverflow.com/questions/9815762/detect-when-an-image-fails-to-load-in-javascript
    static replaceImageInDivContainer(i_image_file_name, i_el_div_container)
    {
        if (i_image_file_name.length < 4)
        {
            alert("UtilImage.replaceImageInDivContainer Image file name is not defined");

            return;
        }

        var el_image_in_div = UtilImage.getImageElement(i_el_div_container);

        if (null == el_image_in_div)
        {
            return;
        }

        var el_new_image = new Image();

        el_new_image.onload = function () {UtilImage.callbackAfterLoad(el_new_image, el_image_in_div, i_el_div_container); };

        el_new_image.addEventListener('error', UtilImage.callbackImageNotFound);

        el_new_image.src = i_image_file_name;

    } // replaceImageInDivContainer

    // Error callback function for the case that the image file is missing
    static callbackImageNotFound()
    {
        alert("UtilImage.callbackImageNotFound");

    } // callbackImageNotFound

    // Replace, scale and position the image in the <div> container
    // Callback function when the image has been loaded
    // 1. Check that the loading is completed
    //    Call of Image.complete
    // 2. Calculate the scale factor
    //    Call of UtilImage.getFitImageToDivScaleFactor
    // 3. Calculate scaled width and height for the new image
    // 4. Define an Image.onload event function
    // 4.1 Set image width and height. Call of Image.width and Image.height
    // 4.2 Center the image vertically and horizontally
    //     Call of UtilImage.centerImage
    // 5. Set the existing Image file name equal to the new Image file name
    //    Call of Image.src
    //
    // Refence
    // https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_img_complete2
    static callbackAfterLoad(i_el_new_image, i_el_image_in_div, i_el_div_container)
    {
        if (!i_el_new_image.complete)
        {
            alert("UtilImage.callbackAfterLoad Image loading not complete");

            return;
        }

        var scale_factor = UtilImage.getFitImageToDivScaleFactor(i_el_new_image, i_el_div_container);

        console.log("UtilImage.callbackAfterLoad scale_factor= " + scale_factor.toString());

        var new_image_width = i_el_new_image.naturalWidth;
    
        var new_image_height = i_el_new_image.naturalHeight;
    
        var new_image_width_scaled = parseInt(new_image_width*scale_factor);
    
        var new_image_height_scaled = parseInt(new_image_height*scale_factor);

        i_el_image_in_div.onload = function () 
        { 
            i_el_image_in_div.width = new_image_width_scaled;

            i_el_image_in_div.height = new_image_height_scaled;

            UtilImage.centerImage(i_el_image_in_div, i_el_div_container);

        };

        i_el_image_in_div.src = i_el_new_image.src; 

    } // callbackAfterLoad

    // Returns a fitted (scaled) <img> element to a comtainer <div> element
    // Returns null for failure
    // i_image_el: An image <img> element 
    // //          (Should have been fitted with UtilImage.fitImageToContainer)
    // i_el_div_container: A container <div> element
    static fitImageToContainer(i_image_el, i_el_div_container)
    {
        if (null == i_image_el)
        {
            alert("UtilImage.fitImageToContainer Input <img> is null");

            return null;
        }

        if (null == i_el_div_container)
        {
            alert("UtilImage.fitImageToContainer Input container <div> is null");

             return null;
        }

        var ret_image_el = i_image_el;

        var scale_factor = UtilImage.getFitImageToDivScaleFactor(i_image_el, i_el_div_container);

        console.log("UtilImage.fitImageToContainer scale_factor= " + scale_factor.toString());

        var input_image_width = i_image_el.naturalWidth;
    
        var input_image_height = i_image_el.naturalHeight;

        var ret_image_width_scaled = parseInt(input_image_width*scale_factor);

        var ret_image_height_scaled = parseInt(input_image_height*scale_factor);

        ret_image_el.style.width = ret_image_width_scaled.toString() + 'px';

        ret_image_el.style.height = ret_image_height_scaled.toString() + 'px'
    
        return ret_image_el;

    } // fitImageToContainer

    // Fits (scales) an <img> element so that it fits to the <div> container,
    // adds the <img> element to the <div container and returns the fitted
    // (scaled) <img> element.
    // Returns null for failure
    // i_image_el: An image <img> element
    // i_el_div_container: A container <div> element
    static fitAddCenterImageInContainer(i_image_el, i_el_div_container)
    {
        if (null == i_image_el)
        {
            alert("UtilImage.fitImageToContainer Input <img> is null");

            return null;
        }

        if (null == i_el_div_container)
        {
            alert("UtilImage.fitImageToContainer Input container <div> is null");

             return null;
        }

        var fit_image_el = UtilImage.fitImageToContainer(i_image_el, i_el_div_container);

        i_el_div_container.innerHTML = '';

        i_el_div_container.appendChild(fit_image_el);

        UtilImage.centerImage(fit_image_el, i_el_div_container);

        return fit_image_el;
       
    } // fitAddCenterImageInContainer

    // Place the picture in the center. Vertically and horizontally
    // 1. Calculate vertical translation and transform the image
    //    Call of Image.style.transform
    // 2. Center the image by adding CSS statements to the image element
    //    Call of Image.style.display,  Image.style.marginLeft and  Image.style.marginRight
    static centerImage(i_el_image_in_div, i_el_div_container)
    {
        var div_image_container_height = i_el_div_container.offsetHeight - 10; // px Adjusted with 10
        
        var image_height = i_el_image_in_div.height;

        var el_image = UtilImage.getImageElement(i_el_div_container);

        if (div_image_container_height - image_height > 50)
        {
            var translate_y = parseInt((div_image_container_height - image_height)/2.0);

            el_image.style.transform = 'translateY(' + translate_y.toString() + 'px)';
        }
        else
        {
            el_image.style.transform = 'none';

            i_el_image_in_div.style.marginTop ="2px";
        }

        i_el_image_in_div.style.display ="block";

        i_el_image_in_div.style.marginLeft ="auto";

        i_el_image_in_div.style.marginRight ="auto";
        
    } // centerImage

    // Returns the image element of the image container div
    // 1. Get all <img> elements in the input <div> container
    //    Call of HTML function getElementsByTagName
    // 2. Chech that it is only one <img> element
    // 3. Return the <img> element
    static getImageElement(i_el_div_container)
    {
        var img_list = i_el_div_container.getElementsByTagName("img");

        if (null == img_list || 0 == img_list.length)
        {
            alert("UtilImage.getImageElement There is no image in the image container");

            return null;            
        }

        if (img_list.length > 1)
        {
            alert("UtilImage.getImageElement There are multiple images in the div container");

            return null;                    
        }

        return img_list[0];

    } // getImageElement

    // Returns the scale factor that fits the input image in the input <div> container
    // 1. Get the input <div> container width and height. Adjust size with 10
    //    Call HTML element functions offsetHeight and offsetWidth
    // 2. Get the image width and height
    //    Call of Image.naturalWidth and Image.naturalHeight
    // 3. Calculate horizontal and vertical scale factors
    // 4. Return the smallest scale factor
    static getFitImageToDivScaleFactor(i_el_image, i_el_div_container)
    {
        var ret_scale_factor = -0.23456789;
     
        var div_photo_container_height = i_el_div_container.offsetHeight - 10; // px Adjusted with 10
    
        var div_photo_container_width = i_el_div_container.offsetWidth - 10; // py Adjusted with 10
    
        var modal_photo_height = i_el_image.naturalHeight;
    
        var modal_photo_width = i_el_image.naturalWidth;
    
        var scale_height = div_photo_container_height/modal_photo_height;
    
        var scale_width = div_photo_container_width/modal_photo_width;
    
        if (scale_height < scale_width)
        {
            ret_scale_factor = scale_height;
        }
        else
        {
            ret_scale_factor = scale_width;
        }
    
        return ret_scale_factor;
    
    } // getFitImageToDivScaleFactor

} // UtilImage

// File: UtilLock.js
// Date: 2024-03-24
// Author: Gunnar Lidén

// File content
// =============
//
// Class with functions for the locking and unlocking the writing of 
// files on the server. A typical example is the Guestbook Upload
// application. When one user uploads an image and registers the
// new record in the XML files, other users are not allowed to do
// that simultaneously.
//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Special for this class: 
// The name of the global object variable must be g_util_lock_object
//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// 
//
// This is how it is implemented:
// 1. Click event
//    The user klicks a save button for the upload and/or change
//    of files on the server
// 2. The application checks if somebody else has locked the files.
//    The function UtilLock() checks if the content of an lock/unlock
//    file is 'files_not_locked' or 'files_locked'. If the files are
//    locked a "locked callback functionn" is called.
// 3. The UtilLock member function locks the writing of data
//    The UtilLock() functions sets the content of the lock/unlock
//    file to 'files_locked'.
// 4. The application uploads and/or changes data on the server
// 5. The application unlocks 
//    The member function UtilLock.unlock() is called.
//

class UtilLock
{
    constructor(i_lock_dir)
    {
        // The absolute or relative URL to the directory with the
        // lock/unlock file
        this.m_lock_dir = i_lock_dir;

        // The name of the lock/unlock file
        this.m_file_name = 'LockUnlock.txt';

        // The lock/unlock file content string if files are locked
        this.m_content_locked_str = 'files_locked';

        // The lock/unlock file content string if files are unlocked
        this.m_content_unlocked_str = 'files_unlocked';

        // The name of the function that will be called when the files 
        // have been locked
        this.m_locked_callback_fctn = UtilLock.filesHaveBeenLocked;

        // The name of the function that will be called when the files 
        // have been unlocked
        this.m_unlocked_callback_fctn = UtilLock.filesHaveBeenUnlocked;

        // The name of the function that will be called when locking 
        // failed, i.e. somebody else is locking the files. Or error ....
        this.m_locking_failed_callback_fctn = UtilLock.filesCouldNotBeLocked;

        // The name of the function that will be called when unlocking 
        // failed, i.e. somebody else is locking the files.
        this.m_unlocking_failed_callback_fctn = UtilLock.filesCouldNotBeUnlocked;

        // The name of the function that will be called for unexpected failures
        this.m_unexpected_failure_callback_fctn = UtilLock.unexpectedFailure;

        // The number of trials locking the files, i.e. waiting time 
        // untlil another user unlocks the files. Default (already
        // set) number is five (5).
        this.m_number_locking_trials = 5;

        // The number of used locking trials
        this.m_used_number_locking_trials = 0;

        // The sleeping time for ech lock trial, i.e. defines the 
        // waiting time until another user unloccks the files. 
        // Default (already set) time is 800 milliseconds.
        this.m_trial_sleep_time = '800';

        // The user email. The email address is not necessary for
        // the funtionality. It is only used for debugging purposes
        // Also a user name can be used
        this.m_user_email = '';

        // Initialization
        this.init();

    } // constructor

    // Initialization
    init()
    {


    } // init

    // Returns true if the name of the global variable is OK
    globalObjectVariableNameIsOk()
    {
        if (g_util_lock_object != this)
        {
            alert("UtilLock.init The global UtilLock object variable has not the name g_util_lock_object");

            return false;
        }
        else
        {
            // console.log("UtilLock.init The global UtilLock object variable has the right name g_util_lock_object");

            return true;
        }

    } // globalObjectVariableNameIsOk

    // Lock files
    lock()
    {
        if (!this.globalObjectVariableNameIsOk())
        {
            return;
        }

        var exec_case = UtilLock.execPhpCaseLockFiles();

        this.execOnServer(exec_case);

    } // lock

    // Force locking the files even if somebody else has locked them
    lockForce()
    {
        var exec_case = UtilLock.execPhpCaseLockFilesForce();

        this.execOnServer(exec_case);

    } // lockForce

    // Unlock files
    unlock()
    {
        if (!this.globalObjectVariableNameIsOk())
        {
            return;
        }

        var exec_case = UtilLock.execPhpCaseUnlockFiles();

        this.execOnServer(exec_case);

    } // unlock

    // Execute on the server
    execOnServer(i_exec_case)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            console.log("UtilServer.execOnServer Do nothing. Not running on the server");

            return;
        }

        var rel_path_file_input = UtilServer.replaceAbsoluteWithRelativePath(this.m_lock_dir + this.m_file_name);

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilLock.php');
        // var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/WwwUtils/Php/UtilLock.php');

        $.post
        (rel_path_file_php,
            {
            exec_case: i_exec_case,
            url_file: rel_path_file_input,
            locked_str: this.m_content_locked_str,
            unlocked_str: this.m_content_unlocked_str,
            user_email: this.m_user_email
            },
            function(data_exec,status_exec)
            {
                if (status_exec == "success")
                {
                    
                    var index_fail_lock = data_exec.indexOf(UtilLock.dataPhpKeyUnableToLockFiles());
                    var index_fail_unlock = data_exec.indexOf(UtilLock.dataPhpKeyUnableToUnlockFiles());

                    if (index_fail_lock >= 0 || index_fail_unlock >= 0)
                    {
                        console.log("UtilLock.execOnServer failure. data_exec= " + data_exec.trim());

                        if (index_fail_lock >= 0)
                        {
                            console.log("UtilLock.execOnServer Another user has locked the files. ");

                            //Test UtilLock.filesCouldNotBeLocked();

                            var key_str_length = UtilLock.dataPhpKeyUnableToLockFiles().length;

                            var email_str = data_exec.substring(key_str_length + 1);

                            g_util_lock_object.m_locking_failed_callback_fctn(email_str);

                            return;
                        }
                        else if (index_fail_unlock >= 0)
                        {
                            console.log("UtilLock.execOnServer Failure unlocking the files. ");

                            //Test UtilLock.filesCouldNotBeUnlocked();

                            g_util_lock_object.m_unlocking_failed_callback_fctn();

                            return;

                        }

                    } // End success PHP execution, but lock or unlock failed

                    // Succesful execution. Callback function is determined by the case
                    // ----------------------------------------------------------------

                    if (i_exec_case == UtilLock.execPhpCaseLockFiles())
                    {
                        //Test UtilLock.filesHaveBeenLocked();

                        g_util_lock_object.m_locked_callback_fctn();
                    }
                    else if (i_exec_case == UtilLock.execPhpCaseLockFilesForce())
                    {
                        g_util_lock_object.m_locked_callback_fctn();
                    }
                    else if (i_exec_case == UtilLock.execPhpCaseUnlockFiles())
                    {
                        //Text UtilLock.filesHaveBeenUnlocked();

                        g_util_lock_object.m_unlocked_callback_fctn();
                    }
                    else
                    {
                        alert("UtilLock.execOnServer Not an implemented case= " + i_exec_case);

                    }
                }
                else
                {
                    alert("Execution of UtilLock.php failed. data_exec= " + data_exec.trim());

                    //Test UtilLock.unexpectedFailure();

                    g_util_lock_object.m_unexpected_failure_callback_fctn();

                } // No success, i.e. execution of PHP failed

            } // function

        ); // post
        
    } // execOnServer

    // Callback function files have been locked
    static filesHaveBeenLocked()
    {
        alert("UtilLock.filesHaveBeenLocked Files have been locked");

    } // filesHaveBeenLocked

    // Callback function files have been unlocked
    static filesHaveBeenUnlocked()
    {
        alert("UtilLock.filesHaveBeenUnocked Files have been unlocked");

    } // filesHaveBeenUnlocked

    // Callback function files have been unlocked
    static filesHaveBeenUnlocked()
    {
        alert("UtilLock.filesHaveBeenUnlocked Files have been unlocked");

        g_util_lock_object.m_used_number_locking_trials = 0;

    } // filesHaveBeenUnlocked

    // Callback function if unlocking failed
    static filesCouldNotBeUnlocked()
    {

        alert("UtilLock.filesCouldNotBeUnlocked   Failure unlocking the files. ");

    } // filesCouldNotBeUnlocked

    // Callback function if locking failed
    static filesCouldNotBeLocked(i_email_str)
    {

        if (g_util_lock_object.m_used_number_locking_trials < g_util_lock_object.m_number_locking_trials)
        {
            g_util_lock_object.m_used_number_locking_trials = g_util_lock_object.m_used_number_locking_trials + 1;

            console.log("UtilLock.filesCouldNotBeLocked m_used_number_locking_trials= " +
                    g_util_lock_object.m_used_number_locking_trials);

            setTimeout(g_util_lock_object.lock(), g_util_lock_object.m_trial_sleep_time);
        }
        else
        {
            console.log("UtilLock.filesCouldNotBeLocked   Failure unlocking the files. m_used_number_locking_trials= " +
                            g_util_lock_object.m_used_number_locking_trials + ' Locked by email= ' + i_email_str);

            g_util_lock_object.m_used_number_locking_trials = 0;

            g_util_lock_object.lockForce();
        }

    } // filesCouldNotBeLocked

    // Callback function for an unexpected failure
    static unexpectedFailure()
    {
        alert("UtilLock.unexpectedFailure   Unexpected failure");

    } // unexpectedFailure

    // PHP execution case lock files
    static execPhpCaseLockFiles()
    {
        return "ExecLockFiles";

    } // execPhpCaseLockFiles

    // PHP execution case lock files even if somebody has locked the files
    static execPhpCaseLockFilesForce()
    {
        return "ExecLockFilesForce";

    } // execPhpCaseLockFilesForce

    // PHP execution case unlock files
    static execPhpCaseUnlockFiles()
    {
        return "ExecUnlockFiles";

    } // execPhpCaseUnlockFiles

    // PHP execution case initialize debug file
    static execPhpCaseInitDebug()
    {
        return "ExecInitDebugFile";

    } // execPhpCaseInitDebug

    // The PHP key telling that files not could be locked
    static dataPhpKeyUnableToLockFiles()
    {
        return 'Unable_to_lock_files';

    } // dataPhpKeyUnableToLockFiles

    // The PHP key telling that files not could be unlocked
    static dataPhpKeyUnableToUnlockFiles()
    {
        return 'Unable_to_unlock_files';

    } // dataPhpKeyUnableToUnlockFiles

    // Sets the name of the lock/unlock file
    // Default name (already set) is LockUnlock.txt
    setLockUnlockFileName(i_file_name)
    {
        this.m_file_name = i_file_name;

    } // setLockUnlockFileName

    // Sets the lock/unlock file content string if files are locked
    // Default (already set) value is 'files_locked'
    setContentLockedString(i_content_locked_str)
    {
        this.m_content_locked_str = i_content_locked_str;

    } // setContentLockedString

    // Sets the lock/unlock file content string if files are unlocked
    // Default (already set) value is 'files_unlocked'
    setContentUnlockedString(i_content_unlocked_str)
    {
        this.m_content_unlocked_str = i_content_unlocked_str;

    } // setContentUnlockedString

    // Sets the user email
    setUserEmail(i_user_email)
    {
        this.m_user_email = i_user_email;

    } // setUserEmail

    // Set the name of the function that will be called when the files have
    // been locked. Default (already set) name is filesHaveBeenUnlocked
    setLockedCallbackFunctionName(i_locked_callback_fctn)
    {
        this.m_locked_callback_fctn = i_locked_callback_fctn;

    } // setLockedCallbackFunctionName

    // Set the name of the function that will be called when the files have
    // been unlocked. Default (already set) name is filesHaveBeenLocked
    setUnlockedCallbackFunctionName(i_unlocked_callback_fctn)
    {
        this.m_unlocked_callback_fctn = i_unlocked_callback_fctn;

    } // setUnlockedCallbackFunctionName

    // Set the name of the function that will be called when locking 
    // failed, i.e. somebody else is locking the files. Or error ....
    // Default (already set) name is filesCouldNotBeLocked
    setLockingFailedCallbackFunctionName(i_locking_failed_callback_fctn)
    {
        this.m_locking_failed_callback_fctn = i_locking_failed_callback_fctn;

    } // setLockingFailedCallbackFunctionName

    // Set the name of the function that will be called when locking 
    // failed, i.e. somebody else is locking the files. Or error ....
    // Default (already set) name is filesCouldNotBeLocked
    setUnlockingFailedCallbackFunctionName(i_unlocking_failed_callback_fctn)
    {
        this.m_unlocking_failed_callback_fctn = i_unlocking_failed_callback_fctn;

    } // setUnlockingFailedCallbackFunctionName

    // Set the name of the function that will be called for an unexpected failure
    // Default (already set) name is unexpectedFailure
    setUnexpectedFailureCallbackFunctionName(i_unexpected_failure_callback_fctn)
    {
        this.m_unexpected_failure_callback_fctn = i_unexpected_failure_callback_fctn;

    } // setUnexpectedFailureCallbackFunctionName

    // Set the number of trials locking the files, i.e. waiting time 
    // untlil another user unloccks the files. Default (already
    // set) number is five (5).
    setNumberOfLockTrials(i_number_locking_trials)
    {
        this.m_number_locking_trials = i_number_locking_trials;

    } // setNumberOfLockTrials

    // Set the sleeping time for ech lock trial, i.e. defines the 
    // The sleeping time for ech lock trial, i.e. defines the 
    // waiting time until another user unloccks the files. 
    // Default (already set) time is 300 milliseconds.
    setTrialSleepingTime(i_trial_sleep_time)
    {
        this.m_trial_sleep_time = i_trial_sleep_time;

    } // setTrialSleepingTime


} // UtilLock

// File: UtilDevice.js
// Date: 2024-10-09
// Author: Gunnar Lidén

// File content
// =============
//
// Class with device functions

class UtilDevice
{
    // Returns true for a device of type mobile
    // https://www.tutorialspoint.com/how-to-detect-a-mobile-device-with-javascript
    static isMobile()
    {
        var is_mobile = null;

        //QQ alert("UtilDevice.isMobile navigator.userAgent= " + navigator.userAgent)

        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)) 
        {
            is_mobile = true ;
        } 
        else 
        {
            is_mobile= false ;
        }

        return is_mobile;

    } // isMobile

    // Returns the screen width
    // https://www.sencha.com/blog/js-frameworks-javascript-for-device-characteristic-detection/
    static screenWidth()
    {
        const screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        return screen_width;

    } // screenWidth

    // Returns the screen height
    static screenHeight()
    {
        const screen_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        return screen_height;
        
    } // screenHeight

    // Returns true if the orientation is portrait
    // https://www.capscode.in/blog/how-to-detect-screen-orientation-using-javascript
    static isPortrait()
    {
        if (window.matchMedia("(orientation: portrait)").matches) 
        {
           return true;
        }
        else
        {
            return false;
        }
          
    } // isPortrait

    // Returns true if the orientation is landscape
    // https://www.capscode.in/blog/how-to-detect-screen-orientation-using-javascript
    static isLandscape()
    {
        if (window.matchMedia("(orientation: landscape)").matches) 
        {
           return true;
        }
        else
        {
            return false;
        }
          
    } // isLandscape

    /////////////////////////////////////////////////////////////////////////
    //////// Start Fullscreen Functions /////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////

    // Open fullscreen for an element
    // Input: Element that shall be displayed in fullscreen
    // Get the documentElement (<html>) to display the page in fullscreen
    // var elem = document.documentElement;
    static openFullScreen(i_element)
    {
        // https://www.w3schools.com/howto/howto_js_fullscreen.asp
        // 
        if (i_element == null)
        {
            alert("openFullScreenForElement Input element is null");
    
            return;
        }

        if (UtilDevice.isFullScreen())
        {
            console.log("UtilDevice.openFullScreen There is already an element opened in full screen");

            return;
        }
    
        if (i_element.requestFullscreen) // Returns true if the mode is available for this element (standard)
        {
            i_element.requestFullscreen();
        } 
        else if (i_element.webkitRequestFullscreen) // Returns true if the mode is available for this element (Safari/Opera)
        { // Safari 
            i_element.webkitRequestFullscreen();
        } 
        else if (elem.msRequestFullscreen) // Returns true if the mode is available for this element (Internet Explorer)
        { // IE11 
            i_element.msRequestFullscreen();
        }
    
    } // openFullScreen

    // Exit full screen
    static exitFullScreen() 
    {
        if (document.exitFullscreen) 
        {
          document.exitFullscreen();
        } 
        else if (document.webkitExitFullscreen) 
        { // Safari 
          document.webkitExitFullscreen();
        } 
        else if (document.msExitFullscreen) 
        { // IE11 
          document.msExitFullscreen();
        }
        
    } // exitFullscreen

    // Returns true if an HTML element is open in full screen
    // https://www.w3schools.com/jsref/prop_document_fullscreenelement.asp
    // https://stackoverflow.com/questions/9454125/javascript-request-fullscreen-is-unreliable
    static isFullScreen()
    {
        if ( document.fullscreenElement       != null ||  // Standard syntax
             document.webkitFullscreenElement != null ||  // Safari and Opera syntax
             document.msFullscreenElement     != null   ) // Internet Explorer 11 syntax
        {
            return true;
        }
        else
        {
            return false;
        }

    } // isFullScreen


    // Get the element that is displayed in full screen
    // Returns null if there is no such element
    static getFullScreenElement()
    {
        if ( document.fullscreenElement != null)
        {
            console.log("UtilDevice.getFullScreenElement Standard syntax");

            return document.fullscreenElement;
        }
        else if ( document.webkitFullscreenElement != null)
        {
            console.log("UtilDevice.getFullScreenElement Safari and Opera syntax");

            return document.webkitFullscreenElement;
        }
        else if ( document.msFullscreenElement != null)
        {
            console.log("UtilDevice.getFullScreenElement Safari and Opera syntax");

            return document.msFullscreenElement;
        }
        else
        {
            console.log("UtilDevice.getFullScreenElement No element opened in full screen");

            return null;
        }

    } // getFullScreenElement

    /////////////////////////////////////////////////////////////////////////
    //////// End Fullscreen Functions ///////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////


/*
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Fullscreen Functions /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


  
    static isFullScreenEnabled()
    {
        // https://pretagteam.com/question/how-to-detect-if-user-has-enabled-full-screen-in-browser
        
        //console.log("isFullScreenEnabled Width diff = "  + (screen.width - window.innerWidth).toString() + 
        //" Height diff = "  + (screen.height - window.innerHeight).toString());
        
        if (screen.width == window.innerWidth && screen.height == window.innerHeight)
        {
            return true;
        }
        else if (browserWindowHasDesktopWidth() && screen.height == window.innerHeight)
        {
            // For the case debug (F12) mode where screen.width != window.innerWidth for full screen
            return true;
        }
        else
        {
            return false;
        }
    
    } // isFullScreenEnabled
  
// Returns true if full screen has been enabled in the browser
function isFullScreenEnabled()
{
// https://pretagteam.com/question/how-to-detect-if-user-has-enabled-full-screen-in-browser

//console.log("isFullScreenEnabled Width diff = "  + (screen.width - window.innerWidth).toString() + 
//" Height diff = "  + (screen.height - window.innerHeight).toString());

if (screen.width == window.innerWidth && screen.height == window.innerHeight)
{
    return true;
}
else if (browserWindowHasDesktopWidth() && screen.height == window.innerHeight)
{
    // For the case debug (F12) mode where screen.width != window.innerWidth for full screen
    return true;
}
else
{
    return false;
}

} // isFullScreenEnabled

// Returns true if full screen has been enabled in the browser and the device is a 
// smartphone (and browser for example is the app Fully Kiosk Browser)
function isFullScreenEnabledForSmartphone()
{
var b_full_screen = isFullScreenEnabled();

var b_smartphone = false;

if (browserWindowHasDesktopWidth())
{    
    b_smartphone = false;
}
else
{
    b_smartphone = true;
}

if (b_full_screen && b_smartphone)
{
    return true;
}
else
{
    return false;
}

} // isFullScreenEnabledForSmartphone

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Fullsctreen Functions ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


*/

} // UtilDevice
// File: UtilQuery.js
// Date: 2024-10-04
// Author: Gunnar Lidén

// File content
// =============
//
// Class with query string functions.
// Parameters after ? shall be separated with & e.g. 
// https://jazzliveaarau.ch/Guestbook/GuestbookUpload.htm?TestVersion&MobileTelephone

class UtilQuery
{
    // Get params from the current URL
    static getParamsCurrentUrl() 
    {
        var ret_param_array = [];
    
        var query_str = UtilQuery.getString('');
    
        if (query_str.length == 0)
        {
          return ret_param_array;
        }
    
        ret_param_array = UtilQuery.getAllParams(query_str);
    
        return ret_param_array;
    
    } // getParamsCurrentUrl

    // Returns true if input parameter (string) is in the query string for current URL
    static isParamCurrentUrl(i_param)
    {
        var b_in_array = false;

        var param_array = UtilQuery.getParamsCurrentUrl();

        for (var index_param=0; index_param < param_array.length; index_param++)
        {
            var current_param = param_array[index_param];

            if (current_param == i_param)
            {
                b_in_array = true;
            }
        }

        return b_in_array;

    } // isParamCurrentUrl

     // Get all parameters from a query string created in this application (without ?)
    static getAllParams(i_query_str)
    {
        var ret_param_array = [];
    
        var n_char = i_query_str.length;
    
        var n_words = 0;
    
        var current_param = '';
        for (var index_char=0; index_char<n_char;index_char++)
        {
            var current_char = i_query_str.substring(index_char, index_char + 1);
    
            if (current_char == '&')
            {
                if (current_param.length > 0)
                {
                    ret_param_array[n_words] = current_param;
    
                    n_words = n_words + 1;
    
                    current_param = '';
                }
            }
            else
            {
                current_param = current_param + current_char;
            }
        }
    
        if (current_param.length > 0)
        {
            ret_param_array[n_words] = current_param;
        }
    
        return ret_param_array;
    
    } // getAllParams

    // Get the query string from the input URL or current page URL (i_url ='')
    static getString(i_url)
    {
        var ret_query_string = '';
        
        // get query string from url (optional) or window
        ret_query_string = i_url ? i_url.split('?')[1] : window.location.search.slice(1);
    
      
        return ret_query_string;
        
    } // getString

} // UtilQuery

    