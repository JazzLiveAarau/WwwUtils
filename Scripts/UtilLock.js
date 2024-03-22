// File: UtilLock.js
// Date: 2024-03-22
// Author: Gunnar Lidén

// File content
// =============
//
// Class with functions for the locking and unlocking the writing of 
// files on the server. A typical example is the Guestbook Upload
// application. When one user uploads an image and registers the
// new record in the XML files, other users are not allowed to do
// that simultaneously.
//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Special for this class: 
// The name of the global object variable must be g_util_lock_object
//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// 
//
// This is how it is implemented:
// 1. Click event
//    The user klicks a save button for the upload and/or change
//    of files on the server
// 2. The application checks if somebody else has locked the files.
//    The function UtilLock() checks if the content of an lock/unlock
//    file is 'files_not_locked' or 'files_locked'. If the files are
//    locked a "locked callback functionn" is called.
// 3. The UtilLock member function locks the writing of data
//    The UtilLock() functions sets the content of the lock/unlock
//    file to 'files_locked'.
// 4. The application uploads and/or changes data on the server
// 5. The application unlocks 
//    The member function UtilLock.unlock() is called.
//

class UtilLock
{
    constructor(i_lock_dir)
    {
        // The absolute or relative URL to the directory with the
        // lock/unlock file
        this.m_lock_dir = i_lock_dir;

        // The name of the lock/unlock file
        this.m_file_name = 'LockUnlock.txt';

        // The lock/unlock file content string if files are locked
        this.m_content_locked_str = 'files_locked';

        // The lock/unlock file content string if files are unlocked
        this.m_content_unlocked_str = 'files_unlocked';

        // The name of the function that will be called when the files 
        // have been locked
        this.m_locked_callback_fctn = UtilLock.filesHaveBeenLocked;

        // The name of the function that will be called when the files 
        // have been unlocked
        this.m_unlocked_callback_fctn = UtilLock.filesHaveBeenUnlocked;

        // The name of the function that will be called when locking 
        // failed, i.e. somebody else is locking the files. Or error ....
        this.m_locking_failed_callback_fctn = UtilLock.filesCouldNotBeLocked;

        // The name of the function that will be called when unlocking 
        // failed, i.e. somebody else is locking the files.
        this.m_unlocking_failed_callback_fctn = UtilLock.filesCouldNotBeUnlocked;

        // The name of the function that will be called for unexpected failures
        this.m_unexpected_failure_callback_fctn = UtilLock.unexpectedFailure;

        // The number of trials locking the files, i.e. waiting time 
        // untlil another user unloccks the files. Default (already
        // set) number is five (5).
        this.m_number_locking_trials = 5;

        // The sleeping time for ech lock trial, i.e. defines the 
        // waiting time until another user unloccks the files. 
        // Default (already set) time is 300 milliseconds.
        this.m_trial_sleep_time = '300';

        // The user email. The email address is not necessary for
        // the funtionality. It is only used for debugging purposes
        this.m_user_email = '';

        // Initialization
        this.init();

    } // constructor

    // Initialization
    init()
    {


    } // init

    // Returns true if the name of the global variable is OK
    globalObjectVariableNameIsOk()
    {
        if (g_util_lock_object != this)
        {
            alert("UtilLock.init The global UtilLock object variable has not the name g_util_lock_object");

            return false;
        }
        else
        {
            console.log("UtilLock.init The global UtilLock object variable has the right name g_util_lock_object");

            return true;
        }

    } // globalObjectVariableNameIsOk

    // Lock files
    lock()
    {
        if (!this.globalObjectVariableNameIsOk())
        {
            return;
        }

        var exec_case = UtilLock.execPhpCaseLockFiles();

        this.execOnServer(exec_case);

    } // lock

    // Unlock files
    unlock()
    {
        if (!this.globalObjectVariableNameIsOk())
        {
            return;
        }

        var exec_case = UtilLock.execPhpCaseUnlockFiles();

        this.execOnServer(exec_case);

    } // unlock

