#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <stdint.h>

#include "jni.h"

#include "rh4n.h"
#include "rh4n_jni.h"
#include "rh4n_jni_jsonconverter.h"
#include "rh4n_json.h"

JNIEXPORT void JNICALL Java_Test_devDumpJSONConverterValues(JNIEnv *env, jclass in_cls, jobject signature) {

    RH4nVarList varlist;
    if(rh4nvarInitList(&varlist) != RH4N_RET_OK) {
        rh4n_jni_utils_throwJNIException(env, -1, "Could not init varlist");
        return;
    }

    rh4n_jni_jsonconverter_dumpObjectSignature(env, signature, &varlist);
    if((*env)->ExceptionCheck(env)) {
        return;
    }

    rh4nvarPrintList(&varlist, NULL);

    RH4nProperties props; memset(&props, 0x00, sizeof(props));
    rh4njsonPrintJSON(&varlist, fileno(stdout), &props);

    printf("Alles in Ordnung\n");
}
