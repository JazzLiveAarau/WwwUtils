// File: UtilEmail.js
// Date: 2024-02-22
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

    // Failure copying file
    static sendError(i_subject, i_data_send, i_status_send)
    {
        console.log(" UtilEmail.sendCallback failure. data_send= " + i_data_send + ' status_send= ' + i_status_send);

        alert("UtilEmail.sendCallback Failure sending mail. Subject= " + i_subject + ' status_copy= ' + i_status_copy);

    } // sendError

} // UtilEmail



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Email Class  ////////////////////////////(///////////////////
///////////////////////////////////////////////////////////////////////////////////////////