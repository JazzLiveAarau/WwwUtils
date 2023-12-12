// File: Main.js
// Date: 2023-12-12
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Main function for the test of utilty functions
//
// Server directory for WwwXml is /www/WwwUtils/

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Main (onload) function for the test functions
function initTestUtils()
{
    testUtilDate();

    testUtilString();

    testUtilSearch();

} // initTestControls

// Test of UtilDate
function testUtilDate()
{
    var util_date_el = getDivElementUtilDateResults();

    util_date_el.innerHTML = 'UtilDate test reults:' + '<br>' +
                             'TODO ' + '<br>';

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

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get Id And Element Functions ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User clicked merge files. 
// The JavaScript files will be merged to one file and written to the server directory
// /www/JazzScripts/. The directory name is defined in file MergeFiles.php.
function eventMergeFiles()
{
    var file_name = 'Utils_20231212.js';

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
            }
            else
            {
				alert("Execution of MergeControls.php failed");
            }          
        } // function

      ); // post
	  

} // eventMergeFiles

