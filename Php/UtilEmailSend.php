

<?php

// Sends an email
// --------------
// Input data is the XML file name and the full content of the XML file
// Please note that escape characters like \n not is allowed in the string
//
// This function is called from another HTML (or PHP) page this way:
// $.post("UtilEmailSend.php", {a_from: from_str, a_subject: subject_str, a_msg: msg_str, a_to: to_str, a_bcc: bcc_str},function(data,status){alert(data);});
//
// $.post():            Method requesting data from the server using an HTTP POST request. 
//                      Hier actually only requesting an execution, i.e. send an email 
// "UtilEmailSend.php": URL parameter specifies the URL you wish to request
//                      Please note that the whole file will be executed. Not a normal function call
// a_from:              Input PHP parameter from address (from_str is the JavaScript parameter) 
// a_msg:               Input PHP parameter message (msg_str is the JavaScript parameter) 
// a_to:                Input PHP parameter to address (to_str is the JavaScript parameter)
// a_bcc:               Input PHP parameter BCC address (cc_str is the JavaScript parameter)
//                      Please note that only the hidden bcc addresses can be given as input
//                      and not cc. 
//
// function:            The callback function, i.e. defining what to do with the PHP result
//                      In this case nothing needs to be done in the calling JavaScript function
// data:                The result of the execution. In this case only a status message (0 or -1).
//                      The data is a string that is created from calls of the PHP function echo
// status:              Status from the execution. The value is success for a succesfull execution
// alert(data):         Function doing something with the result 
//
// The function $.post is defined in a jQuery library that has to be included on calling web page
// The library may be downloaded, but also a CDN (Content Delivery Network) library can be referenced with
// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//
// The above things are described on these pages:
// https://www.w3schools.com/jquery/jquery_ajax_get_post.asp
// https://www.w3schools.com/jquery/jquery_get_started.asp
// https://www.youtube.com/watch?v=jVAaxkbmCts
//
// Description of the mail function
// https://www.w3schools.com/php/func_mail_mail.asp
//
// Encoding
// https://www.the-art-of-web.com/javascript/escape/
// ä %C3%A4


// Passed data from the calling JavaScript function
$address_from = $_POST['a_from'];
$email_subject = $_POST['a_subject'];
$email_message = $_POST['a_msg'];
$address_to = $_POST['a_to'];
$address_bcc = $_POST['a_bcc'];

// $email_message_lines = str_replace($email_message, "<br>", "<br>\r\n");


// $debug_file = fopen("debug_send_email.txt", "w") or die("Unable to open file");
// fwrite($debug_file, "email_message= \r\n");
// fwrite($debug_file, $email_message);
// fwrite($debug_file, "\r\n");

// There must be row ends in the message. The browsers have a limit for the number 
// of characters of the line. The loop below uses the <br> tags to add \r\n

$email_message_lines = "";

$message_remaining = $email_message;

for ($loop_number=1; $loop_number<100; $loop_number = $loop_number + 1)
{
	$pos_br = strpos($message_remaining, "<br>");

	// https://www.php.net/manual/de/function.strpos.php Three '='
	if ($pos_br === false)
	{
		// fwrite($debug_file, "message_remaining Last part \r\n");
		// fwrite($debug_file, $message_remaining);
		// fwrite($debug_file, "\r\n");

		$email_message_lines = $email_message_lines . $message_remaining;

		// fwrite($debug_file, "email_message_lines Last part \r\n");
		// fwrite($debug_file, $email_message_lines);
		// fwrite($debug_file, "\r\n");

		break;
	}

	$email_message_lines = $email_message_lines . substr($message_remaining, 0, $pos_br + 4) . "\r\n"; 

	$message_remaining = substr($message_remaining, $pos_br + 4);

	// fwrite($debug_file, "message_remaining pos_br= " . $pos_br . "\r\n");
	// fwrite($debug_file, $message_remaining);
	// fwrite($debug_file, "\r\n");

	// fwrite($debug_file, "email_message_lines\r\n");
	// fwrite($debug_file, $email_message_lines);
	// fwrite($debug_file, "\r\n");
}


// fwrite($debug_file, "\r\n");
// fwrite($debug_file, "End result \r\n");
// fwrite($debug_file, "email_message_lines= \r\n");
// fwrite($debug_file, $email_message_lines);
//fclose($debug_file);

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: ' . $address_from . "\r\n";
$headers .= 'BCC: ';
$headers .= $address_bcc;
$headers .=  "\r\n";

// Send the mail
if (mail($address_to, $email_subject, $email_message_lines, $headers))
{
	echo 'MailIsSent';	
}
else
{
	echo 'MailIsNotSent';	
}

 
?>
 
