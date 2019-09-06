
import java.util.*;
import com.softwareag.cis.print.fop.*;
import com.softwareag.cis.server.util.*;
import com.softwareag.cis.util.*;

// class for PDF creation with CISFO2 tags

public class $$className$$
    implements IFOPDataObject
{
    // ------------------------------------------------------------------------
    // inner classes
    // ------------------------------------------------------------------------
	
    // ------------------------------------------------------------------------
    // constructor
    // ------------------------------------------------------------------------
	
    // default constructor
    public $$className$$()
    {
    }

    // Called if the the corresponding print form is previewed within the Layout Painter
    public $$className$$(PDFFOPPreviewOnly previewObject)
    {
        // TODO add code to initialize the object with (test) data here
    }
	
    // ------------------------------------------------------------------------
    // property access
    // ------------------------------------------------------------------------

    // property >dateFormat<
    String m_dateFormat = "MM/DD/YYYY";
    public void setDateFormat(String dateFormat) { m_dateFormat = dateFormat; }
    public String getDateFormat() { return m_dateFormat; }

    // property >dateTimeFormat<
    String m_dayTimeFormat = "HH:MM AMPM";
    public void setDayTimeFormat(String dayTimeFormat) { m_dayTimeFormat = dayTimeFormat; }
    public String getDayTimeFormat() { return m_dayTimeFormat; }

    // property >decimalSeparator<
    String m_decimalSeparator = ".";
    public void setDecimalSeparator(String decimalSeparator) { m_decimalSeparator = decimalSeparator; }
    public String getDecimalSeparator() { return m_decimalSeparator; }

    // property >language<
    String m_language = "en";
    public void setLanguage(String value) { m_language = value; }
    public String getLanguage() { return m_language; }
    
    // property >timeStampFormat<
    String m_timeStampFormat = "MM/DD/YYYY";
    public void setTimeStampFormat(String timeStampFormat) { m_timeStampFormat = timeStampFormat; }
    public String getTimeStampFormat() { return m_timeStampFormat; }

    // ------------------------------------------------------------------------
    // public adapter methods
    // ------------------------------------------------------------------------
	
}
