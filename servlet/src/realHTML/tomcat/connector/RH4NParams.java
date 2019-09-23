package realHTML.tomcat.connector;

import java.util.ArrayList;
import java.io.UnsupportedEncodingException;

import realHTML.tomcat.environment.EnvironmentVar;

public class RH4NParams {
    private class UrlVariable {
        public byte[] key;
        public byte[] value;

        public UrlVariable(byte[] key, byte[] value) {
            byte[] tmp = new byte[key.length+1];
            System.arraycopy(key, 0, tmp, 0, key.length);
            tmp[tmp.length-1] = 0x00;
            this.key = tmp;

            tmp = new byte[value.length+1];
            System.arraycopy(value, 0, tmp, 0, value.length);
            tmp[tmp.length-1] = 0x00;
            this.value = tmp;
        }
    }

    public ArrayList<UrlVariable> urlvars = null;
    public String reqType;
    public String natLibrary;
    public String natProgram;
    public String natparms;
    public String natbinpath;
    public String outputfile;
    public String loglevel;
    public String natsrcpath;
    public String logpath;
    public String errorRepresentation;
    public String username;
    public String charEncoding;

    public EnvironmentVar[] environs;


    public void addUrlVariable(byte[] key, byte[] value) {
        if(this.urlvars == null) {
            this.urlvars = new ArrayList<UrlVariable>();
        }

        this.urlvars.add(new UrlVariable(key, value));
    }

    public void addUrlVariable(String key, String value) throws UnsupportedEncodingException {
        byte[] tmp = value.getBytes();
        /*System.out.print("Add URL Var Orig: ");
        for(int i = 0; i < tmp.length; i++) {
            System.out.printf("0x%x ", tmp[i]);
        }
        System.out.println();*/

        this.addUrlVariable(key.getBytes("ISO-8859-1"), value.getBytes("ISO-8859-1"));
    }

    public void printUrlVariables() {
        System.out.println("===============URL Variables================");

        if(this.urlvars != null) {
            for(int i = 0; i < this.urlvars.size(); i++) {
                UrlVariable tmp = this.urlvars.get(i);
                System.out.printf("Name: ");
                for(int x = 0; x < tmp.key.length; x++) {
                    System.out.printf("0x%x ", tmp.key[x]);
                }
                System.out.println();

                System.out.print("Value: ");
                for(int x = 0; x < tmp.value.length; x++) {
                    System.out.printf("0x%x ", tmp.value[x]);
                }
                System.out.println();
            }
        }
        System.out.println("==========================================");
    }
}

