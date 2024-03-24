<?php

// File: UtilLock.php
// Date: 2024-03-24
// Author: Gunnar Liden

// This file defines all PHP functions for JavaScript class UtilLock

// References
// PHP Functions:  https://www.w3schools.com/php/php_functions.asp

$exec_case = $_POST['exec_case'];

$url_file = $_POST['url_file'];

$locked_str = $_POST['locked_str'];

$unlocked_str = $_POST['unlocked_str'];

$user_email = $_POST['user_email'];

$file_debug = "Debug/DebugUtilLock.txt";

error_reporting(E_ALL);
ini_set('display_errors', true);

// debugAppend('UtilLock Enter exec_case= ' . $exec_case , $file_debug);

switch ($exec_case) 
{

    case "ExecInitDebugFile":
        initDebug($file_debug);
        break;
    case "ExecLockFiles":
        lockFiles($url_file, $unlocked_str, $locked_str, $user_email, $file_debug);
        break;
    case "ExecLockFilesForce":
          lockFilesForce($url_file, $locked_str, $user_email, $file_debug);
          break;
    case "ExecUnlockFiles":
        unlockFiles($url_file, $unlocked_str, $file_debug);
        break;
    default:
        echo "Error_UtilLock.php_Not_an_implemented_case= " . $exec_case;
}

// Lock files
function lockFiles($i_url_file, $i_unlocked_str, $i_locked_str, $i_user_email, $i_file_debug)
{
  // debugAppend('lockFiles Enter', $i_file_debug);

  $b_can_be_locked = false;

  if (lockFileExists($i_url_file))
  {
    // debugAppend('lockFiles Lock file exists.', $i_file_debug);

    $b_can_be_locked = contentEqualToUnlocked($i_url_file, $i_unlocked_str, $i_file_debug);

    if ($b_can_be_locked)
    {
      // debugAppend('lockFiles Files can be locked. Email= ' . $i_user_email, $i_file_debug);
    }
    else
    {
      // debugAppend('lockFiles Files CANNOT be locked. Email= ' . $i_user_email, $i_file_debug);
    }
  }
  else
  {
    debugAppend('lockFiles Lock file do NOT exist. Email= ' . $i_user_email, $i_file_debug);

    $b_can_be_locked = true;
  }

  if (!$b_can_be_locked)
  {

    $email_str = getEmailFromLockUnlockFile($i_url_file, $i_locked_str, $i_file_debug);

    debugAppend('lockFiles Return without locking. Email= ' . $email_str, $i_file_debug);

    echo 'Unable_to_lock_files' . '_' . $email_str;

    return;
  }

  $file_content_write =  $i_locked_str . '_' . $i_user_email;

  // debugAppend('lockFiles File content= ' . $file_content_write, $i_file_debug);

  $file_object = fopen($i_url_file, "w") or exit("Unable_to_open_file_".error_get_last());

  // Write the input string with the file content to the file.
  fwrite($file_object, $file_content_write); 
  
  // Close the file
  fclose($file_object); 

  debugAppend('lockFiles Files have been locked. Email= ' . $i_user_email, $i_file_debug);
  
  echo 'Files_have_been_locked';

} // lockFiles

// Force locking the files
function lockFilesForce($i_url_file, $i_locked_str, $i_user_email, $i_file_debug)
{
  // debugAppend('lockFilesForce Enter', $i_file_debug);

  $file_content_write =  $i_locked_str . '_' . $i_user_email;

  // debugAppend('lockFiles File content= ' . $file_content_write, $i_file_debug);

  $file_object = fopen($i_url_file, "w") or exit("Unable_to_open_file_".error_get_last());

  // Write the input string with the file content to the file.
  fwrite($file_object, $file_content_write); 
  
  // Close the file
  fclose($file_object); 

  debugAppend('lockFilesForce Files have been locked. Email= ' . $i_user_email, $i_file_debug);
  
  echo 'Files_have_been_locked';

} // lockFilesForce

// returns true if content of file is unlocked, i.e. the files can be locked
function contentEqualToUnlocked($i_url_file, $i_unlocked_str, $i_file_debug)
{
  $file_content_read = file_get_contents($i_url_file);

  // debugAppend('contentEqualToUnlocked Content= ' . $file_content_read, $i_file_debug);

  if (str_contains($file_content_read, $i_unlocked_str))
  {
    return true;
  }
  else
  {
    return false;
  }

} // contentEqualToUnlocked

// Get the email address from the content of the lock/unlock file
function getEmailFromLockUnlockFile($i_url_file, $i_locked_str, $i_file_debug)
{
  $file_content_read = file_get_contents($i_url_file);

  // debugAppend('getEmailFromLockUnlockFile Content= ' . $file_content_read, $i_file_debug);

  if (!str_contains($file_content_read, $i_locked_str))
  {
    return 'No_email_address';
  }

  $str_length = strlen($i_locked_str);

  $email_str = substr($file_content_read, $str_length + 1);

  // debugAppend('getEmailFromLockUnlockFile email= ' . $email_str, $i_file_debug);

  return $email_str;

} // getEmailFromLockUnlockFile

// Unlock files
function unlockFiles($i_url_file, $i_unlocked_str, $i_file_debug)
{

  $file_content_read_debug = file_get_contents($i_url_file);

  $file_content_write =  $i_unlocked_str;

  // debugAppend('unlockFiles Content= ' . $file_content_write, $i_file_debug);

  $file_object = fopen($i_url_file, "w") or exit("Unable_to_open_file_".error_get_last());

  // Write the input string with the file content to the file.
  fwrite($file_object, $file_content_write); 
  
  // Close the file
  fclose($file_object); 

  debugAppend('unlockFiles Files have been unlocked. file_content_read_debug= ' . $file_content_read_debug, $i_file_debug);

  echo 'Files_have_been_unlocked';

} // unlockFiles

// Returns true if the lock file exists
function lockFileExists($i_url_file)
{
  if (file_exists($i_url_file)) 
  {
    return true;
  }
  else
  {
    return false;    
  }

} // lockFileExists

// Creation of a new debug file
function initDebug($i_file_debug)
{
  $time_stamp_now = time();

  $time_stamp_str =  date ("F d Y H:i:s.", $time_stamp_now);

  $file_content = "Debug output from UtilLock" . PHP_EOL . "Time stamp: " . $time_stamp_str . PHP_EOL;

  $new_file = fopen($i_file_debug, "w") or die("Unable to open file!");

  fwrite($new_file, $file_content);

  fclose($new_file);

} // initDebug

// Appends debug to file 
function debugAppend($i_debug_str, $i_file_debug)
{
  if (!file_exists($i_file_debug)) 
  {
    return;
  }

  $debug_str = $i_debug_str . PHP_EOL;

  file_put_contents($i_file_debug, $debug_str, FILE_APPEND);

} // debugAppend


?>
