'use strict';

export default class args_main extends NyaUI.COMPONENT {
    constructor(props){
        super(props);
        this.state = {list:{}}
    }
    render(){
        let list = _.map(this.state.list,(node,key)=>{
            return <div className="args_element__wrapper" key={key} ref={key}>{key}</div>
        })

        return(
            <div className="args__inner">
                {list}
            </div>
        )
    }
}
