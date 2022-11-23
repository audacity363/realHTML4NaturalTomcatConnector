#ifndef RH4NJNIJSONCONVERTER
#define RH4NJNIJSONCONVERTER

#ifdef __cplusplus
extern "C" {
#endif

#include "rh4n_utils_namestack.h"

#define RH4NJNIVARTYPEOBJECT 0
#define RH4NJNIVARTYPESTRING 1
#define RH4NJNIVARTYPEBOOLEAN 2
#define RH4NJNIVARTYPEINT 3
#define RH4NJNIVARTYPEFLOAT 4
#define RH4NJNIVARTYPEARRAY 5
#define RH4NJNIVARTYPENULL 6

struct rh4n_jni_JSONConverterProperties {
    jclass cObjectSignature;
    jfieldID fObjectSignature_head;
    jmethodID mObjectSignature_getHead;

    jclass cObjectSignatureNode;
    jfieldID fObjectSignature_name;
    jfieldID fObjectSignature_vartype;
    jfieldID fObjectSignature_value;
    jfieldID fObjectSignature_arrsig;
    jfieldID fObjectSignature_next;
    jfieldID fObjectSignature_nextlvl;

    jclass cTypes;
    jmethodID mTypes_getNumberRep;

    jclass cArraySignature;
    jfieldID fArraySignature_dimensions;
    jfieldID fArraySignature_length;
    jfieldID fArraySignature_vartype;

    jclass cArrayList;
    jmethodID mArrayList_get;

    jclass cBoolean;
    jmethodID mBoolean_booleanValue;

    jclass cInteger;
    jmethodID mInteger_intValue;

    jclass cFloat;
    jmethodID mFloat_doubleValue;
};

struct rh4n_jni_ArraySignature {
    uint8_t dimensions;
    uint8_t vartype;
    int32_t length[3];
};

typedef struct {
    JNIEnv *env;
    struct rh4n_jni_JSONConverterProperties props;
    const char *currentName;
    RH4nVarList *varlist;
    rh4nNameStack namestack;
} RH4nJsonConverterArguments_t;

void rh4n_jni_jsonconverter_getProperties(JNIEnv *, struct rh4n_jni_JSONConverterProperties*);
void rh4n_jni_jsonconverter_freeProperties(JNIEnv *env, struct rh4n_jni_JSONConverterProperties *props);

void rh4n_jni_jsonconverter_dumpObjectSignature(JNIEnv*, jobject, RH4nVarList*);
void rh4n_jni_jsonconverter_dumpObjectSignatureNode(RH4nJsonConverterArguments_t*, jobject);

void rh4n_jni_jsonconverter_getArraySignature(RH4nJsonConverterArguments_t*, jobject, struct rh4n_jni_ArraySignature*);
void rh4n_jni_jsonconverter_dumpArray(RH4nJsonConverterArguments_t*, jobject, jobject);
void rh4n_jni_jsonconverter_dumpArrayEntry(RH4nJsonConverterArguments_t*, jobject, struct rh4n_jni_ArraySignature*, int32_t[3], uint8_t);

void rh4n_jni_jsonconverter_handleValue(RH4nJsonConverterArguments_t*, jint, jobject, int32_t[3]);
void rh4n_jni_jsonconverter_handleString(RH4nJsonConverterArguments_t*, jobject, int32_t[3]);
void rh4n_jni_jsonconverter_handleInt(RH4nJsonConverterArguments_t*, jobject, int32_t[3]);
void rh4n_jni_jsonconverter_handleBoolean(RH4nJsonConverterArguments_t*, jobject, int32_t[3]);
void rh4n_jni_jsonconverter_handleFloat(RH4nJsonConverterArguments_t*, jobject, int32_t[3]);

#ifdef __cplusplus
}
#endif
#endif
