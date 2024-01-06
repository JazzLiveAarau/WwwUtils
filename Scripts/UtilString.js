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