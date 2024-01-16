// File: Main.js
// Date: 2024-01-15
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Main function for the test of utilty functions
//
// Server directory for WwwXml is /www/WwwUtils/
//
// Test function URL
// https://www.jazzliveaarau.ch/WwwUtils/TestUtils.htm
//
// Please note that there is a second test function
// https://www.jazzliveaarau.ch/WwwUtils/LevelThree/LevelFour/TestUtilsLevelFour.htm
// 

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Main (onload) function for the test functions
function initTestUtils()
{
    //testUtilEmail();

    // testUtilServerSave();

    testUtilServerCopy();

    testUtilServerMove();

    //testUtilDate();

    // testUtilString();

    // testUtilSearch();

} // initTestControls

// test of UtilEmail
function testUtilEmail()
{
    var email_from = '<guestbook@jazzliveaarau.ch>';

    var email_subject = 'JAZZ live AARAU Gästebuch Xyz';

    var email_message = 'testUtilEmail():   JAZZ <i>live</i> AARAU Gästebuch ghdjksajLGKSHFJFGJFJ   <br>' +
                        'Second row jwhgfdkegfkjdzöobäqwpodkkkahf   hkwhkhdkshkj  <br>' + 
                        'Third row jwhgfdkegfkjdzöobäqwpodkkkahf   hkwhkhdkshkj  ';

    var email_to = 'gunnar.liden@viewsoncad.ch';
    
    // To many email copies var email_bcc = 'guestbook@jazzliveaarau.ch';
    var email_bcc = '';

    if (!UtilServer.execApplicationOnServer())
    {
        alert("testUtilEmail Please upload to the server. PHP cannot execute with Visual Studio Live Server ");

        return;
    }
    
    var b_send = UtilEmail.send(email_from, email_subject, email_message, email_to, email_bcc);

    if (b_send)
    {
        alert("testUtilEmail Email sent ");
    }
    else
    {
        alert("testUtilEmail Error! The email was not sent ");
    }

} // testUtilEmail

// Test of UtilServer move
function testUtilServerMove()
{
    var path_file_output = 'https://jazzliveaarau.ch/WwwUtilsTestData/DirAlpha/DirOne/TestUtilServerMove.txt';

    var path_file_input = 'https://jazzliveaarau.ch/WwwUtilsTestData/DirBeta/TestUtilServerCopy.txt';

    if (!UtilServer.execApplicationOnServer())
    {
        alert("testUtilServerMove Upload code to server and test there!");

        return;
    }

    var b_move = UtilServer.copyFile(path_file_input, path_file_output);  

    var util_date_el = getDivElementUtilServerResults();

    var msg_str = 'UtilServer Move' + '<br>' +
    'Input filename= ' + path_file_input + '<br>' +
    'Moved filename=' + '<br>' + path_file_output + '<br>';

    if (b_move)
    {
        msg_str = msg_str + 'The file was moved' + '<br>';
    }
    else
    {
        msg_str = msg_str + 'Failure moving the file' + '<br>';
    }

    util_date_el.innerHTML = msg_str;

} // testUtilServerMove

// Test of UtilServer copy
function testUtilServerCopy()
{
    var path_file_input = 'https://jazzliveaarau.ch/WwwUtilsTestData/DirAlpha/DirTwo/TestUtilServer.txt';

    var path_file_output = 'https://jazzliveaarau.ch/WwwUtilsTestData/DirBeta/TestUtilServerCopy.txt';

    if (!UtilServer.execApplicationOnServer())
    {
        alert("testUtilServerCopy Upload code to server and test there!");

        return;
    }

    var b_copy = UtilServer.copyFile(path_file_input, path_file_output);  

    var util_date_el = getDivElementUtilServerResults();

    var msg_str = 'UtilServer Save' + '<br>' +
    'Input filename= ' + path_file_input + '<br>' +
    'Output filename=' + '<br>' + path_file_output + '<br>';

    if (b_copy)
    {
        msg_str = msg_str + 'The file was copied' + '<br>';
    }
    else
    {
        msg_str = msg_str + 'Failure copying the file' + '<br>';
    }

    util_date_el.innerHTML = msg_str;

} // testUtilServerCopy

// Test of UtilServer save
function testUtilServerSave()
{
    var file_content_html = 'Test data for class UtilServer <br>' + 
    'There is a directory for test data on the Server: <br>' +
    '/www/UtilsTestData <br>' +
    'There are subdirectories in this directory';

    // var path_file_name = '../../WwwUtilsTestData/DirAlpha/DirTwo/TestUtilServer.txt';

    // var b_create = UtilServer.saveFileWithJQueryPostFunction(path_file_name, file_content_html);  

    var path_file_name = 'https://jazzliveaarau.ch/WwwUtilsTestData/DirAlpha/DirTwo/TestUtilServer.txt';

    if (!UtilServer.execApplicationOnServer())
    {
        alert("testUtilServerSave Upload code to server and test there!");

        return;
    }

    var b_create = UtilServer.saveFile(path_file_name, file_content_html);  

    var util_date_el = getDivElementUtilServerResults();

    var msg_str = 'UtilServer Save' + '<br>' +
    'Filename= ' + path_file_name + '<br>' +
    'Content' + '<br>' + file_content_html + '<br>';

    if (b_create)
    {
        msg_str = msg_str + 'The file was created' + '<br>';
    }
    else
    {
        msg_str = msg_str + 'Failure creating the file' + '<br>';
    }

    util_date_el.innerHTML = msg_str;

} // testUtilServerSave

