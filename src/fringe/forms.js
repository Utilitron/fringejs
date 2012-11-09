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
 * Created: 10/25/2012
 */

/* containers package */
fringe.ui.components.forms = {};


/**
 *	Form Text Input
 *    - A Form Text Input
 */
fringe.ui.components.forms.TextInput = function(dataProvider) { this.build(); }
fringe.ui.components.forms.TextInput.prototype = Object.create(new fringe.ui.components.Container, {
	
	/**
	 * Label
	 */
	_label: { writable:true, configurable:false, enumerable:false, value: null },
	label: { configurable:false,
			 get: function() { 
					  if (this._label != null)
						  return this._label.textContent;
					  else
						  return null;
				  },
			 set: function(value) {
					  if (this._label != null)
						  this._label.textContent = value;
					  else
						  throw new Error('!!');
				  }
	},

	/**
	 * Input
	 */
	input: { writable:true, configurable:false, enumerable:false, value: null },
	
	/**
	 * Build
	 */
	build: { configurable:false, 
			 value: function (){
			    this.element = document.createElement("span");
			    this.element.className = 'formInput';
			    
				this._label = document.createElement('label');
				
				
				this.input = document.createElement('input');
				this.input.type = 'text';
			
				this.element.appendChild(this._label);
				this.element.appendChild(this.input);
			 }
	}

});

/**
 *	Form Password Input
 *    - A Form Password Input
 */
fringe.ui.components.forms.PasswordInput = function(dataProvider) { this.build(); }
fringe.ui.components.forms.PasswordInput.prototype = Object.create(new fringe.ui.components.Container, {

	/**
	 * Label
	 */
	_label: { writable:true, configurable:false, enumerable:false, value: null },
	label: { configurable:false,
			 get: function() { 
					  if (this._label != null)
						  return this._label.textContent;
					  else
						  return null;
				  },
			 set: function(value) {
					  if (this._label != null)
						  this._label.textContent = value;
					  else
						  throw new Error('!!');
				  }
	},

	/**
	 * Input
	 */
	input: { writable:true, configurable:false, enumerable:false, value: null },
	
	/**
	 * Build
	 */
	build: { configurable:false, 
			 value: function (){
			    this.element = document.createElement("span");
			    this.element.className = 'formInput';
			    
				this._label = document.createElement('label');
				
				
				this.input = document.createElement('input');
				this.input.type = 'password';
			
				this.element.appendChild(this._label);
				this.element.appendChild(this.input);
			 }
	}

});

/**
 *	Form Button
 *    - A Form Button
 */
fringe.ui.components.forms.Button = function(dataProvider) { this.build(); }
fringe.ui.components.forms.Button.prototype = Object.create(new fringe.ui.components.Container, {

	/**
	 * Text
	 */
	text: { configurable:false,
			 get: function() { 
					  if (this.input != null)
						  return this.input.value ;
					  else
						  return null;
				  },
			 set: function(value) {
					  if (this.input != null)
						  this.input.value = value;
					  else
						  throw new Error('!!');
				  }
	},
	
	/**
	 * Label
	 */
	label: { writable:true, configurable:false, enumerable:false, value: null },

	/**
	 * Input
	 */
	input: { writable:true, configurable:false, enumerable:false, value: null },
	
	/**
	 * Build
	 */
	build: { configurable:false, 
			 value: function (){
			    this.element = document.createElement("span");
			    this.element.className = 'formInput';
			    
				this.label = document.createElement('label');
				this.label.textContent = '&nbsp;';
				
				this.input = document.createElement('input');
				this.input.type = 'button';
			
				this.element.appendChild(this.label);
				this.element.appendChild(this.input);
			 }
	}

});
