function addVersionInfoSCP()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('SCP');
}
var m_completelyBuilt = false;
var m_bufferedSrc = null;
var WORKAREA = null;
var m_showPageDate = new Date();
var m_walastvisited = [];
var m_saidGoodBye = false;
var m_previousWORKAREA = null;
var m_firstShot = true;
var m_blankRecall = false;
function sayHelloSCP()
{
alert("This is the StartCISPage.js file.");
}
function uniquessrc(pssrc)
{
var vi = pssrc.lastIndexOf('/');
var vs = pssrc.substring(0,vi);
vi = vs.lastIndexOf('/');
return pssrc.substring(vi,pssrc.length);
}
function addEventListenerWA(wid)
{
if ( wid == null ) return;
var x = document.getElementById(wid);
if ( x == null ) return;
var y = (x.contentWindow || x.contentDocument);
if (y.document)y = y.document;
if (y.addEventListener)
y.addEventListener("keydown", suppressBrowserKeysWA, false);
else if (y.attachEvent)
y.attachEvent("onkeydown", suppressBrowserKeysWA);
}
function suppressBrowserKeysWA(event)
{
if ( event == null ) return;
try
{
if (event.keyCode > 111 && event.keyCode < 124)
return m_centralLib.cancelEvent(event);
if ((event.keyCode == 87 && event.ctrlKey == true) ||
(event.keyCode == 82 && event.ctrlKey == true))
return m_centralLib.cancelEvent(event);
}
catch(sxx){}
}
function refreshModel()
{
try
{
WORKAREA.m_blockIOByFlush = true;
WORKAREA.csciframe.submitModel('submit');
}
catch (exc)
{}
}
function assignCLSubframeSCP()
{
var vframes = parent.frames;
var i;
for (i=0; i<vframes.length; i++)
{
var vframe = vframes[i];
if (vframe.m_centralLib != undefined)
{
m_centralLib = vframe.m_centralLib;
break;
}
}
}
function assignCLPopupSCP()
{
if (opener != undefined)
m_centralLib = opener.parent.m_centralLib;
else
m_centralLib = window.dialogArguments;
}
function getCurrentSessionId() { return m_currentSessionId; }
function getCurrentProcessId() { return m_currentProcessId; }
function getCurrentModelId() { return m_currentModelId; }
function getCurrentSSRC() { return m_currentSSRC; }
function showPage(ssrc,id,sessionId,processId,fastbufferswitch)
{
writeJsConsole("showPage:" + ssrc );
if (m_blankRecall == false && ssrc.indexOf("/HTMLBasedGUI/general/blankpage.html") >= 0){
m_blankRecall = true;
return;
}
if (m_centralLib == null)
{
window.location.href = "../HTMLBasedGUI/general/aboutBlank.html";
return;
}
try
{
if (m_currentSSRC != null && m_currentSSRC == ssrc &&
m_currentSessionId != null && m_currentSessionId == sessionId &&
m_currentProcessId != null && m_currentProcessId == processId &&
m_currentModelId   != null && m_currentModelId == id)
{
try
{
WORKAREA.C.addLogMessage("StartCasaPage.showPage - synchronize event");
WORKAREA.m_blockIO = false;
WORKAREA.reactOnInit(false);
return;
}
catch (eexxcc)
{
writeJsConsole("ERROR reactOnInit:" + eexxcc );
}
}
if (m_firstShot == false)
{
document.getElementById("OPA").style.display="";
}
else
{
m_firstShot = false;
}
m_showPageDate = new Date();
m_previousWORKAREA = null;
if (m_frameBufferSize > 1 && WORKAREA != null)
{
try
{
WORKAREA.C.deactivatePage();
m_previousWORKAREA = WORKAREA;
}
catch(eee) { writeJsConsole("ERROR deactivatePage:" + eee ); }
}
if (WORKAREA != null && WORKAREA.C != null)
{
try
{
WORKAREA.C.setDisplayPage("none");
}
catch(eee) { writeJsConsole("ERROR setDisplayPage:" + eee ); }
}
if (sessionId != null) m_currentSessionId = sessionId;
if (processId != null) m_currentProcessId = processId;
if (id != null) m_currentModelId = id;
if (ssrc != null) m_currentSSRC = ssrc;
var waIndex = 0;
var vcols = "";
var vbuffered = false;
var vvisindex = -1;
var vfoundframe = false;
var vussrc = uniquessrc(ssrc)+"/"+processId;
for (var i=0; i<m_wainfos.length; i++)
{
if (m_wainfos[i] == null || m_wainfos[i] == vussrc)
{
if (m_wainfos[i] != null)
{
vbuffered = true;
try { WORKAREA.C.addLogMessage("StartCasaPage - switching frame"); } catch (eexxcc) {}
}
m_wainfos[i] = vussrc;
WORKAREA = self.frames["WA"+i];
m_walastvisited[i] = (new Date()).getTime();
vcols = "";
vvisindex = i;
vfoundframe = true;
break;
}
}
if (vfoundframe == false)
{
if (m_frameBufferUsage < m_frameBufferSize)
{
vvisindex = m_frameBufferUsage;
if (m_frameBufferUsage > 0)
{
var vframe = null;
try {
vframe = document.createElement("iframe");
vframe.name="WA"+m_frameBufferUsage;
vframe.id="WA"+m_frameBufferUsage;
vframe.style.border = 0;
vframe.src ="./";
writeJsConsole("showPage: Frame buffer size increased" );
}
catch (ex) {
writeJsConsole("ERROR: Increase frame buffer size " + ex );
}
if (vframe == null)
{
vframe = document.createElement("IFRAME");
vframe.name = "WA"+m_frameBufferUsage;
vframe.id = "WA"+m_frameBufferUsage;
}
vframe.style.display = "none";
vframe.style.position = "absolute";
vframe.style.left = "0";
vframe.style.top = "0";
vframe.target = "main";
vframe.frameBorder = "0";
vframe.scrolling = "no";
vframe.style.width = "100%";
vframe.style.height = "100%";
vframe.style.overflow = "hidden";
vframe.className = "SCPIFRAMEAll";
var elm = document.getElementById("SCPFRAMEBUFFER");
elm.appendChild(vframe);
}
m_frameBufferUsage++;
}
else
{
var lowestPrio = -2;
for (var i=0; i<m_wainfos.length; i++)
{
var cscframe = self.frames["WA"+i].C;
if (cscframe == null)
{
waLowestPrio = new Object();
waLowestPrio[i] = true;
break;
}
var vprio;
try { vprio = cscframe.getSCPBufferPriortity(); } catch (ep) { continue; }
if (lowestPrio == -2 ||
vprio < lowestPrio)
{
lowestPrio = vprio;
waLowestPrio = new Object();
waLowestPrio[i] = true;
}
else if (vprio == lowestPrio)
{
waLowestPrio[i] = true;
}
}
var lowestindex = -1;
for (var i=0; i<m_wainfos.length; i++)
{
if (waLowestPrio[i] == true)
{
if (lowestindex == -1 ||
m_walastvisited[i] < m_walastvisited[lowestindex])
lowestindex = i;
}
}
vvisindex = lowestindex;
}
WORKAREA = self.frames["WA"+vvisindex];
var layoutname = ssrc;
try {
layoutname = ssrc.substring(ssrc.lastIndexOf("/")+1, ssrc.lastIndexOf("."));
WORKAREA.frameElement.setAttribute(m_namettid,layoutname);
writeJsConsole("showPage: use WA" + vvisindex );
} catch(excc) {}
}
if (!isSafari())try{ WORKAREA.focus(); } catch(eexxcc) {}
if (m_frameBufferUsage > 1)
{
for (var i=0; i<m_frameBufferUsage; i++)
document.getElementById("WA"+i).m_flagResize = false;
if (self.m_loadingOnPageSwitch != "true")try { document.getElementById(WORKAREA.name).style.zIndex = -1; } catch (excccc) { }
try { document.getElementById(WORKAREA.name).style.display = 'none'; } catch (excccc) { }
try { document.getElementById(WORKAREA.name).CasaLOADING.style.display = ''; } catch (excccc) { }
}
if (vbuffered)
{
try { if (WORKAREA.m_framebufferpriority == "-1") vbuffered = false; } catch (e) {}
if (vbuffered)
try { if (WORKAREA.C.getSCPBufferPriortity() == "-1") vbuffered = false; } catch (e) {}
}
if (vbuffered == false)
{
try { WORKAREA.location.replace(ssrc); writeJsConsole("showPage: WORKAREA.location.replace done"); }
catch(eexxcc) {writeJsConsole("showPage: WORKAREA.location.replace failed" + eexxcc );}
m_wainfos[vvisindex] = vussrc;
m_walastvisited[vvisindex] = (new Date()).getTime();
}
else
{
try { WORKAREA.C.addLogMessage("StartCasaPage - starting reactOnInit"); } catch(eexxcc) {}
try
{
writeJsConsole("showPage: vbuffered = true");
if (WORKAREA.reactOnInit == null)
{
WORKAREA.location.replace(ssrc);
writeJsConsole("showPage: WORKAREA.location.replace done");
}
else
{
if (fastbufferswitch != true)
{
WORKAREA.reactOnInit(false);
WORKAREA.reactOnResize();
}
else
{
WORKAREA.C.submitModelFastBufferSwitch();
}
}
}
catch(eexxcc)
{
writeJsConsole("ERROR showPage: " + eexxcc);
}
}
status="";
setTimeout("reactOnNoCISPageSCP();",1000);
}
catch (eexxcc)
{
var str = "";
for(var id in eexxcc)
str += id+" = "+eexxcc[id]+"\n";
alert("Error caught in SSC ("+ ssrc +"): " + str);
}
}
function isSafari ()
{
return navigator.userAgent.toLowerCase().indexOf('safari') != -1;
}
function bringToFrontSCP(innerhref)
{
writeJsConsole("bringToFrontSCP: " + innerhref);
if (WORKAREA != null &&
WORKAREA.location.href == innerhref)
{
var dwa = document.getElementById(WORKAREA.name);
dwa.style.zIndex = 10;
dwa.style.display = 'block';
for (var i=0; i<frames.length; i++)
{
var fr = frames["WA"+i];
if (fr == null) continue;
if (fr == WORKAREA)
{
try { addEventListenerWA("WA"+i);} catch (wxx) {}
continue;
}
try
{
dfr = document.getElementById(fr.name);
dfr.style.display = "none";
dfr.style.zIndex = -1;
}
catch (eexxcc)
{
}
}
document.getElementById("OPA").style.display="none";
}
}
function reactOnNoCISPageSCP()
{
writeJsConsole("reactOnNoCISPageSCP()");
try
{
if (WORKAREA.m_startPageDate == undefined)
{
bringToFrontSCP(WORKAREA.location.href);
}
}
catch (eexxcc)
{
alert(eexxcc);
}
}
function sendRemoveSessionSCP()
{
writeJsConsole("sendRemoveSessionSCP()");
if (frames["WA0"] == null) return;
if (frames["WA0"].csciframe == null) return;
writeJsConsole("sendRemoveSessionSCP: calling removeSession() in WA0");
frames["WA0"].csciframe.removeSession();
var counter = " ";
for (i = 0; i < 99999; i++)
counter="please" + "wait" + "for" + "session" + "remove" + "longer";
for (i = 0; i < 99999; i++)
counter="please" + "wait" + "for" + "session" + "remove" + "longer";
for (i = 0; i < 99999; i++)
counter="please" + "wait" + "for" + "session" + "remove" + "longer";
for (i = 0; i < 99999; i++)
counter="please" + "wait" + "for" + "session" + "remove" + "longer";
for (i = 0; i < 99999; i++)
counter="please" + "wait" + "for" + "session" + "remove" + "longer";
for (i = 0; i < 99999; i++)
counter="please" + "wait" + "for" + "session" + "remove" + "longer";
for (i = 0; i < 99999; i++)
counter="please" + "wait" + "for" + "session" + "remove" + "longer";
}
function sendClosePopupSCP()
{
try
{
WORKAREA.csciframe.reactOnClosePopup();
}
catch (exc)
{
return;
}
}
function updateULB(ulb)
{
var elm = self;
var func = null;
if (ulb == "REMOVESESSION") func = goodBye;
elm.onunload = func;
elm.onbeforeunload = func;
}
function changeCurrentPage(nextPage,nextPageId,loadingOnPageSwitch)
{
self.m_loadingOnPageSwitch = loadingOnPageSwitch;
showPage(nextPage,nextPageId,getCurrentSessionId(),getCurrentProcessId());
self.m_loadingOnPageSwitch = null;
}
function reactOnResize()
{
if (navigator.appName == "Netscape")
{
for (var i=0; i<frames.length; i++)
{
var fr = frames["WA"+i];
if (fr == null) continue;
try
{
dfr = document.getElementById(fr.name);
dfr.CASA_prevStyleDisplay = dfr.style.display;
dfr.style.display = "none";
}
catch (eexxcc)
{
}
}
for (var i=0; i<frames.length; i++)
{
var fr = frames["WA"+i];
if (fr == null) continue;
try
{
dfr.style.width = 300+"px";
dfr.style.height = 300+"px";
fr = document.getElementById(fr.name);
dfr.style.display = dfr.CASA_prevStyleDisplay;
}
catch (eexxcc)
{
}
}
}
}
function writeJsConsole(val)
{
if (m_jsconsole != undefined && (m_jsconsole == true || m_jsconsole == "true") )
{
console.log(val);
}
}
