package realHTML.JSONConverter;

import java.util.ArrayList;
import java.util.HashMap;

import realHTML.JSONConverter.signatures.ArraySignature;
import realHTML.JSONConverter.signatures.ObjectSignature;

public class Rh4nObjectArray {
	
	ArrayList<Object> target = null;
	ArraySignature arrcontainer = null;
	
	public Rh4nObjectArray(ArrayList<Object> target, ArraySignature arrcontainer) {
		this.target = target;
		this.arrcontainer = arrcontainer;
	}
	
	public ObjectSignature getSignature() throws Exception {
		ObjectSignature objsig = null;
		HashMap<String, Object> firstentry = null;
		
		firstentry = this.getFirstObject();
		objsig = new Rh4nObject(firstentry).getSignature();
		
		if(!this.compareAllSignatures(objsig, this.target, 1)) {
			throw new Exception("Every Object have to have the same signature");
		}
		
		objsig.convertToArray(this.arrcontainer);
		
		return(objsig);
	}
	
	@SuppressWarnings("unchecked")
	private HashMap<String, Object> getFirstObject() {
		Object hptr = this.target;
		
		for(int i = 0; i < this.arrcontainer.dimensions; i++) {
			hptr = ((ArrayList<Object>)hptr).get(i);
		}
		return((HashMap<String, Object>)hptr);
	}
	
	@SuppressWarnings("unchecked")
	private Boolean compareAllSignatures(ObjectSignature rootsig, ArrayList<Object> value, int curdim) throws Exception {
		Object target = null;
		ObjectSignature tmpsig = null;
		
		for(int i = 0; i < value.size(); i++) {
			target = value.get(i);
			if(curdim != this.arrcontainer.dimensions) {
				if(!compareAllSignatures(rootsig, (ArrayList<Object>)target, curdim+1)) {
					return(false);
				}
			} else {
				tmpsig = new Rh4nObject((HashMap<String, Object>)target).getSignature();
				if(!rootsig.equals(tmpsig)) {
					System.out.println("Root signature:");
					rootsig.printList();
					System.out.println("Failed compare:");
					tmpsig.printList();
					return(false);
				}
			}
		}
		
		return(true);
	}
}
