// Copyright (c) Software AG, Darmstadt
function initDateInput()
{
    var passedValues = null;
    if (opener != undefined) 
    {
        // MOZILLA
        passedValues = opener.csciframe.casaPopupParameters;
    }
    else 
    {
        // INTERNET EXPLORER
        passedValues = window.dialogArguments;
    }
    
    var param = parseYYYMMDDHHMMSS(passedValues[0]); 
    DATEINPUT.setDate(param);

    param = parseYYYMMDDHHMMSS(passedValues[1]);    
    DATEINPUT.setFromRestriction(param);

    param = parseYYYMMDDHHMMSS(passedValues[2]);    
    DATEINPUT.setToRestriction(param);
    
    param = passedValues[3]
    if (param != null) 
        DATEINPUT.switchToStyle(param);
                
    param = passedValues[5];
    DATEINPUT.switchToDirection(param);
    
    param = passedValues[6];
    DATEINPUT.setOpener(param);
    
    param = passedValues[7];
    DATEINPUT.setInfoProp(param);

    param = passedValues[8];
    DATEINPUT.setDatatype(param);

    param = passedValues[9];
    DATEINPUT.setSecondsVisibility(param);      
    
    if (passedValues != null && passedValues[10] == "SU") DATEINPUT.setAmericanStyle(true);
    else DATEINPUT.setAmericanStyle(false);         
        
    DATEINPUT.init();
}

function reactOnNewModel()
{
    DATEINPUT.reactOnNewModel()
}

function parseYYYMMDDHHMMSS(yyyymmddhhmmss)
{
    if (yyyymmddhhmmss == null) return null;
    var result = new Object();
    result.year = (-1)*yyyymmddhhmmss.substr(0,4)*(-1);
    result.month = (-1)*yyyymmddhhmmss.substr(4,2)*(-1);
    result.day = (-1)*yyyymmddhhmmss.substr(6,2)*(-1);
    result.hours = (-1)*yyyymmddhhmmss.substr(8,2)*(-1);
    result.minutes = (-1)*yyyymmddhhmmss.substr(10,2)*(-1);
    result.seconds = (-1)*yyyymmddhhmmss.substr(12,2)*(-1);
    return result;
}
