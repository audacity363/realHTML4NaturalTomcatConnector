#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>
#include <sys/types.h>
#include <sys/wait.h>

#include "jni.h"

#include "rh4n.h"
#include "rh4n_jni.h"

void rh4n_jni_childProcess_kill(JNIEnv *env, pid_t naturalProcess, RH4nProperties *props) {
    int wstatus = 0;
    char errorstr[500];

    if(rh4n_jni_childProcess_getStatus(env, naturalProcess, &wstatus) == true) {
        rh4n_log_warn(props->logging, "Child already exited with status %d", wstatus);
        return;
    }
    if((*env)->ExceptionCheck(env)) { return; }

    rh4n_log_info(props->logging, "Killing child %d", naturalProcess);
    if(kill(naturalProcess, SIGKILL) < 0) {
        sprintf(errorstr, "Could not kill child %d - %s", naturalProcess, strerror(errno));
        rh4n_log_error(props->logging, errorstr);
        rh4n_jni_utils_throwJNIException(env, errno, errorstr);
        return;
    }
    
    rh4n_jni_waitForChild(env, naturalProcess, props, NULL);
    return;
}

void rh4n_jni_childProcess_wait(JNIEnv *env, pid_t naturalProcess, RH4nProperties *props, uint8_t *childExit) {
    int wstatus = 0;

    rh4n_log_info(props->logging, "Waiting for %d to exit", naturalProcess);
    printf("Get status of pid - WAIT: [%d]\n", naturalProcess);
    if(waitpid(naturalProcess, &wstatus, 0) < 0) {
        rh4n_log_fatal(props->logging, "Could not wait for child - %s", strerror(errno));
        rh4n_jni_utils_throwJNIException(env, errno, "Could not wait for child");
        return;
    }
    
    if(childExit != NULL) {
        *childExit = WEXITSTATUS(wstatus);
    }

    rh4n_log_debug(props->logging, "Child %d exited with status %d", naturalProcess, WEXITSTATUS(wstatus));
    return;
}

bool rh4n_jni_childProcess_getStatus(JNIEnv *env, pid_t naturalProcess, uint8_t *exitStatus) {
    int wstatus = 0, waitret = 0;
    char errorstr[500];

    if((waitret = waitpid(naturalProcess, &wstatus, WNOHANG)) < 0) {
        sprintf(errorstr, "Could not get status of child %d; errno: %d - %s", naturalProcess, errno, strerror(errno));
        rh4n_jni_utils_throwJNIException(env, errno, errorstr);
        return(false);
    } else if(waitret == 0) {
        return(false);
    } else if(waitret != naturalProcess) {
        sprintf(errorstr, "Something went tottaly wrong. Expected Pid: [%d] god: [%d]", naturalProcess, waitret);
        rh4n_jni_utils_throwJNIException(env, -1, errorstr);
        return(false);
    }

    if(exitStatus) {
        if(WIFSTOPPED(wstatus)) {
            *exitStatus = WSTOPSIG(wstatus);
        } else if(WIFSIGNALED(wstatus)) {
            *exitStatus = WTERMSIG(wstatus);
        } else if(WIFEXITED(wstatus)) {
            *exitStatus = WEXITSTATUS(wstatus);
        }
    }

    return(true);
}

jobject rh4n_jni_childProcess_createChildProcessObject(JNIEnv *env, int pid, bool exited, int exitCode, const char *reason, int udsClient) {
    jclass cChildProcess = NULL;
    jmethodID mconstructor = NULL;
    jobject oChildProcess = NULL;

    if((cChildProcess = (*env)->FindClass(env, "realHTML/jni/ChildProcess")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find class \"realHTML/jni/ChildProcess\"");
        return(NULL);
    }
    
    if((mconstructor = (*env)->GetMethodID(env, cChildProcess, "<init>", "(IZILjava/lang/String;I)V")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find constructor for class \"realHTML/jni/ChildProcess\"");
        return(NULL);
    }

    oChildProcess = (*env)->NewObject(env, cChildProcess, mconstructor, pid, exited, exitCode, 
            (*env)->NewStringUTF(env, reason), udsClient);
    if((*env)->ExceptionCheck(env)) { return(NULL); }

    return(oChildProcess);
}
