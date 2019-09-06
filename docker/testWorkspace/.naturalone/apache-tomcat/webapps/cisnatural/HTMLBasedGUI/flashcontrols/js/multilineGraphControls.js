// Copyright (c) Software AG, Darmstadt
var nextsid = 1;
var registeredSeries = new Array ();
var nextL2DataID;
var minvr, maxvr;
var SWFInstanceName = 'flashGraph';

function test() {
    setTimeRange (minvr, maxvr / 2 + minvr / 2);
}

function getMovieInstance (movieName){
	return document.getElementById(movieName);
}

function randColor () {
    var hexValues = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F');
    var result = new String();
    for (var i = 0; i < 6; i++) {
        result += hexValues[Math.floor(Math.random() * 16)];
    }
    return result;
}

function addFlag () {
    var sid = document.getElementById("fid").value;
    var label = document.getElementById("flabel").value;
    var size = document.getElementById("fsize").value;
    var ftime = new Date (document.getElementById("yearflag").value, document.getElementById("monthflag").value, document.getElementById("dayflag").value, document.getElementById("hourflag").value, document.getElementById("minuteflag").value, 0);

    ftime = ftime.valueOf ();
    getMovieInstance(SWFInstanceName).addEventFlag (sid, ftime, ftime, label, size);
}

function randPoints (noPoints, startDate, endDate) {

    if (startDate.valueOf() == endDate.valueOf()){
        return false;
    }

    var result = [];
    var value = 0;
    var stepSize = Math.round((endDate.valueOf() - startDate.valueOf()) / noPoints);

    for (var i = startDate.valueOf(); i <= endDate.valueOf(); i += stepSize) {
        value += Math.round(Math.random() * 2000 - 1000) / 100;
        var jitter = Math.round(Math.random() / 10 * stepSize);
        result.push ({value: value, time: i+jitter});
    }
    return result;
}

function setTestTimeRange (min, max) {
    var min = Date.UTC (document.getElementById("yearmindate").value, document.getElementById("monthmindate").value, document.getElementById("daymindate").value, document.getElementById("hourmindate").value, document.getElementById("minutemindate").value, 0);
    var max = Date.UTC (document.getElementById("yearmaxdate").value, document.getElementById("monthmaxdate").value, document.getElementById("daymaxdate").value, document.getElementById("hourmaxdate").value, document.getElementById("minutemaxdate").value, 0);

    setTimeRange (min, max);
}

function tellFlash (command) {
    var argArray = new Array ();
    for (var i = 0; i < arguments.length; i++) {
        argArray.push (arguments[i]);
    }

    getMovieInstance(SWFInstanceName).executeExternalCommand(argArray);
}

function trace (arg) {
}

var seriesCounter = 0;

function randomizeForm () {
    document.getElementById("color").value = randColor();
    document.getElementById("label").value = 'Data series #' + (++seriesCounter);
    var units = new Array('$', '%', 'units');
    document.getElementById("unit").value = units[Math.floor(Math.random() * units.length)];
    document.getElementById("numofpoints").value = 200;
}

function createSeries () {
    var color = document.getElementById("color").value;
    var label = document.getElementById("label").value;
    var units = document.getElementById("unit").value;
    var startDate = new Date (document.getElementById("yearstart").value, document.getElementById("monthstart").value, document.getElementById("daystart").value, document.getElementById("hourstart").value, document.getElementById("minutestart").value, 0);
    var endDate = new Date("July 11, 2007 09:25:00 PST");
    var points = randPoints(parseInt(document.getElementById("numofpoints").value), startDate, endDate);

    if (points) {
        getMovieInstance(SWFInstanceName).addSeries(nextsid++, label, units, color, point);
    }
}

function createMetricsSeries (color, label, units, fromDate, toDate, noOfPoints) {
    var startDate = new Date ('2007', 'June', '10', '19', '20' , 0);
    var endDate = new Date ('2007', 'June', '15', '19', '20', 0);
    var points = randPoints(parseInt(noOfPoints), startDate, endDate);

    if (points) {
        getMovieInstance(SWFInstanceName).addSeries(nextsid++, label, units, color, points);
    }
}

