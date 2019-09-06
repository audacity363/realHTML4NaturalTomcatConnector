// Copyright (c) Software AG, Darmstadt
function createMySilverlightControl(pXaml,pDiv,pId,pWidth,pHeight)
{  
    Silverlight.createObject(
        pXaml,   
        pDiv,
        "SL_" + pId,
        {   
            width:pWidth, 
            height:pHeight,
            inplaceInstallPrompt:false, 
            background:'#FFFFFF',
            isWindowless:'false',
            framerate:'24',
            version:'1.0' 
        },
        {
            onError:null,
            onLoad:null  
        },
		pId);
}

