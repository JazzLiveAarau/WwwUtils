// File: GuestbookTest.js
// Date: 2024-02-17
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Test of server utility functions used by application Guestbook

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Test Common Functions /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Main function simulating the use of UtilServer functions in the Guestbook application
function guestbookTest()
{
    console.log("guestbookTest");

    loadAllXmlObjectsForAdminAndUpload();

} // guestbookTest

// User clicked the button test of Guestbook
function onClickTestGuestbook()
{
    if (!UtilServer.execApplicationOnServer())
    {
        alert("onClickTestGuestbook Test only on the server");

        return;
    }

    if (g_executing_append_delete)
    {
        console.log("onClickTestGuestbook Still executing append-save-delete-save");

        return;

    }

    console.log("onClickTestGuestbook");

    guestbookTest();

} // onClickTestGuestbook

// Loads all XML objects for Guestbook Admin and Upload
// Start XML is the object corresponding to JazzGuests.xml
function loadAllXmlObjectsForAdminAndUpload()
{
    console.log("loadAllXmlObjectsForAdminAndUpload");

    g_executing_append_delete = true;

    var n_level_xml = 1;

    var update_xml = false;

    g_guests_xml = new JazzGuestsXml(callbackGuestbookUploadedXml, n_level_xml, update_xml);

} // loadAllXmlObjectsForAdminAndUpload

// Load of XML object corresponding to JazzGuestsUploaded.xml
function callbackGuestbookUploadedXml()
{
    if (g_guests_xml == null)
    {
        console.log("callbackGuestbookUploadedXml g_guests_xml is null");

        return;
    }

    console.log("callbackGuestbookUploadedXml");

    var n_level_xml = 1;

    var update_xml = true;

    g_guests_uploaded_xml = new JazzGuestsXml(xmlObjectsAreCreated, n_level_xml, update_xml);

} // callbackGuestbookUploadedXml

// The guestbook XML objects have been created
function xmlObjectsAreCreated()
{
    if (g_guests_uploaded_xml == null)
    {
        console.log("xmlObjectsAreCreated g_guests_uploaded_xml is null");

        return;
    }

    var b_callback_alternative = true;

    if (b_callback_alternative)
    {
        callbackAlternative();
    }
    else
    {
        awaitAlternative();
    }

} // xmlObjectsAreCreated


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Test Common Functions ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Async/Await Functions /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Append-save-delete-save with the async/await alternative
function awaitAlternative()
{

} // awaitAlternative

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Async/Await Functions ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Callback Functions ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Append-save-delete-save with the callback alternative
function callbackAlternative()
{
    numberRecordsBothXmlToConsole("callbackAlternative Enter");

    appendSetGuestbookRecord(g_guests_uploaded_xml);

    appendSetGuestbookRecord(g_guests_xml);

    numberRecordsBothXmlToConsole("callbackAlternative Exit ");

    saveAppendedUploadedXml();

} // callbackAlternative

function saveAppendedUploadedXml()
{
    numberRecordsUploadedXmlToConsole("saveAppendedUploadedXml");

    UtilServer.saveFileCallback(getAbsoluteFilenameJazzGuestsUploaded(), getPrettyPrintContent(g_guests_uploaded_xml), saveAppendedXml);

} // saveAppendedUploadedXml

function saveAppendedXml()
{
    numberRecordsAdminXmlToConsole("saveAppendedXml");

    UtilServer.saveFileCallback(getAbsoluteFilenameJazzGuests(), getPrettyPrintContent(g_guests_xml), deleteXmlRecord);

} // saveAppendedXml

function deleteXmlRecord()
{
    numberRecordsBothXmlToConsole("deleteXmlRecord Enter");

    var n_uploaded_recs = g_guests_uploaded_xml.getNumberOfGuestRecords();

    var n_recs = g_guests_xml.getNumberOfGuestRecords();

    g_guests_uploaded_xml.deleteGuestNode(n_uploaded_recs);

    g_guests_xml.deleteGuestNode(n_recs);

    numberRecordsBothXmlToConsole("deleteXmlRecord Exit");

    saveDeletedUploadedXml();

} // deleteXmlRecord

