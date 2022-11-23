#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <errno.h>
#include <string.h>
#include <jni.h>

#include "rh4n.h"
#include "rh4n_jni.h"

void rh4n_jni_utils_throwJNIException(JNIEnv *env, int errorno, const char *errorstr) {
    jclass cjniexception = NULL;
    jmethodID mconstructor = NULL;
    jobject ojniexception = NULL;

    if((cjniexception = (*env)->FindClass(env, "realHTML/jni/exceptions/JNIException")) == NULL) {
        printf("Could not find JNIException\n"); fflush(stdout);
        return;
    }

    if((mconstructor = (*env)->GetMethodID(env, cjniexception, "<init>", "(ILjava/lang/String;)V")) == NULL) { 
        printf("Could not find constructor for JNIException\n"); fflush(stdout);
        return;
    }

    ojniexception = (*env)->NewObject(env, cjniexception, mconstructor, 
            errorno, (*env)->NewStringUTF(env, errorstr));


    (*env)->Throw(env, (jthrowable)ojniexception);

    (*env)->DeleteLocalRef(env, cjniexception);
}

void rh4n_jni_utils_throwSocketClosedException(JNIEnv *env) {
    jclass csocketclosedexception = NULL;
    jmethodID mconstructor = NULL;
    jobject osocketclosedexception = NULL;

    if((csocketclosedexception = (*env)->FindClass(env, "realHTML/jni/exceptions/SocketClosedException")) == NULL) {
        printf("Could not find SocketClosedException\n"); fflush(stdout);
        return;
    }

    if((mconstructor = (*env)->GetMethodID(env, csocketclosedexception, "<init>", "()V")) == NULL) { 
        printf("Could not find constructor for SocketClosedException\n"); fflush(stdout);
        return;
    }

    osocketclosedexception = (*env)->NewObject(env, csocketclosedexception, mconstructor);

    (*env)->Throw(env, (jthrowable)osocketclosedexception);

    (*env)->DeleteLocalRef(env, csocketclosedexception);
}
