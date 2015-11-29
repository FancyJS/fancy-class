/*!
 * Fancy Class is tiny OOP modern library on JavaScript
 * MIT LICENCE
 */
var Fancy={version:"0.2.1",global:window};Fancy.apply=function(c,b){for(var a in b){c[a]=b[a]}};Fancy.applyIf=function(c,b){for(var a in b){if(c[a]===undefined){c[a]=b[a]}}};Fancy.namespace=function(){var d=0,a=arguments.length;for(;d<a;d++){var f=arguments[d],g=f.split("."),c=1,b=g.length;Fancy.global[g[0]]=Fancy.global[g[0]]||{};var e=Fancy.global[g[0]];for(;c<b;c++){e[g[c]]=e[g[c]]||{};e=e[g[c]]}}};Fancy.ns=Fancy.namespace;Fancy.typeOf=function(b){if(b===null){return"null"}var a=typeof b;if(a==="undefined"||a==="string"||a==="number"||a==="boolean"){return a}var c=Object.prototype.toString,d=c.call(b);switch(d){case"[object Array]":return"array";case"[object Date]":return"date";case"[object Boolean]":return"boolean";case"[object Number]":return"number";case"[object RegExp]":return"regexp"}if(a==="function"){return"function"}if(a==="object"){return"object"}};Fancy.isArray=("isArray" in Array)?Array.isArray:function(a){var b=Object.prototype.toString;return b.call(a)==="[object Array]"};Fancy.isObject=function(a){var b=Object.prototype.toString;return b.call(a)==="[object Object]"};Fancy.isFunction=function(a){var b=Object.prototype.toString;return b.apply(a)==="[object Function]"};Fancy.isString=function(a){return typeof a==="string"};Fancy.isNumber=function(a){return typeof a==="number"&&isFinite(a)};Fancy.isBoolean=function(a){return typeof a==="boolean"};Fancy.each=function(g,f){var c=g,e=Fancy.typeOf(g);switch(e){case"array":var d=0,b=c.length;for(;d<b;d++){f(g[d],d,g)}break;case"object":var h;for(h in g){f(g[h],h,g)}break}};Fancy.applyConfig=function(b,a){var c,a=a||{};if(b._isConfigApplied===true){return b}for(c in a){b[c]=a[c]}b._isConfigApplied=true;return b};Fancy.Collection=function(a){var d=this;d.items=[];d.keys=[];d.map={};d.indexMap={};d.length=0;if(a){if(a.length>0){var c=0,b=a.length;for(;c<b;c++){d.add(c,a[c])}}else{for(var e in a){d.add(e,a[e])}}}};Fancy.Collection.prototype={add:function(a,c){var b=this;b.items.push(c);b.keys.push(a);b.map[a]=c;b.indexMap[a]=b.length;b.length++},remove:function(b){var c=this,a=c.indexMap[b];c.items.splice(a,1);c.keys.splice(a,1);delete c.indexMap[a];delete c.map[b];c.length--},removeAll:function(){var a=this;a.items=[];a.keys=[];a.indexMap={};a.map={};a.length=0},get:function(a){var b=this;return b.map[a]},each:function(c){var d=this,b=0,a=d.length;for(;b<a;b++){c(d.keys[b],d.items[b],b,d.length)}}};(function(){var c={},b={};var d=function(f,e){for(var g in e.prototype){if(f.prototype[g]===undefined){f.prototype[g]=e.prototype[g]}}};var a=function(){};a.prototype={items:new Fancy.Collection(),add:function(g,j){var k=g.split("."),f=1,e=k.length-1;Fancy.ns(g);var h=Fancy.global[k[0]];for(;f<e;f++){h=h[k[f]]}if(k.length>1){h[k[k.length-1]]=j}else{Fancy.global[k[0]]=j}this.items.add(g,j)},get:function(e){return this.items.get(e)}};Fancy.ClassManager=new a();Fancy.Class=function(g,f){var f=f||{},j=[];if(Fancy.isArray(g)){j=g;g=j[0]}if(f.constructor===Object){if(f.extend===undefined){f.constructor=function(){}}else{f.constructor=function(){this.Super("constructor",arguments)}}}if(f.extend===undefined){c[g]=f.constructor}else{c[g]=f.constructor;var e;switch(typeof f.extend){case"string":e=Fancy.ClassManager.get(f.extend);c[g].prototype.$Super=Fancy.ClassManager.get(f.extend);break;case"function":e=f.extend;c[g].prototype.$Super=f.extend;break}delete f.extend;c[g].prototype.Super=function(m,k){var l=this;if(l.$Iam){l.$Iam=Fancy.ClassManager.get(l.$Iam.prototype.$Super.prototype.$name)}else{l.$Iam=Fancy.ClassManager.get(l.$Super.prototype.$name)}switch(m){case"const":case"constructor":l.$Iam.apply(l,k);break;default:l.$Iam.prototype[m].apply(l,k)}delete l.$Iam};d(c[g],e)}c[g].prototype.$name=g;if(f.traits){Fancy.trait(c[g].prototype,f.traits);delete c[g].prototype.traits}if(f.plugins!==undefined){if(c[g].prototype.$plugins===undefined){c[g].prototype.$plugins=[]}c[g].prototype.$plugins=c[g].prototype.$plugins.concat(f.plugins);delete c[g].prototype.plugins}for(var i in f){c[g].prototype[i]=f[i]}var h=c[g];if(f.singleton===true){delete c[g];h=new h(f);c[g]=h}if(j.length>1){Fancy.each(j,function(k){Fancy.ClassManager.add(k,h)})}else{Fancy.ClassManager.add(g,h)}if(f.type){b[f.type]=h;Fancy.addWidgetType(f.type,h)}else{if(f.ptype){b[f.type]=h;Fancy.addPluginByType(f.ptype,h)}}}})();(function(){var b=0,a={};Fancy.Class(["Fancy.Event","Fancy.Observable"],{constructor:function(e){var j=this,e=e||{};Fancy.applyConfig(j,e);j.$events={};if(j.listeners||j.events){var k=j.listeners||j.events,g=0,d=k.length;for(;g<d;g++){var n=k[g],h=null,m=null,l=null,f=[];for(var c in n){if(c==="scope"){l=n[c]}else{if(c==="params"){f=n[c]}else{h=c;m=n[c]}}}if(h===null||Fancy.isFunction(m)===false){throw new Error("Event was not set")}if(Fancy.isArray(f)===false){throw new Error("params must be array")}j.addEvent(h);j.on(h,m,l,f)}}},on:function(c,e,d,f){if(this.$events[c]===undefined){console.log(arguments);throw new Error("Event name is not set: "+c)}e.$mtFnSeed=b;a[b]=e;b++;this.$events[c].push({fn:e,scope:d,params:f||[]})},un:function(d,g){var h=this,j=h.$events[d];if(!j){return false}var f=0,c=j.length;for(;f<c;f++){var e=j[f];if(e.fn.$mtFnSeed===g.$mtFnSeed){e.toRemove=true;return true}}return false},once:function(c,e,d){var g=this,f=function(){e.apply(this,arguments);g.un(c,f)};g.on(c,f,d)},unAll:function(){this.$events={}},unAllByType:function(c){this.$events[c]=[]},fire:function(e){var j=this,k=j.$events[e];if(!k){return false}var h=1,d=arguments.length,g=[j];for(;h<d;h++){g.push(arguments[h])}var h=0,d=k.length;for(;h<d;h++){var f=k[h],c=[];if(f.toRemove===true){k.splice(h,1);h--;d=k.length;continue}c=c.concat(g);if(f.params){c=c.concat(f.params)}f.fn.apply(f.scope||j,c)}},addEvent:function(c){var d=this;d.$events[c]=d.$events[c]||[]},addEvents:function(e){var g=this;if(arguments.length>1){var d=[],f=0,c=arguments.length;for(;f<c;f++){d[f]=arguments[f]}e=d}if(Fancy.typeOf(e)==="string"){g.$events[e]=g.$events[e]||[]}else{if(Fancy.typeOf(e)==="array"){var f=0,c=e.length;for(;f<c;f++){g.$events[e[f]]=g.$events[e[f]]||[]}}}},has:function(c){var d=this.$events[c];if(!d){return false}return d.length!==0}})})();