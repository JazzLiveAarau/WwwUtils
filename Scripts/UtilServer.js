// File: UtilServer.js
// Date: 2025-04-19
// Author: Gunnar Lidén

// File content
// =============
//
// Class with server utility functions based on the asynchronous jQuery function $.post.
// Implemented functions are:
// - Save (create) a file on the server defined by the file content and the file URL
// - Copy a file. Input data are two URLs
// - Move a file. Input data are two URLs
// - Delete a file. Input data is an URL TODO Not yet implemented
//
// For debug there are also two function
// - Initialize a debug file with a given name
// - Append text the to the debug file. A name defines which debug file
//
// For the JAZZ live AARAU the absolute (full) URL may be given as input. The browsers
// (the jQuery function $.post) only accept relative URLs, but these may be difficult
// to set. In the class there are functions that convert the absolute URL to a relative
// URL.
//
// Please also note that the functions only will execute if running on the server
// for a jazz application. This is checked with UtilServer.execApplicationOnServer.
//
// The server executing PHP files (functions) are in the dirextory /www/JazzScripts/Php
//
// Syntax for the jScript $.post function is: $.post(URL, data, callback); 
// Parameter URL is the requested PHP file that processes the data on the server
// Parameter data are object properties written as name:value pairs separated by commas 
// within curly braces {}. 
// Parameter callback is the name of the function that will be called when the data has 
// been processed. In this class it is implemented as an anonymous function.
// The callback function has two arguments: ret_data and status.
// Argument ret_data is text written by the PHP function with echo.
// Argument status returns the text 'success' if the PHP function has been executed.
// Please note that the returned 'success' not means that from the calling function
// requested result was achieved, like for instance that a file was actually saved. 
// When the opening of a new file failed the reurned status is 'success' and for 
// such a case the returned ret_data is returned woth a failure code that is examined
// here. 

class UtilServer
{
    // Save a file with the JQuery asynchronous function $.post and UtilServerSaveFile.php 
    // The function returns true (for success) or false when finished.
    // Please note that it is an async function with await, but the
    // UtilServer.saveFile function will not stop until the file is saved
    static async saveFile(i_path_file_name, i_content_string)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("saveFile UtilServerSaveFile.php cannot be executed on the local (live) server");