    // Execute on the server
    execOnServer(i_exec_case)
    {
        if (!UtilServer.execApplicationOnServer())
        {
            console.log("UtilServer.execOnServer Do nothing. Not running on the server");

            return;
        }

        var rel_path_file_input = UtilServer.replaceAbsoluteWithRelativePath(this.m_lock_dir + this.m_file_name);

        // var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/JazzScripts/Php/UtilLock.php');
        var rel_path_file_php = UtilServer.getRelativeExecuteLevelPath('https://jazzliveaarau.ch/WwwUtils/Php/UtilLock.php');

        $.post
        (rel_path_file_php,
            {
            exec_case: i_exec_case,
            url_file: rel_path_file_input,
            locked_str: this.m_content_locked_str,
            unlocked_str: this.m_content_unlocked_str,
            user_email: this.m_user_email
            },
            function(data_exec,status_exec)
            {
                if (status_exec == "success")
                {
                    
                    var index_fail_lock = data_exec.indexOf(UtilLock.dataPhpKeyUnableToLockFiles());
                    var index_fail_unlock = data_exec.indexOf(UtilLock.dataPhpKeyUnableToUnlockFiles());

                    if (index_fail_lock >= 0 || index_fail_unlock >= 0)
                    {
                        console.log("UtilLock.execOnServer failure. data_exec= " + data_exec.trim());

                        if (index_fail_lock >= 0)
                        {
                            console.log("UtilLock.execOnServer Another user has locked the files. ");

                            //Test UtilLock.filesCouldNotBeLocked();

                            var key_str_length = UtilLock.dataPhpKeyUnableToLockFiles().length;

                            var email_str = data_exec.substring(key_str_length + 1);

                            g_util_lock_object.m_locking_failed_callback_fctn(email_str);

                            return;
                        }
                        else if (index_fail_unlock >= 0)
                        {
                            console.log("UtilLock.execOnServer Failure unlocking the files. ");

                            //Test UtilLock.filesCouldNotBeUnlocked();

                            g_util_lock_object.m_unlocking_failed_callback_fctn();

                            return;

                        }

                    } // End success PHP execution, but lock or unlock failed

                    // Succesful execution. Callback function is determined by the case
                    // ----------------------------------------------------------------

                    if (i_exec_case == UtilLock.execPhpCaseLockFiles())
                    {
                        //Test UtilLock.filesHaveBeenLocked();

                        g_util_lock_object.m_locked_callback_fctn();
                    }
                    else if (i_exec_case == UtilLock.execPhpCaseUnlockFiles())
                    {
                        //Text UtilLock.filesHaveBeenUnlocked();

                        g_util_lock_object.m_unlocked_callback_fctn();
                    }
                    else
                    {
                        alert("UtilLock.execOnServer Not an implemented case= " + i_exec_case);

                    }
                }
                else
                {
                    alert("Execution of UtilLock.php failed. data_exec= " + data_exec.trim());

                    //Test UtilLock.unexpectedFailure();

                    g_util_lock_object.m_unexpected_failure_callback_fctn();

                } // No success, i.e. execution of PHP failed

            } // function

        ); // post
        
    } // execOnServer

    // Callback function files have been locked
    static filesHaveBeenLocked()
    {
        alert("UtilLock.filesHaveBeenLocked Files have been locked");

    } // filesHaveBeenLocked

    // Callback function files have been unlocked
    static filesHaveBeenUnlocked()
    {
        alert("UtilLock.filesHaveBeenUnocked Files have been unlocked");

    } // filesHaveBeenUnlocked

    // Callback function files have been unlocked
    static filesHaveBeenUnlocked()
    {
        alert("UtilLock.filesHaveBeenUnlocked Files have been unlocked");

    } // filesHaveBeenUnlocked

    // Callback function if unlocking failed
    static filesCouldNotBeUnlocked()
    {
        alert("UtilLock.filesCouldNotBeUnlocked   Failure unlocking the files");

    } // filesCouldNotBeUnlocked

    // Callback function if locking failed
    static filesCouldNotBeLocked(i_email_str)
    {
        alert("UtilLock.filesCouldNotBeLocked   Failure locking the files. Locked by email= " + i_email_str);

    } // filesCouldNotBeLocked

    // Callback function for an unexpected failure
    static unexpectedFailure()
    {
        alert("UtilLock.unexpectedFailure   Unexpected failure");

    } // unexpectedFailure

