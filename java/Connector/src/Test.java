

import realHTML.JSONConverter.JSONConverter;
import realHTML.JSONConverter.signatures.ObjectSignature;
import realHTML.jni.JNI;
import realHTML.jni.SessionInformations;
import realHTML.tomcat.environment.EnvironmentVar;

public class Test {
	
	static {
		System.out.println(System.getProperty("user.dir"));
		System.load(System.getProperty("user.dir") + "/../../bin/librealHTMLconnector.so");
	}
	
	public static native int devDumpJSONConverterValues(ObjectSignature sig);
//	public static native void arrayTest(int[] arr);
//	public static native int startPlainNatural(SessionInformations sessionInformations, String httpMethod, String natbin, ObjectSignature urlvars, ObjectSignature bodyvars);
//
//	public static void main(String[] args) {
//		JSONConverter conv = new JSONConverter("{\"test4\": false, \"test5\": 12, \"test1\": [\"Hello World\"], \"test2\": [1, 2], \"test3\": {\"test31\":\"Hello\"}  }");
//		
//		try {
//			ObjectSignature sig = conv.parse();
//			devDumpJSONConverterValues(sig);
//		} catch(Exception e) {
//			e.printStackTrace();
//		}
//	}
	
	public static void main(String[] argv) throws Exception {
		
//		ObjectSignature sig = new JSONConverter("{\"var1\":[{\"_id\":\"5e42f977047c912423a946c5\",\"index\":0,\"guid\":\"a17f18e3-6dca-4307-9007-d4980f21fe14\",\"isActive\":true,\"balance\":\"$3,684.01\",\"picture\":\"http://placehold.it/32x32\",\"age\":39,\"eyeColor\":\"blue\",\"name\":{\"first\":\"Hunt\",\"last\":\"Wyatt\"},\"company\":\"PHOLIO\",\"email\":\"hunt.wyatt@pholio.com\",\"phone\":\"+1 (897) 529-3480\",\"address\":\"527 Ebony Court, Ronco, Kansas, 720\",\"about\":\"Consequat cillum adipisicing aliqua nisi laboris. Nostrud fugiat ea anim laboris nisi et dolore eu pariatur veniam. Consequat labore duis dolor qui id excepteur et minim in exercitation consequat aliqua ex.\",\"registered\":\"Sunday, December 14, 2014 1:49 PM\",\"latitude\":\"-82.342363\",\"longitude\":\"-159.850693\",\"tags\":[\"adipisicing\",\"eiusmod\",\"laborum\",\"proident\",\"non\"],\"range\":[0,1,2,3,4,5,6,7,8,9],\"friends\":[{\"id\":0,\"name\":\"Mcmahon Boone\"},{\"id\":1,\"name\":\"Jacobs Whitaker\"},{\"id\":2,\"name\":\"Millicent Morgan\"}],\"greeting\":\"Hello, Hunt! You have 6 unread messages.\",\"favoriteFruit\":\"apple\"},{\"_id\":\"5e42f977965237cb5e80b402\",\"index\":1,\"guid\":\"3a50debe-a28d-412e-99e0-c22c6217ff06\",\"isActive\":true,\"balance\":\"$1,228.22\",\"picture\":\"http://placehold.it/32x32\",\"age\":40,\"eyeColor\":\"green\",\"name\":{\"first\":\"Mercedes\",\"last\":\"Glover\"},\"company\":\"APEXTRI\",\"email\":\"mercedes.glover@apextri.org\",\"phone\":\"+1 (894) 584-2424\",\"address\":\"591 Guernsey Street, Lavalette, Wisconsin, 1032\",\"about\":\"Et ut duis velit amet est et nostrud do eiusmod tempor eiusmod laboris ex. Ea laborum labore esse magna. Ad officia elit tempor do aute officia minim Lorem. Commodo consectetur pariatur minim aute dolor anim dolore deserunt est nulla. Eu ut aliquip excepteur commodo ad nostrud velit in.\",\"registered\":\"Monday, August 3, 2015 7:48 AM\",\"latitude\":\"-19.977787\",\"longitude\":\"-167.722441\",\"tags\":[\"nostrud\",\"esse\",\"ea\",\"tempor\",\"magna\"],\"range\":[0,1,2,3,4,5,6,7,8,9],\"friends\":[{\"id\":0,\"name\":\"Catherine Lambert\"},{\"id\":1,\"name\":\"Concetta Hicks\"},{\"id\":2,\"name\":\"Letha Stevenson\"}],\"greeting\":\"Hello, Mercedes! You have 10 unread messages.\",\"favoriteFruit\":\"apple\"},{\"_id\":\"5e42f977735ff2cad07afad6\",\"index\":2,\"guid\":\"2f62d427-f0ea-48f3-ab18-286641868f13\",\"isActive\":false,\"balance\":\"$3,736.03\",\"picture\":\"http://placehold.it/32x32\",\"age\":38,\"eyeColor\":\"green\",\"name\":{\"first\":\"May\",\"last\":\"Holt\"},\"company\":\"AQUASURE\",\"email\":\"may.holt@aquasure.info\",\"phone\":\"+1 (817) 519-2125\",\"address\":\"904 Olive Street, Bethany, District Of Columbia, 8592\",\"about\":\"Aute nisi ullamco magna nulla do mollit ea voluptate aute. Elit irure pariatur exercitation est ullamco occaecat. Qui dolore cillum irure deserunt aliqua ea exercitation magna ad. Exercitation aute non minim id amet ad qui dolore.\",\"registered\":\"Friday, February 7, 2020 10:40 PM\",\"latitude\":\"34.319638\",\"longitude\":\"-80.837402\",\"tags\":[\"deserunt\",\"occaecat\",\"voluptate\",\"minim\",\"proident\"],\"range\":[0,1,2,3,4,5,6,7,8,9],\"friends\":[{\"id\":0,\"name\":\"Bertha Conrad\"},{\"id\":1,\"name\":\"Vang Burch\"},{\"id\":2,\"name\":\"Best Garrison\"}],\"greeting\":\"Hello, May! You have 9 unread messages.\",\"favoriteFruit\":\"apple\"},{\"_id\":\"5e42f97703103b3b49a60118\",\"index\":3,\"guid\":\"d0e734ad-2bd8-42f1-938b-ffd9d363a95d\",\"isActive\":false,\"balance\":\"$2,692.95\",\"picture\":\"http://placehold.it/32x32\",\"age\":22,\"eyeColor\":\"blue\",\"name\":{\"first\":\"Sellers\",\"last\":\"Washington\"},\"company\":\"GOLISTIC\",\"email\":\"sellers.washington@golistic.us\",\"phone\":\"+1 (818) 553-3118\",\"address\":\"499 Bouck Court, Oceola, Hawaii, 5612\",\"about\":\"Magna eu duis occaecat laborum non sunt consequat esse. Tempor laborum minim culpa reprehenderit aliquip adipisicing aute labore cupidatat. Qui reprehenderit quis qui amet voluptate. Laboris laborum eiusmod in voluptate qui ut deserunt velit sint aute dolore.\",\"registered\":\"Friday, January 24, 2014 12:27 PM\",\"latitude\":\"-63.132087\",\"longitude\":\"65.835084\",\"tags\":[\"proident\",\"Lorem\",\"irure\",\"esse\",\"laborum\"],\"range\":[0,1,2,3,4,5,6,7,8,9],\"friends\":[{\"id\":0,\"name\":\"Charlene Ferguson\"},{\"id\":1,\"name\":\"Mcconnell Ayala\"},{\"id\":2,\"name\":\"Jan Macdonald\"}],\"greeting\":\"Hello, Sellers! You have 6 unread messages.\",\"favoriteFruit\":\"apple\"},{\"_id\":\"5e42f9776aad6818a2662a54\",\"index\":4,\"guid\":\"59c54d1c-7c72-440e-9375-3cbbf52d221f\",\"isActive\":true,\"balance\":\"$3,475.12\",\"picture\":\"http://placehold.it/32x32\",\"age\":30,\"eyeColor\":\"brown\",\"name\":{\"first\":\"Noemi\",\"last\":\"Kinney\"},\"company\":\"NEPTIDE\",\"email\":\"noemi.kinney@neptide.tv\",\"phone\":\"+1 (825) 417-2603\",\"address\":\"362 Gunnison Court, Imperial, New York, 899\",\"about\":\"Quis cillum voluptate ut aute officia velit est culpa cillum aute veniam non. Qui est dolore proident culpa aliquip exercitation et velit anim voluptate dolor eu. Ad do duis velit nisi laborum in sint incididunt adipisicing ipsum mollit ullamco cupidatat. Anim ea magna enim cillum qui quis deserunt mollit non esse ex. Laboris velit sint excepteur eu dolore do excepteur est minim esse consectetur nostrud ea. Lorem exercitation deserunt reprehenderit pariatur est duis cillum enim quis officia sit magna incididunt. Deserunt eiusmod cillum ipsum in laboris culpa irure dolore Lorem ullamco sit adipisicing.\",\"registered\":\"Thursday, August 27, 2015 1:57 AM\",\"latitude\":\"67.171438\",\"longitude\":\"116.670246\",\"tags\":[\"adipisicing\",\"anim\",\"excepteur\",\"velit\",\"amet\"],\"range\":[0,1,2,3,4,5,6,7,8,9],\"friends\":[{\"id\":0,\"name\":\"Linda Ford\"},{\"id\":1,\"name\":\"Hahn House\"},{\"id\":2,\"name\":\"Cornelia Pena\"}],\"greeting\":\"Hello, Noemi! You have 8 unread messages.\",\"favoriteFruit\":\"strawberry\"}]}").parse();
		ObjectSignature sig = new JSONConverter("{\"var1\": [{\"var2\": \"val1\"}, {\"var2\": \"val2\"}]}").parse();
		
		Test.devDumpJSONConverterValues(sig);
		
//		JNI jniloader = new JNI();
		
//		EnvironmentVar[] testvars = {new EnvironmentVar("var1", "content1", false), new EnvironmentVar("var2", "var2", true)};
		
//		SessionInformations infos = new SessionInformations();
//		infos.natlibrary = "LIB1"; infos.natprogram ="PROG1";
//		infos.natsrcpath = "/tmp/natsrc"; infos.natparms = "etid=$$";
//		infos.loglevel = "DEVELOP"; infos.logpath = "";
//		infos.outputfile = "/tmp/outputfile";
//		infos.username = "";
		
		
		
		
		//jniloader.startNaturalPlain(infos, "GET", "/SAG/nat/v63140/bin/", testvars, null, null);
	}
}
