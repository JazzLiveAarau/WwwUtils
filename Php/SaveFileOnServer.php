

<?php

// Saves a file on the server
// ---------------------------
// Input data is the file name and the full content of the file
// Please note that escape characters like \n not is allowed in the string
//
// This function is called from another HTML (or PHP) page this way:
// $.post("SaveFileOnServer.php", {file_content: content_string, file_name: file_name_str},function(data,status){alert(data);});
// A relative file name with ../ may be used but also a full file name may be used, like for instance:
// '$.post(https://www.jazzliveaarau.ch/WwwUtils/Php/SaveFileOnServer.php', .......
//
// $.post():               Method requesting data from the server using an HTTP POST request. 
//                         Hier actually only requesting an execution, i.e. create a file 
// "SaveFileOnServer.php": URL parameter specifies the URL you wish to request
//                         Please note that the whole file will be executed. Not a normal function call
// file_content:           Input PHP parameter for the execution (content_string is the JavaScript parameter) 
// file_name:              Input PHP parameter for the execution (file_name_str is the JavaScript parameter) 
// function:               The callback function, i.e. defining what to do with the PHP result
//                         In this case nothing needs to be done in the calling JavaScript function
// data:                   The result of the execution. In this case only a message.
//                         The data is a string that is created from calls of PHP function echo
//                         or from the exit() function below
// status:                 Status from the execution. The value is success for a succesfull execution
//                         Please note that for a file open error the returned status will be success.
//                         Therefore the returnde data string Unable_to_open_file can be used for an open error
// 
//
// The function $.post is defined in a jQuery library that has to be included on calling web page
// The library may be downloaded, but also a CDN (Content Delivery Network) library can be referenced with
// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//
// The above things are described on these pages:
// https://www.w3schools.com/jquery/jquery_ajax_get_post.asp
// https://www.w3schools.com/jquery/jquery_get_started.asp
// https://www.youtube.com/watch?v=jVAaxkbmCts


// Passed data from the calling function
$file_content = $_POST['file_content'];
$file_name = $_POST['file_name'];

// $file_name_test = "../../../../WwwUtilsTestData/TestUtilServerLevelFour.txt"; // Orig
// $file_name_test = "../../../../../WwwUtilsTestData/TestUtilServerLevelFour.txt"; // Test 1
// $file_name_test = "../../../WwwUtilsTestData/TestUtilServerLevelFour.txt"; // Test 2
// $file_name_test = "../../WwwUtilsTestData/TestUtilServerLevelFour.txt"; // Test 3

$debug_file = fopen("debug_save_file.txt", "w") or die("Unable to open debug file");
fwrite($debug_file, "file_name= \r\n");
fwrite($debug_file, $file_name);
fwrite($debug_file, "\r\n");

error_reporting(E_ALL);
ini_set('display_errors', true);
echo 'phpversion: ', phpversion(), "\n";
echo 'uname: ', php_uname("s r"), "\n"; // name/release of the operating system

if (file_exists($file_name))
{
    fwrite($debug_file, "File exists \r\n");
}
else
{
    fwrite($debug_file, "File does NOT exist \r\n");
}

if (is_writable($file_name))
{
    fwrite($debug_file, "File is writable \r\n");
}
else
{
    fwrite($debug_file, "File is NOT writable \r\n");
}

fclose($debug_file);

// Open file. If the file already exists it will be overwritten
// For open failure the script will stop and Unable_to_open_file will be
// added to data that is returned to the calling function 
// error_get_last()
// $file_object = fopen($file_name, "w") or exit("Unable_to_open_file_".$file_name);
$file_object = fopen($file_name, "w") or exit("Unable_to_open_file_".error_get_last());

// Write the input string with the file content to the file.
fwrite($file_object, $file_content); 

// Close the file
fclose($file_object); 

// File name is created will be added to data and returned to the calling function.
echo $file_name;
echo " is created ";
 
?>
 
