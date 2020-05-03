'use strict';

export default class result_main extends NyaUI.COMPONENT {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="result__inner">
                <div className="content">
                    <div className="tabs__wrapper" ref="tabs"></div>
                    <div className="data__wrapper" ref="data"></div>
                </div>
                <div className="preloader__wrapper" ref="preloader"></div>
            </div>
        )
    }
}
