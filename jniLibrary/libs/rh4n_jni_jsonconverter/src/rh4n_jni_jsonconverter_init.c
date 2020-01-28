#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

#include "jni.h"

#include "rh4n.h"
#include "rh4n_jni.h"
#include "rh4n_jni_jsonconverter.h"

void rh4n_jni_jsonconverter_getProperties(JNIEnv *env, struct rh4n_jni_JSONConverterProperties *props) {

    //ObjectSignature
    if((props->cObjectSignature = (*env)->FindClass(env, "realHTML/JSONConverter/signatures/ObjectSignature")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find class realHTML/JSONConverter/signatures/ObjectSignature");
        return;
    }

    if((props->mObjectSignature_getHead = (*env)->GetMethodID(env, props->cObjectSignature, "getHead", "()LrealHTML/JSONConverter/signatures/ObjectSignatureNode;")) == NULL) { rh4n_jni_utils_throwJNIException(env, -1, "Could not find function \"getHead\" in class realHTML/JSONConverter/signatures/ObjectSignature");
        return;
    }

    //ObjectSignatureNode
    if((props->cObjectSignatureNode = (*env)->FindClass(env, "realHTML/JSONConverter/signatures/ObjectSignatureNode")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find class realHTML/JSONConverter/signatures/ObjectSignatureNode");
        return;
    }

    if((props->fObjectSignature_name = (*env)->GetFieldID(env, props->cObjectSignatureNode, "name", "Ljava/lang/String;")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find field \"name\" in class realHTML/JSONConverter/signatures/ObjectSignatureNode");
        return;
    }

    if((props->fObjectSignature_vartype = (*env)->GetFieldID(env, props->cObjectSignatureNode, "vartype", "LrealHTML/JSONConverter/signatures/Types;")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find field \"vartype\" in class realHTML/JSONConverter/signatures/ObjectSignatureNode");
        return;
    }

    if((props->fObjectSignature_value = (*env)->GetFieldID(env, props->cObjectSignatureNode, "value", "Ljava/lang/Object;")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find field \"value\" in class realHTML/JSONConverter/signatures/ObjectSignatureNode");
        return;
    }

    if((props->fObjectSignature_arrsig = (*env)->GetFieldID(env, props->cObjectSignatureNode, "arrsig", "LrealHTML/JSONConverter/signatures/ArraySignature;")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find field \"arrsig\" in class realHTML/JSONConverter/signatures/ObjectSignatureNode");
        return;
    }

    if((props->fObjectSignature_next = (*env)->GetFieldID(env, props->cObjectSignatureNode, "next", "LrealHTML/JSONConverter/signatures/ObjectSignatureNode;")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find field \"next\" in class realHTML/JSONConverter/signatures/ObjectSignatureNode");
        return;
    }

    if((props->fObjectSignature_nextlvl = (*env)->GetFieldID(env, props->cObjectSignatureNode, "nextlvl", "LrealHTML/JSONConverter/signatures/ObjectSignatureNode;")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find field \"nextlvl\" in class realHTML/JSONConverter/signatures/ObjectSignatureNode");
        return;
    }

    //Types
    if((props->cTypes = (*env)->FindClass(env, "realHTML/JSONConverter/signatures/Types")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find class realHTML/JSONConverter/signatures/Types");
        return;
    }

    if((props->mTypes_getNumberRep = (*env)->GetMethodID(env, props->cTypes, "getNumberRep", "()I")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find function \"getNumberRep\" in class realHTML/JSONConverter/signatures/Types");
        return;
    }

    //ArraySignature
    if((props->cArraySignature = (*env)->FindClass(env, "realHTML/JSONConverter/signatures/ArraySignature")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find class realHTML/JSONConverter/signatures/ArraySignature");
        return;
    }

    if((props->fArraySignature_dimensions = (*env)->GetFieldID(env, props->cArraySignature, "dimensions", "S")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find field \"dimensions\" in class realHTML/JSONConverter/signatures/ArraySignature");
        return;
    }

    if((props->fArraySignature_vartype = (*env)->GetFieldID(env, props->cArraySignature, "vartype", "LrealHTML/JSONConverter/signatures/Types;")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find field \"vartype\" in class realHTML/JSONConverter/signatures/ArraySignature");
        return;
    }

    if((props->fArraySignature_length = (*env)->GetFieldID(env, props->cArraySignature, "length", "[I")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find field \"length\" in class realHTML/JSONConverter/signatures/ArraySignature");
        return;
    }

    //ArrayList
    if((props->cArrayList = (*env)->FindClass(env, "java/util/ArrayList")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find class java/util/ArrayList");
        return;
    }

    if((props->mArrayList_get = (*env)->GetMethodID(env, props->cArrayList, "get", "(I)Ljava/lang/Object;")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find function \"get\" in class java/util/ArrayList");
        return;
    }

    //Boolean
    if((props->cBoolean = (*env)->FindClass(env, "java/lang/Boolean")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find class java/lang/Boolean");
        return;
    }

    if((props->mBoolean_booleanValue = (*env)->GetMethodID(env, props->cBoolean, "booleanValue", "()Z")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find function \"booleanValue\" in class java/lang/Boolean");
        return;
    }

    //Integer
    if((props->cInteger = (*env)->FindClass(env, "java/lang/Integer")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find class java/lang/Integer");
        return;
    }

    if((props->mInteger_intValue = (*env)->GetMethodID(env, props->cInteger, "intValue", "()I")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find function \"intValue\" in class java/lang/Integer");
        return;
    }

    //Float
    if((props->cFloat = (*env)->FindClass(env, "java/lang/Float")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find class java/lang/Float");
        return;
    }

    if((props->mFloat_doubleValue = (*env)->GetMethodID(env, props->cFloat, "doubleValue", "()D")) == NULL) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not find function \"doubleValue\" in class java/lang/Float");
        return;
    }
  
}
