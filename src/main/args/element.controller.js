'use strict';
import ModelsMODEL         from '../../models/models.model.js';
import MainMODEL           from './../main.model.js';
//import MainHANDLER   from './main.handler.js';

//import ChartDataMODEL   from '../chart/chart_data.model.new.js';


import MainVIEW      from './element.component.jsx';


export default class ArgsElementCtr extends Nya.CONTROLLER{
    constructor(props){
        super(props);
        let SELF = this;
        SELF.DataHandler = {
            key:props.key
        }
        SELF._getModel   = SELF._getModel.bind(this);
        SELF.onChange    = SELF.onChange.bind(this);
        SELF.processList = SELF.processList.bind(this)
    }
    _getModel(){
        console.log(MainMODEL.get(),ModelsMODEL.get())
        return ModelsMODEL.get()[MainMODEL.get().model].global_args.get()[this.DataHandler.key]
    }
    init(props){
        let SELF = this;
        SELF.ViewHandler.target = props.target;
        SELF.render();
    }
    onChange(props){
        MainMODEL.setGlobalArgs(props.value,this.DataHandler.key)
        console.log(MainMODEL.get())
    }
    processList(){
        let SELF = this;
        SELF.ViewHandler.setState({list:SELF._getModel().global_args.get()})           
    }
    render(){
        let SELF = this;
        SELF.ViewHandler.viewPromise = new Promise(function(resolve, reject) {
            ReactDom.render(
                React.createElement(MainVIEW,{

                }),SELF.ViewHandler.target,function(obj){
                    SELF.ViewHandler.getRefs = this.getRefs;
                    SELF.ViewHandler.setState = this.setState.bind(this)
                    let values;
                    if (SELF._getModel().values) values = JSON.stringify(SELF._getModel().values)
                    SELF.ViewHandler.setState({
                        values:values,
                        format:SELF._getModel().format
                    })
                    SELF.renderField(SELF.ViewHandler.getRefs().field)
                    resolve(SELF.ViewHandler)
                })
        })
    }
    renderField(target){
        let SELF = this;
        let params = {
            required:true,
            key_value:"key",
            label:SELF._getModel().name,
            onChange: SELF.onChange,
            placeholder:"Укажите значение"
        };
        if(SELF._getModel().default) params.placeholder = SELF._getModel().default;

        SELF.ViewHandler.renderField = new Promise(function(resolve,reject){
          ReactDom.render(
              React.createElement(NyaUI.INPUT.base,params),
              target,
              function(obj){
                  resolve()
              })
        })
    }
}

