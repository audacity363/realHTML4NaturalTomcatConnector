#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

#include "jni.h"

#include "rh4n.h"
#include "rh4n_jni.h"
#include "rh4n_jni_jsonconverter.h"

void rh4n_jni_jsonconverter_handleValue(RH4nJsonConverterArguments_t *args, jint vartype, jobject value, int32_t index[3]) {
    switch(vartype) {
        case RH4NJNIVARTYPESTRING:
            rh4n_jni_jsonconverter_handleString(args, value, index);
            break;
        case RH4NJNIVARTYPEINT:
            rh4n_jni_jsonconverter_handleInt(args, value, index);
            break;
        case RH4NJNIVARTYPEBOOLEAN:
            rh4n_jni_jsonconverter_handleBoolean(args, value, index);
            break;
        case RH4NJNIVARTYPEFLOAT:
            rh4n_jni_jsonconverter_handleFloat(args, value, index);
            break;
        case RH4NJNIVARTYPENULL:
            rh4n_jni_utils_throwJNIException(args->env, -1, "Vartype \"null\" currently not supported");
            return;
        default:
            rh4n_jni_utils_throwJNIException(args->env, -1, "Unkown vartype");
            return;
    }
}

void rh4n_jni_jsonconverter_handleString(RH4nJsonConverterArguments_t *args, jobject ovalue, int32_t index[3]) {
    char *value = NULL;
    int ret = 0;

    if((value = (*(args->env))->GetByteArrayElements(args->env, (jbyteArray)ovalue, NULL)) == NULL) {
        if((*(args->env))->ExceptionCheck(args->env)) { return; }
        rh4n_jni_utils_throwJNIException(args->env, -1, "Bytearray returned NULL");
        return;
    }

    if(index == NULL) {
        printf("Create String with: [%s]\n", value);
        ret = rh4nvarCreateNewString_m(args->varlist, args->namestack.names, args->currentName, value);
    } else {
        ret = rh4nvarSetStringArrayEntry_m(args->varlist, args->namestack.names, args->currentName, index, value);
    }

    if(ret != RH4N_RET_OK) {
        rh4n_jni_utils_throwJNIException(args->env, ret, "Could not set string");
    }
}

void rh4n_jni_jsonconverter_handleInt(RH4nJsonConverterArguments_t *args, jobject ovalue, int32_t index[3]) {
    jint value = 0;
    int ret = 0;

    value = (*(args->env))->CallIntMethod(args->env, ovalue, args->props.mInteger_intValue);
    if((*(args->env))->ExceptionCheck(args->env)) { return; }

    if(index == NULL) {
        ret = rh4nvarCreateNewInt_m(args->varlist, args->namestack.names, args->currentName, value);
    } else {
        ret = rh4nvarSetIntArrayEntry_m(args->varlist, args->namestack.names, args->currentName, index, value);
    }

    if(ret != RH4N_RET_OK) {
        rh4n_jni_utils_throwJNIException(args->env, ret, "Could not set integer");
    }
}

void rh4n_jni_jsonconverter_handleBoolean(RH4nJsonConverterArguments_t *args, jobject ovalue, int32_t index[3]) {
    jboolean value = false;
    int ret = 0;
    
    value = (*(args->env))->CallBooleanMethod(args->env, ovalue, args->props.mBoolean_booleanValue);
    if((*(args->env))->ExceptionCheck(args->env)) { return; }

    if(index == NULL) {
        ret = rh4nvarCreateNewBool_m(args->varlist, args->namestack.names, args->currentName, value);
    } else {
        ret = rh4nvarSetBoolArrayEntry_m(args->varlist, args->namestack.names, args->currentName, index, value);
    }

    if(ret != RH4N_RET_OK) {
        rh4n_jni_utils_throwJNIException(args->env, ret, "Could not set boolean");
        return;
    }
}

void rh4n_jni_jsonconverter_handleFloat(RH4nJsonConverterArguments_t *args, jobject ovalue, int32_t index[3]) {
    jdouble value = 0;
    int ret = 0;

    value = (*(args->env))->CallDoubleMethod(args->env, ovalue, args->props.mFloat_doubleValue);
    if((*(args->env))->ExceptionCheck(args->env)) { return; }

    if(index == NULL) {
        ret = rh4nvarCreateNewFloat_m(args->varlist, args->namestack.names, args->currentName, value);
    } else {
        ret = rh4nvarSetIntArrayEntry_m(args->varlist, args->namestack.names, args->currentName, index, value);
    }

    if(ret != RH4N_RET_OK) {
        rh4n_jni_utils_throwJNIException(args->env, ret, "Could not set float");
        return;
    }
}
