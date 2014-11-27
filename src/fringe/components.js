/* package */
fringe.ui.components = {};


//Container
fringe.ui.components.Container = function(){ this.components = new fringe.util.ArrayList(); };
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
         * Remove Row
         */
        removeRow: { writable:false, configurable:false, enumerable:false, 
                                        value: function(row){ 
                                                           this.rows.remove(row);
                                                           row.parentElement.removeChild(this.element);
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


/**
 *	TabNavigator
 *    - A TabNavigator consists of a collection of child containers 
 *      where only one child at a time is visible. The control bar 
 *      is a button array that lets you toggle between them.
 */
fringe.ui.components.TabNavigator = Object.create(fringe.ui.Component, {

	/**
	 * Tab collection
	 * private final ArrayList
	 */
	tabs: { writable:true, configurable:false, enumerable:false,  value: null },
	
	/**
	 * Add Tab
	 */
	addTab: { writable:false, configurable:false, enumerable:true, 
					value: function(tab){ 
							   this.tabs.add(tab);
							   this.controlBar.addComponent(tab.tabController);
							   this.canvas.addComponent(tab.tabView);
						   }
	},
	
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
				this.element.className = 'tabNavigator';
				
				this.titleBar = new fringe.ui.components.containers.TitleBar;
				this.canvas = new fringe.ui.components.containers.Canvas;
				this.controlBar = new fringe.ui.components.containers.ControlBar;
				
				this.canvas.parentElement = this.element;
				this.controlBar.parentElement = this.element;
			 }
	}
});


/**
 *	Tab
 *    - A Tab consists of a controller and a view. The controller 
 *      is a button that lets you toggle the view.
 */
fringe.ui.components.Tab = Object.create(fringe.ui.Component, {

	/**
	 * Build
	 */
	build: { configurable:false, 
			 value: function (){
			 }
	}
});