function saveDeletedUploadedXml()
{
    numberRecordsUploadedXmlToConsole("saveDeletedUploadedXml");

    UtilServer.saveFileCallback(getAbsoluteFilenameJazzGuestsUploaded(), getPrettyPrintContent(g_guests_uploaded_xml), saveDeletedXml);

} // saveDeletedUploadedXml

function saveDeletedXml()
{
    numberRecordsAdminXmlToConsole("saveDeletedXml");

    UtilServer.saveFileCallback( getAbsoluteFilenameJazzGuests(), getPrettyPrintContent(g_guests_xml), afterAppendAndDeleted);

} // saveDeletedXml

function afterAppendAndDeleted()
{
    numberRecordsBothXmlToConsole("afterAppendAndDeleted");

    g_executing_append_delete = false;

} // afterAppendAndDeleted

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Callback Functions //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Utility Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Add and set an XML record for JazzGuests.xml or JazzGuestsUploaded.xml
function appendSetGuestbookRecord(i_guests_xml)
{
    i_guests_xml.appendGuestNode();

    var n_records = i_guests_xml.getNumberOfGuestRecords();

    console.log('Record appended to XML object. Number of records is ' + n_records.toString());

    i_guests_xml.setGuestYear(n_records, "2024");

    i_guests_xml.setGuestMonth(n_records, "2");

    i_guests_xml.setGuestDay(n_records, "15");

    i_guests_xml.setGuestBand(n_records, "");

    i_guests_xml.setGuestMusicians(n_records,"");

    i_guests_xml.setGuestHeader(n_records, "Header for the image");

    i_guests_xml.setGuestText(n_records, "Record text");

    i_guests_xml.setGuestNames(n_records, "Gunnar Liden");

    i_guests_xml.setGuestRemark(n_records, "En anmärkning");

    i_guests_xml.setGuestFileName(n_records,"JazzGuests/d20240214_REG0067.jpg");

    i_guests_xml.setGuestFileType(n_records, 'IMG');

    // Not used here i_guests_xml.JazzGuestAvatar(n_records, '');

    i_guests_xml.setGuestEmail(n_records, "gunnar,liden@viewsoncad.ch");

    // Not used here i_guests_xml.setGuestTelephone(n_records, '');

    i_guests_xml.setGuestStatusUploadedByGuestToHomepage(n_records);

    i_guests_xml.setGuestPublishBool(n_records, true);

    i_guests_xml.setGuestRegNumber(n_records, '99');

    console.log('All members set. Status= ' + g_guests_xml.getGuestStatus(n_records));

} // appendSetGuestbookRecord

function numberRecordsBothXmlToConsole(i_function_name)
{
    numberRecordsAdminXmlToConsole(i_function_name);

    numberRecordsUploadedXmlToConsole(i_function_name);

} // numberRecordsBothXmlToConsole

function numberRecordsAdminXmlToConsole(i_function_name)
{
    var n_recs = g_guests_xml.getNumberOfGuestRecords();

    console.log(i_function_name + " Admin n_recs= " + n_recs.toString());

} // numberRecordsAdminXmlToConsole

function numberRecordsUploadedXmlToConsole(i_function_name)
{
    var n_uploaded_recs = g_guests_uploaded_xml.getNumberOfGuestRecords();

    console.log(i_function_name + " Uploaded n_recs= " + n_uploaded_recs.toString());

} // numberRecordsUploadedXmlToConsole

function getPrettyPrintContent(i_xml_object)
{
    var pretty_print = new PrettyPrintXml(i_xml_object.getXmlObject());

    var xml_content_str = pretty_print.xmlToWinFormattedString();

    return xml_content_str;

} // getPrettyPrintContent

function getAbsoluteFilenameJazzGuests()
{
    return  g_guestbook_start_url + "XML/JazzGuests.xml";

} // getAbsoluteFilenameJazzGuests

function getAbsoluteFilenameJazzGuestsUploaded()
{
    return  g_guestbook_start_url + "JazzGuests/Uploaded/JazzGuestsUploaded.xml";

} // getAbsoluteFilenameJazzGuestsUploaded

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Utility Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Object corresponding to JazzGuests.xml
var g_guests_xml = null;

// Object corresponding to JazzGuestsUploaded.xml
var g_guests_uploaded_xml = null;

// Object corresponding to JazzSeasonProgram_yyyy_yyyy.xml
var g_season_xml = null;

// Object with get functions for the XML file JazzApplication.xml
var g_application_xml = null;

