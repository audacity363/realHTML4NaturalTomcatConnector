function addVersionInfoSCP(){if(this.m_jsversions==undefined){m_jsversions=[]}if(this.m_jsfiles==undefined){m_jsfiles=[]}m_jsversions.push("CIS_V910_20180812_2005_NJX");m_jsfiles.push("SCP")}var m_completelyBuilt=false;var m_bufferedSrc=null;var WORKAREA=null;var m_showPageDate=new Date();var m_walastvisited=[];var m_saidGoodBye=false;var m_previousWORKAREA=null;var m_firstShot=true;var m_blankRecall=false;function sayHelloSCP(){alert("This is the StartCISPage.js file.")}function uniquessrc(a){var b=a.lastIndexOf("/");var c=a.substring(0,b);b=c.lastIndexOf("/");return a.substring(b,a.length)}function addEventListenerWA(b){if(b==null){return}var a=document.getElementById(b);if(a==null){return}var c=(a.contentWindow||a.contentDocument);if(c.document){c=c.document}if(c.addEventListener){c.addEventListener("keydown",suppressBrowserKeysWA,false)}else{if(c.attachEvent){c.attachEvent("onkeydown",suppressBrowserKeysWA)}}}function suppressBrowserKeysWA(b){if(b==null){return}try{if(b.keyCode>111&&b.keyCode<124){return m_centralLib.cancelEvent(b)}if((b.keyCode==87&&b.ctrlKey==true)||(b.keyCode==82&&b.ctrlKey==true)){return m_centralLib.cancelEvent(b)}}catch(a){}}function refreshModel(){try{WORKAREA.m_blockIOByFlush=true;WORKAREA.csciframe.submitModel("submit")}catch(a){}}function assignCLSubframeSCP(){var a=parent.frames;var c;for(c=0;c<a.length;c++){var b=a[c];if(b.m_centralLib!=undefined){m_centralLib=b.m_centralLib;break}}}function assignCLPopupSCP(){if(opener!=undefined){m_centralLib=opener.parent.m_centralLib}else{m_centralLib=window.dialogArguments}}function getCurrentSessionId(){return m_currentSessionId}function getCurrentProcessId(){return m_currentProcessId}function getCurrentModelId(){return m_currentModelId}function getCurrentSSRC(){return m_currentSSRC}function showPage(o,u,y,s,d){writeJsConsole("showPage:"+o);if(m_blankRecall==false&&o.indexOf("/HTMLBasedGUI/general/blankpage.html")>=0){m_blankRecall=true;return}if(m_centralLib==null){window.location.href="../HTMLBasedGUI/general/aboutBlank.html";return}try{if(m_currentSSRC!=null&&m_currentSSRC==o&&m_currentSessionId!=null&&m_currentSessionId==y&&m_currentProcessId!=null&&m_currentProcessId==s&&m_currentModelId!=null&&m_currentModelId==u){try{WORKAREA.C.addLogMessage("StartCasaPage.showPage - synchronize event");WORKAREA.m_blockIO=false;WORKAREA.reactOnInit(false);return}catch(r){writeJsConsole("ERROR reactOnInit:"+r)}}if(m_firstShot==false){document.getElementById("OPA").style.display=""}else{m_firstShot=false}m_showPageDate=new Date();m_previousWORKAREA=null;if(m_frameBufferSize>1&&WORKAREA!=null){try{WORKAREA.C.deactivatePage();m_previousWORKAREA=WORKAREA}catch(f){writeJsConsole("ERROR deactivatePage:"+f)}}if(WORKAREA!=null&&WORKAREA.C!=null){try{WORKAREA.C.setDisplayPage("none")}catch(f){writeJsConsole("ERROR setDisplayPage:"+f)}}if(y!=null){m_currentSessionId=y}if(s!=null){m_currentProcessId=s}if(u!=null){m_currentModelId=u}if(o!=null){m_currentSSRC=o}var j=0;var l="";var B=false;var n=-1;var k=false;var h=uniquessrc(o)+"/"+s;for(var w=0;w<m_wainfos.length;w++){if(m_wainfos[w]==null||m_wainfos[w]==h){if(m_wainfos[w]!=null){B=true;try{WORKAREA.C.addLogMessage("StartCasaPage - switching frame")}catch(r){}}m_wainfos[w]=h;WORKAREA=self.frames["WA"+w];m_walastvisited[w]=(new Date()).getTime();l="";n=w;k=true;break}}if(k==false){if(m_frameBufferUsage<m_frameBufferSize){n=m_frameBufferUsage;if(m_frameBufferUsage>0){var c=null;try{c=document.createElement("iframe");c.name="WA"+m_frameBufferUsage;c.id="WA"+m_frameBufferUsage;c.style.border=0;c.src="./";writeJsConsole("showPage: Frame buffer size increased")}catch(x){writeJsConsole("ERROR: Increase frame buffer size "+x)}if(c==null){c=document.createElement("IFRAME");c.name="WA"+m_frameBufferUsage;c.id="WA"+m_frameBufferUsage}c.style.display="none";c.style.position="absolute";c.style.left="0";c.style.top="0";c.target="main";c.frameBorder="0";c.scrolling="no";c.style.width="100%";c.style.height="100%";c.style.overflow="hidden";c.className="SCPIFRAMEAll";var m=document.getElementById("SCPFRAMEBUFFER");m.appendChild(c)}m_frameBufferUsage++}else{var b=-2;for(var w=0;w<m_wainfos.length;w++){var g=self.frames["WA"+w].C;if(g==null){waLowestPrio=new Object();waLowestPrio[w]=true;break}var A;try{A=g.getSCPBufferPriortity()}catch(C){continue}if(b==-2||A<b){b=A;waLowestPrio=new Object();waLowestPrio[w]=true}else{if(A==b){waLowestPrio[w]=true}}}var p=-1;for(var w=0;w<m_wainfos.length;w++){if(waLowestPrio[w]==true){if(p==-1||m_walastvisited[w]<m_walastvisited[p]){p=w}}}n=p}WORKAREA=self.frames["WA"+n];var t=o;try{t=o.substring(o.lastIndexOf("/")+1,o.lastIndexOf("."));WORKAREA.frameElement.setAttribute(m_namettid,t);writeJsConsole("showPage: use WA"+n)}catch(a){}}if(!isSafari()){try{WORKAREA.focus()}catch(r){}}if(m_frameBufferUsage>1){for(var w=0;w<m_frameBufferUsage;w++){document.getElementById("WA"+w).m_flagResize=false}if(self.m_loadingOnPageSwitch!="true"){try{document.getElementById(WORKAREA.name).style.zIndex=-1}catch(q){}}try{document.getElementById(WORKAREA.name).style.display="none"}catch(q){}try{document.getElementById(WORKAREA.name).CasaLOADING.style.display=""}catch(q){}}if(B){try{if(WORKAREA.m_framebufferpriority=="-1"){B=false}}catch(z){}if(B){try{if(WORKAREA.C.getSCPBufferPriortity()=="-1"){B=false}}catch(z){}}}if(B==false){try{WORKAREA.location.replace(o);writeJsConsole("showPage: WORKAREA.location.replace done")}catch(r){writeJsConsole("showPage: WORKAREA.location.replace failed"+r)}m_wainfos[n]=h;m_walastvisited[n]=(new Date()).getTime()}else{try{WORKAREA.C.addLogMessage("StartCasaPage - starting reactOnInit")}catch(r){}try{writeJsConsole("showPage: vbuffered = true");if(WORKAREA.reactOnInit==null){WORKAREA.location.replace(o);writeJsConsole("showPage: WORKAREA.location.replace done")}else{if(d!=true){WORKAREA.reactOnInit(false);WORKAREA.reactOnResize()}else{WORKAREA.C.submitModelFastBufferSwitch()}}}catch(r){writeJsConsole("ERROR showPage: "+r)}}status="";setTimeout("reactOnNoCISPageSCP();",1000)}catch(r){var v="";for(var u in r){v+=u+" = "+r[u]+"\n"}alert("Error caught in SSC ("+o+"): "+v)}}function isSafari(){return navigator.userAgent.toLowerCase().indexOf("safari")!=-1}function bringToFrontSCP(b){writeJsConsole("bringToFrontSCP: "+b);if(WORKAREA!=null&&WORKAREA.location.href==b){var d=document.getElementById(WORKAREA.name);d.style.zIndex=10;d.style.display="block";for(var c=0;c<frames.length;c++){var a=frames["WA"+c];if(a==null){continue}if(a==WORKAREA){try{addEventListenerWA("WA"+c)}catch(e){}continue}try{dfr=document.getElementById(a.name);dfr.style.display="none";dfr.style.zIndex=-1}catch(f){}}document.getElementById("OPA").style.display="none"}}function reactOnNoCISPageSCP(){writeJsConsole("reactOnNoCISPageSCP()");try{if(WORKAREA.m_startPageDate==undefined){bringToFrontSCP(WORKAREA.location.href)}}catch(a){alert(a)}}function sendRemoveSessionSCP(){writeJsConsole("sendRemoveSessionSCP()");if(frames.WA0==null){return}if(frames.WA0.csciframe==null){return}writeJsConsole("sendRemoveSessionSCP: calling removeSession() in WA0");frames.WA0.csciframe.removeSession();var a=" ";for(i=0;i<99999;i++){a="pleasewaitforsessionremovelonger"}for(i=0;i<99999;i++){a="pleasewaitforsessionremovelonger"}for(i=0;i<99999;i++){a="pleasewaitforsessionremovelonger"}for(i=0;i<99999;i++){a="pleasewaitforsessionremovelonger"}for(i=0;i<99999;i++){a="pleasewaitforsessionremovelonger"}for(i=0;i<99999;i++){a="pleasewaitforsessionremovelonger"}for(i=0;i<99999;i++){a="pleasewaitforsessionremovelonger"}}function sendClosePopupSCP(){try{WORKAREA.csciframe.reactOnClosePopup()}catch(a){return}}function updateULB(a){var c=self;var b=null;if(a=="REMOVESESSION"){b=goodBye}c.onunload=b;c.onbeforeunload=b}function changeCurrentPage(a,c,b){self.m_loadingOnPageSwitch=b;showPage(a,c,getCurrentSessionId(),getCurrentProcessId());self.m_loadingOnPageSwitch=null}function reactOnResize(){if(navigator.appName=="Netscape"){for(var b=0;b<frames.length;b++){var a=frames["WA"+b];if(a==null){continue}try{dfr=document.getElementById(a.name);dfr.CASA_prevStyleDisplay=dfr.style.display;dfr.style.display="none"}catch(c){}}for(var b=0;b<frames.length;b++){var a=frames["WA"+b];if(a==null){continue}try{dfr.style.width=300+"px";dfr.style.height=300+"px";a=document.getElementById(a.name);dfr.style.display=dfr.CASA_prevStyleDisplay}catch(c){}}}}function writeJsConsole(a){if(m_jsconsole!=undefined&&(m_jsconsole==true||m_jsconsole=="true")){console.log(a)}};