    // PHP execution case lock files
    static execPhpCaseLockFiles()
    {
        return "ExecLockFiles";

    } // execPhpCaseLockFiles

    // PHP execution case unlock files
    static execPhpCaseUnlockFiles()
    {
        return "ExecUnlockFiles";

    } // execPhpCaseUnlockFiles

    // PHP execution case initialize debug file
    static execPhpCaseInitDebug()
    {
        return "ExecInitDebugFile";

    } // execPhpCaseInitDebug

    // The PHP key telling that files not could be locked
    static dataPhpKeyUnableToLockFiles()
    {
        return 'Unable_to_lock_files';

    } // dataPhpKeyUnableToLockFiles

    // The PHP key telling that files not could be unlocked
    static dataPhpKeyUnableToUnlockFiles()
    {
        return 'Unable_to_unlock_files';

    } // dataPhpKeyUnableToUnlockFiles

    // Sets the name of the lock/unlock file
    // Default name (already set) is LockUnlock.txt
    setLockUnlockFileName(i_file_name)
    {
        this.m_file_name = i_file_name;

    } // setLockUnlockFileName

    // Sets the lock/unlock file content string if files are locked
    // Default (already set) value is 'files_locked'
    setContentLockedString(i_content_locked_str)
    {
        this.m_content_locked_str = i_content_locked_str;

    } // setContentLockedString

    // Sets the lock/unlock file content string if files are unlocked
    // Default (already set) value is 'files_unlocked'
    setContentUnlockedString(i_content_unlocked_str)
    {
        this.m_content_unlocked_str = i_content_unlocked_str;

    } // setContentUnlockedString

    // Sets the user email
    setUserEmail(i_user_email)
    {
        this.m_user_email = i_user_email;

    } // setUserEmail

    // Set the name of the function that will be called when the files have
    // been locked. Default (already set) name is filesHaveBeenUnlocked
    setLockedCallbackFunctionName(i_locked_callback_fctn)
    {
        this.m_locked_callback_fctn = i_locked_callback_fctn;

    } // setLockedCallbackFunctionName

    // Set the name of the function that will be called when the files have
    // been unlocked. Default (already set) name is filesHaveBeenLocked
    setUnlockedCallbackFunctionName(i_unlocked_callback_fctn)
    {
        this.m_unlocked_callback_fctn = i_unlocked_callback_fctn;

    } // setUnlockedCallbackFunctionName

    // Set the name of the function that will be called when locking 
    // failed, i.e. somebody else is locking the files. Or error ....
    // Default (already set) name is filesCouldNotBeLocked
    setLockingFailedCallbackFunctionName(i_locking_failed_callback_fctn)
    {
        this.m_locking_failed_callback_fctn = i_locking_failed_callback_fctn;

    } // setLockingFailedCallbackFunctionName

    // Set the name of the function that will be called when locking 
    // failed, i.e. somebody else is locking the files. Or error ....
    // Default (already set) name is filesCouldNotBeLocked
    setUnlockingFailedCallbackFunctionName(i_unlocking_failed_callback_fctn)
    {
        this.m_unlocking_failed_callback_fctn = i_unlocking_failed_callback_fctn;

    } // setUnlockingFailedCallbackFunctionName

    // Set the name of the function that will be called for an unexpected failure
    // Default (already set) name is unexpectedFailure
    setUnexpectedFailureCallbackFunctionName(i_unexpected_failure_callback_fctn)
    {
        this.m_unexpected_failure_callback_fctn = i_unexpected_failure_callback_fctn;

    } // setUnexpectedFailureCallbackFunctionName

    // Set the number of trials locking the files, i.e. waiting time 
    // untlil another user unloccks the files. Default (already
    // set) number is five (5).
    setNumberOfLockTrials(i_number_locking_trials)
    {
        this.m_number_locking_trials = i_number_locking_trials;

    } // setNumberOfLockTrials

    // Set the sleeping time for ech lock trial, i.e. defines the 
    // The sleeping time for ech lock trial, i.e. defines the 
    // waiting time until another user unloccks the files. 
    // Default (already set) time is 300 milliseconds.
    setTrialSleepingTime(i_trial_sleep_time)
    {
        this.m_trial_sleep_time = i_trial_sleep_time;

    } // setTrialSleepingTime


} // UtilLock
