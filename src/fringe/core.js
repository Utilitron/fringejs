/*******************************************************************
 * Copyright (C) 2012 Utilitron.net
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.

 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, without restriction.
 * 
 * AUTHOR
 * ======
 * Erik Ashcraft
 * 
 * Created: 1/20/2012
 */


/* base package */
var fringe = window.fringe = Object.create(Object.prototype, {
    /**
     * version
     *  public final String
     */
    version: {
        writable: false,
        configurable: false,
        value: "0.0.1"
    }
});

/* package */
fringe.util = {};

//ArrayList
fringe.util.ArrayList = function() {
    "use strict";
    this.elements = [];
};
fringe.util.ArrayList.prototype = Object.create(Object.prototype, {
    /**
     * Element collection
     * private final Array
     */
    elements: {
        writable: true,
        configurable: false,
        enumerable: false,
        value: null
    },

    /**
     * public getter Number
     * Returns the number of elements in this collection.
     */
    size: {
        writable: false,
        configurable: false,
        enumerable: true,
        value: function() {
            "use strict";
            return this.elements.length;
        }
    },

    /**
     * public getter Boolean
     * Returns true if this collection contains no elements.
     */
    isEmpty: {
        writable: false,
        configurable: false,
        enumerable: true,
        value: function() {
            "use strict";
            return (this.elements.length > 0);
        }
    },

    /**
     * public static Boolean
     * Returns true if this collection contains the specified element.
     */
    contains: {
        writable: false,
        configurable: false,
        enumerable: true,
        value: function(obj) {
            "use strict";
            return (this.elements.hasOwnProperty(obj));
        }
    },

    /**
     * public static Boolean
     * Adds an element to this collection.
     */
    add: {
        writable: false,
        configurable: false,
        enumerable: true,
        value: function(obj) {
            "use strict";
            this.elements.push(obj);
        }
    },

    /**
     * public static Boolean
     * Removes an element to this collection.
     */
    remove: {
        writable: false,
        configurable: false,
        enumerable: true,
        value: function(obj) {
            "use strict";
            var index = this.elements.indexOf(obj);
            if (index !== -1) {
                this.elements.splice(index, 1);
            }
        }
    }
});

//AjaxUtil
fringe.util.AjaxUtil = function() {
    "use strict";
};
fringe.util.AjaxUtil.prototype = Object.create(Object.prototype, {
    /**
     * public static Array
     */
    METHODS: {
        writable: false,
        configurable: false,
        enumerable: false,
        value: ['GET', 'POST', 'PUT']
    },
    METHOD_GET: {
        writable: false,
        configurable: false,
        enumerable: true,
        value: 'GET'
    },
    METHOD_POST: {
        writable: false,
        configurable: false,
        enumerable: true,
        value: 'POST'
    },
    METHOD_PUT: {
        writable: false,
        configurable: false,
        enumerable: true,
        value: 'PUT'
    },

    /**
     * Method String
     */
    _method: {
        writable: true,
        configurable: false,
        enumerable: false,
        value: 'GET'
    },
    method: {
        configurable: false,
        get: function() {
            "use strict";
            return this._method;
        },
        set: function(value) {
            "use strict";
            var index = this.METHODS.indexOf(value);
            if (index !== -1) {
                this._method = value;
            } else {
                throw new Error('Method Not Found');
            }
        }
    },

    /**
     * URL String
     */
    url: {
        writable: true,
        configurable: false,
        value: null
    },

    /**
     * Parameters
     */
    params: {
        writable: true,
        configurable: false,
        value: null
    },

    /**
     * public getter Ajax Object
     * Returns the Ajax Object.
     */
    _ajaxObj: {
        writable: true,
        configurable: false,
        enumerable: false,
        value: null
    },
    ajaxObj: {
        configurable: false,
        enumerable: false,
        get: function() {
            "use strict";
            if (this._ajaxObj === null) {
                if (window.XMLHttpRequest) {
                    this._ajaxObj = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    this._ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
                } else {
                    throw new Error('The ajax object could not be initialized.');
                }
            }
            return this._ajaxObj;
        }
    },

    /**
     * Ajax Response Handler
     */
    _ajaxResponseHandler: {
        writable: true,
        configurable: false,
        enumerable: false,
        value: null
    },
    ajaxResponseHandler: {
        configurable: false,
        enumerable: false,
        get: function() {
            "use strict";
            return this._ajaxResponseHandler;
        },
        set: function(responseHandler) {
            "use strict";
            this._ajaxResponseHandler = function() {
                if (this.readyState === 4 || this.readyState === 'complete') {
                    responseHandler(this);
                }
            };
        }
    },

    /**
     * Ajax Send Request
     */
    sendRequest: {
        writable: false,
        configurable: false,
        enumerable: true,
        value: function() {
            "use strict";
            var url = this.url, errorMessage = "";
            if (this.url !== null && this.ajaxResponseHandler !== null) {
                this.ajaxObj.onreadystatechange = this.ajaxResponseHandler;

                if (this.method === 'GET') {
                    url += '?' + this.params;
                }

                this.ajaxObj.open(this.method, url, true);

                if (this.method === 'POST') {
                    //Send the proper header information along with the request
                    this.ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                }

                this.ajaxObj.send(this.params);

            } else {
                if (this.url === null) {
                    errorMessage += "\n" + "The url is not set.";
                }

                if (this.ajaxResponseHandler === null) {
                    errorMessage += "\n" + "The response handler is not set.";
                }

                throw new Error(errorMessage);
            }
        }
    }
});

//InputUtil
fringe.util.InputUtil = function() {
    "use strict";
};
fringe.util.InputUtil.prototype = Object.create(Object.prototype, {
    /**
     * Get Input Selection
     */
    getInputSelection: {
        writable: false,
        configurable: false,
        enumerable: true,
        value: function(el) {
            var start = 0, end = 0, normalizedValue, range,
                textInputRange, len, endRange;
        
            if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
                start = el.selectionStart;
                end = el.selectionEnd;
            } else {
                range = document.selection.createRange();
        
                if (range && range.parentElement() == el) {
                    len = el.value.length;
                    normalizedValue = el.value.replace(/\r\n/g, "\n");
        
                    // Create a working TextRange that lives only in the input
                    textInputRange = el.createTextRange();
                    textInputRange.moveToBookmark(range.getBookmark());
        
                    // Check if the start and end of the selection are at the very end
                    // of the input, since moveStart/moveEnd doesn't return what we want
                    // in those cases
                    endRange = el.createTextRange();
                    endRange.collapse(false);
        
                    if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                        start = end = len;
                    } else {
                        start = -textInputRange.moveStart("character", -len);
                        start += normalizedValue.slice(0, start).split("\n").length - 1;
        
                        if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                            end = len;
                        } else {
                            end = -textInputRange.moveEnd("character", -len);
                            end += normalizedValue.slice(0, end).split("\n").length - 1;
                        }
                    }
                }
            }
        
            return {
                start: start,
                end: end
            };
        }
    },

    
    /**
     * Replace Selected Text
     */
    replaceSelectedText: {
        writable: false,
        configurable: false,
        enumerable: false,
        value: function(el, text) {
            var selectedText = this.getInputSelection(el);
        
            el.value = el.value.slice(0, selectedText.start) + text + el.value.slice(selectedText.end);
        }
    }
});