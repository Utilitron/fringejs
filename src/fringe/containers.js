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
 *	Box	
 *    - A Box container lays out its children in a single vertical 
 *      column or a single horizontal row.
 */
//jsCore.containers.Box = function (){
//	this.constructor = this;
//};
//jsCore.containers.Box.prototype = new jsCore.core.Container();


/**
 *	Canvas	
 *    - A Canvas layout container defines a rectangular region in which 
 *      you place child containers and controls.
 * /
Class({package: fringe.ui.components.containers, class: 'Canvas', extends: fringe.ui.components.Container}, {

	/**
	 * Constructor
	 * /
	Canvas: function(){
		this.super();
	},
	
	/**
	 * Build
	 * /
    build: function (){
    	
    	this.element = document.createElement('div');
    }
});
*/


/**
 *	ControlBar	
 *    - The ControlBar container lets you place controls at the bottom of 
 *      a Panel or at the top of a Window container.
 */
fringe.ui.components.containers.ControlBar = Object.create(fringe.ui.components.Container, {

	/**
	 * Build
	 */
	build: { configurable:false, value: function (){
	    	this.element = document.createElement('div');
		}
	}

});



/**
 *	Panel	
 *    - A Panel container consists of a title bar and a 
 *      content area for its children.
 * /
Class({package: fringe.ui.components.containers, class: 'Panel', extends: fringe.ui.components.Container}, {
	titleBar: null,
	canvas: null,
	
	setTitle: function(title){
		
		this.titleBar.setTitle(title);
	},
	
	close: function(){
		this.parentElement.removeChild(this.element);
	},
	
	/**
	 * Constructor
	 * /
	Panel: function(){
		this.super();
	},

	/**
	 * Build
	 * /
	build: function (){
		
		this.element = document.createElement('div');
		this.element.className = 'panel';
	
		this.titleBar = new fringe.ui.components.containers.TitleBar()
		this.addComponent(this.titleBar);
		
    	var self = this;

		var close = document.createElement('a');
			close.href = '#';	
			close.onclick = function() {
				self.close.call(self);
			};
			close.textContent = 'Close';
			
		this.titleBar.element.appendChild(close)
		
		this.canvas = new fringe.ui.components.containers.Canvas();
		this.addComponent(this.canvas);
		
	}

});
	

/**
 * 	TabControlBar	
 *	  - The TabControlBar container lets you place controls at the top of a
 *      Navigator container for navigating between its child containers.
 */
//jsCore.containers.TabControlBar = function (){
//	this.constructor = this;
//};
//jsCore.containers.TabControlBar.prototype = new jsCore.core.Container();


/**
 *	TitleBar	
 *    - The TitleBar container lets you place a title at the top of 
 *      a Panel or a Window container.
 */
