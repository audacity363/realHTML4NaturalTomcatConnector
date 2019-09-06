function addVersionInfoGRIDCOLHEADERCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('GRIDCOLHEADERCONTROLS');
}
function flexCreateControlGRIDCOLHEADER(params)
{
var vid = params["CONTROLID"];
var react = parent.createFunction("react"+vid,"pEv","return C.reactRESIZABLE(CR"+vid+",pEv);");
var move = parent.createFunction("move"+vid,"pEv","return C.moveControlGRIDCOLHEADER(CR"+vid+",pEv);");
var moveFinished = parent.createFunction("moveFinished"+vid,"pEv","return C.dropControlGRIDCOLHEADER(CR"+vid+",pEv);");
var cell = parent.createElement("TD");
cell.id = "R"+vid;
cell.CASA_id = vid;
cell.CASA_movable = true;
cell.CASA_propref = params["propref"];
cell.CASA_name = params["name"];
cell.style.height = "100%";
if (params["width"] != null) cell.style.width = C_adjustUnits (params["width"]);
if (params["backgroundclass"] != null) cell.style.className = params["backgroundclass"];
if (params["stylevariant"] != null) cell.style.className = "LABELCell"+params["stylevariant"];
var tableObj = parent.createElement("TABLE");
tableObj.style.width = "100%";
tableObj.style.height = "100%";
tableObj.cellPadding = 0;
tableObj.cellSpacing = 0;
tableObj.border = 0;
tableObj.style.tableLayout = "fixed";
tableObj.onmousedown = move;
tableObj.onmouseup = moveFinished;
var tbodyObj = parent.createElement("TBODY");
var trObj = parent.createElement("TR");
trObj.style.width = "100%";
var lparams = new Object();
lparams["CONTROLID"] = 5000+vid;
lparams["name"] = params["name"];
lparams["width"] = "100%";
lparams["asheadline"] = "true";
if (params["nowrap"] == null ||
params["nowrap"].toLowerCase() != "false") lparams["nowrap"] = "true";
if (params["textalign"] != null) lparams["textalign"] = params["textalign"];
if (params["align"] != null) lparams["align"] = params["align"];
if (params["valign"] != null) lparams["valign"] = params["valign"];
if (params["textalign"] != null) lparams["textalign"] = params["textalign"];
if (params["labelstyle"] != null) lparams["labelstyle"] = params["labelstyle"];
if (params["stylevariant"] != null)
lparams["stylevariant"] = params["stylevariant"];
else
lparams["asheadline"] = "true";
if (params["title"] != null)
lparams["title"] = params["title"];
else
lparams["title"] = params["name"];
var label = flexCreateControlLABEL(lparams);
trObj.appendChild(label.cell);
if (params["TAID"] != null &&
params["propref"] != null &&
params["withsorticon"] != "false")
{
var pr = params["propref"];
var ta = parent.gebid("DIV"+params["TAID"]);
var valueprop = ta.CASA_griddataprop+".sortStatusFor"+ pr;
var lparams = new Object();
lparams["CONTROLID"] = 5005+vid;
lparams["valuepropp"] = valueprop;
lparams["flush"] = "server";
var sv = "";
if (params["togglestylevariant"] != null)
sv = params["togglestylevariant"];
lparams["trueimage"] = "../HTMLBasedGUI/images/sort2"+sv+".gif";
lparams["falseimage"] = "../HTMLBasedGUI/images/sort1"+sv+".gif";
lparams["partialimage"] = "../HTMLBasedGUI/images/sort0"+sv+".gif";
lparams["backgroundclass"] = "LABELCellHeadline";
if (params["backgroundclass"] != null) lparams["backgroundclass"] = params["backgroundclass"];
if (params["sorttitle"] != null) lparams["title"] = params["sorttitle"];
var toggle = flexCreateControlTOGGLE(lparams);
toggle.cell.style.width = "22px";
registerOnClickLABEL(label.control, toggle.control.CASA_reactmethod);
trObj.appendChild(toggle.cell);
}
var movable = parent.createElement("TD");
movable.style.width = "3px";
if (isSafari())
movable.className = "LABELCellHeadline";
else
movable.style.height = "100%";
movable.onmousedown = react;
var movableDiv = parent.createElement("DIV");
movableDiv.id = "RDIV"+vid;
movableDiv.style.height = "100%";
movableDiv.className = "VSPLITLine";
movableDiv.innerHTML = "&nbsp;"
movable.appendChild(movableDiv);
trObj.appendChild(movable);
tbodyObj.appendChild(trObj);
tableObj.appendChild(tbodyObj);
cell.appendChild(tableObj);
parent["CR"+vid] = cell;
iccGRIDCOLHEADER(cell, params["propref"]);
if (params["TAID"] != null)
{
cell.CASA_ta = parent.gebid("DIV"+params["TAID"]);
registerResizableTA(cell.CASA_ta, cell);
cell.oncontextmenu = react;
cell.ondblclick = react;
}
var result = new Object();
result.cell = cell;
result.control = cell;
return result;
}
function flexRemoveGRIDCOLHEADER(vid)
{
cc = parent.gebid(vid);
if (cc.CASA_ta != null)
removeResizableTA(cc.CASA_ta,cc);
parent["react"+vid] = undefined;
parent["move"+vid] = undefined;
parent["moveFinished"+vid] = undefined;
flexRemoveLABEL(5000+vid);
if (vid.indexOf("R") == 0)
{
vid = vid.substring(1,vid.length);
vid = vid-1+1;
}
flexRemoveTOGGLE(5005+vid);
}
function iccGRIDCOLHEADER(cc,propref)
{
if (propref != null) cc.CASA_propref = propref;
}
function moveControlGRIDCOLHEADER(cc,pEv)
{
if (cc.CASA_ta == null || cc.CASA_propref == null || cc.CASA_movable != true)
return;
calculatePageOffset(cc);
var vXMax = cc.CASA_pageoffsetleft+ cc.offsetWidth;
if (pEv.clientX+25>vXMax)
return;
reactOnGridColHeaderMoveBeginTABLEAREA(cc.CASA_ta,cc,pEv);
}
function dropControlGRIDCOLHEADER(cc,pEv)
{
reactOnGridColHeaderMoveEndTABLEAREA(cc.CASA_ta,cc,pEv);
}
