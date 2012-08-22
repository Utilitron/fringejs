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
	UiObject: function(){
	},

	/**
	 * Id: setter
	 */
	setId: function(id){
		this.id = id;
		if (this.element != null)
			this.element.id = id;
	}
});


//Class Component
Class({package: fringe.ui, class: 'Component', extends: fringe.ui.UiObject}, {

	/**
	 * HTML Parent
	 */
	parentElement: null,
	
	/**
	 * Constructor
	 */
	Component: function(){
		this.super();
		
		this.build();
	},
	
	/**
	 * Parent: setter
	 */
	setParentElement: function(parentElement) {
		this.parentElement = parentElement;

    	this.parentElement.appendChild(this.element);
	},
	
	build: function() {
	}
});


/* package */
fringe.ui.components = {};

//Class Container
Class({package: fringe.ui.components, class: 'Container', extends: fringe.ui.Component}, {
	/**
	 * Components
	 */
	components: null,

	/**
	 * Constructor
	 */
	Container: function(){
		this.super();
		
		this.components = new fringe.util.ArrayList();
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
		this.components.add(component);
		component.setParentElement(this.element);
	},
	
	/**
	 * Remove Component
	 */
	removeComponent: function (component){
		this.components.remove(component);
		this.element.removeChild(component.element);
	},
	
	/**
	 * Get Component By Id
	 */
	getComponentById: function (componentId){
		var size = this.numComponents();
		for (i = 0; i < size; i++){
			var component = this.components.elements[i];
			if (component.id == componentId)
				return component;
		}
		
		return null;
	}
});