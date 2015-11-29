/*!
 * Fancy Class is tiny OOP modern library on JavaScript
 * MIT LICENCE
 */

/**
 * @class Fancy utilities and functions.
 * @singleton
 */
var Fancy = {
	/**
	 * The version of the framework
	 * @type String
	 */
	version: '0.2.1',
	global: window
};

/**
 * Copies all the properties of `from` to the specified `to`.
 * 
 * @param {Object} to The receiver of the properties.
 * @param {Object} from The primary source of the properties.
 */
Fancy.apply = function(to, from){
	for(var p in from){
		to[p] = from[p];
	}
};

/**
 * Copies all the properties of `from` to the specified `to`.
 * 
 * @param {Object} to The receiver of the properties.
 * @param {Object} from The primary source of the properties.
 */
Fancy.applyIf = function(to, from){
	for(var p in from){
		if( to[p] === undefined ){
			to[p] = from[p];
		}
	}
};

/**
 * Creates namespaces to be used for scoping variables and classes so that they are not global.
 * Specifying the last node of a namespace implicitly creates all other nodes.
 * @param {String} namespace1
 * @param {String} namespace2
 * @param {String} etc
 */
Fancy.namespace = function(){
	var i = 0,
		iL = arguments.length;
	
	for(;i<iL;i++){
		var value = arguments[i],
			parts = value.split("."),
			j = 1,
			jL = parts.length;
		
		Fancy.global[parts[0]] = Fancy.global[parts[0]] || {};
		var namespace = Fancy.global[parts[0]];
		
		for(;j<jL;j++){
			namespace[parts[j]] = namespace[parts[j]] || {};
			namespace = namespace[parts[j]];
		}
	}
};

/**
 * Creates namespaces to be used for scoping variables and classes so that they are not global.
 * Specifying the last node of a namespace implicitly creates all other nodes. 
 * @param {String} namespace1
 * @param {String} namespace2
 * @param {String} etc
 */
Fancy.ns = Fancy.namespace;

/**
 * Returns the type of the given variable in string format. List of possible values are:
 *
 * - `undefined`: If the given value is `undefined`
 * - `string`: If the given value is a string
 * - `number`: If the given value is a number
 * - `boolean`: If the given value is a boolean value
 * - `date`: If the given value is a `Date` object
 * - `function`: If the given value is a function reference
 * - `object`: If the given value is an object
 * - `array`: If the given value is an array
 * - `regexp`: If the given value is a regular expression
 *
 * @param {Mixed} value
 * @return {String}
 */
Fancy.typeOf = function(value){
	if(value === null) {
        return 'null';
	}

	var type = typeof value;
	if(type === 'undefined' || type === 'string' || type === 'number' || type === 'boolean') {
		return type;
	}

	var toString = Object.prototype.toString,
		typeToString = toString.call(value);

	switch(typeToString){
		case '[object Array]':
			return 'array';
		case '[object Date]':
			return 'date';
		case '[object Boolean]':
			return 'boolean';
		case '[object Number]':
			return 'number';
		case '[object RegExp]':
			return 'regexp';
	}

	if(type === 'function'){
		return 'function';
	}

	if(type === 'object'){
		return 'object';
	}
};

/**
 * Returns true if the passed value is a JavaScript array, otherwise false.
 * @param {Mixed} value The value to test
 * @return {Boolean}
 */
Fancy.isArray = ('isArray' in Array) ? Array.isArray : function(value){
	var toString = Object.prototype.toString;
	
    return toString.call(value) === '[object Array]';
};

/**
 * Returns true if the passed value is a JavaScript Object, otherwise false.
 * @param {Mixed} value The value to test
 * @return {Boolean}
 */
Fancy.isObject = function(value){
	var toString = Object.prototype.toString;
	
	return toString.call(value) === '[object Object]';
};

/**
 * Returns true if the passed value is a JavaScript Function, otherwise false.
 * @param {Mixed} value The value to test
 * @return {Boolean}
 */
Fancy.isFunction = function(value){
	var toString = Object.prototype.toString;
	
    return toString.apply(value) === '[object Function]';
};

/**
 * Returns true if the passed value is a string.
 * @param {Mixed} value The value to test
 * @return {Boolean}
 */
Fancy.isString = function(value){
    return typeof value === 'string';
};

/**
 * Returns true if the passed value is a number. Returns false for non-finite numbers.
 * @param {Mixed} value The value to test
 * @return {Boolean}
 */
