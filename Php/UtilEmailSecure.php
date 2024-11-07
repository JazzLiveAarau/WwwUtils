

<?php

// Sends an email
// --------------
//
// This function is called from another HTML (or PHP) page this way:
// $.post("UtilEmailSecure.php", {a_from: from_str, a_subject: subject_str, a_msg: msg_str, a_to: to_str, a_bcc: bcc_str, s_to: secure_to},function(data,status){alert(data);});
//
// $.post():              Method requesting data from the server using an HTTP POST request. 
//                        Hier actually only requesting an execution, i.e. send an email 
// "UtilEmailSecure.php": URL parameter specifies the URL you wish to request
//                        Please note that the whole file will be executed. Not a normal function call
// a_from:                Input PHP parameter from address (from_str is the JavaScript parameter) 
// a_msg:                 Input PHP parameter message (msg_str is the JavaScript parameter) 
//                        Please note that 
//                        - Escape characters like \n not is allowed in the string
//                        - For a long message (many chars) there must be HTML new lines <br>
// a_to:                  Input PHP parameter to address (to_str is the JavaScript parameter)
//                        Multiple addresses shall be separated with comma
// a_bcc:                 Input PHP parameter BCC address (cc_str is the JavaScript parameter)
//                        Please note that only the hidden bcc addresses can be given as input
//                        and not cc. 
//                        Multiple addresses shall be separated with comma
// secure_to:             Email address for an error message if this PHP file has been used to send spam
//
// function:              The callback function, i.e. defining what to do with the PHP result
//                        In this case nothing needs to be done in the calling JavaScript function
// data:                  The result of the execution. In this case only a status message (0 or -1).
//                        The data is a string that is created from calls of the PHP function echo
// status:                Status from the execution. The value is success for a succesfull execution
// alert(data):           Function doing something with the result 
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
$secure_to = $_POST['s_to'];

// Secure file names

$file_secure_time_stamps = "Secure/SecureUtilEmailTimeStamps.txt";

// Debug file names
$file_debug_rows = "Debug/DebugUtilEmailSecureRowEnds.txt";
$file_debug_send = "Debug/DebugUtilEmailSecureSend.txt";

secureAppendTimeStamp($address_to, $file_secure_time_stamps);

$email_message_lines = replaceHtmlRowEnds($email_message, $file_debug_rows);

sendEmail($email_subject, $email_message_lines, $address_to, $address_from, $address_bcc, $file_debug_send);

// Determine if the PHP file has been (is being) used to send spam
function secureEmail($i_secure_to, $i_file_secure_time_stamps)
{
	// Do nothing if the secure email address not is set
	if (strlen($i_secure_to) <= 2)
	{
	  return;
	}

} // secureEmail

// Send the email
function sendEmail($i_email_subject, $i_email_message, $i_address_to, $i_address_from, $i_address_bcc, $i_file_debug)
{
	// Always set content-type when sending HTML email
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

	// More headers
	$headers .= 'From: ' . $i_address_from . "\r\n";
	$headers .= 'BCC: ';
	$headers .= $i_address_bcc;
	$headers .=  "\r\n";

	// Send the mail
	if (mail($i_address_to, $i_email_subject, $i_email_message, $headers))
	{
		echo 'MailIsSent';	

		debugAppend('sendEmail Enter. Email is sent to ' . $i_address_to, $i_file_debug);
	}
	else
	{
		echo 'MailIsNotSent';
		
		debugAppend('sendEmail Enter. Email is NOT sent to ' . $i_address_to, $i_file_debug);
	}

} // sendEmail

