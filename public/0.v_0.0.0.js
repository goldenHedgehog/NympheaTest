(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([[0],{

/***/ "./node_modules/devextreme/ui/notify.js":
/*!**********************************************!*\
  !*** ./node_modules/devextreme/ui/notify.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * DevExtreme (ui/notify.js)
 * Version: 19.2.7
 * Build date: Thu Mar 26 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var $ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/core/renderer.js");
var Action = __webpack_require__(/*! ../core/action */ "./node_modules/devextreme/core/action.js");
var viewPortUtils = __webpack_require__(/*! ../core/utils/view_port */ "./node_modules/devextreme/core/utils/view_port.js");
var extend = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/core/utils/extend.js").extend;
var isPlainObject = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/core/utils/type.js").isPlainObject;
var Toast = __webpack_require__(/*! ./toast */ "./node_modules/devextreme/ui/toast.js");
var $notify = null;
var notify = function(message, type, displayTime) {
    var options = isPlainObject(message) ? message : {
        message: message
    };
    var userHiddenAction = options.onHidden;
    extend(options, {
        type: type,
        displayTime: displayTime,
        onHidden: function(args) {
            $(args.element).remove();
            new Action(userHiddenAction, {
                context: args.model
            }).execute(arguments)
        }
    });
    $notify = $("<div>").appendTo(viewPortUtils.value());
    new Toast($notify, options).show()
};
module.exports = notify;
module.exports.default = module.exports;


/***/ }),

/***/ "./node_modules/devextreme/ui/toast.js":
/*!*********************************************!*\
  !*** ./node_modules/devextreme/ui/toast.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * DevExtreme (ui/toast.js)
 * Version: 19.2.7
 * Build date: Thu Mar 26 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */

var $ = __webpack_require__(/*! ../core/renderer */ "./node_modules/devextreme/core/renderer.js");
var window = __webpack_require__(/*! ../core/utils/window */ "./node_modules/devextreme/core/utils/window.js").getWindow();
var domAdapter = __webpack_require__(/*! ../core/dom_adapter */ "./node_modules/devextreme/core/dom_adapter.js");
var eventsEngine = __webpack_require__(/*! ../events/core/events_engine */ "./node_modules/devextreme/events/core/events_engine.js");
var ready = __webpack_require__(/*! ../core/utils/ready_callbacks */ "./node_modules/devextreme/core/utils/ready_callbacks.js").add;
var commonUtils = __webpack_require__(/*! ../core/utils/common */ "./node_modules/devextreme/core/utils/common.js");
var typeUtils = __webpack_require__(/*! ../core/utils/type */ "./node_modules/devextreme/core/utils/type.js");
var extend = __webpack_require__(/*! ../core/utils/extend */ "./node_modules/devextreme/core/utils/extend.js").extend;
var inArray = __webpack_require__(/*! ../core/utils/array */ "./node_modules/devextreme/core/utils/array.js").inArray;
var pointerEvents = __webpack_require__(/*! ../events/pointer */ "./node_modules/devextreme/events/pointer.js");
var registerComponent = __webpack_require__(/*! ../core/component_registrator */ "./node_modules/devextreme/core/component_registrator.js");
var Overlay = __webpack_require__(/*! ./overlay */ "./node_modules/devextreme/ui/overlay.js");
var themes = __webpack_require__(/*! ./themes */ "./node_modules/devextreme/ui/themes.js");
var TOAST_CLASS = "dx-toast";
var TOAST_CLASS_PREFIX = TOAST_CLASS + "-";
var TOAST_WRAPPER_CLASS = TOAST_CLASS_PREFIX + "wrapper";
var TOAST_CONTENT_CLASS = TOAST_CLASS_PREFIX + "content";
var TOAST_MESSAGE_CLASS = TOAST_CLASS_PREFIX + "message";
var TOAST_ICON_CLASS = TOAST_CLASS_PREFIX + "icon";
var WIDGET_NAME = "dxToast";
var toastTypes = ["info", "warning", "error", "success"];
var TOAST_STACK = [];
var FIRST_Z_INDEX_OFFSET = 8e3;
var visibleToastInstance = null;
var POSITION_ALIASES = {
    top: {
        my: "top",
        at: "top",
        of: null,
        offset: "0 0"
    },
    bottom: {
        my: "bottom",
        at: "bottom",
        of: null,
        offset: "0 -20"
    },
    center: {
        my: "center",
        at: "center",
        of: null,
        offset: "0 0"
    },
    right: {
        my: "center right",
        at: "center right",
        of: null,
        offset: "0 0"
    },
    left: {
        my: "center left",
        at: "center left",
        of: null,
        offset: "0 0"
    }
};
ready(function() {
    eventsEngine.subscribeGlobal(domAdapter.getDocument(), pointerEvents.down, function(e) {
        for (var i = TOAST_STACK.length - 1; i >= 0; i--) {
            if (!TOAST_STACK[i]._proxiedDocumentDownHandler(e)) {
                return
            }
        }
    })
});
var Toast = Overlay.inherit({
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            message: "",
            type: "info",
            displayTime: 2e3,
            position: "bottom center",
            animation: {
                show: {
                    type: "fade",
                    duration: 400,
                    from: 0,
                    to: 1
                },
                hide: {
                    type: "fade",
                    duration: 400,
                    to: 0
                }
            },
            shading: false,
            height: "auto",
            closeOnBackButton: false,
            closeOnSwipe: true,
            closeOnClick: false,
            resizeEnabled: false
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: {
                platform: "android"
            },
            options: {
                closeOnOutsideClick: true,
                width: "auto",
                position: {
                    at: "bottom left",
                    my: "bottom left",
                    offset: "20 -20"
                },
                animation: {
                    show: {
                        type: "slide",
                        duration: 200,
                        from: {
                            position: {
                                my: "top",
                                at: "bottom",
                                of: window
                            }
                        }
                    },
                    hide: {
                        type: "slide",
                        duration: 200,
                        to: {
                            position: {
                                my: "top",
                                at: "bottom",
                                of: window
                            }
                        }
                    }
                }
            }
        }, {
            device: function(_device) {
                var isPhone = "phone" === _device.deviceType;
                var isAndroid = "android" === _device.platform;
                return isPhone && isAndroid
            },
            options: {
                width: function() {
                    return $(window).width()
                },
                position: {
                    at: "bottom center",
                    my: "bottom center",
                    offset: "0 0"
                }
            }
        }, {
            device: function() {
                return themes.isMaterial()
            },
            options: {
                minWidth: 344,
                maxWidth: 568,
                displayTime: 4e3
            }
        }])
    },
    _init: function() {
        this.callBase();
        this._posStringToObject()
    },
    _renderContentImpl: function() {
        if (this.option("message")) {
            this._message = $("<div>").addClass(TOAST_MESSAGE_CLASS).text(this.option("message")).appendTo(this.$content())
        }
        this.setAria("role", "alert", this._message);
        if (inArray(this.option("type").toLowerCase(), toastTypes) > -1) {
            this.$content().prepend($("<div>").addClass(TOAST_ICON_CLASS))
        }
        this.callBase()
    },
    _render: function() {
        this.callBase();
        this.$element().addClass(TOAST_CLASS);
        this._wrapper().addClass(TOAST_WRAPPER_CLASS);
        this._$content.addClass(TOAST_CLASS_PREFIX + String(this.option("type")).toLowerCase());
        this.$content().addClass(TOAST_CONTENT_CLASS);
        this._toggleCloseEvents("Swipe");
        this._toggleCloseEvents("Click")
    },
    _renderScrollTerminator: commonUtils.noop,
    _toggleCloseEvents: function(event) {
        var dxEvent = "dx" + event.toLowerCase();
        eventsEngine.off(this._$content, dxEvent);
        this.option("closeOn" + event) && eventsEngine.on(this._$content, dxEvent, this.hide.bind(this))
    },
    _posStringToObject: function() {
        if (!typeUtils.isString(this.option("position"))) {
            return
        }
        var verticalPosition = this.option("position").split(" ")[0];
        var horizontalPosition = this.option("position").split(" ")[1];
        this.option("position", extend({}, POSITION_ALIASES[verticalPosition]));
        switch (horizontalPosition) {
            case "center":
            case "left":
            case "right":
                this.option("position").at += " " + horizontalPosition;
                this.option("position").my += " " + horizontalPosition
        }
    },
    _show: function() {
        if (visibleToastInstance && visibleToastInstance !== this) {
            clearTimeout(visibleToastInstance._hideTimeout);
            visibleToastInstance.hide()
        }
        visibleToastInstance = this;
        return this.callBase.apply(this, arguments).done(function() {
            clearTimeout(this._hideTimeout);
            this._hideTimeout = setTimeout(this.hide.bind(this), this.option("displayTime"))
        }.bind(this))
    },
    _hide: function() {
        visibleToastInstance = null;
        return this.callBase.apply(this, arguments)
    },
    _overlayStack: function() {
        return TOAST_STACK
    },
    _zIndexInitValue: function() {
        return this.callBase() + FIRST_Z_INDEX_OFFSET
    },
    _dispose: function() {
        clearTimeout(this._hideTimeout);
        visibleToastInstance = null;
        this.callBase()
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "type":
                this._$content.removeClass(TOAST_CLASS_PREFIX + args.previousValue);
                this._$content.addClass(TOAST_CLASS_PREFIX + String(args.value).toLowerCase());
                break;
            case "message":
                if (this._message) {
                    this._message.text(args.value)
                }
                break;
            case "closeOnSwipe":
                this._toggleCloseEvents("Swipe");
                break;
            case "closeOnClick":
                this._toggleCloseEvents("Click");
                break;
            case "displayTime":
            case "position":
                break;
            default:
                this.callBase(args)
        }
    }
});
registerComponent(WIDGET_NAME, Toast);
module.exports = Toast;
module.exports.default = module.exports;


/***/ })

}]);
//# sourceMappingURL=0.v_0.0.0.js.map