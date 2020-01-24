// Copyright (c) Software AG, Darmstadt
function initCalendar()
{
	var passedValues;
	var currentDate = new Date();
	m_year = currentDate.getYear();
	if (m_year < 1000) m_year = 1900 + m_year; // MOZILLA
	m_month = currentDate.getMonth()+1;
	m_day = currentDate.getDate();
	var passedValues = null;
	if (opener != undefined) // MOZILLA
	{
		passedValues = opener.csciframe.casaPopupParameters;
	}
	else // INTERNET EXPLORER
	{
		passedValues = window.dialogArguments;
	}
	if (passedValues != null &&
	    passedValues[0] != null)
	{
		m_year = passedValues[0];
		m_month = passedValues[1];
		m_day = passedValues[2];
	}
	if (passedValues != null && passedValues[3] != null) CALENDAR.switchToStyle(passedValues[3]);	
	if (passedValues != null && passedValues[6] == "SU") CALENDAR.setAmericanStyle(true);
	else CALENDAR.setAmericanStyle(false); 
	CALENDAR.switchToDirection(passedValues[5]);
	CALENDAR.setYear(m_year);
	CALENDAR.setMonth(m_month);
	CALENDAR.setDay(m_day);
	CALENDAR.visualizeCurrentDate();
	CALENDAR.init();
}
