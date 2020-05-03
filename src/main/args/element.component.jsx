'use strict';

export default class args_element extends NyaUI.COMPONENT {
    constructor(props){
        super(props);
        this.state = {name:""}
    }
    render(){
        

        return(
            <div className="args_element__inner">
                <label>{this.state.name}</label>
                <div className="field__wrapper" ref="field"></div>
                <div className="descr">
                    <div className="format"><label>Формат:</label><small>{this.state.format}</small></div>
                    <div className="values"><label>Допустимые значения:</label><small>{this.state.values || "Без ограничений"}</small></div>
                </div>
            </div>
        )
    }
}
