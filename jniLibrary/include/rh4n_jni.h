#ifndef RH4NJNI
#define RH4NJNI

#define NATPARMSCOUNT 7

struct rh4n_jni_environ {
    char *name;
    char *value;
    uint8_t append;
};

typedef struct {
    uint32_t length;
    struct rh4n_jni_environ *environs;
} rh4n_jni_environs;

struct rh4n_jni_environProperties{
    jclass cEnviromentVar;
    jfieldID fname;
    jfieldID fvalue;
    jfieldID fappend;
};

struct dumpSessionInformationsLookup {
    const char *name;
    const char *javaType;
    void *data;
    uint32_t length;
};


void rh4n_jni_utils_throwJNIException(JNIEnv *env, int errorno, const char *errorstr);
void rh4n_jni_utils_throwSocketClosedException(JNIEnv *env);

void rh4n_jni_dumpSessionInformations(JNIEnv *env, jobject osessionInformations, RH4nProperties *props);
void rh4n_jni_dumpSessionInformations_handleString(JNIEnv *env, jobject osessionInformations, jfieldID targetField, struct dumpSessionInformationsLookup *lookupEntry);
void rh4n_jni_dumpSessionInformations_handleInt(JNIEnv *env, jobject osessionInformations, jfieldID targetField, struct dumpSessionInformationsLookup *lookupEntry);

void rh4n_jni_dumpEnviromentVariables(JNIEnv *env, jobjectArray oenvirons, rh4n_jni_environs *environs);
void rh4n_jni_dumpEnviromentVariable(JNIEnv *env, jobject otarget, struct rh4n_jni_environ *environ, struct rh4n_jni_environProperties *props);
void rh4n_jni_getEnviromentVarProperties(JNIEnv *env, struct rh4n_jni_environProperties *props);

pid_t rh4n_jni_startupNatural(JNIEnv *env, jobject onatbinpath, int *udsClient, RH4nProperties *props);
pid_t rh4n_jni_startNatural(JNIEnv *env, char *udsServerPath, char *realHTMLexe, int*, RH4nProperties *props);
void rh4n_jni_killChild(JNIEnv *env, pid_t naturalProcess, RH4nProperties *props);
void rh4n_jni_waitForChild(JNIEnv *env, pid_t naturalProcess, RH4nProperties *props, uint8_t *childExit);

void rh4n_jni_childProcess_kill(JNIEnv *env, pid_t naturalProcess, RH4nProperties *props);
void rh4n_jni_childProcess_wait(JNIEnv *env, pid_t naturalProcess, RH4nProperties *props, uint8_t *childExit);
bool rh4n_jni_childProcess_getStatus(JNIEnv *env, pid_t naturalProcess, uint8_t *exitStatus);
jobject rh4n_jni_childProcess_createChildProcessObject(JNIEnv *env, int pid, bool exited, int exitCode, const char *reason, int udsClient);

#ifndef __xlc__
int rh4n_jni_waitForUDSServer_gnu(JNIEnv *env, char *udsServerPath, RH4nProperties *props);
#define rh4n_jni_waitForUDSServer(env, udsServerPath, props) rh4n_jni_waitForUDSServer_gnu(env, udsServerPath, props)
#else
int rh4n_jni_waitForUDSServer_xlc(JNIEnv *env, char *udsServerPath, RH4nProperties *props);
#define rh4n_jni_waitForUDSServer(env, udsServerPath, props) rh4n_jni_waitForUDSServer_xlc(env, udsServerPath, props)
#endif

#endif
