#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>
#include <unistd.h>

#include "jni.h"

#include "rh4n.h"
#include "rh4n_jni.h"
#include "rh4n_messaging.h"


JNIEXPORT jstring JNICALL Java_realHTML_jni_JNI_jni_1recvMessage(JNIEnv *env, jclass *in_class, jint udsClient) {
    RH4nProperties props; memset(&props, 0x00, sizeof(props));
    char *text = NULL;
    jstring messageValue = NULL;
    int readRet = 0;
    RH4nMessagingProperties messaging;

    RH4NLIBMESSAGING_INIT(&messaging);

    messaging.logging = props.logging = rh4nLoggingCreateStreamingRule("JNI", "WSTHREAD", RH4N_DEVELOP, "");
    messaging.clientSocket = udsClient;

    rh4n_log_develop(props.logging, "Start recv new Message");
    
    if((readRet = rh4n_messaging_recvTextBlock(&messaging, &text)) < 0) {
        //rh4n_del_log_rule(props.logging);
        rh4n_jni_utils_throwJNIException(env, -1, "Something went wrong while receiving message. See logs for more information");
        return(NULL);
    } else if(readRet == 1) {
        rh4n_log_error(props.logging, "Socket was closed");
        rh4n_jni_utils_throwSocketClosedException(env);
        return(NULL);
    }
    
    messageValue = (*env)->NewStringUTF(env, text);
    free(text) ;
    //rh4n_del_log_rule(props.logging);
    return(messageValue);
}
