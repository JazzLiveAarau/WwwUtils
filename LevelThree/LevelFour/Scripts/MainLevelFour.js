// File: MainLevelFour.js
// Date: 2024-01-15
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Main function for the test of utilty functions Level Four
//
// Server directory for WwwXml is /www/WwwUtils/

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Main (onload) function for the test functions
function initTestUtilsLevelFour()
{
    // testUtilEmailLevelFour();

    testUtilServerLevelFour();

} // initTestControls

function testUtilServerLevelFour()
{
 
    var file_content_html = 'testUtilServerLevelFour: Test data for class UtilServer <br>' + 
    'There is a directory for test data on the Server: <br>' +
    '/www/UtilsTestData <br>' +
    'There are subdirectories in this directory';

    // var path_file_name = '../../WwwUtilsTestData/DirAlpha/DirTwo/TestUtilServer.txt';

    // var b_create = UtilServer.saveFileWithJQueryPostFunction(path_file_name, file_content_html);  

    // var path_file_name = 'https://jazzliveaarau.ch/WwwUtilsTestData/DirAlpha/DirTwo/TestUtilServerLevelFour.txt';

    var path_file_name = 'https://jazzliveaarau.ch/WwwUtilsTestData/TestUtilServerLevelFour.txt';

    if (!UtilServer.execApplicationOnServer())
    {
        alert("testUtilServer Upload code to server and test there!");

        return;
    }

    var b_create = UtilServer.saveFile(path_file_name, file_content_html);  

    var util_date_el = getDivElementUtilServerResults();

    var msg_str = 'UtilServer (testUtilServerLevelFour)' + '<br>' +
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

} // testUtilServerLevelFour

// test of UtilEmail
function testUtilEmailLevelFour()
{
    var email_from = 'guestbook@jazzliveaarau.ch';

    var email_subject = 'JAZZ live AARAU Gästebuch Xyz';

    var email_message = 'JAZZ <i>live</i> AARAU Gästebuch ghdjksajLGKSHFJFGJFJ   <br>' +
                        'Second row jwhgfdkegfkjdzöobäqwpodkkkahf   hkwhkhdkshkj  <br>' + 
                        'Third row jwhgfdkegfkjdzöobäqwpodkkkahf   hkwhkhdkshkj  <br>';

    var email_to = 'gunnar.liden@viewsoncad.ch';
    
    // Too many emails var email_bcc = 'guestbook@jazzliveaarau.ch';

    var email_bcc = '';

    if (!UtilServer.execApplicationOnServer())
    {
        alert("testUtilEmailLevelFour Please upload to the server. PHP cannot execute with Visual Studio Live Server ");

        return;
    }
    
    var b_send = UtilEmail.send(email_from, email_subject, email_message, email_to, email_bcc);

    if (b_send)
    {
        alert("testUtilEmail Level four Email sent ");
    }
    else
    {
        alert("testUtilEmail Level four. Error! The email was not sent ");
    }

} // testUtilEmail



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Get Id And Element Functions //////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

function getDivElementUtilServerResults()
{
    return document.getElementById(getIdDivElementUtilServerResults());

} // getDivElementUtilServerResults

// Returns the identity of the element utility date results <div> 
function getIdDivElementUtilServerResults()
{
    return 'id_div_util_server_results';

} // getIdDivElementUtilServerResults

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
