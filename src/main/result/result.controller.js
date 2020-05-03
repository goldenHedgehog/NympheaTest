'use strict';

import MainMODEL           from './../main.model.js';
//import MainHANDLER   from './main.handler.js';


import MainVIEW            from './result.component.jsx';
import PreloaderVIEW       from './preloader.component.jsx';
import TabsVIEW            from './tabs.component.jsx';
import DataVIEW            from './data.component.jsx';

export default class ResultCtr extends Nya.CONTROLLER{
    constructor(props){
        super(props);
        let SELF = this;
        
        //SELF.onChange    = SELF.onChange.bind(this);
        SELF.parseResult   = SELF.parseResult.bind(this)
        SELF.processResult   = SELF.processResult.bind(this);
        SELF.selectDataTab   = SELF.selectDataTab.bind(this);
    }
    init(props){
        let SELF = this;
        SELF.ViewHandler.target = props.target;
        SELF.render();
    }
    parseTabs(){
        let SELF = this;
        let list = _.map(testtsbs,(node,key)=>{
          return {id:key, name:node}
        })
        return list
    }
    parseResult(key){
        let SELF = this;

        let column = ["CompanyName", "City", "State", "Phone", "Fax"];
        let result = data[key]
        console.log(data)
        //SELF.ViewHandler.setState({list:SELF._getModel().global_args.get()})        
        return {
          columns:column,
          dataSource:result
        } 
    }

    processResult(){
      
      let SELF = this;
      SELF.renderPreloader();
      //onpromice
      SELF.renderTabs();
      SELF.renderData();
      Promise.all([
        SELF.ViewHandler.renderTabs, 
        SELF.ViewHandler.renderData
        ]).then(values => { 
          SELF.selectDataTab(0);
        }
      );
    }
    selectDataTab(key){
      let SELF = this;
      SELF.ViewHandler.setActiveTabs(key);
      SELF.ViewHandler.refreshData()
      SELF.ViewHandler.updateDataData( SELF.parseResult(testtsbs[key]) )
    }
    render(){
        let SELF = this;
        SELF.ViewHandler.viewPromise = new Promise(function(resolve, reject) {
            ReactDom.render(
                React.createElement(MainVIEW,{

                }),SELF.ViewHandler.target,function(obj){
                    SELF.ViewHandler.getRefs = this.getRefs;
                    SELF.ViewHandler.setState = this.setState.bind(this)
                    //SELF.renderEditor(SELF.ViewHandler.getRefs().editor)
                    //SELF.renderResult(SELF.ViewHandler.getRefs().result)
                    SELF.processResult()
                    resolve(SELF.ViewHandler)
                })
        })
    }
    renderPreloader(){
        let SELF = this;
        SELF.ViewHandler.renderPreloader = new Promise(function(resolve,reject){
          ReactDom.render(
              React.createElement(PreloaderVIEW,{
              }),
              SELF.ViewHandler.getRefs().preloader,
              function(obj){
                  resolve()
              })
        })
    }

    renderTabs(){
      let SELF = this;
        SELF.ViewHandler.renderTabs = new Promise(function(resolve,reject){
          ReactDom.render(
              React.createElement(TabsVIEW,{
                open:SELF.selectDataTab
              }),
              SELF.ViewHandler.getRefs().tabs,
              function(obj){
                  SELF.ViewHandler.setActiveTabs = this.setActive
                  this.setState({list:SELF.parseTabs()})    
                  resolve()
              })
        })
    }
    renderData(){
      let SELF = this;
        SELF.ViewHandler.renderData = new Promise(function(resolve,reject){
          ReactDom.render(
              React.createElement(DataVIEW,{
                //open:SELF.selectDataTab
              }),
              SELF.ViewHandler.getRefs().data,
              function(obj){
                  SELF.ViewHandler.refreshData = this.refresh  
                  SELF.ViewHandler.updateDataData = this.updateData  
                  resolve()
              })
        })
    }
}
const testtsbs = ["a_tab","b_tab","cTab","d_tab"];

