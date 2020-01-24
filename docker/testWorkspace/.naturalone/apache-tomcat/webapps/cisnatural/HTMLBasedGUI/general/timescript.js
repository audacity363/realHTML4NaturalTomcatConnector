// Copyright (c) Software AG, Darmstadt
function doInit()
{
	var passedValues;
	var currentTime = new Date();
	m_hour = currentTime.getHours();
	m_minute = currentTime.getMinutes();
	m_second = currentTime.getSeconds();
	var passedValues = null;
	if (opener != undefined) // MOZILLA
	{
		passedValues = opener.csciframe.casaPopupParameters;
	}
	else // INTERNET EXPLORER
	{
		passedValues = window.dialogArguments;
	}
	if (passedValues != null && passedValues[0] != null)
	{
		m_hour = passedValues[0];
		m_minute = passedValues[1];
		m_second = passedValues[2];
	}
	if (passedValues != null && passedValues[3] != null) TIME.switchToStyle(passedValues[3]);
	if (passedValues != null && passedValues[4] != null) TIME.switchToDirection(passedValues[4]);
	TIME.transferTime(m_hour,m_minute,m_second);
	TIME.init();
}
