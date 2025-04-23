// File: Main.js
// Date: 2025-04-23
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

// Instance of the class UtilLock
var g_util_lock_object = null;

// Main (onload) function for the test functions
function initTestUtils()
{
    // testUtilSaveCallback();

    // testUtilEmailSecure()

    //testUtilEmail(); REMOVE later

    // testFullScreen();
    
    // initLockUnlock();
    
    // testUtilImage();

    // testUtilPayment();

    // testUtilServerDebug();

    // testUtilServerSave();

    // testUtilServerCopy();

    // testUtilServerMove();

   // testUtilDate();

    // testUtilString();

    // testUtilSearch();

} // initTestControls

// Test of UtilServer saveCallback
function testUtilSaveCallback()
{
    var file_content_html = 'Test data for class UtilServer <br>' + 
    'There is a directory for test data on the Server: <br>' +
    '/www/UtilsTestData <br>' +
    'There are subdirectories in this directory';

    // var path_file_name = 'https://jazzliveaarau.ch/WwwUtilsTestData/DirAlpha/DirTwo/TestUtilServer.txt';

    var path_file_name = 'https://jazzliveaarau.ch/WwwUtilsTestData/DirGamma/DirSix/TestUtilServer.txt';

    if (!UtilServer.execApplicationOnServer())
    {
        alert("testUtilSaveCallback Upload code to server and test there!");

        return;
    }

    UtilServer.saveDirFile(path_file_name, file_content_html, callbackTestFileSaved);  

    // UtilServer.saveFileCallback(path_file_name, file_content_html, callbackTestFileSaved);  

} // testUtilSaveCallback

// Callback function for testUtilSaveCallback
function callbackTestFileSaved()
{
    alert("testFileSaved Test file is saved");

} // testFileSaved


// Test of fullscreen functions
function testFullScreen()
{
   

} // testFullScreen

// Open full screen
function onClickOpenFullscreen()
{
    // alert("onClickOpenFullscreen");

    var fullscreen_el = getDivElementTestPage();

    UtilDevice.openFullScreen(fullscreen_el);

} // onClickOpenFullscreen

// Close full screen
function onClickCloseFullscreen()
{
    // alert("onClickCloseFullscreen");

    UtilDevice.exitFullScreen();

} // onClickCloseFullScreen

// Analyse full screen mode/data
function onClickAnalyseFullscreen()
{
    var b_full = UtilDevice.isFullScreen();

    if (b_full)
    {
        var fullscreen_el = UtilDevice.getFullScreenElement();

        alert("Element is displayed on the full screen. HTML= " + fullscreen_el.innerHTML);
    }
    else
    {
        alert("No element is displayed in full screen");
    }

} // onClickAnalyseFullscreen

// Initialzation of the lock/unlock functionality
function initLockUnlock()
{
    var lock_dir = 'https://jazzliveaarau.ch/JazzGuests/LockUnlock/';

    g_util_lock_object = new UtilLock(lock_dir);

    g_util_lock_object.setUserEmail('gunnar.liden@viewsoncad.ch');

} // initLockUnlock

// User clicked download a file
function onClickDownload()
{
    var file_url = 'https://jazzliveaarau.ch/JazzGuests/Uploaded/Image_20240203_15_49_36.jpg';

    UtilServer.download();
}

// User clicked the button lock files
function onClickLockFiles()
{
    g_util_lock_object.lock();

} // onClickLockFiles

// User clicked the button unlock files
function onClickUnlockFiles()
{
    g_util_lock_object.unlock();

} // onClickUnlockFiles

