// File: UtilFullscreen.js
// Date: 2026-02-04
// Author: Gunnar Lidén

// File content
// =============
//
// Class with fullscreen utility functions

// Start functions were copied from WwwHomepage file Utility.js

class UtilFullscreen
{
    // Open fullscreen for an element
    // Input: Element that shall be displayed in fullscreen
    // To open the whole page in fullscreen, use the document.documentElement instead of 
    // document.getElementById("id_element").
    // For more information and more functionality please refer to the fullscreen 
    // functions of the class UtilDevice 
    static openForElement(i_element)
    {
        // https://www.w3schools.com/howto/howto_js_fullscreen.asp
        // 
        if (i_element == null)
        {
            alert("UtilFullscreen.openForElement Input element is null");

            return;
        }

        if (i_element.requestFullscreen) 
        {
            i_element.requestFullscreen();
        } 
        else if (i_element.webkitRequestFullscreen) 
        { // Safari
            i_element.webkitRequestFullscreen();
        } 
        else if (i_element.msRequestFullscreen) 
        { // IE11 
            i_element.msRequestFullscreen();
        }

    } // openForElement

    // Close fullscreen mode
    static close() 
    {
        if (document.exitFullscreen) 
        {
        document.exitFullscreen();
        } 
        else if (document.webkitExitFullscreen) 
        { // Safari
        document.webkitExitFullscreen();
        } 
        else if (document.msExitFullscreen) 
        { // IE11
        document.msExitFullscreen();
        }

    } // close

    // Returns true if full screen has been enabled in the browser
    static isEnabled()
    {
        // https://pretagteam.com/question/how-to-detect-if-user-has-enabled-full-screen-in-browser

        //console.log("isEnabled Width diff = "  + (screen.width - window.innerWidth).toString() + 
        //" Height diff = "  + (screen.height - window.innerHeight).toString());

        if (screen.width == window.innerWidth && screen.height == window.innerHeight)
        {
            return true;
        }
        else if (browserWindowHasDesktopWidth() && screen.height == window.innerHeight)
        {
            // For the case debug (F12) mode where screen.width != window.innerWidth for full screen
            return true;
        }
        else
        {
            return false;
        }

    } // isEnabled

    /* Not yet implented here
    static isEnabledForSmartphone()
    {
        var b_full_screen = UtilFullscreen.isEnabled();

        var b_smartphone = false;

        if (browserWindowHasDesktopWidth())
        {    
            b_smartphone = false;
        }
        else
        {
            b_smartphone = true;
        }

        if (b_full_screen && b_smartphone)
        {
            return true;
        }
        else
        {
            return false;
        }

    } // isEnabledForSmartphone
     */

   
} // End of class UtilFullscreen