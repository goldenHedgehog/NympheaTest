import {MDCTabBar} from '@material/tab-bar';

export default class result_tabs  extends NyaUI.COMPONENT {
    constructor(props){
        super(props);
        this.state = {
            list:props.list
        };
        this.rightMove   = this.rightMove.bind(this)
        this.leftMove    = this.leftMove.bind(this)
        this.setList     = this.setList.bind(this)
        this.setActive   = this.setActive.bind(this)
    }
    rightMove(){
        this.tabBar.tabScroller_.scrollTo(this.tabBar.tabScroller_.getScrollPosition()+450)
    }
    leftMove(){
        this.tabBar.tabScroller_.scrollTo(this.tabBar.tabScroller_.getScrollPosition()-450)
    }
    componentDidUpdate(){
        this.tabBar = new MDCTabBar(this.refs.listScreensWrapp);
    }
    setActive(idActive){
        let index = 0;
        _.each(this.state.list,(node)=>{
            if(node.id == idActive){
                this.tabBar.activateTab(index)
            }
            index++
        })
    }
    setList(list,cb){
        this.setState({list:list},function(){
            if(cb) cb();
        })
    }
    render(){
        var self = this;
        let list = _.map(this.state.list,function(node,key){
            let className = "mdc-tab ";
            let selected = "false";
            let tabIndex = "-1"
            return <button className={className}  ref={"list"+node.id} key={node.id} role="tab"  data-id={node.id} aria-selected={selected} tabIndex={tabIndex}  onClick={ self.props.open.bind(null,node.id)} >
                      <span className="mdc-tab__content">
                        <span className="mdc-tab__text-label">{node.name || "NoName"}</span>
                      </span>
                      <span className="mdc-tab-indicator">
                        <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                      </span>
                     <span className="mdc-tab__ripple"></span>
                </button>
        })
        return(
            <div className="screen_list__inner container">
                <div className="btn_move btn_left__wrapper" ref="left"></div>

                <div className="mdc-tab-bar" role="tablist" ref="listScreensWrapp" data-mdc-auto-init='MDCTabBar'>
                    <div className="mdc-tab-scroller">
                        <div className="mdc-tab-scroller__scroll-area">
                            <div className="mdc-tab-scroller__scroll-content" ref="listScreens">
                                {list}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn_move btn_right__wrapper" ref="right"></div>
            </div>
        )
    }
};

