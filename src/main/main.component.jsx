'use strict';

export default class Main_main extends NyaUI.COMPONENT {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="main_view">
                <div className="main__inner">
                    <div className="header__wrapper" ref="header"> 
                    </div>

                    
                    <div className="slector_model__wrapper" ref="slector_model"></div>
                    <div className="model_props__wrapper" ref="model_props">
                        <div className="handler__wrapper">
                            <div className="btn_sender__wrapper" ref="btn_sender"></div>
                            <div className="btn_DEV_stopload__wrapper" ref="btn_DEV_stopload"></div>
                        </div>
                        <div className="destination__wrapper" ref="destination">
                            <div className="args__wrapper" ref="args"></div>
                            <div className="initial_data__wrapper" ref="initial_data"></div>
                        </div>
                        <div className="result__wrapper" ref="result">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