// Test of UtilEmail with the secure functionality
function testUtilEmailSecure()
{
    var email_from = 'guestbook@jazzliveaarau.ch';

    email_from = 'no-reply-address@jazzliveaarau.ch';

    var email_subject = 'JAZZ live AARAU Gästebuch Xyz';

    var email_message = 'testUtilEmailSecure():   JAZZ <i>live</i> AARAU Gästebuch ghdjksajLGKSHFJFGJFJ   <br>' +
                        'Second row jwhgfdkegfkjdzöobäqwpodkkkahf   hkwhkhdkshkj  <br>' + 
                        'Third row jwhgfdkegfkjdzöobäqwpodkkkahf   hkwhkhdkshkj  ';

    email_message = '\r\nHallo Gunnar Liden, \r\n \r\n' + 
    'vielen Dank für Ihre Bestellung Nr. TCH8871070 ! \r\n'+
    'Wir möchten Sie heute informieren, dass Ihre Bestellung weiterhin bearbeitet wird - keine Sorge, \r\n '+
    'wir haben Sie nicht vergessen! Leider können wir unseren gewohnten schnellen Lieferservice nicht ganz einhalten. Für den Lieferverzug gibt es ganz verschiedene Gründe: manche Artikel sind zwischenzeitlich vielleicht schon wieder ausverkauft und wir warten noch auf die Lieferung unserer Lieferanten. Bei Fragen kontaktieren Sie uns einfach, wir sind immer für Sie da!'
     + '\r\n \r\n \r\n' 

    + 'Wenn Sie mehrere Artikel bestellt haben, kann es möglich sein, dass nur einzelne Artikel vergriffen sind. Kontaktieren Sie uns gerne und wir schauen ob wir Ihnen eine Teillieferung zusenden können ! ';

    var email_to = '   gunnar.liden@viewsoncad.ch , gunnar@jazzliveaarau.ch,sven.gunnar.liden@gmail.com';

    email_to = '   gunnar.liden@viewsoncad.ch ';

    if (!UtilEmail.validateMultipleAddresses(email_to))
    {
        alert("testUtilEmailSecure Email TO addresses are not OK");

        return;
    }

    var n_adresses_to = UtilEmail.getNumberOfAdresses(email_to);

    if (n_adresses_to > 1)
    {
        alert("testUtilEmailSecure WARNING Too many TO addreses n_adresses_to= " + n_adresses_to.toString() + " Max is one (1)");
    }
	
	var secure_to = 'guestbook@jazzliveaarau.ch';
    
    // To many email copies var email_bcc = 'guestbook@jazzliveaarau.ch';
    var email_bcc = '';
     // email_bcc = '   gunnar.liden@viewsoncad.ch , gunnar@jazzliveaarau.ch,sven.gunnar.liden@gmail.com, gunnar@jazzliveaarau.ch';

    var n_adresses_bcc = UtilEmail.getNumberOfAdresses(email_bcc);

    if (n_adresses_bcc > 2)
    {
        alert("testUtilEmailSecure WARNING Too many BCC addreses n_adresses_bcc= " + n_adresses_bcc.toString() + " Max is two (2)");
    }

    var email_message_html = UtilString. rowEndsWindowsToHtml(email_message);

    UtilEmail.sendSecureCallback(email_from, email_subject, email_message_html, email_to, email_bcc, secure_to, successfulSend);

} // testUtilEmailSecure

function successfulSend()
{
    alert("successfulSend The email was sent ");
}


