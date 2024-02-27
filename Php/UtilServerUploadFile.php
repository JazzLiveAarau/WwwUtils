
<?php

// File: UtilServerUploadFile.php
// Date: 2024-02-27
// Author: Gunnar Lidén

// References
// https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Ajax-JavaScript-file-upload-example
// https://www.php.net/manual/en/features.file-upload.post-method.php
// https://developer.mozilla.org/en-US/docs/Web/API/FormData/append


$debug_file = fopen("Debug.txt", "w") or die("Unable to open file!");

fwrite($debug_file, "Debug of UtilServerUploadFile.php \n");

/* Get the name of the uploaded file Only for debug */
$file_name = $_FILES['file_input']['name'];

// The temporary filename of the file in which the uploaded file was stored on the server.
$file_name_temp_server = $_FILES['file_input']['tmp_name'];

$to_file_name = $_POST['to_file_name'];

fwrite($debug_file, "Input file_name= " . $file_name . "\n");

fwrite($debug_file, "Output to_file_name= " . $to_file_name . "\n");

fwrite($debug_file, "file_name_temp_server= " . $file_name_temp_server . "\n");

/* Save the uploaded file to the local filesystem */
if (move_uploaded_file($file_name_temp_server, $to_file_name) ) 
{ 
  echo 'Success'; 
  fwrite($debug_file, "move_uploaded_file returned true \n");
} 
else 
{ 
  echo 'Failure'; 
  fwrite($debug_file, "move_uploaded_file returned false \n");
}

fclose($debug_file);
     
?>


