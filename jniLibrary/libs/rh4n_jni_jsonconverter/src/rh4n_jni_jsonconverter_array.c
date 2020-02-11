#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

#include "jni.h"

#include "rh4n.h"
#include "rh4n_jni.h"
#include "rh4n_jni_jsonconverter.h"

void rh4n_jni_jsonconverter_getArraySignature(RH4nJsonConverterArguments_t *args, jobject node, struct rh4n_jni_ArraySignature *arrsig) {
    jobject oarraysignature = NULL, ovartype = NULL, olength = NULL;
    int *length = NULL;

    if((oarraysignature = (*(args->env))->GetObjectField(args->env, node, args->props.fObjectSignature_arrsig)) == NULL) {
        if((*(args->env))->ExceptionCheck(args->env)) { return; }
        rh4n_jni_utils_throwJNIException(args->env, -1, "Field \"arrsig\" is null");
        return;
    }

    if((ovartype = (*(args->env))->GetObjectField(args->env, oarraysignature, args->props.fArraySignature_vartype)) == NULL) {
        if((*(args->env))->ExceptionCheck(args->env)) { return; }
        rh4n_jni_utils_throwJNIException(args->env, -1, "Field \"vartype\" in ArraySignature is null");
        return;
    }

    arrsig->vartype = (*(args->env))->CallIntMethod(args->env, ovartype, args->props.mTypes_getNumberRep);
    if((*(args->env))->ExceptionCheck(args->env)) { return; }

    printf("God vartype from array signature: [%d]\n", arrsig->vartype);

    arrsig->dimensions = (*(args->env))->GetShortField(args->env, oarraysignature, args->props.fArraySignature_dimensions);
    if((*(args->env))->ExceptionCheck(args->env)) { return; }

    if((olength = (*(args->env))->GetObjectField(args->env, oarraysignature, args->props.fArraySignature_length)) == NULL) {
        if((*(args->env))->ExceptionCheck(args->env)) { return; }
        rh4n_jni_utils_throwJNIException(args->env, -1, "Field \"length\" in ArraySignature is null");
        return;
    }

    if((length = (*(args->env))->GetIntArrayElements(args->env, olength, NULL)) == NULL) {
        if((*(args->env))->ExceptionCheck(args->env)) { return; }
        rh4n_jni_utils_throwJNIException(args->env, -1, "Field \"length\" in ArraySignature is null");
        return;
    }

    memcpy(arrsig->length, length, sizeof(int32_t)*3);
    (*(args->env))->ReleaseIntArrayElements(args->env, olength, length, JNI_ABORT);
}

void rh4n_jni_jsonconverter_dumpArray(RH4nJsonConverterArguments_t *args, jobject node, jobject ovalue) {
    struct rh4n_jni_ArraySignature arrsig; memset(&arrsig, 0x00, sizeof(arrsig));
    int32_t index[3] = {-1, -1, -1};
    int ret = 0;

    rh4n_jni_jsonconverter_getArraySignature(args, node, &arrsig);
    if((*(args->env))->ExceptionCheck(args->env)) { return; }

    switch(arrsig.vartype) {
        case RH4NJNIVARTYPEINT:
            ret = rh4nvarCreateNewIntArray_m(args->varlist, (const char**)args->namestack.names, args->currentName, arrsig.dimensions, arrsig.length);
            break;
        case RH4NJNIVARTYPEBOOLEAN:
            ret = rh4nvarCreateNewBoolArray_m(args->varlist, (const char**)args->namestack.names, args->currentName, arrsig.dimensions, arrsig.length);
            break;
        case RH4NJNIVARTYPESTRING:
            ret = rh4nvarCreateNewStringArray_m(args->varlist, (const char**)args->namestack.names, args->currentName, arrsig.dimensions, arrsig.length);
            break;
        case RH4NJNIVARTYPEFLOAT:
            ret = rh4nvarCreateNewFloatArray_m(args->varlist, (const char**)args->namestack.names, args->currentName, arrsig.dimensions, arrsig.length);
            break;
        case RH4NJNIVARTYPENULL:
            ret = rh4nvarCreateNewNullArray_m(args->varlist, (const char**)args->namestack.names, args->currentName, arrsig.dimensions, arrsig.length);
            break;
        default:
            rh4n_jni_utils_throwJNIException(args->env, -1, "Could not create new array - unkown vartype");
            printf("Vartype: [%d]\n", arrsig.vartype);
            return;
    }
    if(ret != RH4N_RET_OK) {
        rh4n_jni_utils_throwJNIException(args->env, ret, "Could not create new array");
        return;
    }

    if(arrsig.vartype == RH4NJNIVARTYPENULL) {
        return;
    }

    rh4n_jni_jsonconverter_dumpArrayEntry(args, ovalue, &arrsig,  index, 1);
}

void rh4n_jni_jsonconverter_dumpArrayEntry(RH4nJsonConverterArguments_t *args, jobject ovalue, struct rh4n_jni_ArraySignature *arrsig, int32_t index[3], uint8_t  curdim) {
    jobject entry = NULL;
    char errorstr[100];

    for(index[curdim-1] = 0; index[curdim-1] < arrsig->length[curdim-1]; index[curdim-1]++) {
        if((entry = (*(args->env))->CallObjectMethod(args->env, ovalue, args->props.mArrayList_get, index[curdim-1])) == NULL) {
            if((*(args->env))->ExceptionCheck(args->env)) { return; }
            sprintf(errorstr, "Index x: %d y: %d z: %d of array is null", index[0], index[1], index[2]);
            rh4n_jni_utils_throwJNIException(args->env, -1, errorstr);
            return;
        }

        if(curdim < arrsig->dimensions) {
            rh4n_jni_jsonconverter_dumpArrayEntry(args, entry, arrsig, index, curdim+1);
            if((*(args->env))->ExceptionCheck(args->env)) { return; }
            continue;
        }

        rh4n_jni_jsonconverter_handleValue(args, arrsig->vartype, entry, index);
    }
    index[curdim-1] = -1;

}


