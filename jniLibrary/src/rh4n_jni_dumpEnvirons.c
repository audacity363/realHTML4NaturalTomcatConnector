#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

#include "jni.h"

#include "rh4n.h"
#include "rh4n_jni.h"

void rh4n_jni_dumpEnviromentVariables(JNIEnv *env, jobjectArray oenvirons, rh4n_jni_environs *environs) {
    jsize environlength = 0, i = 0;
    jobject otarget = NULL;
    char errorstr[500];
    struct rh4n_jni_environProperties props; memset(&props, 0x00, sizeof(props));

    if(oenvirons == NULL) { return; }

    rh4n_jni_getEnviromentVarProperties(env, &props);
    if((*env)->ExceptionCheck(env)) { return; }

    environlength = (*env)->GetArrayLength(env, oenvirons);
    if((*env)->ExceptionCheck(env)) { return; }

    if((environs->environs = calloc(environlength, sizeof(struct rh4n_jni_environ))) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not allocate memory for enviroment variables array");
        return;
    }

    for(; i < environlength; i++) {
        if((otarget = (*env)->GetObjectArrayElement(env, oenvirons, i)) == NULL) {
            free(environs->environs);
            sprintf(errorstr, "Environ on index %d is NULL", i);
            rh4n_jni_utils_throwJNIException(env, -1, errorstr);
            return;
        }

        rh4n_jni_dumpEnviromentVariable(env, otarget, &environs->environs[i], &props);
        if((*env)->ExceptionCheck(env)) { return; }
    }
    return;
}

void rh4n_jni_dumpEnviromentVariable(JNIEnv *env, jobject otarget, struct rh4n_jni_environ *environ, struct rh4n_jni_environProperties *props) {
    const char *javaValue = NULL;
    jobject ojavaValue = NULL;
    jclass cEnvironmentVar = NULL;
    char errorstr[500];
    uint8_t i = 0;
    jboolean jappend = JNI_FALSE;

    struct environLookup {
        const char *name;
        jfieldID targetField;
        void *data;
    } lookup[] = {
        {"name", props->fname, &environ->name},
        {"value", props->fvalue, &environ->value}
    };

    for(; i < sizeof(lookup)/sizeof(struct environLookup); i++) {
        if((ojavaValue = (*env)->GetObjectField(env, otarget, lookup[i].targetField)) == NULL) {
            sprintf(errorstr, "Field \"%s\" in class realHTML/tomcat/environment/EnvironmentVar is NULL", lookup[i].name);
            rh4n_jni_utils_throwJNIException(env, -1, errorstr);
            return;
        }

        if((javaValue = (*env)->GetStringUTFChars(env, ojavaValue, NULL)) == NULL) {
            sprintf(errorstr, "Field \"%s\" in class realHTML/tomcat/environment/EnvironmentVar is NULL", lookup[i].name);
            rh4n_jni_utils_throwJNIException(env, -1, errorstr);
            return;
        }

        if((*((void**)lookup[i].data) = malloc(strlen(javaValue)+1)) == NULL) {
            sprintf(errorstr, "Could not allocate memory for enviroment var %s", lookup[i].name);
            rh4n_jni_utils_throwJNIException(env, -1, errorstr);
            (*env)->ReleaseStringUTFChars(env, ojavaValue, javaValue);
            return;
        }

        strcpy(*((void**)lookup[i].data), javaValue);

        (*env)->ReleaseStringUTFChars(env, ojavaValue, javaValue);
    }

    jappend = (*env)->GetBooleanField(env, ojavaValue, props->fappend);
    if((*env)->ExceptionCheck(env)) { return; }

    environ->append = jappend == JNI_TRUE ? 1 : 0;
    return;
}

void rh4n_jni_getEnviromentVarProperties(JNIEnv *env, struct rh4n_jni_environProperties *props) {
    if((props->cEnviromentVar = (*env)->FindClass(env, "realHTML/tomcat/environment/EnvironmentVar")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find class realHTML/tomcat/environment/EnvironmentVar");
        return;
    }

    if((props->fname = (*env)->GetFieldID(env, props->cEnviromentVar, "name", "Ljava/lang/String;")) == NULL){
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find field \"name\" in class realHTML/tomcat/environment/EnvironmentVar");
        return;
    }

    if((props->fvalue = (*env)->GetFieldID(env, props->cEnviromentVar, "value", "Ljava/lang/String;")) == NULL){
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find field \"value\" in class realHTML/tomcat/environment/EnvironmentVar");
        return;
    }


    if((props->fappend = (*env)->GetFieldID(env, props->cEnviromentVar, "append", "Z")) == NULL){
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find field \"append\" in class realHTML/tomcat/environment/EnvironmentVar");
        return;
    }
    return;
}
