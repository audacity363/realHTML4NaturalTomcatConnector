#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>
#include <unistd.h>

#include "jni.h"

#include "rh4n.h"
#include "rh4n_jni.h"
#include "rh4n_utils.h"


JNIEXPORT jobject JNICALL Java_realHTML_jni_JNI_jni_1getChildProcessStatus(JNIEnv *env, jclass *in_class, jint childProcess) {
    char procStatPath[200], errorstr[500], myprocName[18], myprocStatus;
    FILE *procStatusFile = NULL;
    pid_t mypid = 0;

    uint8_t exitStatus = 0;

    bool exited = rh4n_jni_childProcess_getStatus(env, childProcess, &exitStatus);

    return(rh4n_jni_childProcess_createChildProcessObject(env, mypid, exited, exitStatus, "", -1));
}
