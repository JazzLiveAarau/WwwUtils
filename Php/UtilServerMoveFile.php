
<?php

// Move a file on the server
// ----------------------------
// Input data is the file name and the full content of the file
// Please note that escape characters like \n not is allowed in the string
//
// This function is called from another HTML (or PHP) page this way:
// $.post("UtilServerMoveFile.php", {file_input: url_file_input_str, file_move: url_file_move_str},function(data,status){alert(data);});
//
// $.post():                 Method requesting data from the server using an HTTP POST request. 
//                           Hier actually only requesting an execution, i.e. move a file 
// "UtilServerMoveFile.php": URL parameter specifies the URL you wish to request
//                           Please note that the whole file will be executed. Not a normal function call
// file_input:               Input PHP parameter for the execution (url_file_input_str is the JavaScript parameter) 
// file_move:                Input PHP parameter for the execution (url_file_move_str is the JavaScript parameter) 
// function:                 The callback function, i.e. defining what to do with the PHP result
//                           In this case nothing needs to be done in the calling JavaScript function
// data:                     The result of the execution. In this case only a message.
//                           The data is a string that is created from calls of PHP function echo
// status:                   Status from the execution. The value is success for a succesfull execution
//
// The function $.post is defined in a jQuery library that has to be included on calling web page
// The library may be downloaded, but also a CDN (Content Delivery Network) library can be referenced with
// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//
// The above things are described on these pages:
// https://www.w3schools.com/jquery/jquery_ajax_get_post.asp
// https://www.w3schools.com/jquery/jquery_get_started.asp
// https://www.youtube.com/watch?v=jVAaxkbmCts
// https://www.php.net/manual/de/function.copy.php

error_reporting(E_ALL);
ini_set('display_errors', true);

// Passed data from the calling function
$file_input = $_POST['file_input'];
$file_move = $_POST['file_move'];

$debug_file = fopen("debug_move_file.txt", "w") or die("Unable to open debug file");
fwrite($debug_file, "file_input= \r\n");
fwrite($debug_file, $file_input);
fwrite($debug_file, "\r\n");
fwrite($debug_file, "file_move= \r\n");
fwrite($debug_file, $file_move);
fwrite($debug_file, "\r\n");

if (!file_exists($file_input))
{
    fwrite($debug_file, "File does not exist \r\n");

    fclose($debug_file);

    exit("File_exists_not");
}

if (!copy($file_input, $file_move)) 
{
    fwrite($debug_file, "Copy file failed \r\n");

    fclose($debug_file);

    exit("Unable_to_copy_file_".error_get_last());
}

if (!unlink($file_input))
{
    fwrite($debug_file, "Delete file failed \r\n");

    fclose($debug_file);

    exit("Unable_to_delete_file_".error_get_last());
}
else
{
    fwrite($debug_file, "File was moved \r\n");

    echo "Success";
}

fclose($debug_file);
 
?>
 
