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
 * Created: 2/12/2012
 */

/* package */
fringe.ui = {};


//UiObject
fringe.ui.UiObject = Object.create(Object.prototype, {

    id: {
        configurable: false,
        get: function() {
            "use strict";
            if (this.element !== null) {
                return this.element.id;
            } else {
                return null;
            }
        },
        set: function(value) {
            "use strict";
            if (this.element !== null) {
                this.element.id = value;
            } else {
                throw new Error('!!');
            }
        }
    },

    /**
     * Element 
     * public HtmlElement
     */
    element: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
    }
});

fringe.ui.Component = Object.create(fringe.ui.UiObject, {
    /**
     * HTML Parent
     */
    _parentElement: {
        writable: true,
        configurable: false,
        enumerable: false,
        value: null
    },
    parentElement: {
        configurable: false,
        get: function() {
            "use strict";
            return this._parentElement;
        },
        set: function(parentElement) {
            "use strict";
            if (this.element !== null) {
                this._parentElement = parentElement;
                this._parentElement.appendChild(this.element);
            } else {
                throw new Error('NO ELEMENT ERROR');
            }
        }
    },

    /**
     * The x position of the component in the parent's (or global) coordinate system.
     */
    //x: { configurable: false,
    //     get: function() { return this._x },
    //     set: function(x) {
    //        this._x = x;
    //     }
    //},

    /**
     * The y position of the component in the parent's (or global) coordinate system.
     */
    //_y: { writable: true, configurable: false, enumerable: false, value: null },

    /**
     * The width of the component.
     */
    width: {
        configurable: false,
        get: function() {
            "use strict";
            if (this.element !== null) {
                return this.element.style.width;
            } else {
                throw new Error('NO ELEMENT ERROR');
            }

        },
        set: function(width) {
            "use strict";
            if (this.element !== null) {
                this.element.style.width = width;
            } else {
                throw new Error('NO ELEMENT ERROR');
            }
        }
    },

    /**
     * The height of the component.
     */
    height: {
        configurable: false,
        get: function() {
            "use strict";
            if (this.element !== null) {
                return this.element.style.height;
            } else {
                throw new Error('NO ELEMENT ERROR');
            }
        },
        set: function(height) {
            "use strict";
            if (this.element !== null) {
                this.element.style.height = height;
            } else {
                throw new Error('NO ELEMENT ERROR');
            }
        }
    },

    /**
     * Build
     */
    build: {
        writable: false,
        configurable: false,
        value: function () {
            "use strict";
            // Most elements will just be a div, otherwise overwrite this with what needs to be added.
            this.element = document.createElement('div');
        }
    }
});


/* package */
fringe.ui.components = {};


//Container
fringe.ui.components.Container = function() {
    "use strict";
    this.components = new fringe.util.ArrayList();
};
fringe.ui.components.Container.prototype = Object.create(fringe.ui.Component, {
    /**
     * Components collection
     * private final ArrayList
     */
    components: {
        writable: true,
        configurable: false,
        enumerable: false,
        value: null
    },

    /**
     * Number Of Components
     */
    numComponents: {
        writable: false,
        configurable: false,
        enumerable: false,
        value: function() {
            "use strict";
            return this.components.size;
        }
    },

    /**
     * Add Component
     */
    addComponent: {
        writable: false,
        configurable: false,
        enumerable: false,
        value: function(component) {
            "use strict";
            this.components.add(component);
            component.parentElement = this.element;
        }
    },

    /**
     * Remove Component
     */
    removeComponent: {
        writable: false,
        configurable: false,
        enumerable: false,
        value: function(component) {
            "use strict";
            this.components.remove(component);
            this.element.removeChild(component.element);
        }
    }

    /**
     * Get Component By Id
     * /
    getComponentById: function (componentId) {
        var size = this.numComponents();
        for (i = 0; i < size; i++) {
            var component = this.components.elements[i];
            if (component.id === componentId)
                return component;
        }

        return null;
    }
     */
});