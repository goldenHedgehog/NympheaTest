'use strict';
import ModelsMODEL         from '../models/models.model.js';
import MainMODEL           from './main.model.js';
//import MainHANDLER   from './main.handler.js';

import ArgsCTRL           from './args/args.controller.js';
import ObjsCTRL           from './objs/objs.controller.js';
import ResultCTRL         from './result/result.controller.js';

import MainVIEW           from './main.component.jsx';
import ModelSelectorVIEW  from './model_selector.component.jsx';

require("./main.less");

class MainCtr extends Nya.CONTROLLER{
    constructor(props){
        super(props);
        let SELF = this;
        SELF.initModel        = this.initModel.bind(this);
        SELF.onChangeModel    = this.onChangeModel.bind(this);
        SELF.SEND    = this.SEND.bind(this);
        SELF.processResult    = this.processResult.bind(this);
    }
    __GlobalEvent__CloseTab =()=>{ //назначает вотчер останавливающий все запущенные графики
        window.onbeforeunload = function() {
            if(_.isObject(ChartDataMODEL.get())){
                _.each(ChartDataMODEL.get(),(node,key)=>{ 
                    if(node){
                        if(node.stop){
                                node.stop()
                        }
                    }              
                })  
            }
          return null;
        };
    }
    init(props){
        let SELF = this;
        console.log(ModelsMODEL.get())
        //SELF.__GlobalEvent__CloseTab()
        SELF.ViewHandler.target = props.target;
        //MainHANDLER.setCB("getRefs",SELF.getTargetContent)
        ModelsMODEL.getPromiseRead().then(()=>{
            SELF.render();
        })
        
    }
    initModel(){
        let ctrObjs =  new ObjsCTRL({})
        ctrObjs.init({target:this.ViewHandler.getRefs().initial_data});
        ArgsCTRL.init({target:this.ViewHandler.getRefs().args});
    }
    SEND(){
        let SELF = this;
        SELF.ViewHandler["setState_"+"sender_btn"]({disabled:true})
        let ctrResult =  new ResultCTRL({})
        ctrResult.init({target:SELF.ViewHandler.getRefs().result});
       

    }
    processResult(){
        let SELF = this;    
        SELF.ViewHandler["setState_"+"sender_btn"]({disabled:false})

    }



    processDefaultParams=(model)=>{
        let global_args = {}
        _.each(ModelsMODEL.get()[model].global_args.get(),(node,key)=>{
            global_args[node.id] = "";
            if(node.default)global_args[node.id] = node.default
        })
        return {global_args:global_args}
    }
    onChangeModel(props){
        let SELF = this;
        MainMODEL.clear();
        MainMODEL.set(props.value,"model",true);
        MainMODEL.set(SELF.processDefaultParams(props.value).global_args,"global_args",true);
        SELF.initModel();
    }
    render(){
        let SELF = this;
        SELF.ViewHandler.viewPromise = new Promise(function(resolve, reject) {
            ReactDom.render(
                React.createElement(MainVIEW,{}),SELF.ViewHandler.target,function(obj){
                    SELF.ViewHandler.getRefs = this.getRefs;
                    SELF.renderModelSelector(SELF.ViewHandler.getRefs().slector_model)
                    SELF.renderBtnSender(SELF.ViewHandler.getRefs().btn_sender)
                    SELF.renderBtnstopload(SELF.ViewHandler.getRefs().btn_DEV_stopload)
                    resolve(SELF.ViewHandler)
                })
        })
    }
    renderModelSelector(target){
        let SELF = this;
        ReactDom.render(
            React.createElement(ModelSelectorVIEW,{
                list:_.toArray(ModelsMODEL.get() ) ,
                onChange:SELF.onChangeModel                
            }),target,function(obj){
            })
    }
    renderBtnSender(target){
        let SELF = this;
        ReactDom.render(
            React.createElement(NyaUI.BTN.baseMU,{
                key_value:"sender_btn",
                class:"sender",
                subClass:"outline",
                icon:"get_app",
                name:"Получить результат",
                onClick : SELF.SEND,
                
            }),
            target,
            function(obj){
                SELF.ViewHandler["setState_"+"sender_btn"] = this.setState.bind(this);
                //SELF.ViewHandler["setState_"+"edit_btn"]({disabled:!SELF._check_access()})
            })
    }
    renderBtnstopload(target){
        let SELF = this;
        ReactDom.render(
            React.createElement(NyaUI.BTN.baseMU,{
                key_value:"btn_DEV_stopload",
                class:"sender",
                subClass:"outline",
                icon:"stop",
                name:"Стоп",
                onClick : SELF.processResult
            }),
            target,
            function(obj){

                //SELF.ViewHandler["setState_"+"sender_btn"] = this.setState.bind(this);
                //SELF.ViewHandler["setState_"+"edit_btn"]({disabled:!SELF._check_access()})
            })
    }
    
    
}

const MainCRTL = new MainCtr({});
export default  MainCRTL
