import realHTML.JSONConverter.JSONConverter;

public class Test {

	public static void main(String[] args) {
		JSONConverter conv = new JSONConverter("{\"test1\": \"Hellö Wörld\"}");
		
		try {
			conv.parse();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
}
