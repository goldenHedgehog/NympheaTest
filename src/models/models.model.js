'use strict';

class GlobalArgsModel extends Nya.MODEL{
    constructor(props){
        super({ctrl:"models"});
        let SELF = this;
    }
   /* shared(){
        let SELF = this;
        let url = SELF.baseUrl()+SELF.CTRL+"/shared";
        let request_method = "POST";

        SELF.requestShared = Nya.LoaderFactory.get(url, {id:this.MODEL.id}, request_method);
        SELF.promiseShared = new Promise(function(resolve,reject){
            SELF.requestShared
                .success(function(data){
                    SELF.SHARED = data.data
                    resolve(data)
                })
                .error(function(msg){
                    reject(msg)
                })
        })
        return SELF.promiseShared
    }*/
    defaultModel(){
        return {
             //"id":             0,
             //"name":           "",
             //"format":         "json",
             //"description" :   "",
             //"default" :       0, если сеть этот параметр, то он подставляется если не был указан пользователь
             //values : если есть эти значение, то показываем ползователю дропдааун с этими значниями
        }
    }//дефолтная модель
    toModelProcess(data){
        let SELF = this;
        if(_.isEmpty(data)) return {}
        if(_.isArray(data)){
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
        }
        return SELF.MODEL
    }

}
class Models extends  Nya.MODEL{
    constructor(props){
        super({ctrl:"models"});
        //this.CTRL = "models";
        let SELF = this;
        this.useProcessResolve = ['read'];
    }
    defaultModel(){
        return {
            id:0,
            description:"",
            enabled:true, //модель досупна для выбора
            global_args:[],
            objs:{} //подсказка для целей
        }
    }
    read(){
        let SELF = this;
        SELF.promiseRead = new Promise(function(resolve,reject){
            let data = [
              {
                "id": "stellarage_cltv_extra",
                "description": "Предсказание LTV (экстраполяция)",
                "enabled": true,
                "global_args": [
                  {
                    "id": "arg1",
                    "name": "prediction_day",
                    "format": "date",
                    "description": "с какого дня (%Y-%m-%d) делается предикт"
                  },
                  {
                    "id": "arg2",
                    "name": "target_days",
                    "format": "json",
                    "description": "на какие дни делать предикты (default: [30, 150])",
                    "default": "[30, 150]"
                  },
                  {
                    "id": "arg3",
                    "name": "example",
                    "format": "int",
                    "description": "example",
                    "default": 7,
                    "values": [7, 14]
                  }
                ],
                "objs": {
                  "description": "regdate когорт",
                  "format": "date"
                }
              },]

            SELF.toEtalonProcess({data:data});
            SELF.toModelProcess({data:data});
            resolve(data)
        });
        return SELF.promiseRead
    }
    toModelProcess(data){
        let SELF = this;
        if(_.isEmpty(data.data) && data.message == "not allowed"){
            Nya.ALERTY.warning("Нет доступа",{needAlert:true});
            return
        }
        console.log()
        if(_.isObject(data.data) ){
            _.each(data.data,function(node,key){
                if(_.isEmpty(node))return;
                let keyModel = node.id+"";

                let el = {
                    id:           node.id,
                    description:  node.description || "",
                    enabled:      node.enabled,
                    global_args:  new GlobalArgsModel({parent:SELF}),
                    objs:         {
                        description:node.objs.description,
                        format:     node.objs.format,
                    },
                }
                el.global_args.init({defaultData:node.global_args})
                SELF.MODEL[keyModel] = el;
            });
        }else{
             Nya.ALERTY.error("LOGModel toModelProcess can't process data, incorrect format");
        }
        return $.extend(true,{}, this.MODEL);
    }
}
const ModelsMODEL = new Models();
export default ModelsMODEL
