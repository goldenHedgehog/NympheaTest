'use strict';

import React from 'react';


import * as ace from 'brace';
import javascriptRules from 'brace/mode/javascript';
require("brace/ext/language_tools");
require("brace/snippets/text.js");
require("brace/snippets/javascript.js");
//var langTools = require("brace/ext/language_tools");

export default class Config extends React.Component {
    constructor(props){
        super()
        this.getData  = this.getData.bind(this);
        this.getError = this.getError.bind(this);
        this.setValue = this.setValue.bind(this);
        this.setClass = this.setClass.bind(this)
        this.setConfig = this.setConfig.bind(this);
        this.state = {
            error:false
        }
    }
    componentDidMount(){
        var self=this;
        var langTools = ace.acequire("ace/ext/language_tools");
        this.editor = ace.edit(this.refs.codeEditor);
        this.editor.getSession();
        this.editor.setOptions({
            // enableSnippets:true,
            maxLines: Infinity,
            //height:"100%",
            //autoScrollEditorIntoView: true,
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: false,
            minLines: 4
        });
        this.editor.setScrollSpeed(1)
        this.editor.session.setMode("ace/mode/javascript");
        this.editor.$blockScrolling = Infinity;
        this.editor.getSession().setTabSize(2);

        this.editor.setValue(this.props.config, null, '\t');
        this.editor.focus();
        this.editor.selectAll();
        this.editor.getSession().on('change', this.props.onChange);

    }
    setValue(node){
        var arr = node.value.split('\n');
        this.editor.insert(arr[0]);
    }
    setClass(style){
        this.editor.setStyle(style)
    }
    setConfig(config){
        this.editor.setValue(config, null, '\t');
        this.editor.focus();
        $('.ace_content').focus();
    }
    getError(){
        //  console.log(this.editor.getSession().getAnnotations())
        //return this.editor.getSession().getAnnotations()
        return {}
    }
    getData(){
        return this.editor.getValue()
    }

    render(){
        if(this.editor){
            // this.editor.setValue(beautify.js_beautify(this.props.config, { indent_size: 4 }), null, '\t');
            // this.editor.focus();
        }
        return (
            <div  ref="codeEditor" className="codeEditor"></div>
        )
    }
}
