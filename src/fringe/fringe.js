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
var Class = function(arguments, source){
	if ("package" in arguments)
		_package = arguments["package"];
	
	if ("class" in arguments)
		_class = arguments["class"];
	
	if ("extends" in arguments)
		_parentClass = arguments["extends"];

	if ("implements" in arguments)
		_interfaces = arguments["implements"];

	// Require a package? For now, yes.
	if (_package != null){
		// The new class
		var func = function (){
			// Are we extending or instantiating?
			if (!this.extending)
				this.constructor.apply(this, arguments);

		};

		// Set the _parentClass' extending attribute to true
		_parentClass.prototype.extending = true;
		
		// Set up the parent class of the constructor.
		// This will be used to cascade through super constructors
		source[_class].parentClass = _parentClass.prototype;
		
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
		_package[_class] = func;
		
		// Remove the _parentClass' extending attribute
		delete _parentClass.prototype.extending;

	}
};


var Interface = function ( source ){
	for (i in source)
		this[i] = source[i];

};
Interface.prototype = new Object();

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
		return (this.elements.length > 0);
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
		return this.elements.push(obj);
	},

	/**
	 * Removes an element to this collection.
	 */
	remove: function(obj){
		if (obj in this.elements){
			var index = array.indexOf(obj);
			this.elements.splice(index,1);
		}
	}
});