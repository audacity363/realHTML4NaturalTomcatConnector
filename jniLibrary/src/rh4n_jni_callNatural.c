#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>
#include <unistd.h>
#include <time.h>
#include <sys/types.h>
#include <signal.h>

#ifndef __xlc__
#include <poll.h>
#include <sys/inotify.h>
#include <libgen.h>
#endif

#include "jni.h"

#include "rh4n.h"
#include "rh4n_jni.h"
#include "rh4n_messaging.h"

#define RH4N_NATCALLER "realHTML4NaturalNatCaller"

#define RH4N_CLIENT_TIMEOUT 5

pid_t rh4n_jni_startupNatural(JNIEnv *env, jobject onatbinpath, int *udsClient, RH4nProperties *props) {
    uint32_t realHTMLexeLength = 0; uint8_t childStatus = 0;
    const char *natbinpath = NULL;
    char *realHTMLexe = NULL, *udsServerPath = NULL, errorstr[500];
    pid_t naturalProcess = 0;
    
    if(onatbinpath == NULL || (natbinpath = (*env)->GetStringUTFChars(env, (jstring)onatbinpath, NULL)) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Field \"naturalbinpath\" is NULL");
        return(0);
    }
    if((*env)->ExceptionCheck(env)) { return(0); }

    if(natbinpath[strlen(natbinpath)-1] != '/') {
        realHTMLexeLength = strlen(natbinpath)+strlen(RH4N_NATCALLER)+2;
    } else {
        realHTMLexeLength = strlen(natbinpath)+strlen(RH4N_NATCALLER)+1;
    }

    if((realHTMLexe = calloc(realHTMLexeLength, sizeof(char))) == NULL) {
        (*env)->ReleaseStringUTFChars(env, onatbinpath, natbinpath); rh4n_jni_utils_throwJNIException(env, -1, "Could not allocate memory for realHTML4NaturalNatCaller exec path");
        return(0);
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
        rh4n_jni_utils_throwJNIException(env, -1, errorstr); return(0);
    }


    if((udsServerPath = calloc(strlen(props->outputfile)+2, sizeof(char))) == NULL) {
        free(realHTMLexe);
        rh4n_jni_utils_throwJNIException(env, -1, "Could not allocate memory for realHTML4NaturalNatCaller exec path");
        return(0);
    }
    sprintf(udsServerPath, "%s.soc", props->outputfile);
    rh4n_log_develop(props->logging, "God udServerPath: [%s]", udsServerPath);

    naturalProcess = rh4n_jni_startNatural(env, udsServerPath, realHTMLexe, udsClient, props);
    if((*env)->ExceptionCheck(env)) { 
        free(udsServerPath);
        free(realHTMLexe);
        return(0); 
    }

    free(realHTMLexe);
    free(udsServerPath);

    return naturalProcess;
}

pid_t rh4n_jni_startNatural(JNIEnv *env, char *udsServerPath, char *realHTMLexe, int *pudsClient, RH4nProperties *props) {
    pid_t naturalPID = 0;
    char errorstr[500];
    uint8_t i = 0;
    int udsClient = 0;
    pid_t threadID = getpid();

    if((naturalPID = fork()) < 0) {
        sprintf(errorstr, "Could not fork - %s", strerror(errno));
        rh4n_jni_utils_throwJNIException(env, errno, errorstr);
        return(0);
    }

    if(naturalPID == 0) {
        char *loggingstr = (char*)rh4nLoggingGetLevelStr(props->i_loglevel);
        char* const execargs[] = {
            realHTMLexe,
            "-L", props->natlibrary,
            "-P", props->natprogram,
           "-l", loggingstr,
            udsServerPath,
            NULL
        };


        //printf("setpgid() - %d\n", setpgid(getpid(), threadID));

        execv(realHTMLexe, execargs);
        fprintf(stderr, "Something went totally wrong - %s", strerror(errno));
        exit(errno);
    }

    rh4n_log_debug(props->logging, "Spawned new child: %d", naturalPID);

    rh4n_jni_waitForUDSServer(env, udsServerPath, props);
    if((*env)->ExceptionCheck(env)) { return(0); }

    if((udsClient = rh4n_messaging_connectToUDSServer((const char*)udsServerPath, props)) < 0) {
        rh4n_log_fatal(props->logging, "Could not connect to UDS server %s", udsServerPath);
        rh4n_jni_utils_throwJNIException(env, -1, "Could not connect to UDS server");
        return(0);
    }

    rh4n_log_debug(props->logging, "Sending SessionInformations to socket %d", udsClient);
    if(rh4n_messaging_sendSessionInformations(udsClient, props) < 0) {
        rh4n_log_develop(props->logging, "Closing socket %d", udsClient);
        close(udsClient);
        rh4n_jni_childProcess_kill(env, naturalPID, props);
        rh4n_jni_utils_throwJNIException(env, -1, "Could not send session informations to client");
        return(0);
    }
    rh4n_log_debug(props->logging, "Done sending session informations");

    rh4n_log_debug(props->logging, "Sending url variables to socket %d", udsClient);
    if(rh4n_messaging_sendVarlist(udsClient, &props->urlvars, props) < 0) {
        rh4n_log_develop(props->logging, "Closing socket %d", udsClient);
        close(udsClient);
        rh4n_jni_childProcess_kill(env, naturalPID, props);
        rh4n_jni_utils_throwJNIException(env, -1, "Could not send url variables to client");
        return(0);
    }
    rh4n_log_debug(props->logging, "Done sending url variables");

    rh4n_log_debug(props->logging, "Sending body variables to socet %d", udsClient);
    if(rh4n_messaging_sendVarlist(udsClient, &props->bodyvars, props) < 0) {
        rh4n_log_develop(props->logging, "Closing socket %d", udsClient);
        close(udsClient);
        rh4n_jni_childProcess_kill(env, naturalPID, props);
        rh4n_jni_utils_throwJNIException(env, -1, "Could not send body variables to client");
        return(0);
    }
    rh4n_log_debug(props->logging, "Done sending body variables");

    if(props->mode == 0) {
        close(udsClient);
    } else if(props->mode == 1) { 
        *pudsClient = udsClient;
    }

    return(naturalPID);
}


