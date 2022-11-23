#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>
#include <unistd.h>

#include "jni.h"

#include "rh4n.h"
#include "rh4n_jni.h"
#include "rh4n_messaging.h"

JNIEXPORT jboolean JNICALL Java_realHTML_jni_JNI_jni_1checkForNewMessage(JNIEnv *env, jclass *in_class, jint udsClient) {
    RH4nProperties props; memset(&props, 0x00, sizeof(props));
    char errorstr[1024];
    int selectRet = 0;
    RH4nMessagingProperties messaging;
    RH4NLIBMESSAGING_INIT(&messaging);

    if(udsClient < 0) {
        return(JNI_FALSE);
    }


    messaging.logging = props.logging = rh4nLoggingCreateStreamingRule("JNI", "WSTHREAD", RH4N_ERROR, "");
    messaging.clientSocket = udsClient;

    selectRet = rh4n_messaging_waitForData(&messaging, 0, 0);

    switch(selectRet) {
        case -1:
            sprintf(errorstr, "Could not wait for new data - %s", strerror(errno));
            //rh4n_del_log_rule(props.logging);
            rh4n_jni_utils_throwJNIException(env, errno, errorstr);
            return(JNI_FALSE);
        case RH4NLIBMESSAGING_WAIT_WOULDBLOCK:
            //rh4n_del_log_rule(props.logging);
            return(JNI_FALSE);
        case 0:
            //rh4n_del_log_rule(props.logging);
            return(JNI_TRUE);
    }

    rh4n_log_develop(props.logging, "Something went tottaly wrong");
    
    //rh4n_del_log_rule(props.logging);
    sprintf(errorstr, "Something went tottaly wrong! selectReturn: %d", selectRet);
    rh4n_jni_utils_throwJNIException(env, errno, errorstr);
    return(JNI_FALSE);
}
