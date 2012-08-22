/*******************************************************************
 * Copyright (C) 2012 Utilitron.net
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.

 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 
 * AUTHOR
 * ======
 * Erik Ashcraft
 * 
 * Created: 1/20/2012
 */

/**
 * Class
 * 
 * The base class
 * This function provides the ground work for:
 *  - creating and extending classes
 *  - managing namespaces
 *	- implementing interfaces
 *	- linking class hierarchy through the .super function
 *  
 */
var Class = function(argObject, source){
	if ("package" in argObject)
		_packageName = argObject["package"];
	
	if ("class" in argObject)
		_class = argObject["class"];
	
	if ("extends" in argObject)
		_parentClass = argObject["extends"];

	// Require a package? For now, yes.
	if (_packageName != null){
		// The new class
		var func = function (){
			// Are we extending or instantiating?
			if (!this.extending)
				this.constructor.apply(this, arguments);

		};

		// Set the _parentClass' extending attribute to true
		_parentClass.extending = true;
		
		// Set up the parent class of the constructor.
		// This will be used to cascade through super constructors
		source[_class].parentClass = new _parentClass;
		
		// Set up our class' prototype, constructor, and super
		func.prototype = new _parentClass;
		func.prototype.constructor = source[_class];
		func.prototype.className = _class;
		
		// Set up our super class
		func.prototype.super = function(){
			var caller = arguments.callee.caller;
			var superConstructor = caller.parentClass.constructor;

			superConstructor.apply(this, arguments);
		};
		
		// Add the attributes and methods of the source object to the new class
		for (i in source){
			if (i != _class)
				func.prototype[i] = source[i];
		}

		// Add the class to the package
		_packageName[_class] = func;
		
		// Remove the _parentClass' extending attribute
		delete _parentClass.extending;

	}
};



//------------------------------------------------------------------------

/* base package */
var fringe = window.fringe = {
	version: "0.0.1"
};

/* package */
fringe.util = {};

//Class ArrayList
Class({package: fringe.util, class: 'ArrayList', extends: Object}, {
	
	/**
	 * Element collection
	 */
	elements: [],
	
	/**
	 * Constructor
	 */
	ArrayList: function(){
		this.elements = new Array();
	},
	
	/**
	 * Returns the number of elements in this collection.
	 */
	size: function(){
		return this.elements.length;
	},
	
	/**
	 * Returns true if this collection contains no elements.
	 */
	isEmpty: function (){
		return (this.elements.length === 0);
	},
	
	/**
	 * Returns true if this collection contains the specified element.
	 */
	contains: function(obj){
		return (obj in this.elements);
	},
	
	/**
	 * Adds an element to this collection.
	 */
	add: function(obj){
		this.elements.push(obj);
	},

	/**
	 * Removes an element to this collection.
	 */
	remove: function(obj){
		var index = this.elements.indexOf(obj);
		if (index != -1){
			this.elements.splice(index,1);
		}
	}
	
	/**
	 * Return the element at this index.
	 * /
	get: function(index){
		TODO
	}*/
});

//Class AjaxUtil
Class({package: fringe.util, class: 'AjaxUtil', extends: Object}, {
	
	/**
	 * Constructor
	 */
	AjaxUtil: function(){
	},
	
	/**
	 * Ajax Object
	 */
	ajaxObj: null,

	/**
	 * Getter for the Ajax Object
	 */
	getAjaxObject: function() {
		if (this.ajaxObj == null) {
			// error testing
			if (window.XMLHttpRequest) {
				this.ajaxObj = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				this.ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}

		return this.ajaxObj;
	},
	
	/**
	 * URL String
	 */
	url: null,

	/**
	 * URL: setter
	 */
	setUrl: function(url) {
		this.url = url;
	},

	/**
	 * Method String
	 */
	method: 'GET',

	/**
	 * Method: setter
	 */
	setMethod: function(method) {
		this.method = method;
	},

	params: null,

	/**
	 * Params: setter
	 */
	setParams: function(params) {
		this.params = params;
	},
	
	/**
	 * Ajax Send Request
	 */
	sendRequest: function() {
		var ajaxObj = this.getAjaxObject();
		if (ajaxObj != null && this.url != null
			&& this.ajaxResponseHandler != null) {
			ajaxObj.onreadystatechange = this.ajaxResponseHandler;
			
			ajaxObj.open(this.method, this.url, true);
			
			if (this.method == 'POST'){
				//Send the proper header information along with the request
				ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			}
			
			ajaxObj.send(this.params);
		} else {
			var errorMessage = "AJAX ERROR!";
			if (ajaxObj == null) {
				errorMessage += "\n" + "The ajax object is not initialized.";
			}

			if (this.url == null) {
				errorMessage += "\n" + "The url is not set.";
			}

			if (this.ajaxResponseHandler == null) {
				errorMessage += "\n" + "The response handler is not set.";
			}

			alert(errorMessage);
		}
	},

	/**
	 * Ajax Response Handler
	 */
	ajaxResponseHandler: null,

	/**
	 * Setter for the Ajax Response Handler
	 */
	setAjaxResponseHandler: function(responseHandler) {
		this.ajaxResponseHandler = function() {
			if (this.readyState == 4 || this.readyState == 'complete')
				responseHandler(this);
		};
	}
});