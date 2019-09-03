package realHTML.tomcat.JSONMatcher;

import com.eclipsesource.json.*;

public class JSONObject {
	
	JsonObject target;
	JSONUtils utils;
	LLHandler signature;
    String errorMsg;
	
	public JSONObject(JsonObject object) {
		this.target = object;
		this.utils = new JSONUtils();
	}
	
	public void createObjectSignature() throws JSONArrayException, JSONObjectException {
		this.signature = new LLHandler();
		Types type;
		String name;
		JSONArray arrayhandler;
		JsonValue value;
		Integer xlength = -1, ylength = -1, dimensions;
		
		for(JsonObject.Member member: this.target) {
			value = member.getValue();
			name = member.getName();
			if(value.isArray()) {
				arrayhandler = new JSONArray(value.asArray());
				type = arrayhandler.getArrayVarType();
				dimensions = type.getArrayDimension(type);
				if(dimensions == 1) {
					xlength = arrayhandler.getXLength();
				} else if (dimensions == 2) {
					xlength = arrayhandler.getXLength();
					ylength = arrayhandler.getYLength();
				}
				this.signature.addVar(name, type, xlength, ylength, -1);
				xlength = -1;
				ylength = -1;
			} else if(value.isObject()) {
				throw new JSONObjectException("Second level of Objects not supported in array of objects");
			} else {
				type = this.utils.getJSONType(value);
				this.signature.addVar(name, type, null);
			}
			
		}
		//System.out.println("Signature:");
		//this.signature.printList();
	}
	
	public Boolean compareSignatures(LLHandler target) {
		
		LLNode hptrl, hptrr;
		
		if(this.signature.size() != target.size()) {
            this.errorMsg = String.format("this size: [%d] and target size [%d] does not match", this.signature.size(),
                target.size());
			return(false);
		}
		
		hptrl = this.signature.getHead().next;
        for(; hptrl != null; hptrl = hptrl.next) {
            hptrr = target.searchVar(null, null, hptrl.name);
            if(hptrr == null) {
                this.errorMsg = String.format("Variable [%s] not found", hptrl.name);
                return(false);
            }

            if(hptrl.type != hptrr.type) {
                this.errorMsg = String.format("hptrl Type: [%s] and hptrr Type: [%s] does not match", hptrl.type, hptrr.type);
                return(false);
            }
        }

		return(true);
	}

    public String getErrorStr() {
        return(this.errorMsg);
    }
	
	public LLHandler getSignature() {
		return(this.signature);
	}
}
