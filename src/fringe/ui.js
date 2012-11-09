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

	id: { configurable:false,
		  get: function() { 
				  if (this.element != null)
					  return this.element.id;
				  else
					  return null;
			  },
		  set: function(value) {
				  if (this.element != null)
					  this.element.id = value;
				  else
					  throw new Error('!!');
			  }
	},

	
	/**
	 * Element 
	 * public HtmlElement
	 */
	element: { writable:true, configurable:false, enumerable:true,  value: null },
 

});

fringe.ui.Component = Object.create(fringe.ui.UiObject, {
	/**
	 * HTML Parent
	 */
	_parentElement: { writable:true, configurable:false, enumerable:false, value: null },
	parentElement: { configurable:false,
					 get: function() { return this._parentElement },
					 set: function(parentElement) {
						 if (this.element != null){
							 this._parentElement = parentElement;
						 	 this._parentElement.appendChild(this.element);
						 } else
							 throw new Error('!!');
					 }
	},
	
	/**
	 * Build
	 */
	build: { writable:false, configurable:false, 
			 value: function (){
				// Most elements will just be a div, otherwise overwrite this with what needs to be added.
			  	this.element = document.createElement('div');
			 }
	}
});


/* package */
fringe.ui.components = {};


//Container
fringe.ui.components.Container = function(){ this.components = new fringe.util.ArrayList() };
fringe.ui.components.Container.prototype = Object.create(fringe.ui.Component, {
	/**
	 * Components collection
	 * private final ArrayList
	 */
	components: { writable:true, configurable:false, enumerable:false,  value: null },

	/**
	 * Number Of Components
	 */
	numComponents: { writable:false, configurable:false, enumerable:false, value: function(){ return this.components.size; } },

	/**
	 * Add Component
	 */
	addComponent: { writable:false, configurable:false, enumerable:false, 
					value: function(component){ 
							   this.components.add(component);
							   component.parentElement = this.element;
						   }
	},
 
	/**
	 * Remove Component
	 */
	removeComponent: { writable:false, configurable:false, enumerable:false, 
					   value: function(component){ 
						          this.components.remove(component);
						          this.element.removeChild(component.element);
						 	  } 
	}
	
	/**
	 * Get Component By Id
	 * /
	getComponentById: function (componentId){
		var size = this.numComponents();
		for (i = 0; i < size; i++){
			var component = this.components.elements[i];
			if (component.id == componentId)
				return component;
		}
		
		return null;
	}
	*/
});


/**
 *	Grid	
 *    - A Grid container lets you arrange children as rows and columns of cells, 
 *      of an HTML table.
 */
fringe.ui.components.Grid = function(){ 
	this.rows = new fringe.util.ArrayList(); 
	this.build();
};
fringe.ui.components.Grid.prototype = Object.create(fringe.ui.Component, {
	/**
	 * Row collection
	 * private final ArrayList
	 */
	rows: { writable:true, configurable:false, enumerable:false,  value: null },
	
	/**
	 * Add Row
	 */
	addRow: { writable:false, configurable:false, enumerable:false, 
					value: function(row){ 
							   this.rows.add(row);
							   row.parentElement = this.element;
						   }
	},
	
	/**
	 * Build
	 */
	build: { configurable:false, 
			 value: function (){
				this.element = document.createElement('table');
				this.element.className = 'grid';
			 }
	}
	
});


/**
 *	Form	
 *    - A Form container lets you add children as items of an HTML form.
 */
fringe.ui.components.Form = function(){ 
	this.components = new fringe.util.ArrayList(); 
	this.build();
};
fringe.ui.components.Form.prototype = Object.create(fringe.ui.Component, {
	/**
	 * Form Componenet collection
	 * private final ArrayList
	 */
	components: { writable:true, configurable:false, enumerable:false,  value: null },
	
	/**
	 * Add Form Component
	 */
	addFormComponent: { writable:false, configurable:false, enumerable:true, 
					value: function(component){ 
							   this.components.add(component);
							   component.parentElement = this.element;
						   }
	},
		
	/**
	 * Build
	 */
	build: { configurable:false, 
			 value: function (){
				this.element = document.createElement('form');
				this.element.className = 'form';
			 }
	}

});