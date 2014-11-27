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
 * Created: 10/25/2012
 */

/* grid package */
fringe.ui.components.grids = {};

/**
 *	DataGrid	
 *    - A DataGrid container lets you display data as an HTML table.
 */
fringe.ui.components.grids.DataGrid = function(dataProvider) { 
	this.build();
	this.dataProvider = dataProvider; 
};
fringe.ui.components.grids.DataGrid.prototype = Object.create(new fringe.ui.components.Container, {
	/**
	 * Data Provider
	 */
	_dataProvider: { writable:true, configurable:false, enumerable:false, value: null },
	dataProvider: { configurable:false,
					get: function() { return this._dataProvider; },
					set: function(value) { 
							this._dataProvider = value;
							
							this.createHeaderRow();
							this.createDataRows();
						 }
	},
	
	/**
	 * Set Title
	 */
	title: { configurable:false, set: function(value){ this.titleBar.title = value; } },
	
	/**
	 * TitleBar
	 */
	titleBar: { writable:true, configurable:false,  value: null },
	
	/**
	 * ControlBar
	 */
	controlBar: { writable:true, configurable:false,  value: null },
	
	/**
	 * Grid
	 */
	grid: { writable:true, configurable:false,  value: null },
	
	/**
	 * Creates the header row and adds it to the grid.
	 */
	createHeaderRow: { writable:true, configurable:false, 
					  value: function() {
								var row = new fringe.ui.components.grids.GridRow();
								this.grid.addRow(row);
								
								for(var i in this.dataProvider.header){
									var column = document.createElement("th");
										column.innerHTML = this.dataProvider.header[i];
									
									row.addColumn(column);
								}
							 }
	},
	
	/**
	 * Creates all data rows and adds them to the grid.
	 */
	createDataRows: { writable:true, configurable:false, 
					  value: function() {
								for(var i in this.dataProvider.data){
									
									var row = new fringe.ui.components.grids.GridRow();
									this.grid.addRow(row);

									for(var j in this.dataProvider.data[i]){
										var column = document.createElement("td");
											column.innerHTML = this.dataProvider.data[i][j];
									
										row.addColumn(column);
									}
								}
							 }
	},
	
        /**
         * Clears all data rows.
         */
        clear: { writable:true, configurable:false, 
                                          value: function() {
                                                                for(var row in this.grid.rows){
                                                                        
                                                                        this.grid.removeRow(row);
                                                                }
                                                         }
        },
	
	/**
	 * Build
	 */
	build: { configurable:false, 
			 value: function (){
				this.element = document.createElement('div');
				this.element.className = 'panel dataGrid';
				
				this.titleBar = new fringe.ui.components.containers.TitleBar;
				this.grid = new fringe.ui.components.Grid;
				this.controlBar = new fringe.ui.components.containers.ControlBar;
				
				this.addComponent(this.titleBar);
				this.addComponent(this.controlBar);
				this.addComponent(this.grid);

				this.titleBar.title = 'DataGrid';
				this.controlBar.element.textContent = 'Control Bar';
			 }
	}
	
});


/**
 *	GridRow
 *    - A GridRow
 */
fringe.ui.components.grids.GridRow = function() {
	this.columns = new fringe.util.ArrayList(); 
	this.build(); 
};
fringe.ui.components.grids.GridRow.prototype = Object.create(new fringe.ui.components.Container, {
	
	/**
	 * Column collection
	 * private final ArrayList
	 */
	columns: { writable:true, configurable:false, enumerable:false,  value: null },
	
	/**
	 * Add Column
	 */
	addColumn: { writable:false, configurable:false, enumerable:false, 
					value: function(column){ 
							   this.columns.add(column);
							   //column.parentElement = this.element;
							   this.element.appendChild(column);
						   }
	},
	
	/**
	 * Build
	 */
	build: { configurable:false, 
			 value: function (){
				this.element = document.createElement('tr');
			 }
	}

});