Fancy.isNumber = function(v){
    return typeof v === 'number' && isFinite(v);
};

/**
 * Returns true if the passed value is a boolean.
 * @param {Mixed} value The value to test
 * @return {Boolean}
 */
Fancy.isBoolean = function(value){
    return typeof value === 'boolean';
};

/**
 * Iterates an array calling the supplied function.
 * @param {Array} arrayObject The array to be iterated. If this
 * argument is not really an array, the supplied function is called once.
 * @param {Function} fn The function to be called with each item.
 * @return See description for the fn parameter.
 */
Fancy.each = function(arrayObject, fn){
	var a = arrayObject,
		type = Fancy.typeOf(arrayObject);

	switch(type){
		case 'array':
			var i = 0,
				iL = a.length;

			for(;i<iL;i++){
				fn(arrayObject[i], i, arrayObject);
			}
			break;
		case 'object':
			var p;

			for(p in arrayObject){
				fn(arrayObject[p], p, arrayObject);
			}
			break;
	}
};

/**
 * Help function for OOP
 * Copies all the properties of `config` to the specified `object`.
 * @param {Object} object The receiver of the properties.
 * @param {Object} config The primary source of the properties.
 * @return {Object}
 */
Fancy.applyConfig = function(object, config){
	var property,
		config = config || {};
	
	if(object._isConfigApplied === true){
		return object;
	}
	
    for(property in config){
		object[property] = config[property];
    }
	object._isConfigApplied = true;
	
    return object;
};
/**
 * @class Fancy.Collection
 * @private
 * Helps to OOP organization of classes.
 */
Fancy.Collection = function(arr){
	var me = this;
	
	me.items = [];
	me.keys = [];
	me.map = {};
	me.indexMap = {};
	me.length = 0;
	
	if( arr ){
		if(arr.length > 0){
			var i = 0,
				iL = arr.length;
			
			for(;i<iL;i++){
				me.add(i, arr[i]);
			}
		}
		else{
			for(var p in arr){
				me.add(p, arr[p]);
			}
		}
	}
};

