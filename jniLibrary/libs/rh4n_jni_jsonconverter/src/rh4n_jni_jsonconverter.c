#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

#include "jni.h"

#include "rh4n.h"
#include "rh4n_jni.h"
#include "rh4n_jni_jsonconverter.h"

void rh4n_jni_jsonconverter_dumpObjectSignature(JNIEnv *env, jobject sig, RH4nVarList *varlist) {
    RH4nJsonConverterArguments_t args; memset(&args, 0x00, sizeof(RH4nJsonConverterArguments_t));
    jobject head = NULL;

    args.env = env;
    args.varlist = varlist;

    rh4nUtilsInitNameStack(&args.namestack);

    rh4n_jni_jsonconverter_getProperties(env, &args.props);
    if((*env)->ExceptionCheck(env)) { return; }

    if((head = (*env)->CallObjectMethod(env, sig, args.props.mObjectSignature_getHead)) == NULL) {
        if((*env)->ExceptionCheck(env)) { return; }
        rh4n_jni_utils_throwJNIException(env, -1, "Could not get head from signature");
        return;
    }

    rh4n_jni_jsonconverter_dumpObjectSignatureNode(&args, head);

    rh4nUtilsDeinitNameStack(&args.namestack);
}

void rh4n_jni_jsonconverter_dumpObjectSignatureNode(RH4nJsonConverterArguments_t *args, jobject node) {
    jobject oname = NULL, ovalue = NULL, ovartype = NULL, onextlvl = NULL;
    const char *name = NULL;
    jint vartype = 0;
    int ret = 0;

    while (node != NULL) {
        if((oname = (*(args->env))->GetObjectField(args->env, node, args->props.fObjectSignature_name)) == NULL) {
            if((*(args->env))->ExceptionCheck(args->env)) { return; }
            
            rh4n_jni_utils_throwJNIException(args->env, -1, "Field \"name\" is null");
            return;
        }

        if((name = (*(args->env))->GetStringUTFChars(args->env, (jstring)oname, NULL)) == NULL) {
            return;
        }
        args->currentName = name;

        if((ovartype = (*(args->env))->GetObjectField(args->env, node, args->props.fObjectSignature_vartype)) == NULL) {
            if((*(args->env))->ExceptionCheck(args->env)) { return; }
            rh4n_jni_utils_throwJNIException(args->env, -1, "Field \"vartype\" is null");
            return;
        }
    
        vartype = (*(args->env))->CallIntMethod(args->env, ovartype, args->props.mTypes_getNumberRep);
        if((*(args->env))->ExceptionCheck(args->env)) { return; }

        ovalue = (*(args->env))->GetObjectField(args->env, node, args->props.fObjectSignature_value);
        if(ovalue == NULL && vartype != RH4NJNIVARTYPEOBJECT) {
            if((*(args->env))->ExceptionCheck(args->env)) { return; }
            rh4n_jni_utils_throwJNIException(args->env, -1, "Field \"value\" is null");
            return;
        }

        if(vartype == RH4NJNIVARTYPEARRAY) {
            rh4n_jni_jsonconverter_dumpArray(args, node, ovalue);
            if((*(args->env))->ExceptionCheck(args->env)) { return; }
        } else if (vartype == RH4NJNIVARTYPEOBJECT) {
            onextlvl = (*(args->env))->GetObjectField(args->env, node, args->props.fObjectSignature_nextlvl);
            if((*(args->env))->ExceptionCheck(args->env)) { return; }
            
            if(onextlvl != NULL) {
                if((ret = rh4nvarCreateNewGroup_m(args->varlist, (const char**)args->namestack.names, name)) != RH4N_RET_OK) {
                    (*(args->env))->ReleaseStringUTFChars(args->env, (jstring)oname, name);
                    rh4n_jni_utils_throwJNIException(args->env, ret, "Could not create new group in varlist");
                    return;
                }

                if(rh4nUtilsPushNametoStack(&args->namestack, name) == NULL) {
                    (*(args->env))->ReleaseStringUTFChars(args->env, (jstring)oname, name);
                    rh4n_jni_utils_throwJNIException(args->env, -1, "Could not push new name to stack");
                    return;
                }

                rh4n_jni_jsonconverter_dumpObjectSignatureNode(args, onextlvl);
                if((*(args->env))->ExceptionCheck(args->env)) {
                    (*(args->env))->ReleaseStringUTFChars(args->env, (jstring)oname, name);
                    return;
                }

                free(rh4nUtilsPopNamefromStack(&args->namestack));
            }
        } else {
            rh4n_jni_jsonconverter_handleValue(args, vartype, ovalue, NULL);
            if((*(args->env))->ExceptionCheck(args->env)) { return; }
        }

        (*(args->env))->ReleaseStringUTFChars(args->env, (jstring)oname, name);

        node = (*(args->env))->GetObjectField(args->env, node, args->props.fObjectSignature_next);
        if((*(args->env))->ExceptionCheck(args->env)) { return; }
    }
}