const b_tabData = [{
    "ID": 1,
    "CompanyName": "Super Mart of the West testB",
    "Address": "702 SW 8th Street testB",
    "City": "Bentonville testB",
    "State": "Arkansas testB",
    "Zipcode": 72716,
    "Phone": "(800) 555-2797",
    "Fax": "(800) 555-2171",
    "Website": "http://www.nowebsitesupermart.com testB"
}, {
    "ID": 2,
    "CompanyName": "Electronics Depot testB",
    "Address": "2455 Paces Ferry Road NW testB",
    "City": "Atlanta testB",
    "State": "Georgia",
    "Zipcode": 30339,
    "Phone": "(800) 595-3232",
    "Fax": "(800) 595-3231",
    "Website": "http://www.nowebsitedepot.com"
}, {
    "ID": 3,
    "CompanyName": "K&S Music",
    "Address": "1000 Nicllet Mall",
    "City": "Minneapolis",
    "State": "Minnesota",
    "Zipcode": 55403,
    "Phone": "(612) 304-6073",
    "Fax": "(612) 304-6074",
    "Website": "http://www.nowebsitemusic.com"
}, {
    "ID": 4,
    "CompanyName": "Tom's Club",
    "Address": "999 Lake Drive",
    "City": "Issaquah",
    "State": "Washington",
    "Zipcode": 98027,
    "Phone": "(800) 955-2292",
    "Fax": "(800) 955-2293",
    "Website": "http://www.nowebsitetomsclub.com"
}, {
    "ID": 5,
    "CompanyName": "E-Mart",
    "Address": "3333 Beverly Rd",
    "City": "Hoffman Estates",
    "State": "Illinois",
    "Zipcode": 60179,
    "Phone": "(847) 286-2500",
    "Fax": "(847) 286-2501",
    "Website": "http://www.nowebsiteemart.com"
}, {
    "ID": 6,
    "CompanyName": "Walters",
    "Address": "200 Wilmot Rd",
    "City": "Deerfield",
    "State": "Illinois",
    "Zipcode": 60015,
    "Phone": "(847) 940-2500",
    "Fax": "(847) 940-2501",
    "Website": "http://www.nowebsitewalters.com"
}, {
    "ID": 7,
    "CompanyName": "StereoShack",
    "Address": "400 Commerce S",
    "City": "Fort Worth",
    "State": "Texas",
    "Zipcode": 76102,
    "Phone": "(817) 820-0741",
    "Fax": "(817) 820-0742",
    "Website": "http://www.nowebsiteshack.com"
}, {
    "ID": 8,
    "CompanyName": "Circuit Town",
    "Address": "2200 Kensington Court",
    "City": "Oak Brook",
    "State": "Illinois",
    "Zipcode": 60523,
    "Phone": "(800) 955-2929",
    "Fax": "(800) 955-9392",
    "Website": "http://www.nowebsitecircuittown.com"
}, {
    "ID": 9,
    "CompanyName": "Premier Buy",
    "Address": "7601 Penn Avenue South",
    "City": "Richfield",
    "State": "Minnesota",
    "Zipcode": 55423,
    "Phone": "(612) 291-1000",
    "Fax": "(612) 291-2001",
    "Website": "http://www.nowebsitepremierbuy.com"
}, {
    "ID": 10,
    "CompanyName": "ElectrixMax",
    "Address": "263 Shuman Blvd",
    "City": "Naperville",
    "State": "Illinois",
    "Zipcode": 60563,
    "Phone": "(630) 438-7800",
    "Fax": "(630) 438-7801",
    "Website": "http://www.nowebsiteelectrixmax.com"
}, {
    "ID": 11,
    "CompanyName": "Video Emporium",
    "Address": "1201 Elm Street",
    "City": "Dallas",
    "State": "Texas",
    "Zipcode": 75270,
    "Phone": "(214) 854-3000",
    "Fax": "(214) 854-3001",
    "Website": "http://www.nowebsitevideoemporium.com"
}, {
    "ID": 12,
    "CompanyName": "Screen Shop",
    "Address": "1000 Lowes Blvd",
    "City": "Mooresville",
    "State": "North Carolina",
    "Zipcode": 28117,
    "Phone": "(800) 445-6937",
    "Fax": "(800) 445-6938",
    "Website": "http://www.nowebsitescreenshop.com"
}];



