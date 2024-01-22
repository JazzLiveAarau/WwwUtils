

<?php

// Appends debug text
// ------------------

// Gunnar Liden   2024-01-22

error_reporting(E_ALL);
ini_set('display_errors', true);

// Passed data from the calling function
$file_content = $_POST['file_content'];
$file_name = $_POST['file_name'];

$debug_file = fopen("$file_name", "a") or exit("Unable_to_open_file_append_".error_get_last());

// Write the input string with the file content to the file.
fwrite($debug_file, $file_content . PHP_EOL); 

fclose($debug_file);

echo 'Text is appended in file ' . $file_name;
 
?>
 
