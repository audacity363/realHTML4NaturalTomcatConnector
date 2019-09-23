#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>

#include "jni.h"

#include "rh4n.h"
#include "rh4n_jni_javaParmReadout.h"

int rh4nReadOutParms(JNIEnv *env, jobject jnatparams, RH4nProperties *properties, char **natbinpath, char *error_str) {
    struct javaParm parms[] = {
        {"reqType", "Ljava/lang/String;", rh4nParmReqTypeHandler},
        {"natLibrary", "Ljava/lang/String;", rh4nParmNatLibraryHandler},
        {"natProgram", "Ljava/lang/String;", rh4nParmNatProgramHandler},
        {"natparms", "Ljava/lang/String;", rh4nParmNatParmsHandler},
        {"natbinpath", "Ljava/lang/String;", rh4nParmNatbinpathHandler },
        {"outputfile", "Ljava/lang/String;", rh4nParmOutputfileHandler},
        {"loglevel", "Ljava/lang/String;", rh4nParmLoglevelHandler},
        {"natsrcpath", "Ljava/lang/String;", rh4nParmNatSrcPathHandler},
        {"logpath", "Ljava/lang/String;", rh4nParmLogPathHandler},
        {"errorRepresentation", "Ljava/lang/String;", rh4nParmErrorRepresentationHandler},
        {"username", "Ljava/lang/String;", rh4nParmUsernameHandler}
    };
    int (*targethandler)(JNIEnv*, const char*, RH4nProperties*, char*);
    int i = 0, ret = 0;
    jclass jcrh4nparams;
    jfieldID jfid;
    jobject target;
    const char *strvalue = NULL;


    jcrh4nparams = (*env)->GetObjectClass(env, jnatparams);
    if(jcrh4nparams == NULL) {
        sprintf(error_str, "Could not get Class from parms");
        return(RH4N_RET_JNI_ERR);
    }

    for(; i < sizeof(parms)/sizeof(struct javaParm); i++) {

        //fprintf(stderr, "Search for [%s] type [%s]\n", parms[i].jname, parms[i].jtype); fflush(stderr);
        jfid = (*env)->GetFieldID(env, jcrh4nparams, parms[i].jname, parms[i].jtype);

        if(jfid == NULL) {
            sprintf(error_str, "Could not get field ID from field [%s]", parms[i].jname);
            return(RH4N_RET_JNI_ERR);
        }

        if((target = (*env)->GetObjectField(env, jnatparams, jfid)) == NULL) {
            sprintf(error_str, "Could not get field [%s]", parms[i].jname);
            return(RH4N_RET_JNI_ERR);
        }
        if((strvalue = (*env)->GetStringUTFChars(env, (jstring)target, NULL)) == NULL) {
            sprintf(error_str, "Field [%s] == NULL", parms[i].jname);
            return(RH4N_RET_JNI_ERR);
        }

        if(strcmp(parms[i].jname, "natbinpath") == 0) {
            //Special handler for the natbinpath beacause it doesn't have an entry in the properties
            ret = parms[i].handler(env, strvalue, (RH4nProperties*)natbinpath, error_str);
        } else {
            ret = parms[i].handler(env, strvalue, properties, error_str);
        }

        if(ret != RH4N_RET_OK) {
            (*env)->ReleaseStringUTFChars(env, (jstring)target, strvalue);
            return(ret);
        }

        (*env)->ReleaseStringUTFChars(env, (jstring)target, strvalue);

    }
    if((ret = rh4NUrlVariableHandler(env, jcrh4nparams, jnatparams, properties, error_str)) != RH4N_RET_OK) { return(ret); }
        
    return(RH4N_RET_OK);
}

