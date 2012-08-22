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
Class({package: fringe.ui.components.containers, class: 'Canvas', extends: fringe.ui.components.Container}, {

	/**
	 * Constructor
	 */
	Canvas: function(){
		this.super();
	},
	
	/**
	 * Build
	 */
    build: function (){
    	
    	this.element = document.createElement('div');
    }
});



/**
 *	ControlBar	
 *    - The ControlBar container lets you place controls at the bottom of 
 *      a Panel or at the top of a Window container.
 */
Class({package: fringe.ui.components.containers, class: 'ControlBar', extends: fringe.ui.components.Container}, {
	
	/**
	 * Constructor
	 */
	ControlBar: function(){
		this.super();
	},
	
	/**
	 * Build
	 */
    build: function (){
    	
    	this.element = document.createElement('div');
    }
});



/**
 *	Panel	
 *    - A Panel container consists of a title bar, a control bar, a border, and a 
 *      content area for its children.
 */
Class({package: fringe.ui.components.containers, class: 'Panel', extends: fringe.ui.components.Container}, {
	titleBar: null,
	canvas: null,
	controlBar: null,
	
	setTitle: function(title){
		if (titleBar == null)
			this.titleBar = this.addComponent(new fringe.ui.components.TitleBar())
			
		this.titleBar.setTitle(title);
	},
	
	/**
	 * Constructor
	 */
	Panel: function(){
		this.super();
	}

});
	

/**
 *	TitleBar	
 *    - The TitleBar container lets you place a title at the top of 
 *      a Panel or a Window container.
 */
Class({package: fringe.ui.components, class: 'TitleBar', extends: fringe.ui.Component}, {
	title: '',

	setTitle: function(title){
		this.title = title;
		
		if (this.element != null)
			this.element.innerText = title;	
	},
	
	/**
	 * Constructor
	 */
	TitleBar: function(){
		this.super();
	},
	
	/**
	 * Build
	 */
    build: function (){
    	
    	this.element = document.createElement('div');
    	this.element.innerText = this.title;	
   }
    
});


/**
 *	Grid	
 *    - A Grid container lets you arrange children as rows and columns of cells, 
 *      of an HTML table.
 */
Class({package: fringe.ui.components.containers, class: 'Grid', extends: fringe.ui.components.Container}, {

	/**
	 * Data Provider
	 */
	dataProvider: null,
	
	titleBar: null,
	canvas: null,
	controlBar: null,
	
	title: "",
	
	/**
	 * Creates the header row and adds it to the grid.
	 */
	createHeaderRow: function() {
	},
	
	/**
	 * Creates all data rows and adds them to the grid.
	 */
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
	 */
	Grid: function(dataProvider){
		this.dataProvider = dataProvider;
		
		this.super();
	},
	
	/**
	 * Build
	 */
    build: function (){

	    this.element = document.createElement("table");

		this.element.className = "grid";

     	this.createHeaderRow();
    	this.createDataRows();
    }

});

/**
 *	GridRow
 *    - A GridRow
 */
Class({package: fringe.ui.components.containers, class: 'GridRow', extends: fringe.ui.components.Container}, {
	
	/**
	 * Constructor
	 */
	GridRow: function(dataProvider){
		this.super();
	},
	
	/**
	 * Build
	 */
    build: function (){

	    this.element = document.createElement("tr");
    }

});