const a_tabData = [{
    "ID": 1,
    "CompanyName": "Super Mart of the West",
    "Address": "702 SW 8th Street",
    "City": "Bentonville",
    "State": "Arkansas",
    "Zipcode": 72716,
    "Phone": "(800) 555-2797",
    "Fax": "(800) 555-2171",
    "Website": "http://www.nowebsitesupermart.com"
}, {
    "ID": 2,
    "CompanyName": "Electronics Depot",
    "Address": "2455 Paces Ferry Road NW",
    "City": "Atlanta",
    "State": "Georgia",
    "Zipcode": 30339,
    "Phone": "(800) 595-3232",
    "Fax": "(800) 595-3231",
    "Website": "http://www.nowebsitedepot.com"
}, {
    "ID": 3,
    "CompanyName": "K&S Music",
    "Address": "1000 Nicllet Mall",
    "City": "Minneapolis",
    "State": "Minnesota",
    "Zipcode": 55403,
    "Phone": "(612) 304-6073",
    "Fax": "(612) 304-6074",
    "Website": "http://www.nowebsitemusic.com"
}, {
    "ID": 4,
    "CompanyName": "Tom's Club",
    "Address": "999 Lake Drive",
    "City": "Issaquah",
    "State": "Washington",
    "Zipcode": 98027,
    "Phone": "(800) 955-2292",
    "Fax": "(800) 955-2293",
    "Website": "http://www.nowebsitetomsclub.com"
}, {
    "ID": 5,
    "CompanyName": "E-Mart",
    "Address": "3333 Beverly Rd",
    "City": "Hoffman Estates",
    "State": "Illinois",
    "Zipcode": 60179,
    "Phone": "(847) 286-2500",
    "Fax": "(847) 286-2501",
    "Website": "http://www.nowebsiteemart.com"
}, {
    "ID": 6,
    "CompanyName": "Walters",
    "Address": "200 Wilmot Rd",
    "City": "Deerfield",
    "State": "Illinois",
    "Zipcode": 60015,
    "Phone": "(847) 940-2500",
    "Fax": "(847) 940-2501",
    "Website": "http://www.nowebsitewalters.com"
}, {
    "ID": 7,
    "CompanyName": "StereoShack",
    "Address": "400 Commerce S",
    "City": "Fort Worth",
    "State": "Texas",
    "Zipcode": 76102,
    "Phone": "(817) 820-0741",
    "Fax": "(817) 820-0742",
    "Website": "http://www.nowebsiteshack.com"
}, {
    "ID": 8,
    "CompanyName": "Circuit Town",
    "Address": "2200 Kensington Court",
    "City": "Oak Brook",
    "State": "Illinois",
    "Zipcode": 60523,
    "Phone": "(800) 955-2929",
    "Fax": "(800) 955-9392",
    "Website": "http://www.nowebsitecircuittown.com"
}, {
    "ID": 9,
    "CompanyName": "Premier Buy",
    "Address": "7601 Penn Avenue South",
    "City": "Richfield",
    "State": "Minnesota",
    "Zipcode": 55423,
    "Phone": "(612) 291-1000",
    "Fax": "(612) 291-2001",
    "Website": "http://www.nowebsitepremierbuy.com"
}, {
    "ID": 10,
    "CompanyName": "ElectrixMax",
    "Address": "263 Shuman Blvd",
    "City": "Naperville",
    "State": "Illinois",
    "Zipcode": 60563,
    "Phone": "(630) 438-7800",
    "Fax": "(630) 438-7801",
    "Website": "http://www.nowebsiteelectrixmax.com"
}, {
    "ID": 11,
    "CompanyName": "Video Emporium",
    "Address": "1201 Elm Street",
    "City": "Dallas",
    "State": "Texas",
    "Zipcode": 75270,
    "Phone": "(214) 854-3000",
    "Fax": "(214) 854-3001",
    "Website": "http://www.nowebsitevideoemporium.com"
}, {
    "ID": 12,
    "CompanyName": "Screen Shop",
    "Address": "1000 Lowes Blvd",
    "City": "Mooresville",
    "State": "North Carolina",
    "Zipcode": 28117,
    "Phone": "(800) 445-6937",
    "Fax": "(800) 445-6938",
    "Website": "http://www.nowebsitescreenshop.com"
}];

const data={"a_tab":a_tabData, "b_tab":b_tabData}