// Replace the HTML row ends <br> with ASCCI row ends \r\n
function replaceHtmlRowEnds($i_email_message, $i_file_debug)
{
  debugAppend('replaceHtmlRowEnds Enter. i_email_message= ', $i_file_debug);
  debugAppend($i_email_message, $i_file_debug);

  $ret_email_message_lines = "";

  $message_remaining = $i_email_message;
  
  for ($loop_number=1; $loop_number<100; $loop_number = $loop_number + 1)
  {
	  $pos_br = strpos($message_remaining, "<br>");
  
	  // https://www.php.net/manual/de/function.strpos.php Three '='
	  if ($pos_br === false)
	  {

		debugAppend('message_remaining Last part ', $i_file_debug);
		debugAppend($message_remaining, $i_file_debug);
  
		$ret_email_message_lines = $ret_email_message_lines . $message_remaining;

		debugAppend('ret_email_message_lines Last part ', $i_file_debug);
		debugAppend($ret_email_message_lines, $i_file_debug);
  
		  break;
	  }
  
	  $ret_email_message_lines = $ret_email_message_lines . substr($message_remaining, 0, $pos_br + 4) . "\r\n"; 
  
	  $message_remaining = substr($message_remaining, $pos_br + 4);

	  debugAppend('message_remaining ', $i_file_debug);
	  debugAppend($message_remaining, $i_file_debug);

	  debugAppend('ret_email_message_lines ', $i_file_debug);
	  debugAppend($ret_email_message_lines, $i_file_debug);
  
  }  

  debugAppend('Returned string: ', $i_file_debug);
  debugAppend('ret_email_message_lines= ', $i_file_debug);
  debugAppend($ret_email_message_lines, $i_file_debug);

  debugAppend('replaceHtmlRowEnds Exit ', $i_file_debug);

  return $ret_email_message_lines;

} // replaceHtmlRowEnds

// Creation of a new secure file
function initSecure($i_file_secure)
{
  $time_stamp_now = time();

  $time_stamp_str =  date ("F d Y H:i:s.", $time_stamp_now);

  $file_content = "Secure output from UtilEmailSecure" . PHP_EOL . $i_file_secure . PHP_EOL . "Time stamp: " . $time_stamp_str . PHP_EOL;

  $new_file = fopen($i_file_secure, "w") or die("Unable to open file!");

  fwrite($new_file, $file_content);

  fclose($new_file);

} // initSecure

// Appends secure data to file 
function secureAppend($i_secure_str, $i_file_secure)
{
  if (strlen($i_file_secure) <= 2)
  {
	return;
  }
  
  if (!file_exists($i_file_secure)) 
  {
    initSecure($i_file_secure);
  }

  $secure_str = $i_secure_str . PHP_EOL;

  file_put_contents($i_file_secure, $secure_str, FILE_APPEND);

} // secureAppend

// Appends secure data to file 
function secureAppendTimeStamp($i_secure_str, $i_file_secure)
{
  if (strlen($i_file_secure) <= 2)
  {
	return;
  }
  
  if (!file_exists($i_file_secure)) 
  {
    initSecure($i_file_secure);
  }

  $time_stamp_now = time();

  $time_stamp_str =  date ("F d Y H:i:s.", $time_stamp_now);

  $secure_str = $time_stamp_str . "    " . $i_secure_str . PHP_EOL;

  file_put_contents($i_file_secure, $secure_str, FILE_APPEND);

} // secureAppendTimeStamp


// Creation of a new debug file
function initDebug($i_file_debug)
{
  $time_stamp_now = time();

  $time_stamp_str =  date ("F d Y H:i:s.", $time_stamp_now);

  $file_content = "Debug output from UtilEmailSecure" . PHP_EOL . $i_file_debug . PHP_EOL . "Time stamp: " . $time_stamp_str . PHP_EOL;

  $new_file = fopen($i_file_debug, "w") or die("Unable to open file!");

  fwrite($new_file, $file_content);

  fclose($new_file);

} // initDebug

// Appends debug to file 
function debugAppend($i_debug_str, $i_file_debug)
{
  if (strlen($i_file_debug) <= 2)
  {
	return;
  }
  
  if (!file_exists($i_file_debug)) 
  {
    initDebug($i_file_debug);
  }

  $debug_str = $i_debug_str . PHP_EOL;

  file_put_contents($i_file_debug, $debug_str, FILE_APPEND);

} // debugAppend


 
?>
 
