// File: UtilEmail.js
// Date: 2024-01-07
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
    static send(i_from, i_subject, i_message, i_to, i_bcc, i_path_php)
    {
        $.post
        (i_path_php + "UtilEmailSend.php", 
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