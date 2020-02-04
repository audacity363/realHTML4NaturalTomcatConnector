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
    jobject otargetData;
    uint32_t i = 0;
    char errorstr[500];
    const char *javaValue = NULL;

    struct dumpSessionInformationsLookup {
        const char *name;
        const char *javaType;
        void *data;
        uint32_t length;
    } lookup[] = {
        {"natlibrary", "Ljava/lang/String;", props->natlibrary, sizeof(props->natlibrary)},
        {"natprogram", "Ljava/lang/String;", props->natprogram, sizeof(props->natprogram)},
        {"natsrcpath", "Ljava/lang/String;", &props->natsrcpath, 0},
        {"natparms", "Ljava/lang/String;", &props->natparms, 0},
        {"logpath", "Ljava/lang/String;", &props->logpath, 0},
        {"loglevel", "Ljava/lang/String;", props->c_loglevel, sizeof(props->c_loglevel)},
        {"outputfile", "Ljava/lang/String;", &props->outputfile, 0},
        {"username", "Ljava/lang/String;", props->username, sizeof(props->username)}
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
       
        if((otargetData = (*env)->GetObjectField(env, osessionInformations, targetField)) == NULL) {
            sprintf(errorstr, "Field \"%s\" in class realHTML/jni/SessionInformations is NULL", lookup[i].name);
            rh4n_jni_utils_throwJNIException(env, -1, errorstr);
            return;
        }
        if((*env)->ExceptionCheck(env)) { return; } 
        if((javaValue = (*env)->GetStringUTFChars(env, (jstring)otargetData, NULL)) == NULL)  {
            sprintf(errorstr, "String in field \"%s\" in class realHTML/jni/SessionInformations is NULL", lookup[i].name);
            rh4n_jni_utils_throwJNIException(env, -1, errorstr);
            return;
        }
        if((*env)->ExceptionCheck(env)) { return; }

        if(lookup[i].length > 0) {
            if(strlen(javaValue) >= lookup[i].length) {
                sprintf(errorstr, "String in field \"%s\" in class realHTML/jni/SessionInformations exceeds it's max length [%ld/%d]", lookup[i].name, strlen(javaValue)+1, lookup[i].length);
                rh4n_jni_utils_throwJNIException(env, -1, errorstr);
                (*env)->ReleaseStringUTFChars(env, otargetData, javaValue);
                return;
            }

            strncpy(lookup[i].data, javaValue, lookup[i].length-1);
        } else {
            if((*((void**)lookup[i].data) = malloc(strlen(javaValue)+1)) == NULL) {
                sprintf(errorstr, "Could not allocate memory for field \"%s\" in class realHTML/jni/SessionInformations", lookup[i].name);
                rh4n_jni_utils_throwJNIException(env, -1, errorstr);
                (*env)->ReleaseStringUTFChars(env, otargetData, javaValue);
                return;
            }

            strcpy(*((void**)lookup[i].data), javaValue);
            
        }

        (*env)->ReleaseStringUTFChars(env, otargetData, javaValue);
    }
}
