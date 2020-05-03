'use strict';

class MainModel extends Nya.MODEL{
    constructor(props){
        super({ctrl:"predict"});
        let SELF = this;
    }
    defaultModel(){
        return {
             "model":             "",
             "global_args":       {},
             "objs":              [],
        }
    }//дефолтная модель
    toModelProcess(data){
        let SELF = this;
        if(_.isEmpty(data)) return {}

        /*if(_.isArray(data)){
            _.each(data,function(node,key){
                if(_.isEmpty(node))return;
                let keyModel = node.id+"";
                let el = {
                    "id":             node.id,
                    "name":           node.name,
                    "format":         node.format,
                    "description" :   node.description,
                };
                if(node.default) el.default = node.default;
                if(node.values) el.values = node.values;
                SELF.MODEL[keyModel] = el;
            });
        }*/
        return SELF.MODEL
    }
    toServerProcess(){

    }
    setGlobalArgs(data,key){
        this.MODEL.global_args[key]=data;
    }
}

const MainMODEL = new MainModel();
export default MainMODEL