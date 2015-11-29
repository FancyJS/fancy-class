Fancy Class is tiny OOP modern library on JavaScript  
MIT LICENCE  
  
Version - 0.0.21  
Debug version - 17 Kb  
Min version - 7 Kb  
Min and gzipped version - 3 Kb  

Good Sample in real http://fancyjs.com/fancy-class/samples/base/index.html  

#Include
``` html
Debug
<script src="build/load-all-js-files.js"></script>
```
``` html
Release
<script src="../build/fancy-class.js"></script>
```
``` html
Release min
<script src="../build/fancy-class-min.js"></script>
```




# Samples
## Sample 1
``` html
<script>
Fancy.Class('Car', {
	constructor: function(){
		console.log('Car constructor');
	},
	name: 'Car',
	run: function(km){
		console.log('I am '+ this.name + ' run ' + 'on ' + km + '/h');
	},
	getName: function(){
		console.log(this.name);
	}
});

Fancy.Class('AverageCar', {
	extend: Car,
	name: 'AverageCar',
	constructor: function(){
		console.log('AverageCar constructor');
		this.Super('constructor', arguments);
	},
	run: function(){
		console.log('cool');
		this.Super('run', arguments);
	}
});

Fancy.Class('SuperCar', {
	extend: AverageCar,
	name: 'SuperCar',
	constructor: function(){
		console.log('SuperCar constructor');
		this.Super('constructor', arguments);
	},
	run: function(){
		console.log('runnnnnn');
		this.Super('run', arguments);
	}
});

var s = new SuperCar();

s.getName();
s.run(70);
</script>
```

##Sample 2
Singleton
```html
<script src="../build/fancy-class-min.js"></script>

<script>
Fancy.Class('My.App', {
	singleton: true,
	constructor: function(){
		var me = this;
		
	},
	a: function(){
		console.log('a');
	},
	b: function(){
		console.log('b');
	}
});

My.App.a();
My.App.b();
</script>
```

##Sample 3
Fancy.Event  
```html
<script src="../build/fancy-min.js"></script>

<script>
Fancy.Class('Fancy.Window', {
	extend: Fancy.Event,
	constructor: function(){
		var me = this;
		
		this.Super('const', arguments);
		me.init();
	},
	init: function(){
		var me = this;
		
		me.addEvent('rendered', 'show', 'hide');
		me.render();
	},
	render: function(){
		var me = this;
		
		me.fire('rendered');
	},
	show: function(){
		var me = this;
		
		me.fire('show');
	},
	hide: function(){
		var me = this;
		
		me.fire('hide');
	}
});

var w = new Fancy.Window({
	title: 'Title',
	listeners: [{
		rendered: function(){
			console.log('rendered');
		}
	},{
		show: function(){
			console.log('show');
		}
	}]
});

w.on('hide', function(){
	console.log('hide');
});
</script>
```
