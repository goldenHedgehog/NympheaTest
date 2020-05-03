'use strict';

export default class ModelsSelector extends NyaUI.COMPONENT {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let self = this;
        console.log(self.props.list)
        $(this.refs.dropdown).dxSelectBox({
	        dataSource: self.props.list,
	        displayExpr: "id",
        	valueExpr: "id",
	        placeholder: "Choose Model",
	        searchEnabled: true,
	        itemTemplate: function (data) {
	        	let icon = "";
	        	console.log(self.props.list,data)
	        	if(data.enabled){
	        		icon ="<span>active</span>"
	        	}else{
	        		icon ="<span>not active</span>"
	        	}
	            return "<div class='custom-item'>"+icon+"<div class='product-name'>" +
	                data.id + "</div></div>";
	        },
	        onValueChanged:function(data){
	       		 console.log(data)
	        	if(self.props.onChange)self.props.onChange({
	        		id:data.value ,
	        		value:data.value, 
	        		key_value:self.props.key_value})
	        }
	    });
    }
    render(){
        return(
            <div className="slector_model__inner">
                <div className="label"></div>
                <div className="dropdown__wrapper" ref='dropdown'></div>
            </div>
        )
    }
}


   