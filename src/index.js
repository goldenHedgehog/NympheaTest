'use strict';

import ModelsMODEL         from './models/models.model.js';
//import ProjectMODEL      from './project/project.model.js';
//import LogMODEL          from './log/log.model.js';


import MainCTRL            from './main/main.controller.js';
//import SnapshotCTRL      from './snapshot/main.controller.js';

//import NavigatorHANDLER  from './navigator/navigator.handler.js';

//require('./style.less');

window.onerror = function (msg, url, lineNo, columnNo, error) {
    /*Nya.SENDER.flogs({
        title: "Event: Error",
        log:{
            type: error.name,
            message:error.message,
            stack:error.stack,
        }
    }).send()*/
};
__webpack_require__.oe = function (err) {
    /*Nya.SENDER.flogs({
        title: "Event: Error",
        log:{
            type: err.name,
            message:err.message,
            stack:err.stack,
        }
    }).send()*/
    console.error(err);
    throw(err)
};


let initialize = function() {

    ModelsMODEL.read();
    //ProjectMODEL.read();
    //LogMODEL.openSocket();

    //let ctrMain;
    //let ctrNavigator;

    Nya.DevONLY.initDev(isDEVELOP);

    class initializeINDEX extends Nya.ROUTE{
        patches(){
            return {
                "#/":"Main",
                /*"#/user":"User",
                '#/projects(/:project)': 'Project',
                '#/logs(/:project)': 'Logs',
                '#/log(/:log)': 'Log',
                '#/snapshot(/:snapshot)': 'Snapshot',*/
            }
        }
        root(){
            return "#/"
        }
        rescue(){
           /* Nya.DevONLY.log("rescue");
            UserMODEL.getPromiseRead().then(function(){
                if(UserMODEL.haveDefaultProject()){
                    Nya.ROUTE.go("logs/"+UserMODEL.haveDefaultProject(),{needReload:true})
                }else{
                    Nya.ROUTE.go("projects",{needReload:true});
                }
            })*/
        }
        before_Main(props){
           /* NavigatorHANDLER.setBeforeCtrl(); //должен находиться перед назначением нового стейта
            UserMODEL.getPromiseRead().then(function(){
                if(UserMODEL.haveDefaultProject()){
                    Nya.ROUTE.go("logs/"+UserMODEL.haveDefaultProject(),{needReload:true})
                }else{
                    Nya.ROUTE.go("projects",{needReload:true});
                }
            })*/
        }
        Main(props){
            MainCTRL.init({target:document.getElementById("page")})
          //  console.log("init Dach",props)
           // cntMain.init({target:document.getElementById("page")});
        }
        
    }

    //require.ensure('./dependencies.js', function() { });
        
        require.ensure([
           // './main/main.controller.js',
           // './navigator/main.controller.js'
        ], function() {

            //let MainCTRL = require('./main/main.controller.js');

            //ctrMain = new MainCTRL.default();
            //ctrMain.init({target:document.getElementById("page")});

            //let NavigatorCTRL = require('./navigator/main.controller.js');
            //ctrNavigator = new NavigatorCTRL.default();
            //ctrNavigator.init({target:ctrMain.getTargetContent()()["nav"]});

            window.UI_settings = {
                UI:"Material",
                widgets:["Devexpress"],
                Notifer:{type:"Devexpress",ensure: Alertify},
                Tooltip:{type:"Devexpress",ensure: Tooltip}
            };

            Nya.ALERTY.reinit();
            NyaUI.reinit();

            const initializeINDEXCTR = new initializeINDEX();
            initializeINDEXCTR.start();

        });
   
};
new initialize();