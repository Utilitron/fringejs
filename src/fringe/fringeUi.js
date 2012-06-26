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
 * Created: 2/12/2012
 */
 
/* package */
fringe.ui = {};


//Class UiObject
Class({package: fringe.ui, class: 'UiObject', extends: Object}, {
	
	id: null,
	
	/**
	 * HTML Element
	 */
	element: null,

	/**
	 * Constructor
	 */
	UiObject: function(properties){
		if (properties != undefined && properties != null){
			if("id" in properties)
				this.id = properties.id;
			else 
				throw new Error("Missing ID");
		}
	}
});


//Class Component
Class({package: fringe.ui, class: 'Component', extends: fringe.ui.UiObject}, {
	height: null,
	width: null,

	/**
	 * HTML Parent
	 */
	parentElement: null,
	
	/**
	 * Constructor
	 */
	Component: function(properties){
		if (properties != undefined && properties != null){
			this.super(properties);
			if ("height" in properties)
				this.height = properties.height;
			
			if ("width" in properties)
				this.width = properties.width;
		}
	},
	
	/**
	 * Parent: setter
	 */
	setParentElement: function(parentElement) {
		this.parentElement = parentElement;

    	this.parentElement.appendChild(this.element);
	}
});


/* package */
fringe.ui.components = {};


//Class Container
Class({package: fringe.ui.components, class: 'Container', extends: fringe.ui.Component}, {
	/**
	 * Components
	 */
	components: new fringe.util.ArrayList(),

	/**
	 * Constructor
	 */
	Container: function(properties){
		if (properties != undefined && properties != null){
			this.super(properties);
		}
	},

	/**
	 * Number Of Components
	 */
	numComponents: function(){
		return this.components.size();
	},

	/**
	 * Add Component
	 */
	addComponent: function (component){
		//if (component instanceof Component){
			this.components.add(component);
			component.build();
			component.setParentElement(this.element);
		//}
	},
	
	/**
	 * Remove Component
	 */
	removeComponent: function (component){
		//if (component instanceof Component){
			if (this.components.contains(component)){ 
				this.components.remove(component);
				this.element.removeChild(component.element);
			}
		//}
	}
});