int rh4NUrlVariableHandler(JNIEnv *env, jclass jcrh4nparms, jobject jorh4nparms, RH4nProperties *properties, char *error_str) {
    jfieldID jfvariables = NULL, jfkey = NULL, jfvalue = NULL;
    jobject jovariables = NULL, joentry = NULL, jokey = NULL, jovalue = NULL;
    jclass jcArrayList = NULL, jcUrlVariable;
    jmethodID jmSize = NULL, jmGet = NULL;
    jint arrayLength = 0;
    jbyteArray bAkey = NULL, bAvalue = NULL;
    int i = 0, rc = 0;
    char *key = NULL, *value = NULL;


    if((jfvariables = (*env)->GetFieldID(env, jcrh4nparms, "urlvars", "Ljava/util/ArrayList;")) == NULL) {
        return(RH4N_RET_JNI_ERR);
    }

    if((jovariables = (*env)->GetObjectField(env, jorh4nparms, jfvariables)) == NULL) {
        return(RH4N_RET_OK);
    }

    if((jcArrayList = (*env)->FindClass(env, "java/util/ArrayList")) == NULL) {
        return(RH4N_RET_JNI_ERR);
    }

    if((jmSize = (*env)->GetMethodID(env, jcArrayList, "size", "()I")) == NULL) {
        return(RH4N_RET_JNI_ERR);
    }

    if((jmGet = (*env)->GetMethodID(env, jcArrayList, "get", "(I)Ljava/lang/Object;")) == NULL) {
        return(RH4N_RET_JNI_ERR);
    }

    if((jcUrlVariable = (*env)->FindClass(env, "realHTML/tomcat/connector/RH4NParams$UrlVariable")) == NULL) {
        return(RH4N_RET_JNI_ERR);
    }

    if((jfkey = (*env)->GetFieldID(env, jcUrlVariable, "key", "[B")) == NULL) {
        return(RH4N_RET_JNI_ERR);
    }

    if((jfvalue = (*env)->GetFieldID(env, jcUrlVariable, "value", "[B")) == NULL) {
        return(RH4N_RET_JNI_ERR);
    }

    rh4nvarInitList(&properties->urlvars);

    arrayLength = (*env)->CallIntMethod(env, jovariables, jmSize);


    for(; i < arrayLength; i++) {
        if((joentry = (*env)->CallObjectMethod(env, jovariables, jmGet, i)) == NULL) {
            return(RH4N_RET_JNI_ERR);
        }

        if((bAkey = (jbyteArray)(*env)->GetObjectField(env, joentry, jfkey)) == NULL) {
            return(RH4N_RET_JNI_ERR);
        }

        if((bAvalue = (jbyteArray)(*env)->GetObjectField(env, joentry, jfvalue)) == NULL) {
            return(RH4N_RET_JNI_ERR);
        }

        key = (*env)->GetByteArrayElements(env, bAkey, NULL);
        value = (*env)->GetByteArrayElements(env, bAvalue, NULL);

        if((rc = rh4nvarCreateNewString(&properties->urlvars, NULL, key, value)) != RH4N_RET_OK) {
            sprintf(error_str, "Could not create new String [%s]. Varlib return: %d\n", key, rc);
            rh4n_log_error(properties->logging, "%s", error_str);
            (*env)->ReleaseByteArrayElements(env, bAkey, key, JNI_ABORT);
            (*env)->ReleaseByteArrayElements(env, bAvalue, value, JNI_ABORT);
            return(rc);
        }
        (*env)->ReleaseByteArrayElements(env, bAkey, key, JNI_ABORT);
        (*env)->ReleaseByteArrayElements(env, bAvalue, value, JNI_ABORT);
    }

    return(RH4N_RET_OK);

#if 0
    jfieldID jfnames = NULL, jfvalues = NULL;
    jbyteArray jonames = NULL, jovalues = NULL, joname = NULL, jovalue = NULL, keyEntry = NULL, valueEntry = NULL;
    jint jnameslength = 0, jvalueslength = 0;

    const char *cname = NULL, *cvalue = NULL;
    int i = 0, rc = 0;

    if((jfnames = (*env)->GetFieldID(env, jcrh4nparms, "urlVarsKey", "[B")) == NULL) {
        sprintf(error_str, "Could not get field ID from field [urlVarsKey]");
        return(RH4N_RET_JNI_ERR);
    }

    if((jonames = (*env)->GetObjectField(env, jorh4nparms, jfnames)) == NULL) {
        sprintf(error_str, "Could not get field [urlVarsKey]");
        return(RH4N_RET_JNI_ERR);

    }

    if((jfvalues = (*env)->GetFieldID(env, jcrh4nparms, "urlVarsValue", "[B")) == NULL) {
        sprintf(error_str, "Could not get field ID from field [urlVarsValue]");
        return(RH4N_RET_JNI_ERR);
    }

    if((jovalues = (*env)->GetObjectField(env, jorh4nparms, jfvalues)) == NULL) {
        sprintf(error_str, "Could not get field [urlVarsKey]");
        return(RH4N_RET_JNI_ERR);

    }

    jnameslength = (*env)->GetArrayLength(env, jonames);
    jvalueslength = (*env)->GetArrayLength(env, jovalues);

    if(jnameslength != jvalueslength) {
        sprintf(error_str, "URLKey array and URLValue array are not the same length [%d] != [%d]", jnameslength, jvalueslength);
        return(RH4N_RET_VAR_MISSMATCH);
    }

    rh4nvarInitList(&properties->urlvars);
    //fprintf(stderr, "URL Var length: %d\n", jnameslength); fflush(stderr);

    for(; i < jnameslength; i++) {
        /*if((joname = (*env)->GetObjectArrayElement(env, jonames, i)) == NULL) {
            sprintf(error_str, "Could not get URLKey array element [%d]\n", i);
            return(RH4N_RET_JNI_ERR);
        }
        if((jovalue = (*env)->GetObjectArrayElement(env, jovalues, i)) == NULL) {
            sprintf(error_str, "Could not get URLValue array element [%d]\n", i);
            return(RH4N_RET_JNI_ERR);
        }*/

        if((joname = (*env)->GetByteArrayElement(env, jonames, i)) == NULL) {
            sprintf(error_str, "Could not get URLKey array element [%d]\n", i);
            return(RH4N_RET_JNI_ERR);
        }
        if((jovalue = (*env)->GetByteArrayElement(env, jovalues, i)) == NULL) {
            sprintf(error_str, "Could not get URLValue array element [%d]\n", i);
            return(RH4N_RET_JNI_ERR);
        }
    
        keyEntry = (*env)->GetByteArrayElements(env, joname, 0);
        valueEntry = (*env)->GetByteArrayElements(env, jovalue, 0);

        /*if((cname = (*env)->GetStringUTFChars(env, (jstring)joname, NULL)) == NULL) {
            sprintf(error_str, "Could not get URLKey string from array element [%d]\n", i);
            return(RH4N_RET_JNI_ERR);
        }
        if((cvalue = (*env)->GetStringUTFChars(env, (jstring)jovalue, NULL)) == NULL) {
            sprintf(error_str, "Could not get URLValue string from array element [%d]\n", i);
            return(RH4N_RET_JNI_ERR);
        }*/

        //fprintf(stderr, "URLVar: Name: [%s] Value: [%s]\n", cname, cvalue); fflush(stderr);

        if((rc = rh4nvarCreateNewString(&properties->urlvars, NULL, (char*)keyEntry, (char*)valueEntry)) != RH4N_RET_OK) {
            sprintf(error_str, "Could not create new String [%s]. Varlib return: %d\n", cname, rc);
            rh4n_log_error(properties->logging, "%s", error_str);
            (*env)->ReleaseStringUTFChars(env, (jstring)joname, cname);
            (*env)->ReleaseStringUTFChars(env, (jstring)jovalue, cvalue);
            return(rc);
        }

        (*env)->ReleaseStringUTFChars(env, (jstring)joname, cname);
        (*env)->ReleaseStringUTFChars(env, (jstring)jovalue, cvalue);
    }

#endif
    return(RH4N_RET_OK);

}