function showModBox (id) {
    document.getElementById('modify').style.display='block';
    document.getElementById('selId').innerHTML = 'Modify series ID:' + id;
    document.getElementById('modify').sID = id;
}

function registerSeries (id, name) { //this function receives the return from the Flash file
}

function unregisterSeries (id) { //this function receives the return from the Flash file
    for (var i = 0; i < registeredSeries.length; i++) {
        if (registeredSeries[i].id == id) {
            registeredSeries.splice (i, 1);
            document.getElementById('series').deleteRow(i + 2);
        }
    }
}

function clearEventFlags () {
    getMovieInstance(SWFInstanceName).clearEventFlags ();
}

function clearLines () {
    getMovieInstance(SWFInstanceName).clearLines ();
}

function selectEventFlag (sid, time, etime) {
    if (sid) {
        time = new Date (time);
        etime = new Date (etime);
    }
}

function backgroundSelected() {
}

function deleteSeries (id, rowIndex) {
    getMovieInstance(SWFInstanceName).deleteSeries (id);
}

function modifySeries (id, add) {
    var startDate = new Date (document.getElementById("yearstart").value, document.getElementById("monthstart").value, document.getElementById("daystart").value, document.getElementById("hourstart").value, document.getElementById("minutestart").value, 0);
    var endDate = new Date (document.getElementById("yearend").value, document.getElementById("monthend").value, document.getElementById("dayend").value, document.getElementById("hourend").value, document.getElementById("minuteend").value, 0);
    var points = randPoints(parseInt(document.getElementById("numofpoints").value), startDate, endDate);

    getMovieInstance(SWFInstanceName).modifySeries (id, points, add);
    document.getElementById('modify').style.display='none';
}

function modifyGraph (mode) {
    var date1 = new Date();
    var date2 = new Date();
    date2.setDate(date1.getDate() + 5);
    getMovieInstance(SWFInstanceName).modifyGraphProperty (date1.getTime(), date2.getTime(), mode);
}

function setTimeRange (min, max) { //need to be integer type, not Date
    getMovieInstance(SWFInstanceName).setTimeRange(min, max);
}

function reportNewTimeRange (min, max) { //we are using this function to report the visible time range and to send L2 data
    document.getElementById('timerange').innerHTML = '<p>' + min + ' to ' + max + ' (in your local time zome)</p>';
}

function requestL2Data (minViewRange, maxViewRange) {
    minvr = minViewRange;
    maxvr = maxViewRange;

    for (var i in registeredSeries) {
        getMovieInstance(SWFInstanceName).registerL2Data (registeredSeries[i].id, randPoints(200, new Date(minViewRange), new Date(maxViewRange)));
    }
    getMovieInstance(SWFInstanceName).L2DataLoadingComplete ();
}

function dummyFirstLevel() {
    var points = randPoints(200, new Date(2006, 6, 1), new Date(2006, 8, 20));
    addLine(1, "my label", "my units", points);
}

function dummySecondLevel() {
    var startDate = new Date(2006, 8, 16);
    var endDate = new Date(2006, 8, 20);
    var points = randPoints(200, startDate, endDate);
    addLevel2Data(1, startDate.getTime(), endDate.getTime(), points);
}

function addLevel2Data(monitorId, startDate, endDate, points) {
    getFlashInstance().registerL2Data(monitorId, points, new Date(startDate), new Date(endDate));
    getFlashInstance().L2DataLoadingComplete();
}

function setLocale(locale) {
    getMovieInstance(SWFInstanceName).setLocale(locale);
}

function displayMessage (message) {
    getMovieInstance(SWFInstanceName).displayMessage (message);
}
function hideMessage () {
    getMovieInstance(SWFInstanceName).hideMessage ();
}

function lineChartLoaded () {
    setLocale('');
}
