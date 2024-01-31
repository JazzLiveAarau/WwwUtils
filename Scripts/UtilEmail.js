// File: UtilEmail.js
// Date: 2024-01-31
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
    // This function is calling the PHP function UtilEmailSend.php in the directory 
    // /www/JazzScripts/Php/
    static async send(i_from, i_subject, i_message, i_to, i_bcc)
    {
        if (i_subject.length == 0 || i_to.length == 0)
        {
            alert("UtilEmail.send Subject and send to address must be set");

            return false;
        }

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
                        // alert("E-Mail ist gesendet");

                        console.log("UtilEmail.send Mail is sent to " + i_to);

                        return true;
                    }
                    else if (b_failure)
                    {
                        alert("UtilEmail.send Mail is not sent");

                        return false;
                    }
                    else 
                    {
                        alert("Fehler: data_send= " + data_send);
                        return false;
                    }			
              }
              else
              {
                  alert("Execution of UtilEmailSend.php failed. status_send= " + status_send);
                  return false;
              }   
              
          });	

    } // send


} // UtilEmail




///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Email Class  ////////////////////////////(///////////////////
///////////////////////////////////////////////////////////////////////////////////////////