// Test of UtilDate
function testUtilDate()
{
    var time_stamp = UtilDate.getTimeStamp();

    var util_date_el = getDivElementUtilDateResults();

    util_date_el.innerHTML = 'UtilDate time_stamp= :' + '<br>' +
                             time_stamp + '<br>';

} // testUtilDate

// Test of UtilString
function testUtilString()
{
    var util_string_el = getDivElementUtilStringResults();

    util_string_el.innerHTML = 'testUtilString test reults:' + '<br>' +
                             'TODO ' + '<br>';

} // testUtilString

// Test of UtilSearch
function testUtilSearch()
{
    var util_search_el = getDivElementUtilSearchResults();

    util_search_el.innerHTML = 'testUtilSearch test reults:' + '<br>' +
                             'TODO ' + '<br>';

} // testUtilSearch

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Get Id And Element Functions //////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns the element utility date results <div> element
function getDivElementUtilServerResults()
{
    return document.getElementById(getIdDivElementUtilServerResults());

} // getDivElementUtilServerResults

// Returns the identity of the element utility date results <div> 
function getIdDivElementUtilServerResults()
{
    return 'id_div_util_server_results';

} // getIdDivElementUtilServerResults

// Returns the element utility date results <div> element
function getDivElementUtilDateResults()
{
    return document.getElementById(getIdDivElementUtilDateResults());

} // getDivElementUtilDateResults

// Returns the identity of the element utility date results <div> 
function getIdDivElementUtilDateResults()
{
    return 'id_div_util_date_results';

} // getIdDivElementUtilDateResults

// Returns the element utility string results <div> element
function getDivElementUtilStringResults()
{
    return document.getElementById(getIdDivElementUtilStringResults());

} // getDivElementUtilStringResults

// Returns the identity of the element utility strings results <div> 
function getIdDivElementUtilStringResults()
{
    return 'id_div_util_string_results';

} // getIdDivElementUtilStringResults

// Returns the element utility search results <div> element
function getDivElementUtilSearchResults()
{
    return document.getElementById(getIdDivElementSeasonResults());

} // getDivElementUtilSearchResults

// Returns the identity of the element utility search results <div> 
function getIdDivElementSeasonResults()
{
    return 'id_div_util_search_results';

} // getIdDivElementSeasonResults

// Returns the element utility email results <div> element
function getDivElementUtilEmailResults()
{
    return document.getElementById(getIdDivElementUtilEmailResults());

} // getDivElementUtilEmailResults

// Returns the identity of the element utility email results <div> 
function getIdDivElementUtilEmailResults()
{
    return 'id_div_util_email_results';

} // getIdDivElementUtilEmailResults

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get Id And Element Functions ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Upload Merged JS Files and PHP files //////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User clicked merge files. 
// The JavaScript files will be merged to one file and written to the server directory
// /www/JazzScripts/. This directory name is defined in file MergeFiles.php.
function eventMergeFiles()
{
    var file_name = 'Utils_20231213.js';

    $.post
      ('PhpMerge/MergeFiles.php',
        {
          file_name: file_name
        },
        function(data_save,status_save)
		{
            if (status_save == "success")
            {
                alert("JavaScript files merged to " + file_name + 
                " saved to server directory /www/JavaScripts/.");

                console.log(data_save);
            }
            else
            {
				alert("Execution of MergeControls.php failed");
            }          
        } // function

      ); // post

} // eventMergeFiles

// Copy PHP files
function eventCopyPhpFiles()
{
    var path_file_input = '';

    var path_file_output = '';

    if (!UtilServer.execApplicationOnServer())
    {
        alert("testUtilServerCopy Upload code to server and test there!");

        return;
    }

    path_file_input = 'https://jazzliveaarau.ch/WwwUtils/Php/UtilEmailSend.php';

    path_file_output = 'https://jazzliveaarau.ch/JazzScripts/Php/UtilEmailSend.php';

    var b_email_send = UtilServer.copyFile(path_file_input, path_file_output);  

    if (!b_email_send)
    {
        alert("eventCopyPhpFiles UtilServer.copyFile failed for " + path_file_input);
    }

    path_file_input = 'https://jazzliveaarau.ch/WwwUtils/Php/UtilServerCopyFile.php';

    path_file_output = 'https://jazzliveaarau.ch/JazzScripts/Php/UtilServerCopyFile.php';

    var b_file_copy = UtilServer.copyFile(path_file_input, path_file_output);  

    if (!b_file_copy)
    {
        alert("eventCopyPhpFiles UtilServer.copyFile failed for " + path_file_input);
    }

    path_file_input = 'https://jazzliveaarau.ch/WwwUtils/Php/UtilServerMoveFile.php';

    path_file_output = 'https://jazzliveaarau.ch/JazzScripts/Php/UtilServerMoveFile.php';

    var b_file_move = UtilServer.copyFile(path_file_input, path_file_output);  

    if (!b_file_move)
    {
        alert("eventCopyPhpFiles UtilServer.copyFile failed for " + path_file_input);
    }

    path_file_input = 'https://jazzliveaarau.ch/WwwUtils/Php/UtilServerSaveFile.php';

    path_file_output = 'https://jazzliveaarau.ch/JazzScripts/Php/UtilServerSaveFile.php';

    // Really overwriting the file that is used ????
    var b_file_save = UtilServer.copyFile(path_file_input, path_file_output);  

    if (!b_file_save)
    {
        alert("eventCopyPhpFiles UtilServer.copyFile failed for " + path_file_input);
    }


} // eventCopyPhpFiles

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Upload Merged JS Files and PHP files ////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

