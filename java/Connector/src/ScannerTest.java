import java.io.File;
import java.util.Scanner;

public class ScannerTest {

	public static void main(String[] args) throws Exception {
		
		Scanner fscanf = new Scanner(new File("/proc/self/stat"));
		String entry = null;
		
		long pid = fscanf.nextLong();
		String name = fscanf.next();
		String status = fscanf.next();
		
		fscanf.close();
		
		
		System.out.printf("pid: [%d]; name: [%s]; status: [%s]", pid, name, status);

	}

}