//On AIX there is no function like inotify so we need to poll if the socket file is available. It's not a great solution but it works...
#ifndef __xlc__
int rh4n_jni_waitForUDSServer_gnu(JNIEnv *env, char *udsServerPath, RH4nProperties *props) {
    char *socketFilename = NULL, buff[4096], *eventptr = NULL, errorstr[1024];
    int watchfd = 0, pollNum = 0, len = 0;
    struct pollfd fds[1];
    const struct inotify_event *event;
    time_t start = 0, now = 0;

    socketFilename = basename(udsServerPath);

    if((watchfd = inotify_init1(IN_NONBLOCK)) < 0) {
        rh4n_log_fatal(props->logging, "Could not init inotify - %s", strerror(errno));
        return(-1);
    }

    if(inotify_add_watch(watchfd, "/tmp/", IN_CREATE) < 0) {
        close(watchfd);
        rh4n_log_fatal(props->logging, "Could not add \"/tmp/\" to watchlist");
        return(-1);
    }

    fds[0].fd = watchfd;
    fds[0].events = POLLIN;

    start = time(NULL);

    while(1) {
        pollNum = poll(fds, 1, 5000);
        if(pollNum < 0) {
            sprintf(errorstr, "Could not poll on watchlist - %s", strerror(errno));
            rh4n_log_fatal(props->logging, "%s", errorstr);
            rh4n_jni_utils_throwJNIException(env, errno, errorstr);
            close(watchfd);
            return(-1);
        }
        if(pollNum > 0) {
            while(1) {
                len = read(watchfd, buff, sizeof(buff));
                if(len < 0 && errno != EAGAIN) {
                    sprintf(errorstr, "Error while reading inode event - %s", strerror(errno));
                    rh4n_jni_utils_throwJNIException(env, errno, errorstr);
                    rh4n_log_fatal(props->logging, "%s", errorstr);
                    close(watchfd);
                    return(-1);
                }

                for(eventptr = buff; eventptr < buff + len; eventptr += sizeof(struct inotify_event) + event->len) {
                    event = (const struct inotify_event*)eventptr;

                    if(event->len) {
                        rh4n_log_debug(props->logging, "File %s was newly created", event->name);
                        if(strcmp(socketFilename, event->name) == 0) {
                            close(watchfd);
                            return(0);
                        }
                    }
                }
            }
        }

        now = time(NULL);
        if(now - start >= 5) {
            close(watchfd);
            sprintf(errorstr, "Timeout while waiting for uds Server file %s", udsServerPath);
            rh4n_jni_utils_throwJNIException(env, errno, errorstr);
            rh4n_log_fatal(props->logging, "%s", errorstr);
            return(-1);
        }
    }

    rh4n_log_fatal(props->logging, "How the fuck did you get here?!");
    rh4n_jni_utils_throwJNIException(env, errno, "How the fuck did you get here?!");
    return(-1);
}

# else

int rh4n_jni_waitForUDSServer_xlc(JNIEnv *env, char *udsServerPath, RH4nProperties *props) {
    time_t start = 0, now = 0;
    int accessRet = 0;
    char errorstr[1024];

    start = time(NULL);
    while(1) {
        if((accessRet = access(udsServerPath, (R_OK | W_OK))) == 0) {
            return(0);
        }

        now = time(NULL);
        if(now - start >= 5) {
            break;
        }
    }
    
    sprintf("Timeout while waiting for usdServer %s to spawn - %s", udsServerPath, strerror(errno));
    rh4n_jni_utils_throwJNIException(env, errno, errorstr);
    rh4n_log_fatal(props->logging, "%s", errorstr);
    return(-1);
}
#endif