// Flag telling if append-save-delete-save is executing
var g_executing_append_delete = false;


var g_guestbook_start_url = 'https://jazzliveaarau.ch/WwwUtils/TestGuestDir/';

//var g_guestbook_xml_dir = g_guestbook_homepage_url + 'XML/';

//var g_guestbook_image_dir = g_guestbook_homepage_url + 'JazzGuests/';

//var g_guestbook_upload_xml_dir = g_guestbook_homepage_url + 'JazzGuests/Uploaded/';

//var g_guestbook_backups_xml_dir = g_guestbook_homepage_url + 'JazzGuests/Backups/';

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start GuestbookServer Class /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

class GuestbookServer
{
    // Returns the absulute URL for the JAZZ live AARAU homepage
    static getHomepageUrl()
    {
        return 'https://jazzliveaarau.ch/';

    } // getHomepageUrl

    // Returns the absolute URL for the directory where the file JazzGuests.xml is saved
    static getXmlDirUrl()
    {
        return GuestbookServer.getHomepageUrl() + 'XML/';
        
    } // getXmlDirUrl

    // Returns the absolute URL for the directory where the images are saved
    static getJazzGuestsDirUrl()
    {
        return GuestbookServer.getHomepageUrl() + 'JazzGuests/';
        
    } // getJazzGuestsDirUrl

    // Returns the absolute URL for the directory where the file JazzGuestsUploaded.xml is saved
    static getUploadedXmlDirUrl()
    {
        return GuestbookServer.getHomepageUrl() + 'JazzGuests/Uploaded/';
        
    } // getUploadedXmlDirUrl

    // Returns the name JazzGuests.xml
    static getJazzGuestsXmlFilename()
    {
        return 'JazzGuests.xml';
        
    } // getJazzGuestsXmlFilename

    // Returns the name JazzGuestsUploaded.xml
    static getJazzGuestsUploadedXmlFilename()
    {
        return 'JazzGuestsUploaded.xml';
        
    } // getJazzGuestsUploadedXmlFilename

    // Returns the absolute URL for the guestbook backup directory 
    static getBackupDirUrl()
    {
        return GuestbookServer.getHomepageUrl() + 'JazzGuests/Backups/';
        
    } // getBackupDirUrl

   // Saves JazzGuests.xml or JazzGuestsUploaded.xml
    // After succesful save the function i_callback_done will be called
    static async saveXmlFile(i_guests_xml, i_callback_done)
    {
        var pretty_print = new PrettyPrintXml(i_guests_xml.getXmlObject());

        var xml_content_str = pretty_print.xmlToWinFormattedString();
    
        var url_relative = i_guests_xml.getXmlJazzGuestsFileName();

        var url_absolute = GuestbookServer.getXmlAbsolutePath(url_relative);
    
        var b_execute_server = UtilServer.execApplicationOnServer();
         
        if (!b_execute_server)
        {
            debugGuestbookCommon('GuestbookServer.saveXmlFile JazzGuests.xml or JazzGuestsUploaded.xml file not saved. Application is not running on the server');
    
            i_callback_done();
        }
    
        UtilServer.saveFileCallback(url_relative, xml_content_str, i_callback_done);
    
    } // saveXmlFile

    // Returns the absolute path to JazzGuests.xml or JazzGuestsUploaded.xml
    // It should work with the relative paths from object (class) JazzGuestsXml,
    // but it is hopefully safer with an absolute paths
    static getXmlAbsolutePath(i_relative_path)
    {
        var index_uploaded = i_relative_path.indexOf(GuestbookServer.getJazzGuestsUploadedXmlFilename());

        var index_xml = i_relative_path.indexOf(GuestbookServer.getJazzGuestsXmlFilename());

        if (index_uploaded >= 0)
        {
            return GuestbookServer.getUploadedXmlDirUrl() + GuestbookServer.getJazzGuestsUploadedXmlFilename();
        }
        else if (index_xml >= 0)
        {
            return GuestbookServer.getXmlDirUrl() + GuestbookServer.getJazzGuestsXmlFilename();
        }
        else
        {
            alert("GuestbookServer.getXmlAbsolutePath Programming error")

            return 'ERROR';
        }

    } // getXmlAbsolutePath

} // GuestbookServer


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End GuestbookServer Class ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////