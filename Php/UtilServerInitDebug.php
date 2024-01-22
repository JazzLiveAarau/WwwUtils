

<?php

// Initialization of a debug file
// ------------------------------

// Gunnar Liden   2024-01-22

error_reporting(E_ALL);
ini_set('display_errors', true);

// Passed data from the calling function
$file_name = $_POST['file_name'];

$file_content = "Debug output with functions UtilServer.initDebugFile and UtilServer.appendDebugFile" . PHP_EOL .
                "===================================================================================" . PHP_EOL .
                "Debug file name: " . $file_name . PHP_EOL . PHP_EOL;

$debug_file = fopen("$file_name", "w") or exit("Unable_to_open_file_".error_get_last());

// Write the input string with the file content to the file.
fwrite($debug_file, $file_content); 

fclose($debug_file);

echo $file_name;
echo " is created ";
 
?>
 
