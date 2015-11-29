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