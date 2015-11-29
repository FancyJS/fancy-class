(function(){
	var dc = 1,
		pathToSrc = '/fancy/src/',
		files = [
			pathToSrc + 'core/Fancy.js',
			pathToSrc + 'util/Collection.js',
			pathToSrc + 'core/Class.js',
			pathToSrc + 'util/Event.js'
		],
		i = 0,
		iL = files.length,
		dcUrl = '?_dc='+dc;
	
	for(;i<iL;i++){
		var file = files[i] + dcUrl;
		document.write('<script type="text/javascript" charset="UTF-8" src="' + file + '"></script>');
	}
	
})();