            return false;
        }

        var b_save_success = false;

        var rel_path_file_name = UtilServer.replaceAbsoluteWithRelativePath(i_path_file_name);

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerSaveFile.php');
    
        await $.post
          (rel_path_file_php,
            {
              file_content: i_content_string,
              file_name: rel_path_file_name
            },
            function(data_save,status_save)
            {   
                // Do not return true or false from this anonymous function. 
                // It will not be the return value for saveFile! (undefined will be returned if one tries)
                // Parameter b_save_success works fine because of await
                if (status_save == "success")
                {
                    // The PHP function returns succed for an opening failure. Therefore the returned
                    // string Unable_to_open_file is used to handle this error.
                    var index_fail_open = data_save.indexOf('Unable_to_open_file');
                    var index_fail_write = data_save.indexOf('Unable_to_write_file');

                    if (index_fail_open >= 0 || index_fail_write >= 0)
                    {
                        console.log(" UtilServer.saveFile failure. data_save= " + data_save);
                        alert("UtilServer.saveFileWithJQueryPostFunction Unable to create file " + rel_path_file_name);

                        b_save_success = false;
                    }

                    console.log(" UtilServer.saveFile Filed is saved. data_save= " + data_save);

                    b_save_success = true;

                }
                else
                {
                    console.log(" UtilServer.saveFile failure. data_save= " + data_save);
                    alert("Execution of UtilServer.saveFile failed");

                    b_save_success = false;
                }          
            } // function
          ); // post 

        // console.log("UtilServer.saveFile Exit b_save_success= " + b_save_success.toString());

        return b_save_success;
        
    } // saveFile

    // Save a file with the JQuery asynchronous function $.post and UtilServerSaveFile.php 
    // Input parameters
	//
	// This function is the same as SaveCallback except that there is a 
	// check and failure if the file not exists
	//
    // i_path_file_name: A relative or absolute URL for the created file
    // i_content_string: The content of the file. Row ends defined as \n are not allowed
    // i_callback_fctn:  The name of the callback function
    //
    // For an error the function UtilServer.saveFileError will be called
    static saveFileCallback(i_path_file_name, i_content_string, i_callback_fctn)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("saveFileCallback UtilServerSaveFile.php cannot be executed on the local (live) server");

            return;
        }

        var rel_path_file_name = UtilServer.replaceAbsoluteWithRelativePath(i_path_file_name);

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerSaveFile.php');
    
        $.post
          (rel_path_file_php,
            {
              file_content: i_content_string,
              file_name: rel_path_file_name
            },
            function(data_save, status_save)
            {   
                if (status_save == "success")
                {
                    // The PHP function returns succed for an opening failure. Therefore the returned
                    // string Unable_to_open_file is used to handle this error.
                    var index_fail_open = data_save.indexOf('Unable_to_open_file');
                    var index_fail_write = data_save.indexOf('Unable_to_write_file');

                    if (index_fail_open >= 0 || index_fail_write >= 0)
                    {

                        if (index_fail_open >= 0 || index_fail_write >= 0)
                        {
                            var file_name = UtilServer.getFileName(rel_path_file_name);
    
                            var data_save_display = '';
    
                            if (index_fail_open >= 0)
                            {
                                data_save_display = 'Unable_to_open_file';
                            }
                            else if (index_fail_write >= 0)
                            {
                                data_save_display = 'File does not exist';
                            }
                            else
                            {
                                data_save_display = data_save.trim();
                            }
                        }
 
                        UtilServer.saveFileError(file_name, data_save_display, status_save);

                        return;
                    }

                    console.log(" UtilServer.saveFileCallback Saved file: " + rel_path_file_name);
                    // console.log(" UtilServer.saveFileCallback Filed is saved. data_save= " + data_save.trim());

                    i_callback_fctn();
                }
                else
                {
                    UtilServer.saveFileError(rel_path_file_name, data_save.trim(), status_save);
                }  

            } // function
        ); // post 

        // console.log("saveFileCallback The function comes here, but without a return it won't come further");
       
    } // saveFileCallback

    // Save a file with the JQuery asynchronous function $.post and UtilSaveFile.php 
	//
	// This function is the same as SaveFileCallback except that there is no 
	// check and failure if the file not existed
	//
    // Input parameters
    // i_path_file_name: A relative or absolute URL for the created file
    // i_content_string: The content of the file. Row ends defined as \n are not allowed
    // i_callback_fctn:  The name of the callback function
    //
    // For an error the function UtilServer.saveFileError will be called
    static saveCallback(i_path_file_name, i_content_string, i_callback_fctn)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("saveCallback UtilSaveFile.php cannot be executed on the local (live) server");

            return;
        }

        var rel_path_file_name = UtilServer.replaceAbsoluteWithRelativePath(i_path_file_name);

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilSaveFile.php');
    
        $.post
          (rel_path_file_php,
            {
              file_content: i_content_string,
              file_name: rel_path_file_name
            },
            function(data_save, status_save)
            {   
                if (status_save == "success")
                {
                    // The PHP function returns succed for an opening failure. Therefore the returned
                    // string Unable_to_open_file is used to handle this error.
                    var index_fail_open = data_save.indexOf('Unable_to_open_file');
                    var index_fail_dir = data_save.indexOf('Directory_is_missing');

                    if (index_fail_open >= 0 || index_fail_dir >= 0)
                    {
                        var file_name = UtilServer.getFileName(rel_path_file_name);

                        var data_save_display = '';

                        if (index_fail_open >= 0)
                        {
                            data_save_display = 'Unable_to_open_file';
                        }
                        else if (index_fail_dir >= 0)
                        {
                            data_save_display = 'Directory_is_missing';
                        }
                        else
                        {
                            data_save_display = data_save.trim();
                        }
 
                        UtilServer.saveFileError(file_name, data_save_display, status_save);

                        return;
                    }

                    console.log(" UtilServer.saveCallback Saved file: " + rel_path_file_name);
                    // console.log(" UtilServer.saveCallback File is saved. data_save= " + data_save.trim());

                    i_callback_fctn();
                }
                else
                {
                    UtilServer.saveFileError(rel_path_file_name, data_save.trim(), status_save);
                }  

            } // function
        ); // post 

        // console.log("saveCallback The function comes here, but without a return it won't come further");
       
    } // saveCallback




    // Save a file with the JQuery asynchronous function $.post and UtilSaveDirFile.php 
	// The directories (path) will be created if not existing
	//
    // Input parameters
    // i_path_file_name: A relative or absolute URL for the created file
    // i_content_string: The content of the file. Row ends defined as \n are not allowed
    // i_callback_fctn:  The name of the callback function
    //
    // For an error the function UtilServer.saveFileError will be called
    static saveDirFile(i_path_file_name, i_content_string, i_callback_fctn)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("saveDirFile UtilSaveFile.php cannot be executed on the local (live) server");

            return;
        }

        var rel_path_file_name = UtilServer.replaceAbsoluteWithRelativePath(i_path_file_name);

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilSaveDirFile.php');
    
        $.post
          (rel_path_file_php,
            {
              file_content: i_content_string,
              file_name: rel_path_file_name
            },
            function(data_save, status_save)
            {   
                if (status_save == "success")
                {
                    // The PHP function returns succed for an opening failure. Therefore the returned
                    // string Unable_to_open_file is used to handle this error.
                    var index_fail_open = data_save.indexOf('Unable_to_open_file');
                    

                    if (index_fail_open >= 0)
                    {
                        var file_name = UtilServer.getFileName(rel_path_file_name);

                        var data_save_display = '';

                        if (index_fail_open >= 0)
                        {
                            data_save_display = 'Unable_to_open_file';
                        }
                        else
                        {
                            data_save_display = data_save.trim();
                        }
 
                        UtilServer.saveFileError(file_name, data_save_display, status_save);

                        return;
                    }

                    console.log(" UtilServer.saveDirFile Saved file: " + rel_path_file_name);
                    // console.log(" UtilServer.saveDirFile File is saved. data_save= " + data_save.trim());

                    i_callback_fctn();
                }
                else
                {
                    UtilServer.saveFileError(rel_path_file_name, data_save.trim(), status_save);
                }  

            } // function
        ); // post 

        // console.log("saveDirFile The function comes here, but without a return it won't come further");
       
    } // saveDirFile









    // Failure saving file
    static saveFileError(i_file_name, i_data_save, i_status_save)
    {
        console.log(" UtilServer.saveFileCallback failure. data_save= " + i_data_save + ' status_save= ' + i_status_save);
        console.log(" UtilServer.saveFileCallback failure. i_file_name= " + i_file_name);

        alert("UtilServer.saveFileCallback Unable to save file " + i_file_name + '. ' + i_data_save);

    } // saveFileError

    // Copy a file with the JQuery asynchronous function $.post and UtilServerCopyFile.php 
    // The function returns true (for success) or false when finished.
    // Please note that it is an async function with await, but the
    // UtilServer.copyFile function will not await until the file is saved
    // Input parameters:
    // i_url_file_input: The url (relative or absolute) for the server file to copy
    // i_url_file_copy:  The url (relative or absolute) for the copied file
    static async copyFile(i_url_file_input, i_url_file_copy)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("copyFile UtilServerCopyFile.php cannot be executed on the local (live) server");

            return false;
        }

        var b_copy_success = false;

        var rel_path_file_input = UtilServer.replaceAbsoluteWithRelativePath(i_url_file_input);

        var rel_path_file_copy = UtilServer.replaceAbsoluteWithRelativePath(i_url_file_copy);

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerCopyFile.php');

        await $.post
        (rel_path_file_php,
            {
            file_input: rel_path_file_input,
            file_copy: rel_path_file_copy
            },
            function(data_copy,status_copy)
            {
                if (status_copy == "success")
                {
                    var index_fail_copy = data_copy.indexOf('Unable_to_copy_file_');
                    var index_fail_exist = data_copy.indexOf('File_exists_not');

                    if (index_fail_copy >= 0 || index_fail_exist >= 0)
                    {
                        console.log(" UtilServer.copyFile Failure copying file. data_copy= " + data_copy);

                        if (index_fail_exist >= 0)
                        {
                            alert("UtilServer.copyFile There is no file " + rel_path_file_input);
                        }
                        else
                        {
                            alert("UtilServer.copyFile Unable to copy file " + rel_path_file_input);
                        }

                        b_copy_success = false;
                    }

                    console.log(" UtilServer.copyFile File is copied data_copy= " + data_copy.trim());

                    b_copy_success = true;
                }
                else
                {
                    alert("Execution of UtilServerCopyFile.php failed. data_copy= " + data_copy);

                    b_copy_success = false;
                }          
            } // function

        ); // post

        return b_copy_success;
        
    } // copyFile

    // Copy a file with the JQuery asynchronous function $.post and UtilServerCopyFile.php 
    // Input parameters:
    // i_url_file_input: The url (relative or absolute) for the server file to copy
    // i_url_file_copy:  The url (relative or absolute) for the copied file
    // i_callback_fctn:  The name of the callback function
    static copyFileCallback(i_url_file_input, i_url_file_copy, i_callback_fctn)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("copyFile UtilServerCopyFile.php cannot be executed on the local (live) server");

            return false;
        }

        var rel_path_file_input = UtilServer.replaceAbsoluteWithRelativePath(i_url_file_input);

        var rel_path_file_copy = UtilServer.replaceAbsoluteWithRelativePath(i_url_file_copy);

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerCopyFile.php');

        $.post
        (rel_path_file_php,
            {
            file_input: rel_path_file_input,
            file_copy: rel_path_file_copy
            },
            function(data_copy,status_copy)
            {
                if (status_copy == "success")
                {
                    var index_fail_copy = data_copy.indexOf('Unable_to_copy_file_');
                    var index_fail_exist = data_copy.indexOf('File_exists_not');

                    if (index_fail_copy >= 0 || index_fail_exist >= 0)
                    {
                        console.log(" UtilServer.copyFile Failure copying file. data_copy= " + data_copy);

                        if (index_fail_exist >= 0)
                        {
                            alert("UtilServer.copyFile There is no file " + rel_path_file_input);
                        }
                        else
                        {
                            alert("UtilServer.copyFile Unable to copy file " + rel_path_file_input);
                        }

                        UtilServer.copyFileError(rel_path_file_input, data_copy, status_copy);
                    }

                    console.log(" UtilServer.copyFile File is copied data_copy= " + data_copy.trim());

                    i_callback_fctn();
                }
                else
                {
                    alert("Execution of UtilServerCopyFile.php failed. data_copy= " + data_copy);

                    UtilServer.copyFileError(rel_path_file_input, data_copy, status_copy);
                }          
            } // function

        ); // post
        
    } // copyFileCallback

    // Failure copying file
    static copyFileError(i_rel_path_file_name, i_data_copy, i_status_copy)
    {
        console.log(" UtilServer.copyFileCallback failure. data_copy= " + i_data_copy + ' status_copy= ' + i_status_copy);

        alert("UtilServer.copyFileCallback Unable to copy file " + i_rel_path_file_name + ' status_copy= ' + i_status_copy);

    } // copyFileError

    // Move a file with the JQuery asynchronous function $.post and UtilServerMoveFile.php 
    // The function returns true (for success) or false when finished.
    // Please note that it is an async function with await, but the
    // UtilServer.moveFile function will not await until the file has been moved
    // Input parameters:
    // i_url_file_input: The url (relative or absolute) for the server file to move
    // i_url_file_move:  The url (relative or absolute) for the moved file
    static async moveFile(i_url_file_input, i_url_file_move)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("moveFile UtilServerMoveFile.php cannot be executed on the local (live) server");

            return false;
        }

        var b_move_success = false;

        var rel_path_file_input = UtilServer.replaceAbsoluteWithRelativePath(i_url_file_input);

        var rel_path_file_move = UtilServer.replaceAbsoluteWithRelativePath(i_url_file_move);

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerMoveFile.php');

        await $.post
        (rel_path_file_php,
            {
            file_input: rel_path_file_input,
            file_move: rel_path_file_move
            },
            function(data_move,status_move)
            {
                if (status_move == "success")
                {
                    
                    var index_fail_copy = data_move.indexOf('Unable_to_copy_file_');
                    var index_fail_exist = data_move.indexOf('File_exists_not');
                    var index_fail_delete = data_move.indexOf('Unable_to_delete_file_');

                    if (index_fail_copy >= 0 || index_fail_exist >= 0 ||  index_fail_delete >= 0)
                    {
                        console.log(" UtilServer.UtilServermoveFile.php failure. data_move= " + data_move.trim());

                        if (index_fail_exist >= 0)
                        {
                            alert("UtilServer.moveFile There is no file " + rel_path_file_input);
                        }
                        else if (index_fail_delete >= 0)
                        {
                            alert("UtilServer.moveFile Failure deleting file " + rel_path_file_input);
                        }
                        else
                        {
                            alert("UtilServer.moveFile Unable to copy file " + rel_path_file_input);
                        }

                        b_move_success = false;
                    }

                    b_move_success = true;
                }
                else
                {
                    alert("Execution of UtilServermoveFile.php failed. data_move= " + data_move.trim());

                    b_move_success = false;
                }          
            } // function

        ); // post

        return b_move_success;
        
    } // moveFile

    // Move a file with the JQuery asynchronous function $.post and UtilServerMoveFile.php 
    // Input parameters:
    // i_url_file_input: The url (relative or absolute) for the server file to move
    // i_url_file_move:  The url (relative or absolute) for the moved file
    // i_callback_fctn:  The name of the callback function
    static moveFileCallback(i_url_file_input, i_url_file_move, i_callback_fctn)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("moveFile UtilServerMoveFile.php cannot be executed on the local (live) server");

            return;
        }

        var rel_path_file_input = UtilServer.replaceAbsoluteWithRelativePath(i_url_file_input);

        var rel_path_file_move = UtilServer.replaceAbsoluteWithRelativePath(i_url_file_move);

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerMoveFile.php');

        $.post
        (rel_path_file_php,
            {
            file_input: rel_path_file_input,
            file_move: rel_path_file_move
            },
            function(data_move,status_move)
            {
                if (status_move == "success")
                {
                    
                    var index_fail_copy = data_move.indexOf('Unable_to_copy_file_');
                    var index_fail_exist = data_move.indexOf('File_exists_not');
                    var index_fail_delete = data_move.indexOf('Unable_to_delete_file_');

                    if (index_fail_copy >= 0 || index_fail_exist >= 0 ||  index_fail_delete >= 0)
                    {
                        console.log(" UtilServer.UtilServermoveFile.php failure. data_move= " + data_move.trim());

                        if (index_fail_exist >= 0)
                        {
                            alert("UtilServer.moveFile There is no file " + rel_path_file_input);
                        }
                        else if (index_fail_delete >= 0)
                        {
                            alert("UtilServer.moveFile Failure deleting file " + rel_path_file_input);
                        }
                        else
                        {
                            alert("UtilServer.moveFile Unable to copy file " + rel_path_file_input);
                        }

                        UtilServer.moveFileError(rel_path_file_input, data_move, status_move);
                    }

                    i_callback_fctn();
                }
                else
                {
                    alert("Execution of UtilServermoveFile.php failed. data_move= " + data_move.trim());

                    UtilServer.moveFileError(rel_path_file_input, data_move, status_move);
                }          
            } // function

        ); // post
        
    } // moveFileCallback

    // Failure moving file
    static moveFileError(i_rel_path_file_name, i_data_move, i_status_move)
    {
        console.log(" UtilServer.copyFileCallback failure. data_move= " + i_data_move + ' status_move= ' + i_status_move);

        alert("UtilServer.copyFileCallback Unable to move file " + i_rel_path_file_name + ' status_move= ' + i_status_move);

    } // moveFileError

    // Upload image to the server
    // i_image_file: Input file object (selected with <input type="file">) 
    // i_abs_file_upload_name: Full (relative?) name and path for the upploaded file
    // i_file_uploaded_callback: Name of function that shall be called when file is uploaded
    static async uploadFile(i_image_file, i_abs_file_upload_name, i_file_uploaded_callback) 
    {
        if (null == i_image_file)
        {
            alert("UtilServer.uploadFile Input image file is null");
    
            return;
        }
        var rel_path_file_upload = UtilServer.replaceAbsoluteWithRelativePath(i_abs_file_upload_name);


        var form_data = new FormData(); 
        
        form_data.append("file_input", i_image_file);

        form_data.append("to_file_name", rel_path_file_upload);
    
        console.log("UtilServer.uploadFile Sent to PHP is FormData where the following data has been appended ");

        console.log(i_abs_file_upload_name);
    
        console.log(i_image_file);

        if (!UtilServer.execApplicationOnServer())
        {
            alert("UtilServer.uploadFile File cannot be uploaded with PHP functions. Please upload and execute the application on the server");
    
            return;
        }

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerUploadFile.php');
    
        var response = null;
    
        try
        {
            response = await fetch(rel_path_file_php, 
            {
            method: "POST", 
            body: form_data
            }
          );    
        }
        catch (error) 
        {
            console.log(error);
    
            alert('UtilServer.uploadFile Failure uploading file: ' + error);
    
            return;
        }
    
        console.log("UtilServer.uploadFile response=");
        console.log(response);
    
        if (response.ok)
        {
            console.log("UtilServer.uploadFile The file has been uploaded successfully");

            i_file_uploaded_callback(i_abs_file_upload_name);
        }
        else
        {
            console.log("UtilServer.uploadFile Failure uploading file. response=");
            console.log(response);

            alert('UtilServer.uploadFile Failure uploading file (respons).');
        }

    } // uploadFile

    // Returns the relative path (URL) to the executing HTML file 
    // If the input URL not is an absolute path starting with 
    // https://jazzliveaarau.ch the input URL is returned
    //
    // These library function may be called from any level. For instance
    // https://www.jazzliveaarau.ch/WwwUtils/LevelThree/LevelFour/TestUtilsLevelFour.htm
    // The functions are executed by the PHP functions (files), e.g. UtilServerSaveFile.php
    // The PHP files are in the directory https://www.jazzliveaarau.ch/JazzScripts/Php
    // The JQuery function post do not accept an absolute URL. Therefore this function
    // dertermines the execute level and constructs the relative path to the file
    // UtilServerSaveFile.php. For the above example the relative URL. For the above example:
    // ../../../../JazzScripts/Php/UtilServerSaveFile.php
    static getRelativeExecuteLevelPath(i_path_file_name)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("UtilServer.getRelativeExecuteLevelPath  Please upload and execute the application on the server");
    
            return;
        }

        if (UtilServer.isRelativePath(i_path_file_name))
        {
            return i_path_file_name;
        }

        //console.log("UtilServer.getRelativeExecuteLevelPath i_path_file_name= " + i_path_file_name);

        var path_file_without_homepage = UtilServer.getPathWithoutHomepage(i_path_file_name);

        //console.log("UtilServer.getRelativeExecuteLevelPath path_file_without_homepage= " + path_file_without_homepage);

        var current_base = window.location.href;

        //console.log("UtilServer.getRelativeExecuteLevelPath current_base= " + current_base);

        var n_levels_base = UtilServer.getNumberOfPathLevels(current_base);

        // console.log("UtilServer.getRelativeExecuteLevelPath n_levels_base= " + n_levels_base.toString());

        var full_relative_path = UtilServer.addRelativePathSlashes(n_levels_base, path_file_without_homepage)

        // console.log("UtilServer.getRelativeExecuteLevelPath full_relative_path= " + full_relative_path);

        return full_relative_path;

    } // getRelativeExecuteLevelPath

    // Replaces the first homepage part of an URL with a relative path, 
    // i.e. replace https://www.jazzliveaarau.ch/ with ../../
    // Browser do not accept https://www.jazzliveaarau.ch/
    // If input is a relative path do nothing. Just return the path
    static replaceAbsoluteWithRelativePath(i_path_file_name)
    {
        if (UtilServer.isRelativePath(i_path_file_name))
        {
            return i_path_file_name;
        }

        // console.log("UtilServer.replaceAbsoluteWithRelativePath i_path_file_name= " + i_path_file_name);
        
        var path_file_without_homepage = UtilServer.getPathWithoutHomepage(i_path_file_name);

        // console.log("UtilServer.replaceAbsoluteWithRelativePath path_file_without_homepage= " + path_file_without_homepage);

        var full_relative_path = '../..' + path_file_without_homepage;

        // console.log("UtilServer.replaceAbsoluteWithRelativePath full_relative_path= " + full_relative_path);

        return full_relative_path;

    } // replaceAbsoluteWithRelativePath

    // Adds ../ and returns the full relative path
    static addRelativePathSlashes(i_levels, i_path_file_without_homepage)
    {
        if (i_levels <= 1)
        {
            alert("UtilServer.addRelativePathSlashes Invalid i_levels= " + i_levels.toString());

            return '';
        }

        var path_php = '';

        for (var level_number=1; level_number <= i_levels; level_number++)
        {
            if (level_number < i_levels)
            {
                path_php = path_php + '../';
            }
            else
            {
                path_php = path_php + '..';
            }
        }
        var full_relative_path = path_php + i_path_file_without_homepage;

        // console.log("UtilServer.addRelativePathSlashes full_relative_path= " + full_relative_path);

        return full_relative_path;

    } // addRelativePathSlashes

    // Returns the end path without homepage, i.e. https://www.jazzliveaarau.ch/ is removed
    static getPathWithoutHomepage(i_path_file_name)
    {
        var server_url = 'jazzliveaarau.ch';

        var server_url_length = server_url.length;
    
        var index_url = i_path_file_name.indexOf(server_url);

        // console.log("UtilServer.getPathWithoutHomepage i_path_file_name= " + i_path_file_name);

        var path_file_without_homepage = i_path_file_name.substring(index_url + server_url_length);

        // console.log("UtilServer.getPathWithoutHomepage path_file_without_homepage= " + path_file_without_homepage);

        return path_file_without_homepage;

    } // getPathWithoutHomepage

    // Returns true if it is a relative path, i.e. not containing jazzliveaarau.ch
    static isRelativePath(i_path_file_name)
    {
        var server_url = 'jazzliveaarau.ch';
    
        var index_url = i_path_file_name.indexOf(server_url);

        if (index_url < 0)
        {
            // console.log("getRelativeExecuteLevelPath.isRelativePath Relative URL i_path_file_name= " + i_path_file_name);

            return true;
        }
        else
        {
            // console.log("getRelativeExecuteLevelPath.isRelativePath Absolute URL i_path_file_name= " + i_path_file_name);

            return false;
        }

    } // isRelativePath

    // Returns true if it is an (JAZZ live AARAU) absolute path, i.e. containing jazzliveaarau.ch
    static isAbsolutePath(i_path_file_name)
    {
        var server_url = 'jazzliveaarau.ch';
    
        var index_url = i_path_file_name.indexOf(server_url);

        if (index_url > 0)
        {
            return true;
        }
        else
        {
            return false;
        }

    } // isAbsolutePath


    // Returns the file extension
    static getFileExtension(i_file_name)
    {
        var index_last_point = i_file_name.lastIndexOf('.');

        if (index_last_point < 0)
        {
            alert("UtilServer.getFileExtension No extension i.e. point in file name " + i_file_name);

            return '';
        }

        return i_file_name.substring(index_last_point);

    } // getFileExtension

    // Returns the file name with extension
    static getFileName(i_path_file_name)
    {
        var ret_file_name = '';

        var index_last_slash = i_path_file_name.lastIndexOf('/');

        if (index_last_slash > 0)
        {

            ret_file_name = i_path_file_name.substring(index_last_slash + 1);

        }
        else
        {
            // Input file name without a path

            ret_file_name = i_path_file_name;
        }

        var index_last_point = ret_file_name.lastIndexOf('.');

        if (index_last_point < 0)
        {
            alert("UtilServer.getFileName No extension point in input name= " + i_path_file_name);

            return "";
        }

        return ret_file_name;

    } // getFileName

    // Returns the file name
    static getFileNameWithoutExtension(i_path_file_name)
    {
        var ret_file_name_no_ext = '';

        var file_name = null;

        var index_last_slash = i_path_file_name.lastIndexOf('/');

        if (index_last_slash > 0)
        {

            file_name = i_path_file_name.substring(index_last_slash + 1);

        }
        else
        {
            // Input file name did not have a path.

            file_name = i_path_file_name;

        }

        var index_last_point = file_name.lastIndexOf('.');

        if (index_last_point < 0)
        {
            alert("UtilServer.getFileNameWithoutExtension No extension point in input name= " + i_path_file_name);

            return "";
        }

        ret_file_name_no_ext = file_name.substring(0, index_last_point);

        return ret_file_name_no_ext;

    } // getFileNameWithoutExtension

    // Returns the file path
    static getFilePath(i_path_file_name)
    {
        var ret_file_path = '';

        var index_last_slash = i_path_file_name.lastIndexOf('/');

        if (index_last_slash > 0)
        {

            ret_file_path = i_path_file_name.substring(0, index_last_slash + 1);

            return ret_file_path;
        }
        else
        {
            return ret_file_path;
        }

    } // getFilePath

    // Returns the number of path levels from https://jazzliveaarau.ch
    static getNumberOfPathLevels(i_url)
    {
        // console.log("UtilServer.getNumberOfPathLevels i_url= " + i_url);

        var server_url = 'jazzliveaarau.ch';

        var server_url_length = server_url.length;
    
        var index_url = i_url.indexOf(server_url);

        // console.log("UtilServer.getNumberOfPathLevels index_url= " + index_url.toString());

        if (index_url < 0)
        {
            console.log("UtilServer.getNumberOfPathLevels Not an absolute URL i_url= " + i_url);

            return -1;
        }

        var homepage_sub_path = i_url.substring(index_url + server_url_length);

        // console.log("UtilServer.getNumberOfPathLevels homepage_sub_path= " + homepage_sub_path);

        var n_levels = 0;

        for (var index_char=0; index_char < homepage_sub_path.length; index_char++)
        {
            var current_char = homepage_sub_path[index_char];

            if (current_char == '/')
            {
                n_levels = n_levels + 1;
            }

        }

        // console.log("UtilServer.getNumberOfPathLevels n_levels= " + n_levels.toString());

        return n_levels;

    } // getNumberOfPathLevels

    // Downloads a file from the server
    // https://byby.dev/node-download-image
    // https://www.youtube.com/watch?v=DDYkcydo1WA

    // Open with an application
    // https://www.makeuseof.com/node-js-open-files-urls-npm-package/

    static async download(i_url)
    {
        alert("UtilServer.download Not yet implemented");

    } // download

    // Initialization (creation) of the debug file in the directory /www/JazzScripts/Php/Debug
    static async initDebugFile(i_unigue_str)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            console.log("UtilServer.initDebugFile Do nothing. Not running on the server");

            return;
        }

        var util_server_key = 'jazz_util_server';
        var util_server_value = 'util_server_debug_initialized';

        var session_debug_value = window.sessionStorage.getItem(util_server_key);

        if (session_debug_value != null || session_debug_value == util_server_value)
        {
            console.log("UtilServer.initDebugFile Do nothing. Debug already initialized for this session");

            return;
        }

        var b_init_debug_success = false;

        var file_name = './Debug/debug_server_utils_' + i_unigue_str + '.txt';

        // console.log("UtilServer.initDebugFile Input file= " + file_name + "-------- 1");

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerInitDebug.php');
    
        await $.post
          (rel_path_file_php,
            {
              file_name: file_name
            },
            function(data_save,status_save)
            {   
                if (status_save == "success")
                {
                    // The PHP function returns succed for an opening failure. Therefore the returned
                    // string Unable_to_open_file is used to handle this error.
                    var index_fail_open = data_save.indexOf('Unable_to_open_file');
                    var index_fail_write = data_save.indexOf('Unable_to_write_file');

                    if (index_fail_open >= 0 || index_fail_write >= 0)
                    {
                        console.log(" UtilServer.UtilServerInitDebug.php failure. data_save= " + data_save);

                        alert("UtilServer.saveFileWithJQueryPostFunction Unable to create file " + file_name);

                        b_init_debug_success = false;
                    }
                    else
                    {
                        console.log("UtilServer.initDebugFile. File " + file_name + " is created " + "--- 2");

                        b_init_debug_success = true;
                    }
                }
                else
                {
                    console.log(" UtilServer.UtilServerInitDebug.php failure. data_save= " + data_save);
                    alert("Execution of UtilServer.UtilServerInitDebug.php failed");

                    b_init_debug_success = false;
                }          
            } // function
          ); // post

          window.sessionStorage.setItem(util_server_key, util_server_value);
        
          return b_init_debug_success;

    } // initDebugFile

    // Append text to the debug file in the directory /www/JazzScripts/Php/Debug
    static async appendDebugFile(i_content_str, i_unigue_str)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            console.log("UtilServer.appendDebugFile Do nothing. Not running on the server");

            return;
        }

        var b_append_debug_success = false;

        var file_name = './Debug/debug_server_utils_' + i_unigue_str + '.txt';

        // console.log("UtilServer.appendDebugFile Input file= " + file_name + "----------------------------------------------------------------- 1");

        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilServerAppendDebug.php');

        var content_str = i_content_str +  '\n';
    
         await $.post
          (rel_path_file_php,
            {
              file_content: content_str,
              file_name: file_name
            },
            function(data_save,status_save)
            {   
                if (status_save == "success")
                {
                    // The PHP function returns succed for an opening failure. Therefore the returned
                    // string Unable_to_open_file is used to handle this error.
                    var index_fail_open = data_save.indexOf('Unable_to_open_file');
                    var index_fail_write = data_save.indexOf('Unable_to_write_file');

                    if (index_fail_open >= 0 || index_fail_write >= 0)
                    {
                        console.log(" UtilServer.UtilServerAppendDebug.php failure. data_save= " + data_save);
                        alert("UtilServer.appendDebugFile Unable to create file " + file_name);

                        b_append_debug_success = false;
                    }
                    else
                    {
                        // console.log("UtilServer.appendDebug. Data added to " + file_name + "----------------------------------------------------------------- 2");

                        b_append_debug_success = true;
                    }
                }
                else
                {
                    console.log(" UtilServer.UtilServerInitDebug.php failure. data_save= " + data_save);
                    alert("Execution of UtilServer.UtilServerAppendDebug.php failed");

                    b_append_debug_success = false;
                }          
            } // function
          ); // post
          
          return b_append_debug_success;

    } // appendDebugFile
	

    // Returns true if the application is running on the server
    // Returns false if it is running on the Visual Studio Code Live Server
    // Please note that window.location.href can return
    // https://jazzliveaarau.ch or
    // https://www.jazzliveaarau.ch
    static execApplicationOnServer()
    {
        var current_base = window.location.href;
    
        var server_url = 'jazzliveaarau.ch';
    
        var index_url = current_base.indexOf(server_url);
    
        if (index_url >= 0) 
        {
            return true;
        }
        else
        {
            return false;
        }
    
    } // execApplicationOnServer


    // https://bobbyhadz.com/blog/get-browser-type-and-version-using-javascript#get-browser-name-chrome-firefox-safari-in-javascript

    // Returns the browser type
    static getBrowserType() 
    {

        var user_agent_str = navigator.userAgent;
        console.log("UtilServer.getBrowserType user_agent_str= " + user_agent_str);

        if (UtilServer.isOpera()) {
        return 'Opera';
        } else if (UtilServer.isEdge() || UtilServer.isEdgeChromium()) {
        return 'Microsoft Edge';
        } else if (UtilServer.isChrome()) {
        return 'Google Chrome';
        } else if (UtilServer.isFirefox()) {
        return 'Mozilla Firefox';
        } else if (UtilServer.isSafari()) {
        return 'Apple Safari';
        } else if (UtilServer.isInternetExplorer()) {
        return 'Microsoft Internet Explorer';
        } else if (UtilServer.isUCBrowser()) {
        return 'UC Browser';
        } else if (UtilServer.isSamsungBrowser()) {
        return 'Samsung browser';
        } else {
        return 'Unknown browser';
        }

    } // getBrowserType
  
    // Returns true if the browser is Opera
    static isOpera() 
    {
        return (
          !!window.opr ||
          !!window.opera ||
          navigator.userAgent.toLowerCase().includes('opr/')
        );

    } // isOpera

    // Returns true if the browser is Mozilla Firefox
    static isFirefox() 
    {
        return (
          navigator.userAgent.toLowerCase().includes('firefox') ||
          typeof InstallTrigger !== 'undefined'
        );

    } // isFirefox


    // Returns true if the browser is Apple Safari
    static isSafari() 
    {
        if (UtilServer.isChrome())
        {
            return false;
        }

        // String from iPhone     navigator.userAgent= 
        // Mozilla/5.0 (iPhone; CPU iPhone OS 12_5_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Mobile/15E148 Safari/604.1
        var user_agent_str = navigator.userAgent.toLowerCase();
        var ret_includes = user_agent_str.includes('safari');
        console.log("UtilServer.isSafari user_agent_str= " + user_agent_str);
        console.log("UtilServer.isSafari ret_includes= " + ret_includes);

        return ret_includes;

    } // isSafari

    // Returns true if the browser is Microsoft Internet Explorer
    static isInternetExplorer() 
    {
        return false || !!document.documentMode;

    } // isInternetExplorer
      
    // Returns true if the browser is Microsoft Edge
    static isEdge() 
    {
        return !UtilServer.isInternetExplorer() && !!window.StyleMedia;

    } // isEdge

    // Returns true if the browser is 
    static isChrome() 
    {
        const userAgent = navigator.userAgent.toLowerCase();

        console.log("UtilServer.isChrome user_agent_str= " + userAgent);
      
        return (
          userAgent.includes('chrome') ||
          userAgent.includes('chromium') ||
          userAgent.includes('crios')
        );

    } // isChrome
      
    // Returns true if the browser is Microsoft Edge
    static isEdgeChromium() 
    {
        console.log("UtilServer.isEdgeChromium user_agent_str= " + navigator.userAgent);
        
        return UtilServer.isChrome() && navigator.userAgent.includes('Edg');

    } // isEdgeChromium

    // Returns true if the browser is UC Browser
    static isUCBrowser() 
    {
        return navigator.userAgent.toLowerCase().includes('ucbrowser');

    } // isUCBrowser

    // Returns true if the browser is Samsung browser
    static isSamsungBrowser() 
    {
        return navigator.userAgent
          .toLowerCase()
          .includes('samsungbrowser');
    } // isSamsungBrowser

} // UtilServer

