
<?php

// Copy a file on the server
// --------------------------
// Input data is the URL for the file to copy and URL for the copied file 
//
// This function is called from another HTML (or PHP) page this way:
// $.post("UtilServerCopyFile.php", {file_input: url_input_str, file_copy: url_file_copy_str},function(data,status){alert(data);});
//
// $.post():                 Method requesting data from the server using an HTTP POST request. 
//                           Hier actually only requesting an execution, i.e. create a file 
// "UtilServerCopyFile.php": URL parameter specifies the URL you wish to request
//                           Please note that the whole file will be executed. Not a normal function call
// file_input:               Input PHP parameter for the execution (url_input_str is the JavaScript parameter) 
// file_copy:                Input PHP parameter for the execution (url_file_copy_str is the JavaScript parameter) 
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
$file_copy = $_POST['file_copy'];

if (!file_exists($file_input))
{
    exit("File_exists_not");
}

if (!copy($file_input, $file_copy)) 
{
    echo "Unable_to_copy_file_".error_get_last();
}
else
{
    echo "Success";
    // echo  $file_copy;
}
 
?>
 
