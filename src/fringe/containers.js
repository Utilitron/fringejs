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
 * Created: 3/3/2012
 */

/* containers package */
fringe.ui.components.containers = {};


/**
 *	Canvas	
 *    - A Canvas layout container defines a rectangular region in which 
 *      you place child containers and controls.
 */
fringe.ui.components.containers.Canvas = function() { this.build(); };
fringe.ui.components.containers.Canvas.prototype = Object.create(new fringe.ui.components.Container, {

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
fringe.ui.components.containers.TitleBar = function() { this.build(); };
fringe.ui.components.containers.TitleBar.prototype = Object.create(new fringe.ui.components.Container, {

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
					  return this.element.firstChild.textContent = value;
				  else
					  throw new Error('!!');
			  }
	},
	
	/**
	 * Build
	 */
	build: { configurable:false, value: function (){
	    	this.element = document.createElement('div');
	    	this.element.className = 'titleBar';
	    	
	    	var title = document.createElement('div');
	    		title.className = 'title';
	    	this.element.appendChild(title);
		}
	}
	
});



/**
 *	ControlBar	
 *    - The ControlBar container lets you place controls at the bottom of 
 *      a Panel or at the top of a Window container.
 */
fringe.ui.components.containers.ControlBar = function() { this.build(); };
fringe.ui.components.containers.ControlBar.prototype = Object.create(new fringe.ui.components.Container, {

	/**
	 * Build
	 */
	build: { configurable:false, value: function (){
	    	this.element = document.createElement('div');
	    	this.element.className = 'controlBar';
		}
	}

});



/**
 *	Panel	
 *    - A Panel container consists of a title bar and a 
 *      content area for its children.
 */
fringe.ui.components.containers.Panel = function() { this.build(); };
fringe.ui.components.containers.Panel.prototype = Object.create(new fringe.ui.components.Container, {
	/**
	 * Close
	 */	
	close: { writable:false, configurable:false, 
			 value: function(){
						if(!e) var e = window.event;
						//e.cancelBubble is supported by IE - this will kill the bubbling process.
						e.cancelBubble = true;
						e.returnValue = false;
	
						//e.stopPropagation works only in Firefox.
						if (e.stopPropagation) {
							e.stopPropagation();
							e.preventDefault();
						}
						
				 		this.parentElement.removeChild(this.element); 
				 	} 
	},
	
	/**
	 * Set Title
	 */
	title: { configurable:false, 
			 set: function(value){ 
					this.titleBar.title = value; 
				  },
			 get: function(){ 
					return this.titleBar.title; 
				  }
	},
	
	/**
	 * TitleBar
	 */
	titleBar: { writable:true, configurable:false,  value: null },
	
	/**
	 * Canvas
	 */
	canvas: { writable:true, configurable:false,  value: null },
	
	/**
	 * ControlBar
	 */
	controlBar: { writable:true, configurable:false,  value: null },

	/**
	 * Build
	 */
	build: { configurable:false, 
			 value: function (){
				this.element = document.createElement('div');
				this.element.className = 'panel';
				
				this.titleBar = new fringe.ui.components.containers.TitleBar;
				this.canvas = new fringe.ui.components.containers.Canvas;
				this.controlBar = new fringe.ui.components.containers.ControlBar;
				
				this.addComponent(this.titleBar);
				this.addComponent(this.canvas);
				this.addComponent(this.controlBar);

				this.titleBar.title = 'Panel';
				this.canvas.element.textContent = 'Canvas';
				this.controlBar.element.textContent = 'Control Bar';
				
				var self = this;

				var closeButton = document.createElement('a');
					closeButton.className = 'close';
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
	/**
	 * Close
	 */	
	close: { writable:false, configurable:false, value: function(){ this.parentElement.removeChild(this.element); } },
	
	/**
	 * Set Title
	 */
	title: { configurable:false, set: function(value){ 
											this.titleBar.title = title; 
										}
		   },
	
	/**
	 * TitleBar
	 */
	titleBar: { writable:true, configurable:false,  value: null },
	
	/**
	 * ControlBar
	 */
	controlBar: { writable:true, configurable:false,  value: null },
	
	/**
	 * Canvas
	 */
	canvas: { writable:true, configurable:false,  value: null },
	
	/**
	 * Build
	 */
	build: { configurable:false, 
			 value: function (){
				this.element = document.createElement('div');
				this.element.className = 'window';
				
				this.titleBar = new fringe.ui.components.containers.TitleBar;
				this.canvas = new fringe.ui.components.containers.Canvas;
				this.controlBar = new fringe.ui.components.containers.ControlBar;
				
				this.addComponent(this.titleBar);
				this.addComponent(this.canvas);
				this.addComponent(this.controlBar);

				this.titleBar.title = 'Window';
				this.controlBar.element.textContent = 'Control Bar';
				this.canvas.element.textContent = 'Canvas';
				
				var self = this;

				var closeButton = document.createElement('a');
					closeButton.className = 'close';
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
 *	ViewStack
 *    - A ViewStack navigator container consists of a collection of child 
 *      containers stacked on top of each other, where only one child at 
 *      a time is visible.
 */
fringe.ui.components.containers.ViewStack = Object.create(new fringe.ui.components.Container, {
});