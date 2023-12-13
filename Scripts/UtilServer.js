// File: UtilServer.js
// Date: 2023-12-13
// Author: Gunnar Lidén

// File content
// =============
//
// Class with server utility functions

class UtilServer
{
    // Save a file with the JQuery function "post"
    //
    // Input parameter i_file_name is the server file name that shall be created.
    // The path should be given as a relative path to the directory of the executing HTML file
    // Example: 
    // Write XML file JazzGuestsUploaded.xml to directory /www/JazzGuests/Uploaded/
    // The executing HTML file is in directory /www/Guestbook/
    // i_path_file_name= ../../JazzGuests/Uploaded/JazzGuestsUploaded.xml
    // (Two levels up and then down to /JazzGuests/Uploaded/)
    //          
    // Input parameter i_content_string is the content of the file.
    // Please note that escape characters like \n not is allowed in the string
    //
    // 
    // The function returns false for failure.
    //
    // Please refer to SaveFileOnServer.php for a detailed description of "post"
    static saveFileWithJQueryPostFunction(i_path_file_name, i_content_string)
    {
      // console.log("i_path_file_name= " + i_path_file_name);

      var file_name = i_path_file_name;
    
        $.post
          ('https://www.jazzliveaarau.ch/WwwUtils/Php/SaveFileOnServer.php',
            {
              file_content: i_content_string,
              file_name: file_name
            },
            function(data_save,status_save)
            {   
                if (status_save == "success")
                {
                    // The PHP function returns succed for an opening failure. Therefore the returned
                    // string Unable_to_open_file is used to handle this error.
                    var index_fail = data_save.indexOf('Unable_to_open_file');

                    if (index_fail >= 0)
                    {
                        console.log(" UtilServer.SaveFileOnServer.php failure. data_save= " + data_save);
                        alert("UtilServer.saveFileWithJQueryPostFunction Unable to create file " + i_path_file_name);
                        return false;
                    }

                    // console.log("UtilServer.saveFileWithJQueryPostFunction " + i_path_file_name + " is saved on the server");
                }
                else
                {
                    console.log(" UtilServer.SaveFileOnServer.php failure. data_save= " + data_save);
                    alert("Execution of UtilServer.SaveFileOnServer.php failed");
                    return false;
                }          
            } // function
          ); // post
          
        return true;	  
        
    } // saveFileWithJQueryPostFunction


} // UtilServer