int rh4nParmReqTypeHandler(JNIEnv *env, const char *strvalue, RH4nProperties *properties, char *error_str) { 

    if(strlen(strvalue) > sizeof(properties->httpreqtype)) {
        sprintf(error_str, "ReqType to big. (MaxLength = [%lu])", sizeof(properties->httpreqtype));
        return(RH4N_RET_BUFFER_OVERFLOW);
    }

    strcpy(properties->httpreqtype, strvalue);
    return(RH4N_RET_OK);
}

int rh4nParmNatLibraryHandler(JNIEnv *env, const char *strvalue, RH4nProperties *properties, char *error_str) { 
    if(strlen(strvalue) > sizeof(properties->natlibrary)) {
        sprintf(error_str, "NatLibrary to big. (MaxLength = [%lu])", sizeof(properties->natlibrary));
        return(RH4N_RET_BUFFER_OVERFLOW);
    }
    strcpy(properties->natlibrary, strvalue);
    return(RH4N_RET_OK);
}

int rh4nParmNatProgramHandler(JNIEnv *env, const char *strvalue, RH4nProperties *properties, char *error_str) { 
    if(strlen(strvalue) > sizeof(properties->natprogram)) {
        sprintf(error_str, "NatProgram to big. (MaxLength = [%lu])", sizeof(properties->natprogram));
        return(RH4N_RET_BUFFER_OVERFLOW);
    }
    strcpy(properties->natprogram, strvalue);
    return(RH4N_RET_OK);
}

int rh4nParmNatParmsHandler(JNIEnv *env, const char *strvalue, RH4nProperties *properties, char *error_str) { 
    if((properties->natparms = malloc(strlen(strvalue)+1)) == NULL) {
        return(RH4N_RET_MEMORY_ERR);
    }

    strcpy(properties->natparms, strvalue);
    return(RH4N_RET_OK);
}

int rh4nParmOutputfileHandler(JNIEnv *env, const char *strvalue, RH4nProperties *properties, char *error_str) { 
    if((properties->outputfile = malloc(strlen(strvalue)+1)) == NULL) {
        return(RH4N_RET_MEMORY_ERR);
    }

    strcpy(properties->outputfile, strvalue);
    return(RH4N_RET_OK);
}