Fancy.Collection.prototype = {


	/**
	 * Add item over a pair of `key` `value` to collection.
	 * @params {String} key 
	 * @params {Mixed} value
	 */
	add: function(key, value){
		var me = this;
		
		me.items.push(value);
		me.keys.push(key);
		me.map[key] = value;
		me.indexMap[key] = me.length;
		me.length++;
	},
	/**
     * Remove an item from the collection.
     * @param {String} key The key of item to remove.
     */
	remove: function(key){
		var me = this,
			index = me.indexMap[key];
		
		me.items.splice(index, 1);
		me.keys.splice(index, 1);
		delete me.indexMap[index];
		delete me.map[key];
		me.length--;
	},
	/**
     * Remove all items in the collection.
     */
	removeAll: function(){
		var me = this;
		
		me.items = [];
		me.keys = [];
		me.indexMap = {};
		me.map = {};
		me.length = 0;
	},
	/**
     * Returns the item associated with the passed key.
     * @param {String/Number} key The key of the item.
     */
	get: function(key){
		var me = this;
		
		return me.map[key];
	},
	/**
     * Executes the function once for every item in the collection. 
     *
     * @param {Function} fn The function to execute for each item.
     */
	each: function(fn){
		var me = this,
			i = 0,
			iL = me.length;
		
		for(;i<iL;i++){
			fn(me.keys[i], me.items[i], i, me.length);
		}
	}
};
(function(){

var $classes = {},
	$types = {};

var applyIf = function(Child, Parent){
	for(var p in Parent.prototype){
		if(Child.prototype[p] === undefined){
			Child.prototype[p] = Parent.prototype[p];
		}
	}
};

/**
 * @class Fancy.ClassManager
 * @private
 * Helps to OOP organization of classes.
 */

var ClassManager = function(){};
ClassManager.prototype = {
	items: new Fancy.Collection(),
	add: function(key, value){
		var parts = key.split("."),
			i = 1,
			iL = parts.length - 1;

		Fancy.ns(key);
		
		var ref = Fancy.global[parts[0]];
		
		for(;i<iL;i++){
			ref = ref[parts[i]];
		}
		
		if(parts.length > 1){
			ref[parts[parts.length - 1]] = value;
		}
		else{
			Fancy.global[parts[0]] = value;
		}
		
		this.items.add(key, value);
	},
	get: function(key){
		return this.items.get(key);
	}
};

/**
 * @class Fancy.ClassManager
 * @private
 * @singleton
 * Helps to OOP organization of classes.
 */
Fancy.ClassManager = new ClassManager();

/**
 * Do class in window scope with namespace `name` and `config`.
 * @params {String} name Name of class.
 * @params {Object} config Config of class
 */
Fancy.Class = function(name, config){
	var config = config || {},
		names = [];
	
	if( Fancy.isArray(name) ){
		names = name;
		name = names[0];
	}
	
	if(config.constructor === Object){
		if(config.extend === undefined){
			config.constructor = function(){
				
			};
		}
		else{
			config.constructor = function(){
				this.Super('constructor', arguments);
			};
		}
	}
	
	if(config.extend === undefined){
		$classes[name] = config.constructor;
	}
	else{
		$classes[name] = config.constructor;
		
		var extendClass;
		switch(typeof config.extend){
			case 'string':
				extendClass = Fancy.ClassManager.get(config.extend);
				$classes[name].prototype.$Super = Fancy.ClassManager.get(config.extend);
				break;
			case 'function':
				extendClass = config.extend;
				$classes[name].prototype.$Super = config.extend;
				break;
		}
		delete config.extend;
		
		$classes[name].prototype.Super = function(method, args){
			var me = this;
			//console.log(me.$Super.prototype.$name);
			if( me.$Iam ){
				me.$Iam = Fancy.ClassManager.get( me.$Iam.prototype.$Super.prototype.$name );
			}
			else{
				me.$Iam = Fancy.ClassManager.get( me.$Super.prototype.$name );
			}
			//console.log(config);
			switch(method){
				case 'const':
				case 'constructor':
					me.$Iam.apply(me, args);
				break;
				default:
					//console.log(me.$Iam, method, name, config);
					//console.log(me.$Iam);
					me.$Iam.prototype[method].apply(me, args);
			}
			
			delete me.$Iam;
		};
		applyIf($classes[name], extendClass);
	}
	
	$classes[name].prototype.$name = name;
	
	if(config.traits){
		Fancy.trait( $classes[name].prototype, config.traits );
		delete $classes[name].prototype.traits;
	}
	
	if(config.plugins !== undefined){
		if( $classes[name].prototype.$plugins === undefined ){
			$classes[name].prototype.$plugins = [];
		}
		
		$classes[name].prototype.$plugins = $classes[name].prototype.$plugins.concat( config.plugins );
		delete $classes[name].prototype.plugins;
	}
	
	for(var p in config){
		$classes[name].prototype[p] = config[p];
	}
	
	var _classRef = $classes[name];
	
	if( config.singleton === true ){
		delete $classes[name];
		_classRef = new _classRef(config);
		$classes[name] = _classRef;
		
	}
	
	if( names.length > 1 ){
		Fancy.each(names, function(name){
			Fancy.ClassManager.add(name, _classRef);
		});
	}
	else{
		Fancy.ClassManager.add(name, _classRef);
	}
	
	if(config.type){
		$types[config.type] = _classRef;
		Fancy.addWidgetType(config.type, _classRef);
	}
	else if(config.ptype){
		$types[config.type] = _classRef;
		Fancy.addPluginByType(config.ptype, _classRef);
	}
};

})();
(function(){
var seedFn = 0,
	fns = {};

/**
 * Base class that provides a common interface for publishing events.
 * @class Fancy.Event
 * @class Fancy.Observable
 */
Fancy.Class(['Fancy.Event', 'Fancy.Observable'], {
	/**
	 * @params {Object} config
	 */
	constructor: function(config){
		var me = this,
			config = config || {};
	
		Fancy.applyConfig(me, config);
		
		me.$events = {};
		if(me.listeners || me.events){
			var listeners = me.listeners || me.events,
				i = 0,
				iL = listeners.length;
			
			for(;i<iL;i++){
				var lis = listeners[i],
					eventName = null,
					handler = null,
					scope = null,
					params = [];
				
				for(var p in lis){
					if(p === 'scope'){
						scope = lis[p];
					}
					else if(p === 'params'){
						params = lis[p];
					}
					else{
						eventName = p;
						handler = lis[p];
					}
				}
				
				if(eventName === null || Fancy.isFunction(handler) === false){
					throw new Error('Event was not set');
				}
				
				if(Fancy.isArray(params) === false){
					throw new Error('params must be array');
				}
				
				me.addEvent(eventName);
				me.on(eventName, handler, scope, params);
			}
		}
	},
	/**
     * Appends an event handler to this object.
	 * @param {String}   eventName The name of the event to listen for.
     * @param {Function} fn The method the event invokes.
	 * @param {Object} [scope] The scope in which the handler function is executed.
	 * @param {Object} [params] An object containing handler configuration.
	 */
	on: function(eventName, fn, scope, params){
		if( this.$events[eventName] === undefined ){
			console.log(arguments);
			throw new Error('Event name is not set: ' + eventName);
		}
		
		fn.$mtFnSeed = seedFn;
		fns[seedFn] = fn;
		seedFn++;
		
		this.$events[eventName].push({
			fn:fn,
			scope: scope,
			params: params || []
		});
	},
	/**
     * Removes an event handler.
     * @param {String} eventName The type of event the handler was associated with.
     * @param {Function} handler The handler to remove.
     */
	un: function(eventName, fn){
		var me = this,
			$events = me.$events[eventName];
		
		if(!$events){
			return false;
		}
		
		var i = 0,
			iL = $events.length;
		
		for(;i<iL;i++){
			var lis = $events[i];
			if(lis.fn.$mtFnSeed === fn.$mtFnSeed){
				lis.toRemove = true;
				//$events.splice(i, 1);
				return true;
			}
		}
		return false;
	},
	/**
     * Appends an event handler to this object but it runes only once.
	 * @param {String}   eventName The name of the event to listen for.
     * @param {Function} fn The method the event invokes.
	 * @param {Object} [scope] The scope in which the handler function is executed.
	 * @param {Object} [params] An object containing handler configuration.
	 */
	once: function(eventName, fn, scope){
		var me = this,
			fnWrapper = function(){
				fn.apply(this, arguments);
				me.un(eventName, fnWrapper);
			};
		
		me.on(eventName, fnWrapper, scope);
	},
	/**
     * Removes all listeners for this object
     */
	unAll: function(){
		this.$events = {};
	},
	/**
     * Removes listeners for this object by eventName
	 * @params {Object} eventName
     */
	unAllByType: function(eventName){
		this.$events[eventName] = [];
	},
	/**
     * Fires the specified event with the passed parameters
     * @param {String} eventName The name of the event to fire.
     */
	fire: function(eventName){
		var me = this,
			$events = me.$events[eventName];
		
		if(!$events){
			return false;
		}
		
		var i = 1,
			iL = arguments.length,		
			args = [me];
			
		for(;i<iL;i++){
			args.push(arguments[i]);
		}
		
		var i = 0,
			iL = $events.length;
		
		for(;i<iL;i++){
			var lis = $events[i],
				_args = [];
			
			if( lis.toRemove === true ){
				$events.splice(i, 1);
				i--;
				iL = $events.length;
				continue;
			}
			
			_args = _args.concat(args);
			if( lis.params ){
				_args = _args.concat(lis.params);
			}
			
			lis.fn.apply(lis.scope || me, _args);
		}
	},
	/**
	 * Adds the specified event to the list of events which this Observable may fire.
	 * @param {String} eventName Event name.
	 */
	addEvent: function(eventName){
		var me = this;
		
		me.$events[eventName] = me.$events[eventName] || [];
	},
	/**
     * Adds the specified events to the list of events which this Observable may fire.
     * @param {String} eventName Event name.
	 * @param {String} etc
     */
	addEvents: function(eventName){
		var me = this;
		if(arguments.length > 1){
			var tempEventName = [],
				i = 0,
				iL = arguments.length;
				
			for(;i<iL;i++){
				tempEventName[i] = arguments[i];
			}
			eventName = tempEventName;
		}
		if(Fancy.typeOf(eventName) === 'string'){			
			me.$events[eventName] = me.$events[eventName] || [];
		}
		else if(Fancy.typeOf(eventName) === 'array'){
			var i = 0,
				iL = eventName.length;
			
			for(;i<iL; i++){
				me.$events[eventName[i]] = me.$events[eventName[i]] || [];
			}
		}
	},
	/**
     * Checks to see if this object has any listeners for a specified event
     * @param {String} eventName The name of the event to check for
     * @return {Boolean} True if the event is being listened for, else false
     */
	has: function(eventName){
		var lis = this.$events[eventName];
		if(!lis){
			return false;
		}
		
		return lis.length !== 0;
	}
});

})();