// Returns a compressed image file. 
// Input image file is returned uncompressed for Apple Safari
// TODO Convert to a member function in UtilServer
const compressImage = async (i_image_file, { quality = 1, type = file_type }) => 
{
    console.log("compressImage Enter quality= " + quality.toString() + ' type= ' + type);

    await UtilServer.appendDebugFile("compressImage Enter quality= " + quality.toString(), "CompressPhoto");

    if (UtilServer.isSafari())
    {
        console.log("compressImage Browser is Apple Safari and createImageBitmap is not implemented. Uncompressed input image is returned");

        await UtilServer.appendDebugFile("compressImage Browser is Apple Safari and createImageBitmap is not implemented. Uncompressed input image is returned", "CompressPhoto");

        return i_image_file;
    }

    // Get as image data
    const imageBitmap = await createImageBitmap(i_image_file);

    console.log("compressImage Bitmap= ");
    console.log(imageBitmap);

    await UtilServer.appendDebugFile("compressImage Bitmap created", "CompressPhoto");

    // Draw to canvas
    const canvas = document.createElement('canvas');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imageBitmap, 0, 0);

    console.log("compressImage canvas= ");
    console.log(canvas);

    await UtilServer.appendDebugFile("compressImage canvas created", "CompressPhoto");

    // Turn into Blob
    const blob = await new Promise
    ((resolve) =>
        canvas.toBlob(resolve, type, quality)
    );

    console.log("compressImage blob= ");
    console.log(blob);

    await UtilServer.appendDebugFile("compressImage Blob created", "CompressPhoto");

    // Turn Blob into File
    var ret_file = new File([blob], i_image_file.name, {type: blob.type,});

    console.log("compressImage Returned file= ");
    console.log(ret_file);

    await UtilServer.appendDebugFile("compressImage File to return created", "CompressPhoto");

    return ret_file;
};