int rh4nParmLoglevelHandler(JNIEnv *env, const char *strvalue, RH4nProperties *properties, char *error_str) { 
    if(strlen(strvalue) > sizeof(properties->c_loglevel)) {
        sprintf(error_str, "loglevel to big. (MaxLength = [%lu])", sizeof(properties->c_loglevel));
        return(RH4N_RET_BUFFER_OVERFLOW);
    }

    strcpy(properties->c_loglevel, strvalue);
    if((properties->i_loglevel = rh4nLoggingConvertStrtoInt(properties->c_loglevel)) < 0) {
        sprintf(error_str, "Unkown logging level [%s]. Could not init logging.", properties->c_loglevel);
        return(RH4N_RET_LOGGING_ERR);
    }

    return(RH4N_RET_OK);
}

int rh4nParmNatSrcPathHandler(JNIEnv *env, const char *strvalue, RH4nProperties *properties, char *error_str) { 
    if((properties->natsrcpath = malloc(strlen(strvalue)+1)) == NULL) {
        return(RH4N_RET_MEMORY_ERR);
    }

    strcpy(properties->natsrcpath, strvalue);
    return(RH4N_RET_OK);
}

int rh4nParmLogPathHandler(JNIEnv *env, const char *strvalue, RH4nProperties *properties, char *error_str) { 
    if(strlen(strvalue) == 0) {
        sprintf(error_str, "Loggingpath is empty.");
        return(RH4N_RET_LOGGING_ERR);
    }
    if((properties->logpath = malloc(strlen(strvalue)+1)) == NULL) {
        return(RH4N_RET_MEMORY_ERR);
    }

    strcpy(properties->logpath, strvalue);
    return(RH4N_RET_OK);
}

int rh4nParmErrorRepresentationHandler(JNIEnv *env, const char *strvalue, RH4nProperties *properties, char *error_str) { 
    if(strlen(strvalue) > sizeof(properties->errorrepresentation)) {
        sprintf(error_str, "errorrepresentation to big. (MaxLength = [%lu])", sizeof(properties->errorrepresentation));
        return(RH4N_RET_BUFFER_OVERFLOW);
    }

    strcpy(properties->errorrepresentation, strvalue);
    return(RH4N_RET_OK);
}

int rh4nParmUsernameHandler(JNIEnv *env, const char *strvalue, RH4nProperties *properties, char *error_str) { 
    if(strlen(strvalue) > sizeof(properties->username)) {
        sprintf(error_str, "username to big. (MaxLength = [%lu])", sizeof(properties->username));
        return(RH4N_RET_BUFFER_OVERFLOW);
    }
    if(strlen(strvalue) == 0) {
        memset(properties->username, 0x00, sizeof(properties->username));
        return(RH4N_RET_OK);
    }

    strcpy(properties->username, strvalue);
    return(RH4N_RET_OK);
}

int rh4nParmNatbinpathHandler(JNIEnv *env, const char *strvalue, RH4nProperties *properties, char *error_str) {
    char **target = (char**)properties;

    if((*target = malloc((strlen(strvalue)+1)*sizeof(char))) == NULL) {
        sprintf(error_str, "Could not allocate memory for \"natbinpath\"");
        return(RH4N_RET_MEMORY_ERR);
    }
    memset(*target, 0x00, (strlen(strvalue)+1)*sizeof(char));

    strcpy(*target, strvalue);

    return(RH4N_RET_OK);
}

void rh4nPrintPropertiesStruct(RH4nProperties *properties) {
    if(properties == NULL) { return; }

    rh4n_log_debug(properties->logging, "NatLibrary:          [%s]", properties->natlibrary);
    rh4n_log_debug(properties->logging, "NatProgram:          [%s]", properties->natprogram);
    rh4n_log_debug(properties->logging, "NatSRCPath:          [%s]", properties->natsrcpath);
    rh4n_log_debug(properties->logging, "NatParms:            [%s]", properties->natparms);
    rh4n_log_debug(properties->logging, "ReqType:             [%s]", properties->httpreqtype);
    rh4n_log_debug(properties->logging, "Loglevel:            [%s]", properties->c_loglevel);
    rh4n_log_debug(properties->logging, "Outputfile:          [%s]", properties->outputfile);
    rh4n_log_debug(properties->logging, "Logpath:             [%s]", properties->logpath);
    rh4n_log_debug(properties->logging, "ErrorRepresentation: [%s]", properties->errorrepresentation);
    rh4n_log_debug(properties->logging, "Username:            [%s]", properties->username);
    //TODO: rewrite the print function fromm the variable lib with the new logging lib
    //rh4n_log_debug("Url Variables:");
    //printAllVarsToFile(properties->urlvars, stdout);
    //rh4n_log_debug("Body Variables:");
    //printAllVarsToFile(properties->bodyvars, stdout);
}

void rh4nFreePropertiesStruct(RH4nProperties *properties) {
    if(properties == NULL) { return; }

    free(properties->natparms);
    free(properties->natsrcpath);
    free(properties->outputfile);
}

void rh4nInitPropertiesStruct(RH4nProperties *properties) {
    memset(properties, 0x00, sizeof(RH4nProperties));
}

