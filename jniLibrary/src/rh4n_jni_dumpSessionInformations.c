#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

#include "jni.h"

#include "rh4n.h"
#include "rh4n_jni.h"

void rh4n_jni_dumpSessionInformations(JNIEnv *env, jobject osessionInformations, RH4nProperties *props) {
    jclass cSessionInformations = NULL;
    jfieldID targetField = NULL;
    uint32_t i = 0;
    char errorstr[500];

    struct dumpSessionInformationsLookup lookup[] = {
        {"natlibrary", "Ljava/lang/String;", props->natlibrary, sizeof(props->natlibrary)},
        {"natprogram", "Ljava/lang/String;", props->natprogram, sizeof(props->natprogram)},
        {"natsrcpath", "Ljava/lang/String;", &props->natsrcpath, 0},
        {"natparms", "Ljava/lang/String;", &props->natparms, 0},
        {"logpath", "Ljava/lang/String;", &props->logpath, 0},
        {"loglevel", "Ljava/lang/String;", props->c_loglevel, sizeof(props->c_loglevel)},
        {"outputfile", "Ljava/lang/String;", &props->outputfile, 0},
        {"username", "Ljava/lang/String;", props->username, sizeof(props->username)},
        {"mode", "I", &props->mode, 255}
    };

    if((cSessionInformations = (*env)->FindClass(env, "realHTML/jni/SessionInformations")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find class realHTML/jni/SessionInformations");
        return;
    }

    for(; i < sizeof(lookup)/sizeof(struct dumpSessionInformationsLookup); i++) {
        if((targetField = (*env)->GetFieldID(env, cSessionInformations, lookup[i].name, lookup[i].javaType)) == NULL) {
            sprintf(errorstr, "Could not find field \"%s\" in class realHTML/jni/SessionInformations", lookup[i].name);
            rh4n_jni_utils_throwJNIException(env, -1, errorstr);
            return;
        }

        if(strcmp(lookup[i].javaType, "Ljava/lang/String;") == 0){
            rh4n_jni_dumpSessionInformations_handleString(env, osessionInformations, targetField, &lookup[i]);
        } else if(strcmp(lookup[i].javaType, "I") == 0) {
            rh4n_jni_dumpSessionInformations_handleInt(env, osessionInformations, targetField, &lookup[i]);
        }
        if((*env)->ExceptionCheck(env)) { return; } 
    }
}

void rh4n_jni_dumpSessionInformations_handleString(JNIEnv *env, jobject osessionInformations, jfieldID targetField, struct dumpSessionInformationsLookup *lookupEntry) {
    const char *javaValue = NULL;
    jobject otargetData = NULL;
    char errorstr[500];

    if((otargetData = (*env)->GetObjectField(env, osessionInformations, targetField)) == NULL) {
        sprintf(errorstr, "Field \"%s\" in class realHTML/jni/SessionInformations is NULL", lookupEntry->name);
        rh4n_jni_utils_throwJNIException(env, -1, errorstr);
        return;
    }
    if((*env)->ExceptionCheck(env)) { return; }

    if((javaValue = (*env)->GetStringUTFChars(env, (jstring)otargetData, NULL)) == NULL)  {
        sprintf(errorstr, "String in field \"%s\" in class realHTML/jni/SessionInformations is NULL", lookupEntry->name);
        rh4n_jni_utils_throwJNIException(env, -1, errorstr);
        return;
    }
    if((*env)->ExceptionCheck(env)) { return; }

    if(lookupEntry->length > 0) {
        if(strlen(javaValue) >= lookupEntry->length) {
            sprintf(errorstr, "String in field \"%s\" in class realHTML/jni/SessionInformations exceeds it's max length [%ld/%d]", lookupEntry->name, strlen(javaValue)+1, lookupEntry->length);
            rh4n_jni_utils_throwJNIException(env, -1, errorstr);
            (*env)->ReleaseStringUTFChars(env, otargetData, javaValue);
            return;
        }

        strncpy(lookupEntry->data, javaValue, lookupEntry->length-1);
    } else {
        if((*((void**)lookupEntry->data) = malloc(strlen(javaValue)+1)) == NULL) {
            sprintf(errorstr, "Could not allocate memory for field \"%s\" in class realHTML/jni/SessionInformations", lookupEntry->name);
            rh4n_jni_utils_throwJNIException(env, -1, errorstr);
            (*env)->ReleaseStringUTFChars(env, otargetData, javaValue);
            return;
        }

        strcpy(*((void**)lookupEntry->data), javaValue);
        
    }

    (*env)->ReleaseStringUTFChars(env, otargetData, javaValue);
}

void rh4n_jni_dumpSessionInformations_handleInt(JNIEnv *env, jobject osessionInformations, jfieldID targetField, struct dumpSessionInformationsLookup *lookupEntry) {
    jint javaValue = 0;
    char errorstr[500];

    javaValue = (*env)->GetIntField(env, osessionInformations, targetField);

    if(javaValue > lookupEntry->length) {
        sprintf(errorstr, "Integer in field \"%s\" in class realHTML/jni/SessionInformations exceeds it's max value [%d/%d]", lookupEntry->name, javaValue, lookupEntry->length);
        rh4n_jni_utils_throwJNIException(env, -1, errorstr);
        return;
    }

    *((uint8_t*)lookupEntry->data) = javaValue;
}
