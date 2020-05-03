'use strict';

export default class Main_navigator extends NyaUI.COMPONENT {
    constructor(props) {
        super(props);
        //this.getData    = this.getData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.refresh    = this.refresh.bind(this);
        //this.getFilter  = this.getFilter.bind(this);
    }
    componentDidMount(){
        let SELF = this;

        $(this.refs.grid).dxDataGrid({
            //height:"100%",
            width:"100%",
            dataSource: [],
            columns:  [],
            //hoverStateEnabled:true,
            /*filterRow: {
                visible: true,
                applyFilter: "onClick"
            },*/
           // rowAlternationEnabled: true,
           // allowColumnResizing: true,
           // columnResizingMode: "widget",
          //  filterSyncEnabled:false,
           // remoteOperations:true,

           // cacheEnabled:false,

           


/*     pagination start      */
            pager: {
               // showPageSizeSelector: true,
                allowedPageSizes:  [10,23],
                showInfo: true
            },
            paging: {
                pageSize: 10
            },
            noDataText:"I'm waiting data",
            columnChooser: {
                enabled: false
            },
            height: "100%",
        });
    }
    getData(){
        let SELF = this;
        this.props.getData().then(function(data){
            SELF.updateData(data)
        })
    }
    updateData(data){
        let SELF = this;
        console.log("updateData",data)
        var departmentsGrid =  $(SELF.refs.grid).dxDataGrid('instance');
        departmentsGrid.option({
            dataSource: data.dataSource,
            columns:data.columns
        });
        departmentsGrid.pageIndex(0)
    }

    updateDataOnly=(data)=>{
        let SELF = this;
        console.log("updateDataOnly",data)
        var departmentsGrid =  $(SELF.refs.grid).dxDataGrid('instance');
        departmentsGrid.option({
            dataSource: data.data,
            //columns:data.columns
        });
    }
    clearData =()=> {
        let SELF = this;
        var departmentsGrid =  $(SELF.refs.grid).dxDataGrid('instance');
        departmentsGrid.option({
            dataSource: [],
        });
    }
    refresh(data){
        let SELF = this;
        $(this.refs.grid).dxDataGrid("refresh");
    }
    render(){
        return(
            <div className="result__inner" ref="inner">
                <div ref="where"></div>
                <div className="filter_preview__wrapper" ref="filter_preview"></div>
                <div className="apply_filter_btn__wrapper" ref="apply_filter_btn"></div>
                <div ref="grid"></div>
                <div className="get_more" ref="get_next"></div>
                <div className="pull_loading__wrapper" ref="pull_loading"></div>
                <div className="pull_loading__wrapper" ref="pull_loading"></div>
            </div>
        )
    }
}


