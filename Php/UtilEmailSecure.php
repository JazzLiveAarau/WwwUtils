

<?php
// File: UtilEmailSecure.php
// Date: 2024-11-11
// Author: Gunnar Lidén

// Sends an email
// --------------
//
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

// Debug file names
//$file_debug_rows = "Debug/DebugUtilEmailSecureRowEnds.txt";
$file_debug_rows = "";
$file_debug_send = getDebugFileNamePath($file_debug_send);

// debugAppend('UtilEmailSecure.php Enter', $file_debug_send);

// Secure file name
$file_secure_time_stamps = getSecureFileNamePath($file_debug_send);

secureAppendTimeStamp($address_to, $file_secure_time_stamps, $file_debug_send);

$b_spam_array = usedForSpam($secure_to, $file_secure_time_stamps, $address_to, $address_bcc, $file_debug_send);

if ($b_spam_array[0] == true || $b_spam_array[1] == true || $b_spam_array[2] == true)
{
  sendEmailSpam($email_subject, $secure_to, $address_from, $file_debug_send);
}

if ($b_spam_array[0] == false && $b_spam_array[1] == false && $b_spam_array[2] == false)
{
  $email_message_lines = replaceHtmlRowEnds($email_message, $file_debug_rows);

  sendEmail($email_subject, $email_message_lines, $address_to, $address_from, $address_bcc, $file_debug_send);
}
else if ($b_spam_array[0] == true)
{
  debugAppend('UtilEmailSecure.php Exit. Spam. Email was not sent. Too many calls within a short time period.', $file_debug_send);

  echo 'TooManyCalls';
}
else if ($b_spam_array[1] == true && $b_spam_array[2] == true)
{
  debugAppend('UtilEmailSecure.php Exit. Spam. Email was not sent. To many TO and BCC adresses', $file_debug_send);

  echo 'TooManyToAndBccAddresses';
}
else if ($b_spam_array[1] == true)
{
  debugAppend('UtilEmailSecure.php Exit. Spam. Email was not sent. To many TO adresses', $file_debug_send);

  echo 'TooManyToAddresses';
}
else if ($b_spam_array[2] == true)
{
  debugAppend('UtilEmailSecure.php Exit. Spam. Email was not sent. To many BCC adresses', $file_debug_send);

  echo 'TooManyBccAddresses';
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////// Functions /////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Returns true if this PHP function is being used to send spam
// i_secure_to  Email address for a spam usage messaage 
function usedForSpam($i_secure_to, $i_file_secure_time_stamps, $i_address_to, $i_address_bcc, $i_file_debug)
{
  // debugAppend('usedForSpam Enter', $i_file_debug);

	// Perhaps Do nothing if the secure email address not is set
	// Perhaps if (strlen($i_secure_to) <= 2)
	// Perhaps {
  // Perhaps   debugAppend('usedForSpam Exit Mail address undefined', $i_file_debug);
	// Perhaps   return false;
	// Perhaps }

  $file_rows_array =  getAllFileRowsAsArray($i_file_secure_time_stamps, $i_file_debug);

  // $n_rows = count($file_rows_array);

  // debugAppend('usedForSpam Number of rows of the secure file n_rows= ' . strval($n_rows), $i_file_debug);

  $time_stamp_int_array = getTimeStampArray($file_rows_array, $i_file_debug);

  $n_addresses_to = getNumberOfAddresses($i_address_to, $i_file_debug);

  $n_addresses_bcc = getNumberOfAddresses($i_address_bcc, $i_file_debug);

  $b_spam_array = isSpam($i_secure_to, $time_stamp_int_array, $n_addresses_to, $n_addresses_bcc, $i_file_debug);
  
  return $b_spam_array;

} // usedForSpam

// Returns an arrays with booleans 
// array[0] is true: Too many calls of this function within a short time
// array[1] is true: Too many TO  adresses
// array[2] is true: Too many BCC adresses
function isSpam($i_secure_to, $i_time_stamp_int_array, $i_n_address_to, $i_n_address_bcc, $i_file_debug)
{
  // debugAppend('isSpam Enter', $i_file_debug);

  $ret_b_array = array(false, false, false);

	// Perhaps // Do nothing if the secure email address not is set
	// Perhaps if (strlen($i_secure_to) <= 2)
	// Perhaps {
  // Perhaps   debugAppend('isSpam Exit Secure mail address undefined', $i_file_debug);
	// Perhaps   return $ret_b_array;
	// Perhaps }

  $spam_criterion_n_address_to = 1;

  $spam_criterion_n_address_bcc = 2;

  $spam_criterion_n_send_calls = 3;

  $spam_criterion_n_send_calls_time = 12; // Within last 12 seconds


  $b_n_calls = isSpamNumberOfCalls($i_time_stamp_int_array, $spam_criterion_n_send_calls_time, 
                $spam_criterion_n_send_calls, $i_file_debug);

  if ($b_n_calls)
  {
    $ret_b_array[0] = true;
  }

  if ($i_n_address_to > $spam_criterion_n_address_to)
  {
    $ret_b_array[1] = true;
  }

  if ($i_n_address_bcc > $spam_criterion_n_address_bcc)
  {
    $ret_b_array[2] = true;
  }

  return $ret_b_array;

} // isSpam

// Returns true if the number of calls within a given (input) time period 
// exceeds a given (input) number
function isSpamNumberOfCalls($i_time_stamp_int_array, $i_spam_criterion_n_send_calls_time, 
                              $i_spam_criterion_n_send_calls, $i_file_debug)
{
  $ret_b_calls = false;

  $n_stamps = count($i_time_stamp_int_array);

  if ($n_stamps < $i_spam_criterion_n_send_calls)
  {
    debugAppend('isSpamNumberOfCalls Exit. Number of calls n_stamps= ' . strval($n_stamps) . " < Number criterion= "
                  . strval($i_spam_criterion_n_send_calls), $i_file_debug);

    return $ret_b_calls;
  }

  $last_stamp_time = $i_time_stamp_int_array[$n_stamps - 1];

  $current_n_calls = 1;

  for ($index_stamp = $n_stamps - 2; $index_stamp >= 0; $index_stamp--)
  {
    $current_stamp_time = $i_time_stamp_int_array[$index_stamp];

    $current_n_calls = $current_n_calls + 1;

    $time_difference = $last_stamp_time - $current_stamp_time;

    // debugAppend('isSpamNumberOfCalls time_difference= ' . strval($time_difference) . " current_n_calls= ". strval($current_n_calls), $i_file_debug);

    if ($time_difference > $i_spam_criterion_n_send_calls_time)
    {

      //debugAppend('isSpamNumberOfCalls Exit false: time_difference= ' . strval($time_difference) .
      //            " > Time criterion= ". strval($i_spam_criterion_n_send_calls_time), $i_file_debug);

      $ret_b_calls = false;

      break;
    }

    if ($current_n_calls > $i_spam_criterion_n_send_calls) // && $time_difference <= $i_spam_criterion_n_send_calls_time
    {

      debugAppend("isSpamNumberOfCalls Exit true: Number of calls is " . strval($current_n_calls) . 
                  " > Number criterion is " . strval($i_spam_criterion_n_send_calls) , $i_file_debug);

                   debugAppend("isSpamNumberOfCalls Exit true: " .
                   " These calls were made within " . strval($time_difference) . " seconds. " .
                    "Time criterion is "  . strval($i_spam_criterion_n_send_calls_time) . " seconds. " , $i_file_debug);

      $ret_b_calls = true;

      break;
    }    

  } // index_stamp


  return $ret_b_calls;

} // isSpamNumberOfCalls

// Returns the number of addresses
function getNumberOfAddresses($i_addresses, $i_file_debug)
{
  if (trim(strlen($i_addresses)) == 0)
  {
    return 0;
  }

  $addresses_array = array();

  $n_addresses_max = 100;

  $remaining_addresses = $i_addresses;

  for ($i_address=1; $i_address <= $n_addresses_max; $i_address++)
  {

    $pos_comma = strpos($remaining_addresses, ",");

    if ($pos_comma === false)
    {
      $current_address = trim($remaining_addresses);

      array_push($addresses_array, $current_address);

      debugAppend('getNumberOfAddresses current_address= ' . $current_address, $i_file_debug);

      break;
    }

    $current_address = trim(substr($remaining_addresses, 0, $pos_comma));

    array_push($addresses_array, $current_address);

    debugAppend('getNumberOfAddresses current_address= ' . $current_address, $i_file_debug);

    $remaining_addresses = substr($remaining_addresses, $pos_comma + 1);

  }

  $n_addresses = count($addresses_array);

  debugAppend('getNumberOfAddresses n_addresses= ' . strval($n_addresses), $i_file_debug);

  return $n_addresses;

} // getNumberOfAddresses

// Returns a time stamp integer (milliseconds) array retrieved from the file rows array
function getTimeStampArray($i_file_rows_array, $i_file_debug)
{
  $time_stamp_array = array();

  $n_rows = count($i_file_rows_array);

  // debugAppend('getTimeStampArray Number of rows of the secure file n_rows= ' . strval($n_rows), $i_file_debug);

  for ($index_row = 0; $index_row < $n_rows; $index_row = $index_row + 1 )
  {

    $current_row = $i_file_rows_array[$index_row];

    $pos_hash = strpos($current_row, "#");

    if ($pos_hash === false)
    {
      debugAppend('getTimeStampArray Error. Separator # is missing Row= ' . $current_row, $i_file_debug);

      return $time_stamp_array;
    }

    $time_stamp_str = substr($current_row, 0, $pos_hash);

    $time_stamp_trimmed_str = trim($time_stamp_str);

    $time_stamp_int = intval($time_stamp_trimmed_str);

    array_push($time_stamp_array, $time_stamp_int);

    // debugAppend('getTimeStampArray Added to output array time stamp integer= ' . strval($time_stamp_int), $i_file_debug);

  }

  $n_elements = count($time_stamp_array);

  debugAppend('getTimeStampArray Exit. Number of elements of the integer array is ' . strval($n_elements), $i_file_debug);

  return $time_stamp_array;

} // getTimeStampArray

// Returns the content of the file rows as an array
function getAllFileRowsAsArray($i_file_secure_time_stamps, $i_file_debug)
{
  // https://www.w3schools.com/php/php_file_open.asp
  // https://www.w3schools.com/php/php_ref_array.asp

  // debugAppend('getAllFileRowsAsArray Enter', $i_file_debug);
  
  // https://www.geeksforgeeks.org/best-way-to-initialize-empty-array-in-php/
  $ret_rows_array = array();

  if (file_exists($i_file_secure_time_stamps) == false) 
  {
    debugAppend('getAllFileRowsAsArray A not existing file ' . $i_file_secure_time_stamps, $i_file_debug);

    return $ret_rows_array;
  }

  $secure_file = fopen($i_file_secure_time_stamps, "r") or die("Unable to open file!");

  $file_content = fread($secure_file,filesize($i_file_secure_time_stamps));

  fclose($secure_file);

  // debugAppend('getAllFileRowsAsArray File content is retrieved', $i_file_debug);

  $content_remaining = $file_content;

  $max_n_rows = 1000;

  for ($loop_number=1; $loop_number <= $max_n_rows; $loop_number = $loop_number + 1)
  {
	  $pos_eol = strpos($content_remaining, PHP_EOL);

    if ($pos_eol === false)
    {
      debugAppend('getAllFileRowsAsArray No end of line', $i_file_debug);

      break;
    }

    $current_row = substr($content_remaining, 0, $pos_eol);

    // debugAppend('getAllFileRowsAsArray current_row= ' . $current_row, $i_file_debug);

    array_push($ret_rows_array, $current_row);

    $content_remaining = substr($content_remaining, $pos_eol + strlen(PHP_EOL));

    if (strlen($content_remaining) == 0)
    {
      // debugAppend('getAllFileRowsAsArray content_remaining is empty', $i_file_debug);

      break;
    }

  } // loop_number

  $n_elements = count($ret_rows_array);

  debugAppend('getAllFileRowsAsArray Exit. Number of rows in the secure file is ' . strval($n_elements), $i_file_debug);

  return $ret_rows_array;

} // getAllFileRowsAsArray

// Send the email
function sendEmail($i_email_subject, $i_email_message, $i_address_to, $i_address_from, $i_address_bcc, $i_file_debug)
{
  //QQQ debugAppend('sendEmail Enter. Send email to ' . $i_address_to, $i_file_debug);

	// Always set content-type when sending HTML email
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

	// More headers
	$headers .= 'From: ' . $i_address_from . "\r\n";
	$headers .= 'BCC: ';
	$headers .= $i_address_bcc;
	$headers .=  "\r\n";

	// Send the mail
	if (mail($i_address_to, $i_email_subject, $i_email_message, $headers) == true)
	{
		echo 'MailIsSent';	

		debugAppend('sendEmail Exit. Email is sent to ' . $i_address_to, $i_file_debug);
	}
	else
	{
		echo 'MailIsNotSent';
		
		debugAppend('sendEmail Exit. Email is NOT sent to ' . $i_address_to, $i_file_debug);
	}

} // sendEmail

// Send the email that the function was used for spam
function sendEmailSpam($i_email_subject, $i_address_to, $i_address_from, $i_file_debug)
{
  if (strlen($i_address_to < 2))
  {
    return;
  }

	// Always set content-type when sending HTML email
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

	// More headers
	$headers .= 'From: ' . $i_address_from . "\r\n";
	$headers .=  "\r\n";

  $email_subject = "SPAM " . $i_email_subject;

  $email_message = "SPAM was sent with UtilEmailSecure.php. Please refer to file " . $i_file_debug;

	// Send the mail
  mail($i_address_to, $email_subject, $email_message, $headers);

  debugAppend('sendEmailSpam Exit. Secure email is sent to ' . $i_address_to, $i_file_debug);

} // sendEmailSpam

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

// Get the name and path for the secure file
function getSecureFileNamePath($i_file_debug)
{
  $date_str = getYearMonthDayString($i_file_debug);

  $dir_name = "Secure";

  $file_name_start = "SecureUtilEmail_";

  $file_extension = ".txt";

  $ret_file_name_path =  $dir_name . "/" . $file_name_start . $date_str . $file_extension;

  // debugAppend('getSecureFileNamePath File name= ' . $ret_file_name_path, $i_file_debug);

  if (file_exists($ret_file_name_path)) 
  {
    return $ret_file_name_path;
  }

  // https://clouddevs.com/php/file_exists-function/#:~:text=The%20file_exists()%20function%20in,various%20aspects%20of%20web%20development.

  if (file_exists($dir_name) == false) 
  {
    mkdir($dir_name, 0777, true); 

    debugAppend('getSecureFileNamePath Created directory= ' . $dir_name, $i_file_debug);
  }

  return $ret_file_name_path;

} // getSecureFileNamePath

// Get the name and path for the debug secure file
function getDebugFileNamePath($i_file_debug)
{
  $date_str = getYearMonthDayString($i_file_debug);

  $dir_name = "Debug";

  $file_name_start = "DebugUtilEmail_";

  $file_extension = ".txt";

  $ret_file_name_path =  $dir_name . "/" . $file_name_start . $date_str . $file_extension;

  // debugAppend('getDebugFileNamePath File name= ' . $ret_file_name_path, $i_file_debug);

  if (file_exists($ret_file_name_path)) 
  {
    return $ret_file_name_path;
  }

  // https://clouddevs.com/php/file_exists-function/#:~:text=The%20file_exists()%20function%20in,various%20aspects%20of%20web%20development.

  if (!file_exists($dir_name)) 
  {
    mkdir($dir_name, 0777, true); 

    debugAppend('getDebugFileNamePath Created directory= ' . $dir_name, $i_file_debug);
  }

  return $ret_file_name_path;

} // getDebugFileNamePath

// Returns a year_month_day string
function getYearMonthDayString($i_file_debug)
{
  // https://www.php.net/manual/en/function.date.php

  // debugAppend('getYearMonthDayString Enter ', $i_file_debug);

  $date_str = date("Y_m_d"); 

  // debugAppend('getYearMonthDayString date_str= ' . $date_str , $i_file_debug);
  
  return $date_str;

} // getYearMonthDayString

// Returns a year_month_day_hour_minute_second string
function getYearMonthDayHourMinutSecondString($i_file_debug)
{
  // https://www.php.net/manual/en/function.date.php

  $date_time_str = date("Y_m_d_H_i_s"); 

  // debugAppend('getYearMonthDayHourMinutSecondString date_time_str= ' . $date_time_str , $i_file_debug);

  return $date_time_str;
 
} // getYearMonthDayHourMinutSe

// Returns the timestamp in milliseconds as string
function getTimeStampIntString()
{
  // https://www.php.net/manual/en/datetime.gettimestamp.php
  // https://www.php.net/manual/en/datetime.settimestamp.php (set)

  $date = date_create();

  $ret_time_stamp = date_timestamp_get($date);

  return $ret_time_stamp;

} // getTimeStampIntString

// Creation of a new secure file
function initSecure($i_file_secure)
{
  $file_content = "";

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
// i_secure_str  String written after the time stamp and the date
function secureAppendTimeStamp($i_secure_str, $i_file_secure, $i_file_debug)
{
  if (strlen($i_file_secure) <= 2)
  {
	return;
  }
  
  if (!file_exists($i_file_secure)) 
  {
    initSecure($i_file_secure);
  }

  $time_stamp_int = getTimeStampIntString();

  $date_time = getYearMonthDayHourMinutSecondString($i_file_debug);

  $time_stamp_now = time();

  $secure_str = $time_stamp_int . "   #" . $date_time . "   #" . $i_secure_str . PHP_EOL;

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
 
