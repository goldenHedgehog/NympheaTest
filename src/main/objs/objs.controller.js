'use strict';
import ModelsMODEL         from '../../models/models.model.js';
import MainMODEL           from './../main.model.js';
//import MainHANDLER   from './main.handler.js';

//import ChartDataMODEL   from '../chart/chart_data.model.new.js';


import MainVIEW        from './objs.component.jsx';
import EditorVIEW      from './config.component.jsx';
import ResultVIEW      from './result.component.jsx';

export default class ArgsElementCtr extends Nya.CONTROLLER{
    constructor(props){
        super(props);
        let SELF = this;
        
        SELF.onChange    = SELF.onChange.bind(this);
        SELF.parseList   = SELF.parseList.bind(this)
    }
    init(props){
        let SELF = this;
        SELF.ViewHandler.target = props.target;
        SELF.render();
    }
    onChange(props){
        let SELF = this;
        //MainMODEL.setGlobalArgs(props.value,this.DataHandler.key)
        const regex1 = /(^(.*))/gm;
        let conf = this.ViewHandler.getDataEditor()
        let parsed = conf.match(regex1)
        MainMODEL.set(parsed,"objs",true);
        SELF.ViewHandler.setStateResult({list:parsed})
    }
    parseList(){
        let SELF = this;
        //SELF.ViewHandler.setState({list:SELF._getModel().global_args.get()})           
    }
    render(){
        let SELF = this;
        SELF.ViewHandler.viewPromise = new Promise(function(resolve, reject) {
            ReactDom.render(
                React.createElement(MainVIEW,{

                }),SELF.ViewHandler.target,function(obj){
                    SELF.ViewHandler.getRefs = this.getRefs;
                    SELF.ViewHandler.setState = this.setState.bind(this)
                    SELF.renderEditor(SELF.ViewHandler.getRefs().editor)
                    SELF.renderResult(SELF.ViewHandler.getRefs().result)
                    resolve(SELF.ViewHandler)
                })
        })
    }
    renderEditor(target){
        let SELF = this;
        SELF.ViewHandler.renderEditor = new Promise(function(resolve,reject){
          ReactDom.render(
              React.createElement(EditorVIEW,{
                config:"",
                onChange:SELF.onChange
              }),
              target,
              function(obj){
                  this.setConfig("")
                  SELF.ViewHandler.getDataEditor = this.getData
                  resolve()
              })
        })
    }
    renderResult(target){
        let SELF = this;
        SELF.ViewHandler.renderResult = new Promise(function(resolve,reject){
          ReactDom.render(
              React.createElement(ResultVIEW,{
              }),
              target,
              function(obj){
                  SELF.ViewHandler.setStateResult = this.setState.bind(this)
                  resolve()
              })
        })
    }
}

