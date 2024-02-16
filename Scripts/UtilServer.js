// File: UtilServer.js
// Date: 2024-02-16
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
    //
    // The input file name (URL) can be absolute. Example
    // https://jazzliveaarau.ch/WwwUtilsTestData/DirAlpha/DirTwo/TestUtilServerLevelFour.txt
    // The input file name (URL) can be relative. Example
    // ../../WwwUtilsTestData/DirAlpha/DirTwo/TestUtilServerLevelFour.txt
    //          
    // Input parameter i_content_string is the content of the file.
    // Please note that escape characters like \n not is allowed in the string
    //
    // The function returns false for failure.
    //
    // Please refer to UtilServerSaveFile.php for a detailed description of "post"
    //
    // The browser PHP function do not accept an absolute file URL. When given as
    // input the part / https://www.jazzliveaarau.ch/ is replaced with ../../
    //
    // It must be able to call this function from any level with only one PHP file.
    // For instance from
    // https://www.jazzliveaarau.ch/WwwUtils/LevelThree/LevelFour/TestUtilsLevelFour.htm
    // The used PHP function (file) is UtilServerSaveFile.php in /www/JazzScripts/Php
    // An absolut path is not allowed therefore the relative path is constructed
    // ../../../../JazzScripts/Php/UtilServerSaveFile.php
    // Please refer to UtilServer.getRelativeExecuteLevelPath
    //
    static async saveFile(i_path_file_name, i_content_string)
    {
        // console.log("UtilServer.saveFile i_path_file_name= " + i_path_file_name);

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

                        return false;
                    }

                    console.log(" UtilServer.saveFile Filed is saved. data_save= " + data_save);

                    return true;
                }
                else
                {
                    console.log(" UtilServer.saveFile failure. data_save= " + data_save);
                    alert("Execution of UtilServer.saveFile failed");

                    return false;
                }          
            } // function
          ); // post 

        console.log("UtilServer.saveFile The function comes here, but without a return it won't come further");
        
    } // saveFile

    // Same as saveFile but with a callback function and no async/await
    static saveFileCallback(i_path_file_name, i_content_string, i_callback_function)
    {
        // console.log("UtilServer.saveFileCallback i_path_file_name= " + i_path_file_name);

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
 
                        UtilServer.saveFileError(rel_path_file_name, data_save, status_save);
                    }

                    console.log(" UtilServer.saveFileCallback Filed is saved. data_save= " + data_save.trim());

                    i_callback_function();
                }
                else
                {
                    UtilServer.saveFileError(rel_path_file_name, data_save, status_save);
                }  

            } // function
        ); // post 

        // console.log("saveFileCallback The function comes here, but without a return it won't come further");
       
    } // saveFileCallback

    // Failure saving file
    static saveFileError(i_rel_path_file_name, i_data_save, i_status_save)
    {
        console.log(" UtilServer.saveFileCallback failure. data_save= " + i_data_save + ' status_save= ' + i_status_save);

        alert("UtilServer.saveFileCallback Unable to create file " + i_rel_path_file_name + ' status_save= ' + i_status_save);

    } // saveFileError

    // Copy a file with the JQuery function "post"
    // Please refer to UtilServerCopyFile.php for a detailed description of "post"
    // Input parameter i_url_file_input is the url for server file name that shall be copied
    // Input parameter i_url_file_copy is the url for server file name for the backup copy
    // File names (URLs) can be given as absolute or relative paths
    //
    // The function returns false for failure
    static async copyFile(i_url_file_input, i_url_file_copy)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("copyFile BackupFileOnServer.php cannot be executed on the local (live) server");

            return false;
        }

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

                        return false;
                    }

                    console.log(" UtilServer.copyFile File is copied data_copy= " + data_copy.trim());

                    return true;
                }
                else
                {
                    alert("Execution of UtilServerCopyFile.php failed. data_copy= " + data_copy);

                    return false;
                }          
            } // function

        ); // post
        
    } // copyFile

    // Move a file with the JQuery function "post"
    // Please refer to UtilServerMoveFile.php for a detailed description of "post"
    // Input parameter i_url_file_input is the url for server file name that shall be moved
    // Input parameter i_url_file_move is the url fot the moved file
    // File names (URLs) can be given as absolute or relative paths
    //
    // The function returns false for failure
    static async moveFile(i_url_file_input, i_url_file_move)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            alert("moveFile UtilServerMoveFile.php cannot be executed on the local (live) server");

            return false;
        }

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

                        return false;
                    }

                    return true;
                }
                else
                {
                    alert("Execution of UtilServermoveFile.php failed. data_move= " + data_move.trim());

                    return false;
                }          
            } // function

        ); // post
        
    } // moveFile


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

    // Returns true if it is a relative part, i.e. not containing jazzliveaarau.ch
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

    // Returns the file name
    static getFileName(i_path_file_name)
    {
        var ret_file_name = '';

        var index_last_slash = i_path_file_name.lastIndexOf('/');

        if (index_last_slash > 0)
        {

            ret_file_name = i_path_file_name.substring(index_last_slash + 1);

            // No check that it is a file name e.g. containing a point

            return ret_file_name;
        }
        else
        {
            // Assume that input file name didn't have a path. No check!

            return i_path_file_name;
        }

    } // getFileName

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

    // Initialization (creation) of the debug file in the directory /www/JazzScripts/Php/Debug
    static async initDebugFile(i_unigue_str)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            console.log("UtilServer.initDebugFile Do nothing. Not running on the server");

            return;
        }

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

                        return false;
                    }
                    else
                    {
                        console.log("UtilServer.initDebugFile. File " + file_name + " is created " + "--- 2");

                        return true;
                    }
                }
                else
                {
                    console.log(" UtilServer.UtilServerInitDebug.php failure. data_save= " + data_save);
                    alert("Execution of UtilServer.UtilServerInitDebug.php failed");

                    return false;
                }          
            } // function
          ); // post
        
    } // initDebugFile

    // Append text to the debug file in the directory /www/JazzScripts/Php/Debug
    static async appendDebugFile(i_content_str, i_unigue_str)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            console.log("UtilServer.appendDebugFile Do nothing. Not running on the server");

            return;
        }

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

                        return false;
                    }
                    else
                    {
                        // console.log("UtilServer.appendDebug. Data added to " + file_name + "----------------------------------------------------------------- 2");

                        return true;
                    }
                }
                else
                {
                    console.log(" UtilServer.UtilServerInitDebug.php failure. data_save= " + data_save);
                    alert("Execution of UtilServer.UtilServerAppendDebug.php failed");

                    return false;
                }          
            } // function
          ); // post
          
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


} // UtilServer
