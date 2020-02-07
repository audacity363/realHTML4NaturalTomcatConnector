#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <string.h>

#include "jni.h"

#include "rh4n.h"
#include "rh4n_jni.h"
#include "rh4n_jni_jsonconverter.h"
#include "rh4n_utils.h"

JNIEXPORT int JNICALL Java_realHTML_jni_JNI_jni_1startNaturalPlain(JNIEnv *env, jclass *in_class, jobject osessionInformations, jobject ohttpMethod, jobject onatbin, jobjectArray oenvirons, jobject ourlvars, jobject obodyvars) {
    RH4nProperties props; memset(&props, 0x00, sizeof(props));
    rh4n_jni_environs environs; memset(&environs, 0x00, sizeof(environs));
    const char *javaValue = NULL;
    char *realHTML4Naturalexe = NULL, *serverPath = NULL, errorstr[500];
    uint32_t execPathLength = 0;

    rh4n_jni_dumpSessionInformations(env, osessionInformations, &props);
    if((*env)->ExceptionCheck(env)) { return(1); }

    if((props.i_loglevel = rh4nLoggingConvertStrtoInt(props.c_loglevel)) < 0) {
        rh4n_jni_utils_throwJNIException(env, -1, "Unkown loglevel");
        return(1);
    }

    if((props.logging = rh4nLoggingCreateStreamingRule(props.natlibrary, props.natprogram, props.i_loglevel, props.logpath)) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not create new log rule");
        return(1);
    }

    if(ohttpMethod == NULL || (javaValue = (*env)->GetStringUTFChars(env, (jstring)ohttpMethod, NULL)) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Field \"httpMethod\" is NULL");
        return(1);
    }
    if((*env)->ExceptionCheck(env)) { return(1); }

    if(strlen(javaValue) >= sizeof(props.httpreqtype)) {
        sprintf(errorstr, "String in field \"httpMethod\" exceeds it's max length [%ld/%ld]", strlen(javaValue)+1, sizeof(props.httpreqtype));
        rh4n_jni_utils_throwJNIException(env, -1, errorstr);
        return(1);
    }

    strcpy(props.httpreqtype, javaValue);
    (*env)->ReleaseStringUTFChars(env, ohttpMethod, javaValue);

    rh4n_jni_dumpEnviromentVariables(env, oenvirons, &environs);
    if((*env)->ExceptionCheck(env)) { return(1); }

    if(ourlvars != NULL) {
        rh4n_jni_jsonconverter_dumpObjectSignature(env, ourlvars, &props.urlvars);
        if((*env)->ExceptionCheck(env)) {
            (*env)->ReleaseStringUTFChars(env, onatbin, javaValue);
            return(1);
        }
    }

    if(obodyvars != NULL) {
        rh4n_jni_jsonconverter_dumpObjectSignature(env, obodyvars, &props.bodyvars);
        if((*env)->ExceptionCheck(env)) {
            (*env)->ReleaseStringUTFChars(env, onatbin, javaValue);
            return(1);
        }
    }

    rh4n_jni_startupNatural(env, onatbin, &props);

    rh4nUtilsFreeProperties(&props);

    return(0);
}
