'use strict';

export default class Preloader extends NyaUI.COMPONENT {
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        let SELF = this;
        return(
            <div className="preloader" ref="main">
                <div className="catWalking"></div>
                <div className="message"> Загружаю результаты </div>

                <div className="btn_stop__wrapper" ref="btn_stop" ></div>
            </div>
        )
    }
}


