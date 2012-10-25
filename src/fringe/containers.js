/*******************************************************************
 * Copyright (C) 2011 Utilitron.net
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
 * Created: 3/3/2012
 */

/* containers package */
fringe.ui.components.containers = {};


/**
 *	Canvas	
 *    - A Canvas layout container defines a rectangular region in which 
 *      you place child containers and controls.
 */
fringe.ui.components.containers.Canvas = Object.create(new fringe.ui.components.Container, {

	/**
	 * Build
	 */
	build: { configurable:false, value: function (){
	    	this.element = document.createElement('div');
	    	this.element.className = 'canvas';
		}
	}
	
});



/**
 *	TitleBar	
 *    - The TitleBar container lets you place a title at the top of 
 *      a Panel or a Window container.
 */
fringe.ui.components.containers.TitleBar = Object.create(new fringe.ui.components.Container, {

	/**
	 * Title 
	 */
	title: { configurable:false,
		  get: function() { 
				  if (this.element != null)
					  this.element.firstChild.textContent;
				  else
					  return null;
			  },
		  set: function(value) {
				  if (this.element != null)
					  this.element.firstChild.textContent = value;
				  else
					  throw new Error('!!');
			  }
	},
	
	/**
	 * Build
	 */
	build: { configurable:false, value: function (){
	    	this.element = document.createElement('div');
	    	this.element.className = 'title';
	    	
	    	var title = document.createElement('span');
	    	this.element.appendChild(title);
		}
	}
	
});



/**
 *	ControlBar	
 *    - The ControlBar container lets you place controls at the bottom of 
 *      a Panel or at the top of a Window container.
 */
fringe.ui.components.containers.ControlBar = Object.create(fringe.ui.components.containers.Canvas, {
});



/**
 *	Panel	
 *    - A Panel container consists of a title bar and a 
 *      content area for its children.
 */
fringe.ui.components.containers.Panel = Object.create(new fringe.ui.components.Container, {
	/**
	 * Close
	 */	
	close: { writeable:false, configurable:false, value: function(){ this.parentElement.removeChild(this.element); } },
	
	/**
	 * Close
	 */
	setTitle: { writeable:false, configurable:false, value: function(title){ this.titleBar.title = title; } },
	
	close: function(){
		this.parentElement.removeChild(this.element);
	},
	
	/**
	 * TitleBar
	 */
	titleBar: { writeable:false, configurable:false,  value: Object.create(fringe.ui.components.containers.TitleBar) },
	
	/**
	 * Canvas
	 */
	canvas: { writeable:false, configurable:false,  value: Object.create(fringe.ui.components.containers.Canvas) },
	
	/**
	 * ControlBar
	 */
	controlBar: { writeable:false, configurable:false,  value: Object.create(fringe.ui.components.containers.ControlBar) },

	/**
	 * Build
	 */
	build: { configurable:false, 
			 value: function (){
				this.element = document.createElement('div');
				this.element.className = 'panel';

			  	this.element = document.createElement('div');
				
				this.addComponent(this.titleBar);
				this.addComponent(this.canvas);
				this.addComponent(this.controlBar);

				
				var self = this;

				var closeButton = document.createElement('a');
					closeButton.href = '#';	
					closeButton.onclick = function() {
						self.close.call(self);
					};
					closeButton.textContent = 'Close';
				
				this.titleBar.element.appendChild(closeButton);
			 }
	}
	
});



/**
 *	Window	
 *    - A Window layout container contains a title bar, a control bar, a border, 
 *      and a content area for its child. 
 */
fringe.ui.components.containers.Window = Object.create(new fringe.ui.components.Container, {
});



/**
 *	ViewStack
 *    - A ViewStack navigator container consists of a collection of child 
 *      containers stacked on top of each other, where only one child at 
 *      a time is visible.
 */
fringe.ui.components.containers.ViewStack = Object.create(new fringe.ui.components.Container, {
});