fringe.ui.components.containers.TitleBar = Object.create(fringe.ui.components.Container, {

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
 *	Window	
 *    - A Window layout container contains a title bar, a control bar, a border, 
 *      and a content area for its child. 
 */
//jsCore.containers.Window = function (){
//	this.constructor = this;
//};
//jsCore.containers.Window.prototype = new jsCore.core.Container();


/**
 *	ViewStack
 *    - A ViewStack navigator container consists of a collection of child 
 *      containers stacked on top of each other, where only one child at 
 *      a time is visible.
 */
//jsCore.containers.ViewStack = function (){
//	this.constructor = this;
//};
//jsCore.containers.ViewStack.prototype = new jsCore.core.Container();


/** TODO: viewStacks need their own file **/
/* viewStacks package */
//jsCore.viewStacks = function() {
	// Throw an error, the core package cannot be instantiated.
//	 throw('A package cannot be instantiated');
//};

/**
 * 	Navigator	
 *	  - The Navigator container extends the ViewStack container by including a 
 *      TabControlBar container for navigating between its child containers.
 */
//jsCore.viewStacks.Navigator = function (){

//	this.constructor = this;
//};
//jsCore.viewStacks.Navigator.prototype = new jsCore.containers.ViewStack();

/**
 *	Grid	
 *    - A Grid container lets you arrange children as rows and columns of cells, 
 *      of an HTML table.
 * /
Class({package: fringe.ui.components.containers, class: 'Grid', extends: fringe.ui.components.Container}, {

	/**
	 * Data Provider
	 * /
	dataProvider: null,
	
	titleBar: null,
	canvas: null,
	controlBar: null,
	
	title: "",
	
	/**
	 * Creates the header row and adds it to the grid.
	 * /
	createHeaderRow: function() {
	},
	
	/**
	 * Creates all data rows and adds them to the grid.
	 * /
	createDataRows: function() {
		var rowClass = "";
		for(var i in this.dataProvider){
			if (rowClass == "odd") rowClass = "even";
			else rowClass = "odd";
			
			var row = new fringe.ui.components.containers.GridRow();
				row.element.className = rowClass;
				row.element.style.height = "20px";
			
			this.addComponent(row);

			for(var j in this.dataProvider[i]){
				var column = document.createElement("td");
				column.innerHTML = this.dataProvider[i][j];
			
				row.element.appendChild(column);
			}
		}
	},
	
	
	/**
	 * Constructor
	 * /
	Grid: function(dataProvider){
		this.dataProvider = dataProvider;
		
		this.super();
	},
	
	/**
	 * Build
	 * /
    build: function (){

		//if ('dataProvider' in properties)
		//	this.dataProvider = properties['dataProvider']['data'];
		
		//if (this.id != null)
		//	this.element = document.getElementById(this.id);

		//if (this.element == null){
	    this.element = document.createElement("table");

		this.element.className = "grid";

    	//this.titleBar = new fringe.container.TitleBar({'id': this.id + '_title', 'title': properties['title']});
    	//this.addChild(this.titleBar);
    		
    	//this.controlBar = new fringe.container.ControlBar();
    	//this.controlBar.width = this.width;
    	//this.addChild(this.controlBar);

    	//this.canvas = new fringe.container.Canvas({'id': this.id + '_canvas', 'innerHTML': innerHTML});
    	//this.addChild(this.canvas);
    	
    	this.createHeaderRow();
    	this.createDataRows();
    }

});

/**
 *	GridRow
 *    - A GridRow
 * /
Class({package: fringe.ui.components.containers, class: 'GridRow', extends: fringe.ui.components.Container}, {
	
	/**
	 * Constructor
	 * /
	GridRow: function(dataProvider){
		this.super();
	},
	
	/**
	 * Build
	 * /
    build: function (){

	    this.element = document.createElement("tr");
    }

});

/**
 *	Form	
 *    - A Form container
 * /
Class({package: fringe.ui.components.containers, class: 'Form', extends: fringe.ui.components.Container}, {
	
	/**
	 * Constructor
	 * /
	Form: function(){
		this.super();
	},
	
	/**
	 * Build
	 * /
    build: function (){
    	this.element = document.createElement('form');
    }

});

/**
 *	Form Text Input
 *    - A Form Text Input
 * /
Class({package: fringe.ui.components.containers, class: 'TextInput', extends: fringe.ui.components.Container}, {
	label: null,
	input: null,
	
	setLabel: function(label){
		this.label.textContent = label;	
	},
	
	setInputName: function(name){
		this.input.name = name;	
	},
	
	/**
	 * Constructor
	 * / 
	TextInput: function(dataProvider){
		this.super();
	},
	
	/**
	 * Build
	 * /
    build: function (){
	    this.element = document.createElement("span");
	    
		this.label = document.createElement('label');
		
		
		this.input = document.createElement('input');
		this.input.type = 'text';
	
		this.element.appendChild(this.label);
		this.element.appendChild(this.input);
    }

});

/**
 *	Form Password Input
 *    - A Form Password Input
 * /
Class({package: fringe.ui.components.containers, class: 'PasswordInput', extends: fringe.ui.components.Container}, {
	label: null,
	input: null,
	
	setLabel: function(label){
		this.label.textContent = label;	
	},
	
	setInputName: function(name){
		this.input.name = name;	
	},
	
	/**
	 * Constructor
	 * /
	PasswordInput: function(dataProvider){
		this.super();
	},
	
	/**
	 * Build
	 * /
    build: function (){
	    this.element = document.createElement("span");
	    
		this.label = document.createElement('label');
		
		
		this.input = document.createElement('input');
		this.input.type = 'password';
	
		this.element.appendChild(this.label);
		this.element.appendChild(this.input);
    }

});

/**
 *	Form Button
 *    - A Form Button
 * /
Class({package: fringe.ui.components.containers, class: 'Button', extends: fringe.ui.components.Container}, {
	label: null,
	input: null,
	
	setLabel: function(label){
		this.label.textContent = label;	
	},
	
	setButtonText: function(text){
		this.input.value = text;	
	},
	
	/**
	 * Constructor
	 * /
	Button: function(){
		this.super();
	},
	
	/**
	 * Build
	 * /
    build: function (){
	    this.element = document.createElement("span");
	    
		this.label = document.createElement('label');
		this.label.textContent = '&nbsp;';
		
		this.input = document.createElement('input');
		this.input.type = 'button';
	
		this.element.appendChild(this.label);
		this.element.appendChild(this.input);
    }

});
*/