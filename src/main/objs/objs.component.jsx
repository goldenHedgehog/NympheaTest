'use strict';

export default class args_main extends NyaUI.COMPONENT {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="args__inner">
                <div className="editor" ref="editor"></div>
                <div className="result" ref="result"></div>
            </div>
        )
    }
}
