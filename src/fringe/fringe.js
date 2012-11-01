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
	version: { writable:false, configurable:false, value: "0.0.1" }
});
 
/* package */
fringe.util = {};
 
//ArrayList
fringe.util.ArrayList = function(){ this.elements = [] }
fringe.util.ArrayList.prototype = Object.create(Object.prototype, {
	/**
	 * Element collection
	 * private final Array
	 */
	elements: { writable:true, configurable:false, enumerable:false,  value: null },
 
	/**
	 * public getter Number
	 * Returns the number of elements in this collection.
	 */  
	size: { writable:false, configurable:false, enumerable:true, value: function(){ return this.elements.length; } },
 
	/**
	 * public getter Boolean
	 * Returns true if this collection contains no elements.
	 */  
	isEmpty: { writable:false, configurable:false, enumerable:true, value: function(){ return (this.elements.length > 0); } },
 
	/**
	 * public static Boolean
	 * Returns true if this collection contains the specified element.
	 */  
	 contains: { writable:false, configurable:false, enumerable:true, value: function(obj){ return (obj in this.elements); } },

	 /**
	 * public static Boolean
	 * Adds an element to this collection.
	 */  
	add: { writable:false, configurable:false, enumerable:true, value: function(obj){ this.elements.push(obj); } },
 
	/**
	 * public static Boolean
	 * Removes an element to this collection.
	 */  
	remove: { writable:false, configurable:false, enumerable:true, 
			  value: function(obj){
				  var index = this.elements.indexOf(obj);
				  		if (index != -1){
				  			this.elements.splice(index,1);
				  		}
			  }
			}
});
 
//AjaxUtil
fringe.util.AjaxUtil = function(){ }
fringe.util.AjaxUtil.prototype = Object.create(Object.prototype, {
	/**
	 * public static Array
	 */  
	METHODS: { writable:false, configurable:false, enumerable:false, value: ['GET', 'POST', 'PUT'] },
	METHOD_GET: { writable:false, configurable:false, enumerable:true, value: 'GET' },
	METHOD_POST: { writable:false, configurable:false, enumerable:true, value: 'POST' },
	METHOD_PUT: { writable:false, configurable:false, enumerable:true, value: 'PUT' },

	/**
	 * Method String
	 */
	_method: { writable:true, configurable:false, enumerable:false, value: 'GET' },
	method: { configurable:false,
			  get: function() { return this._method },
			  set: function(value) {
				  if (value in this.METHODS)
					  this._method = value
					  else
						  throw new Error('!!');
			  }
	},

	/**
	 * URL String
	 */
	url: { writable:true, configurable:false, value: null },

	/**
	 * Parameters
	 */
	 params: { writable:true, configurable:false, value: null },

	/**
	 * public getter Ajax Object
	 * Returns the Ajax Object.
	 */  
	_ajaxObj: { writable:true, configurable:false, enumerable:false, value: null },
	ajaxObj: { configurable:false, enumerable:false,
			   get: function(){
				   if (this._ajaxObj == null){
					   if (window.XMLHttpRequest)
						   this._ajaxObj = new XMLHttpRequest();

					   else if (window.ActiveXObject)
						   this._ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");

					   else
						   throw new Error('The ajax object could not be initialized.');
				   }

				   return this._ajaxObj;
			   }
	},

	/**
	 * Ajax Response Handler
	 */
	_ajaxResponseHandler: { writable:true, configurable:false, enumerable:false, value: null },
	ajaxResponseHandler: { configurable:false, enumerable:false,
						   get: function() { return this._ajaxResponseHandler },
						   set: function(responseHandler) {
								this._ajaxResponseHandler = function() {
									if (this.readyState == 4 || this.readyState == 'complete')
										responseHandler(this);
									};
						   }
	},

	/**
	 * Ajax Send Request
	 */
	sendRequest: { writable:false, configurable:false, enumerable:true, 
				   value: function() {
						if (this.url != null && this.ajaxResponseHandler != null) {
							this.ajaxObj.onreadystatechange = this.ajaxResponseHandler;

							this.ajaxObj.open(this.method, this.url, true);

							if (this.method == 'POST'){
									//Send the proper header information along with the request
								this.ajaxObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
							}

							this.ajaxObj.send(this.params);
						} else {
							if (this.url == null) {
								errorMessage += "\n" + "The url is not set.";
							}

							if (this.ajaxResponseHandler == null) {
								errorMessage += "\n" + "The response handler is not set.";
							}

							throw new Error(errorMessage);
						}
					}
				}

});