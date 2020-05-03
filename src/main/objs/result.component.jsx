'use strict';

export default class objs_result extends NyaUI.COMPONENT {
    constructor(props){
        super(props);
        this.state = {list:[]}
    }
    render(){
        let list = _.map(this.state.list,(node,key)=>{
            return <label key={key}>{node}</label>
        })

        return(
            <div className="result__inner">
                {list}
            </div>
        )
    }
}
