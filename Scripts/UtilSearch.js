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
