// File: GuestbookTest.js
// Date: 2024-02-15
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Test of server utility functions used by application Guestbook

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Test Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Main function simulating the use of UtilServer functions in the Guestbook application
function guestbookTest()
{
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

    guestbookTest();

} // onClickTestGuestbook

// Loads all XML objects for Guestbook Admin and Upload
// Start XML is the object corresponding to JazzGuests.xml
function loadAllXmlObjectsForAdminAndUpload()
{
    var n_level_xml = 1;

    var update_xml = false;

    g_guests_xml = new JazzGuestsXml(callbackGuestbookUploadedXml, n_level_xml, update_xml);

} // loadAllXmlObjectsForAdminAndUpload

// Load of XML object corresponding to JazzGuestsUploaded.xml
function callbackGuestbookUploadedXml()
{
    var n_level_xml = 1;

    var update_xml = true;

    g_guests_uploaded_xml = new JazzGuestsXml(xmlObjectsAreCreated, n_level_xml, update_xml);

} // callbackGuestbookUploadedXml

// The guestbook XML objects have been created
function xmlObjectsAreCreated()
{
    var n_uploaded_recs = g_guests_uploaded_xml.getNumberOfGuestRecords();

    var n_recs = g_guests_xml.getNumberOfGuestRecords();

    console.log("saveAppendedUploadedXml Uploaded n_recs= " + n_uploaded_recs.toString());

    console.log("saveAppendedUploadedXml Admin n_recs= " + n_recs.toString());

    appendSetGuestbookRecord(g_guests_uploaded_xml);

    appendSetGuestbookRecord(g_guests_xml);

    saveAppendedUploadedXml();

    // alert("xmlObjectsAreCreated Record is appended to both XML objects");

} // xmlObjectsAreCreated

async function saveAppendedUploadedXml()
{
    var n_recs = g_guests_uploaded_xml.getNumberOfGuestRecords();

    console.log("saveAppendedUploadedXml n_recs= " + n_recs.toString());

    var absolute_file_name =  g_guestbook_start_url + "JazzGuests/Uploaded/JazzGuestsUploaded.xml";

    var pretty_print = new PrettyPrintXml(g_guests_uploaded_xml.getXmlObject());

    var xml_content_str = pretty_print.xmlToWinFormattedString();

    await UtilServer.saveFileCallback(absolute_file_name, xml_content_str, saveAppendedXml);

} // saveAppendedUploadedXml

async function saveAppendedXml()
{
    var n_recs = g_guests_xml.getNumberOfGuestRecords();

    console.log("saveAppendedXml n_recs= " + n_recs.toString());

    var absolute_file_name =  g_guestbook_start_url + "XML/JazzGuests.xml";

    var pretty_print = new PrettyPrintXml(g_guests_xml.getXmlObject());

    var xml_content_str = pretty_print.xmlToWinFormattedString();

    await UtilServer.saveFileCallback(absolute_file_name, xml_content_str, deleteXmlRecord);

} // saveAppendedXml

function deleteXmlRecord()
{
    var n_uploaded_recs = g_guests_uploaded_xml.getNumberOfGuestRecords();

    var n_recs = g_guests_xml.getNumberOfGuestRecords();

    console.log("deleteXmlRecord Uploaded n_recs= " + n_uploaded_recs.toString());

    console.log("deleteXmlRecord Admin n_recs= " + n_recs.toString());

    g_guests_uploaded_xml.deleteGuestNode(n_uploaded_recs);

    g_guests_xml.deleteGuestNode(n_recs);

    saveDeletedUploadedXml();

} // deleteXmlRecord

async function saveDeletedUploadedXml()
{
    var n_recs = g_guests_uploaded_xml.getNumberOfGuestRecords();

    console.log("saveDeletedUploadedXml n_recs= " + n_recs.toString());

    var absolute_file_name =  g_guestbook_start_url + "JazzGuests/Uploaded/JazzGuestsUploaded.xml";

    var pretty_print = new PrettyPrintXml(g_guests_uploaded_xml.getXmlObject());

    var xml_content_str = pretty_print.xmlToWinFormattedString();

    await UtilServer.saveFileCallback(absolute_file_name, xml_content_str, saveDeletedXml);

} // saveDeletedUploadedXml

async function saveDeletedXml()
{
    var n_recs = g_guests_xml.getNumberOfGuestRecords();

    console.log("saveDeletedXml n_recs= " + n_recs.toString());

    var absolute_file_name =  g_guestbook_start_url + "XML/JazzGuests.xml";

    var pretty_print = new PrettyPrintXml(g_guests_xml.getXmlObject());

    var xml_content_str = pretty_print.xmlToWinFormattedString();

    await UtilServer.saveFileCallback(absolute_file_name, xml_content_str, afterAppendAndDeleted);

} // saveDeletedXml

function afterAppendAndDeleted()
{
    console.log("afterAppendAndDeleted Enter");

} // afterAppendAndDeleted

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



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Test Functions //////////////////////////////////////////////
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

// Flag telling if loading is for Guestbook Upload or Admin
var g_load_for_guestbook_admin = null;


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
    
        await UtilServer.saveFileCallback(url_relative, xml_content_str, i_callback_done);
    
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