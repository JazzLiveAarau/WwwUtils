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

    