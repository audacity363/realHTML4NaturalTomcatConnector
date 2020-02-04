#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

#include "jni.h"

#include "rh4n.h"
#include "rh4n_jni.h"
#include "rh4n_messaging.h"

#define RH4N_NATCALLER "realHTML4NaturalNatCaller"
#define RH4N_CLIENT_TIMEOUT 5

void rh4n_jni_startupNatural(JNIEnv *env, jobject onatbinpath, RH4nProperties *props) {
    int udsServer = 0;
    uint32_t realHTMLexeLength = 0;
    uint8_t childStatus = 0;
    const char *natbinpath = NULL;
    char *realHTMLexe = NULL, *udsServerPath = NULL, errorstr[500];
    pid_t naturalProcess = 0;
    
    if(onatbinpath == NULL || (natbinpath = (*env)->GetStringUTFChars(env, (jstring)onatbinpath, NULL)) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Field \"naturalbinpath\" is NULL");
        return;
    }
    if((*env)->ExceptionCheck(env)) { return; }

    if(natbinpath[strlen(natbinpath)-1] != '/') {
        realHTMLexeLength = strlen(natbinpath)+strlen(RH4N_NATCALLER)+2;
    } else {
        realHTMLexeLength = strlen(natbinpath)+strlen(RH4N_NATCALLER)+1;
    }

    if((realHTMLexe = calloc(realHTMLexeLength, sizeof(char))) == NULL) {
        (*env)->ReleaseStringUTFChars(env, onatbinpath, natbinpath); rh4n_jni_utils_throwJNIException(env, -1, "Could not allocate memory for realHTML4NaturalNatCaller exec path");
        return;
    }

    strcpy(realHTMLexe, natbinpath);
    (*env)->ReleaseStringUTFChars(env, onatbinpath, natbinpath);

    if(realHTMLexe[strlen(realHTMLexe)-1] != '/') {
        strcat(realHTMLexe, "/");
    }
    strcat(realHTMLexe, RH4N_NATCALLER);

    rh4n_log_develop(props->logging, "God exec path [%s]", realHTMLexe);

    if(access(realHTMLexe, X_OK) < 0) {
        sprintf(errorstr, "could not locate %s - %s", realHTMLexe, strerror(errno));
        rh4n_jni_utils_throwJNIException(env, -1, errorstr);
        return;
    }


    if((udsServerPath = calloc(strlen(props->outputfile)+2, sizeof(char))) == NULL) {
        free(realHTMLexe);
        rh4n_jni_utils_throwJNIException(env, -1, "Could not allocate memory for realHTML4NaturalNatCaller exec path");
        return;
    }
    sprintf(udsServerPath, "%s.soc", props->outputfile);
    rh4n_log_develop(props->logging, "God udServerPath: [%s]", udsServerPath);

    if((udsServer = rh4n_messaging_createUDSServer(udsServerPath, RH4NLIBMESSAGINGFLAG_NONBLOCKING, props)) < 0) {
        free(realHTMLexe);
        free(udsServerPath);
        sprintf(errorstr, "Could not create uds server on path %s", udsServerPath);
        rh4n_jni_utils_throwJNIException(env, -1, errorstr);
        return;
    }

    naturalProcess = startNatural(env, udsServerPath, realHTMLexe, udsServer, props);
    if((*env)->ExceptionCheck(env)) { 
        unlink(udsServerPath);
        free(udsServerPath);
        free(realHTMLexe);
        return; 
    }

    rh4n_jni_waitForChild(env, naturalProcess, props, &childStatus);
    if((*env)->ExceptionCheck(env)) {
        free(udsServerPath);
        free(realHTMLexe);
        return;
    }

    if(childStatus != 0) {
        rh4n_log_warn(props->logging, "Child exited with status %d", childStatus);
        rh4n_jni_utils_throwJNIException(env, childStatus, "Child exited with status != 0");
    }

    unlink(udsServerPath);

    free(realHTMLexe);
    free(udsServerPath);
    return;
}

pid_t startNatural(JNIEnv *env, const char *udsServerPath, const char *realHTMLexe, int udsServer, RH4nProperties *props) {
    pid_t naturalPID = 0;
    char errorstr[500];
    uint8_t i = 0;
    int udsClient = 0;

    if((naturalPID = fork()) < 0) {
        sprintf(errorstr, "Could notfork - %s", strerror(errno));
        rh4n_jni_utils_throwJNIException(env, errno, errorstr);
        return(0);
    }

    if(naturalPID == 0) {
        execl(realHTMLexe, realHTMLexe, udsServerPath, (char*)NULL);
        fprintf(stderr, "Something went totally wrong - %s", strerror(errno));
        exit(errno);
    }

    rh4n_log_develop(props->logging, "Waiting for client");
    for(; i < RH4N_CLIENT_TIMEOUT*2; i++) {
        if((udsClient = rh4n_messaging_waitForClient(udsServer, props)) > -1) {
            rh4n_log_develop(props->logging, "God new client on socket %d", udsClient);
            break;
        } else if(udsClient == -2) {
            rh4n_log_warn(props->logging, "Attempt [%d/%d]: Timeout on waiting for client", i, RH4N_CLIENT_TIMEOUT*2);
            sleep(1);
            continue;
        } else {
            rh4n_jni_killChild(env, naturalPID, props);
            rh4n_jni_utils_throwJNIException(env, errno, "Error while waiting for new client");
            return(0);
        }
    }
    if(i >= RH4N_CLIENT_TIMEOUT*2) {
        rh4n_jni_killChild(env, naturalPID, props);
        rh4n_log_fatal(props->logging, "Timeout while waiting for a client");
        rh4n_jni_utils_throwJNIException(env, -1, "Timeout while waiting for a client");
        return(0);
    }

    rh4n_log_debug(props->logging, "Sending SessionInformations");
    if(rh4n_messaging_sendSessionInformations(udsClient, props) < 0) {
        rh4n_jni_killChild(env, naturalPID, props);
        rh4n_jni_utils_throwJNIException(env, -1, "Could not send session informations to client");
        return(0);
    }
    rh4n_log_debug(props->logging, "Done sending session informations");

    rh4n_log_debug(props->logging, "Sending url variables");
    if(rh4n_messaging_sendVarlist(udsClient, &props->urlvars, props) < 0) {
        rh4n_jni_killChild(env, naturalPID, props);
        rh4n_jni_utils_throwJNIException(env, -1, "Could not send url variables to client");
        return(0);
    }
    rh4n_log_debug(props->logging, "Done sending url variables");

    rh4n_log_debug(props->logging, "Sending body variables");
    if(rh4n_messaging_sendVarlist(udsClient, &props->bodyvars, props) < 0) {
        rh4n_jni_killChild(env, naturalPID, props);
        rh4n_jni_utils_throwJNIException(env, -1, "Could not send body variables to client");
        return(0);
    }
    rh4n_log_debug(props->logging, "Done sending body variables");
    
    return(naturalPID);
}

void rh4n_jni_killChild(JNIEnv *env, pid_t naturalProcess, RH4nProperties *props) {
    int wstatus = 0;
    char errorstr[500];

    waitpid(naturalProcess, &wstatus, WNOHANG);
    if(WIFEXITED(wstatus)) {
        rh4n_log_warn(props->logging, "Child already exited");
        return;
    }
   
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

void rh4n_jni_waitForChild(JNIEnv *env, pid_t naturalProcess, RH4nProperties *props, uint8_t *childExit) {
    int wstatus = 0;

    rh4n_log_info(props->logging, "Waiting for %d to exit", naturalProcess);
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
