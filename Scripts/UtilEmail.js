// File: UtilEmail.js
// Date: 2024-01-09
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
    // Please refer to UtilEmailSend.php for a description
    // i_from    Sender address e.g. guestbook@jazzlivaarau.ch
    // i_subject Email subject
    // i_message Email text in HTML format e.g. JAZZ <i>live</i>
    // i_to      Reciever addresses TO. Separate with ;
    // i_bcc     Hidden addresses BCC
    // i_n_top   Number of path levels to and icliding /www/ from the executing HTML file
    //           Example: i_n_top=2 for jazzlivearau.ch/WwwUtils/TestUtils.htm
    // This function is calling the PHP function UtilEmailSend.php in the directory 
    // /www/JazzScripts/Php/
    static send(i_from, i_subject, i_message, i_to, i_bcc, i_n_top)
    {
        var path_php = '';
       
        for (var i_top=1; i_top <= i_n_top; i_top++)
        {
            path_php = path_php + '../';
        }

        path_php = path_php + 'JazzScripts/Php/';

        var full_rel_filename = path_php + 'UtilEmailSend.php';

        $.post
        (full_rel_filename, 
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
                  // alert("data_send= >" + data_send + "<");
              }
              else
              {
                  alert("Execution of UtilEmailSend.php failed. status_send= " + status_send);
                  return;
              }   
              
              // Additional characters in data_send ????? TODO
              // includes() does not work in Internet Explorer
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
                 // alert("E-Mail ist gesendet");
              }
              else if (b_failure)
              {
                 alert(g_error_send_confirmation_mail);
                 return;
              }
              else 
              {
                 alert("Fehler: data_send= " + data_send);
                 return false;
              }			
          });	
      
      return true;

    } // send


} // UtilEmail




///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Email Class  ////////////////////////////(///////////////////
///////////////////////////////////////////////////////////////////////////////////////////