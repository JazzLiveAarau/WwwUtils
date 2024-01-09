// File: MainLevelFour.js
// Date: 2024-01-08
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
    testUtilEmail();

} // initTestControls

// test of UtilEmail
function testUtilEmail()
{

    //QQ var path_php = '../../../../JazzScripts/Php/';

    var n_top = 4;

    var email_from = 'guestbook@jazzliveaarau.ch';

    var email_subject = 'JAZZ live AARAU Gästebuch Xyz';

    var email_message = 'JAZZ <i>live</i> AARAU Gästebuch ghdjksajLGKSHFJFGJFJ   <br>' +
                        'Second row jwhgfdkegfkjdzöobäqwpodkkkahf   hkwhkhdkshkj  <br>' + 
                        'Third row jwhgfdkegfkjdzöobäqwpodkkkahf   hkwhkhdkshkj  <br>' +
                        'n_top = ' + n_top.toString();

    var email_to = 'gunnar.liden@viewsoncad.ch';
    
    var email_bcc = 'guestbook@jazzliveaarau.ch';
    
    var b_send = UtilEmail.send(email_from, email_subject, email_message, email_to, email_bcc, n_top);

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