// Test of UtilEmail
// REMOVE later
function testUtilEmail()
{
    var email_from = 'guestbook@jazzliveaarau.ch';

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

// Test of UtilImage
async function testUtilImage()
{
    await UtilServer.initDebugFile("CompressPhoto");

    var file_input_el = document.getElementById("id_file_input");

    var browser_type = UtilServer.getBrowserType();

    console.log("testUtilImage Browser type= " + browser_type);

    await UtilServer.appendDebugFile("testUtilImage Browser type= " + browser_type, "CompressPhoto");

    var user_agent_str = navigator.userAgent;
    console.log("testUtilImage navigator.userAgent= " + navigator.userAgent);
    await UtilServer.appendDebugFile("testUtilImage navigator.userAgent= " + navigator.userAgent, "CompressPhoto");

    file_input_el.onchange = async function(e) 
    {
        // Only one file can be selected and only images
        var image_file = this.files[0];

        var scale_factor = 0.5;

        var file_type_str = 'image/jpeg';

        await UtilServer.appendDebugFile("testUtilImage Image file is selected", "CompressPhoto");

        var image_file_url = '';

        const compressed_file = await compressImage(image_file, 
        {
            quality: scale_factor,
            type: file_type_str,
        });
    
        image_file_url = URL.createObjectURL(compressed_file);

        /* Alternatively

        if (UtilServer.isSafari() )
        {
            image_file_url = URL.createObjectURL(image_file);

            console.log("testUtilImage Image URL = " + image_file_url);

            await UtilServer.appendDebugFile("testUtilImage Image URL= " + image_file_url, "CompressPhoto");
        }
        else
        {
            const compressed_file = await compressImage(image_file, 
                {
                    quality: scale_factor,
                    type: file_type_str,
                });
        
                image_file_url = URL.createObjectURL(compressed_file);

                console.log("testUtilImage Compressed image URL = " + image_file_url);

                await UtilServer.appendDebugFile("testUtilImage Compressed image URL= " + image_file_url, "CompressPhoto");
        }

         Alternatively */


        UtilImage.replaceImageInDivContainer(image_file_url, getDivElementUtilImageResults());

    } // onchange

} // testUtilImage

// Load another image
function onClickLoadImage()
{
    var test_image_filename = 'https://jazzliveaarau.ch/WwwUtils/Images/Hombrechtikon.jpg';

    //QQQ var compressed_image = UtilImage.getCompressed(test_image_filename, 0.5, 'TODO');

    UtilImage.replaceImageInDivContainer(test_image_filename, getDivElementUtilImageResults());

} // onClickLoadImage

// Test of UtilPayment
function testUtilPayment()
{
    var el_div_payment = getDivElementUtilPaymentResults();

    var div_width = '90%';

    el_div_payment.innerHTML = UtilPayment.twintAdmissionFeeString(div_width);

} // testUtilPayment


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
function testUtilServerDebug()
{
    var b_init = UtilServer.initDebugFile('WwwUtils');

    if (!b_init)
    {
        alert("testUtilServerDebug UtilServer.initDebugFile failed");

        return;
    }

    console.log('testUtilServer Debug file was created' + '----------------------------------------------------------------- 1');

    setTimeout(callbackTestUtilServerDebug, 500);

} // testUtilServerDebug

function callbackTestUtilServerDebug()
{
    var debug_text = 'This text was added by the function testUtilServerDebug in the file Main.js';
                    

    var b_append = UtilServer.appendDebugFile(debug_text, 'WwwUtils');

    if (!b_append)
    {
        alert("testUtilServerDebug UtilServer.appendDebugFile failed");

        return;
    }

    console.log('testUtilServer Text was added to the debug file' + '----------------------------------------------------------------- 2');

} // callbackTestUtilServerDebug

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

    var date_array = UtilDate.getDateArrayFromIsoDateString("2024-02-07");

    var util_date_el = getDivElementUtilDateResults();

    util_date_el.innerHTML = 'UtilDate time_stamp= :' + '<br>' +
                             time_stamp + '<br>' + 
                             'getDateArrayFromIsoDateString year= ' + date_array[0] +
                             ' month= ' + date_array[1] + ' day= ' + date_array[2];

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

// Returns the element utility image results <div> element
function getDivElementUtilImageResults()
{
    return document.getElementById(getIdDivElementUtilImageResults());

} // getDivElementUtilImageResults

// Returns the identity of the element utility image results <div> 
function getIdDivElementUtilImageResults()
{
    return 'id_div_util_image_results';

} // getIdDivElementUtilImageResults

// Returns the element test page <div> element
function getDivElementTestPage()
{
    return document.getElementById(getIdDivElementTestPage());

} // getDivElementTestPage

// Returns the identity of the element test page <div> 
function getIdDivElementTestPage()
{
    return 'id_test_page';

} // getIdDivElementTestPage

// Returns the element utility payment results <div> element
function getDivElementUtilPaymentResults()
{
    return document.getElementById(getIdDivElementUtilPaymentResults());

} // getDivElementUtilPaymentResults

// Returns the identity of the element utility payment results <div> 
function getIdDivElementUtilPaymentResults()
{
    return 'id_div_util_payment_results';

} // getIdDivElementUtilPaymentResults

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
    var file_name = 'Utils_20250419.js';

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
// Please not that UtilEmailSecure.php not is copied to JazzScripts/Php/
function eventCopyPhpFiles()
{
    var path_file_input = '';

    var path_file_output = '';

    if (!UtilServer.execApplicationOnServer())
    {
        alert("testUtilServerCopy Upload code to server and test there!");

        return;
    }

    path_file_input = 'https://jazzliveaarau.ch/WwwUtils/Php/UtilEmailSecure.php';

    // Gives an error. It should be possible to set a parameter that the PHP file
    // can be in any directory and with the absolute path as input. TODO Find out how
    // But having it there might be the reason that it coul be used to send spam 
    // path_file_output = 'https://jazzliveaarau.ch/JazzScripts/Php/UtilEmailSecure.php';

    // Please note that if this function is used by another application, then the
    // this file must also be copied to this application
    path_file_output = 'https://jazzliveaarau.ch/Guestbook/Php/UtilEmailSecure.php';

    var b_email_secure = UtilServer.copyFile(path_file_input, path_file_output);  

    if (!b_email_secure)
    {
        alert("eventCopyPhpFiles UtilServer.copyFile failed for " + path_file_input);
    }

    /* ///////////////////////////////////////////////////////////////////////////
       Locked by the provider Hostpoint while the function was used to send spam
       Please refer to saved email in the directory Description
    path_file_input = 'https://jazzliveaarau.ch/WwwUtils/Php/UtilEmailSend.php';

    path_file_output = 'https://jazzliveaarau.ch/JazzScripts/Php/UtilEmailSend.php';

    var b_email_send = UtilServer.copyFile(path_file_input, path_file_output);  

    if (!b_email_send)
    {
        alert("eventCopyPhpFiles UtilServer.copyFile failed for " + path_file_input);
    }
    ///////////////////////////////////////////////////////////////////////////// */

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

    path_file_input = 'https://jazzliveaarau.ch/WwwUtils/Php/UtilServerUploadFile.php';

    path_file_output = 'https://jazzliveaarau.ch/JazzScripts/Php/UtilServerUploadFile.php';

    var b_file_upload = UtilServer.copyFile(path_file_input, path_file_output);  

    if (!b_file_upload)
    {
        alert("eventCopyPhpFiles UtilServer.copyFile failed for " + path_file_input);
    }

    path_file_input = 'https://jazzliveaarau.ch/WwwUtils/Php/UtilLock.php';

    path_file_output = 'https://jazzliveaarau.ch/JazzScripts/Php/UtilLock.php';

    var b_file_upload = UtilServer.copyFile(path_file_input, path_file_output);  

    if (!b_file_upload)
    {
        alert("eventCopyPhpFiles UtilServer.copyFile failed for " + path_file_input);
    }

    path_file_input = 'https://jazzliveaarau.ch/WwwUtils/Php/UtilServerInitDebug.php';

    path_file_output = 'https://jazzliveaarau.ch/JazzScripts/Php/UtilServerInitDebug.php';

    var b_file_debug_ini = UtilServer.copyFile(path_file_input, path_file_output);  

    if (!b_file_debug_ini)
    {
        alert("eventCopyPhpFiles UtilServer.copyFile failed for " + path_file_input);
    }

    path_file_input = 'https://jazzliveaarau.ch/WwwUtils/Php/UtilServerAppendDebug.php';

    path_file_output = 'https://jazzliveaarau.ch/JazzScripts/Php/UtilServerAppendDebug.php';

    var b_file_debug_append = UtilServer.copyFile(path_file_input, path_file_output);  

    if (!b_file_debug_append)
    {
        alert("eventCopyPhpFiles UtilServer.copyFile failed for " + path_file_input);
    }

    path_file_input = 'https://jazzliveaarau.ch/WwwUtils/Php/UtilSaveFile.php';

    path_file_output = 'https://jazzliveaarau.ch/JazzScripts/Php/UtilSaveFile.php';

    var b_save = UtilServer.copyFile(path_file_input, path_file_output);  

    if (!b_save)
    {
        alert("eventCopyPhpFiles UtilServer.copyFile failed for " + path_file_input);
    }

    path_file_input = 'https://jazzliveaarau.ch/WwwUtils/Php/UtilSaveDirFile.php';

    path_file_output = 'https://jazzliveaarau.ch/JazzScripts/Php/UtilSaveDirFile.php';

    var b_save = UtilServer.copyFile(path_file_input, path_file_output);  

    if (!b_save)
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

    alert("eventCopyPhpFiles PHP files have been copied");

} // eventCopyPhpFiles

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Upload Merged JS Files and PHP files ////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

