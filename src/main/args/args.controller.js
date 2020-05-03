'use strict';
import ModelsMODEL         from '../../models/models.model.js';
import MainMODEL           from './../main.model.js';
//import MainHANDLER   from './main.handler.js';
import ElementCTRL           from './element.controller.js';
//import ChartDataMODEL   from '../chart/chart_data.model.new.js';


import MainVIEW      from './args.component.jsx';


class ArgsCtr extends Nya.CONTROLLER{
    constructor(props){
        super(props);
        let SELF = this;
        SELF._getModel   = SELF._getModel.bind(this);
        SELF.processList = SELF.processList.bind(this)
    }
    _getModel(){
        console.log(MainMODEL.get(),ModelsMODEL.get())
        return ModelsMODEL.get()[MainMODEL.get().model]
    }
    init(props){
        let SELF = this;
        console.log(props,props.target)
        SELF.ViewHandler.target = props.target;
        SELF.render();
    }
    onChange(props){
        console.log(props)
    }
    processList(){
        let SELF = this;
        SELF.ViewHandler.setState({list:SELF._getModel().global_args.get()},function(){
            _.each(SELF._getModel().global_args.get(),(node,key)=>{
                let ctr = new ElementCTRL({key:key})
                ctr.init({target:SELF.ViewHandler.getRefs()[key]})
            })
            
        })           
    }
    render(){
        let SELF = this;
        SELF.ViewHandler.viewPromise = new Promise(function(resolve, reject) {
            ReactDom.render(
                React.createElement(MainVIEW,{

                }),SELF.ViewHandler.target,function(obj){
                    SELF.ViewHandler.getRefs = this.getRefs;
                    SELF.ViewHandler.setState = this.setState.bind(this)
                    SELF.processList()
                    //SELF.renderModelSelector(SELF.ViewHandler.getRefs().slector_model)
                    resolve(SELF.ViewHandler)
                })
        })
    }
}

const ArgsCTRL = new ArgsCtr({});
export default  ArgsCTRL
