// File: UtilEmail.js
// Date: 2024-11-07
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
            return false;
        }

        if (!UtilServer.execApplicationOnServer())
        {
            alert("UtilEmail.sendSecureCallback UtilEmailSecure.php cannot be executed on the local (live) server");

            return false;
        }

        // TODO Check i_to E-Mail addresses with UtilString.validEmailAddress, 
        // i.e. for mutiple addresses separated with ;

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
                    var b_failure = false;
                    if (data_send.indexOf("MailIsSent"))
                    {
                        b_ok = true;
                    }
                    if (data_send.indexOf("MailIsNotSent"))
                    {
                        b_failure = true;
                    }
                    
                    if (b_ok)			
                    {
                        console.log("UtilEmail.sendSecure Mail is sent to " + i_to);

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

        } // i_adress

        var n_adresses = all_adresses.length;

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

    // Failure copying file
    static sendError(i_subject, i_data_send, i_status_send)
    {
        console.log(" UtilEmail.sendCallback failure. data_send= " + i_data_send + ' status_send= ' + i_status_send);

        alert("UtilEmail.sendCallback Failure sending mail. Subject= " + i_subject + ' status_copy= ' + i_status_copy);

    } // sendError

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
        // i.e. for mutiple addresses separated with ;

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
                    if (data_send.indexOf("MailIsSent"))
                    {
                        b_ok = true;
                    }
                    if (data_send.indexOf("MailIsNotSent"))
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
        // i.e. for mutiple addresses separated with ;

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
                    if (data_send.indexOf("MailIsSent"))
                    {
                        b_ok = true;
                    }
                    if (data_send.indexOf("MailIsNotSent"))
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