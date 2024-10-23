var read_,readAsync,readBinary,setWindowTitle,fs,nodePath,requireNodeFS,Module=void 0!==Module?Module:{},objAssign=Object.assign,moduleOverrides=objAssign({},Module),arguments_=[],thisProgram="./this.program",quit_=(e,n)=>{throw n},ENVIRONMENT_IS_WEB="object"==typeof window,ENVIRONMENT_IS_WORKER="function"==typeof importScripts,ENVIRONMENT_IS_NODE="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,scriptDirectory="";function locateFile(e){return Module.locateFile?Module.locateFile(e,scriptDirectory):scriptDirectory+e}function logExceptionOnExit(e){if(e instanceof ExitStatus)return;err("exiting due to exception: "+e)}ENVIRONMENT_IS_NODE?(scriptDirectory=ENVIRONMENT_IS_WORKER?require("path").dirname(scriptDirectory)+"/":__dirname+"/",requireNodeFS=function(){nodePath||(fs=require("fs"),nodePath=require("path"))},read_=function(e,n){return requireNodeFS(),e=nodePath.normalize(e),fs.readFileSync(e,n?null:"utf8")},readBinary=function(e){var n=read_(e,!0);return n.buffer||(n=new Uint8Array(n)),n},readAsync=function(e,n,r){requireNodeFS(),e=nodePath.normalize(e),fs.readFile(e,(function(e,t){e?r(e):n(t.buffer)}))},process.argv.length>1&&(thisProgram=process.argv[1].replace(/\\/g,"/")),arguments_=process.argv.slice(2),"undefined"!=typeof module&&(module.exports=Module),process.on("uncaughtException",(function(e){if(!(e instanceof ExitStatus))throw e})),process.on("unhandledRejection",(function(e){throw e})),quit_=(e,n)=>{if(keepRuntimeAlive())throw process.exitCode=e,n;logExceptionOnExit(n),process.exit(e)},Module.inspect=function(){return"[Emscripten Module object]"}):(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&(ENVIRONMENT_IS_WORKER?scriptDirectory=self.location.href:"undefined"!=typeof document&&document.currentScript&&(scriptDirectory=document.currentScript.src),scriptDirectory=0!==scriptDirectory.indexOf("blob:")?scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1):"",read_=function(e){var n=new XMLHttpRequest;return n.open("GET",e,!1),n.send(null),n.responseText},ENVIRONMENT_IS_WORKER&&(readBinary=function(e){var n=new XMLHttpRequest;return n.open("GET",e,!1),n.responseType="arraybuffer",n.send(null),new Uint8Array(n.response)}),readAsync=function(e,n,r){var t=new XMLHttpRequest;t.open("GET",e,!0),t.responseType="arraybuffer",t.onload=function(){200==t.status||0==t.status&&t.response?n(t.response):r()},t.onerror=r,t.send(null)},setWindowTitle=e=>document.title=e);var wasmBinary,out=Module.print||console.log.bind(console),err=Module.printErr||console.warn.bind(console);objAssign(Module,moduleOverrides),moduleOverrides=null,Module.arguments&&(arguments_=Module.arguments),Module.thisProgram&&(thisProgram=Module.thisProgram),Module.quit&&(quit_=Module.quit),Module.wasmBinary&&(wasmBinary=Module.wasmBinary);var wasmMemory,noExitRuntime=Module.noExitRuntime||!0;"object"!=typeof WebAssembly&&abort("no native wasm support detected");var EXITSTATUS,ABORT=!1;function assert(e,n){e||abort(n)}function getCFunc(e){return Module["_"+e]}function ccall(e,n,r,t,a){var i={string:function(e){var n=0;if(null!=e&&0!==e){var r=1+(e.length<<2);stringToUTF8(e,n=stackAlloc(r),r)}return n},array:function(e){var n=stackAlloc(e.length);return writeArrayToMemory(e,n),n}};var o=getCFunc(e),u=[],l=0;if(t)for(var s=0;s<t.length;s++){var c=i[r[s]];c?(0===l&&(l=stackSave()),u[s]=c(t[s])):u[s]=t[s]}var d=o.apply(null,u);function f(e){return runtimeKeepalivePop(),0!==l&&stackRestore(l),function(e){return"string"===n?UTF8ToString(e):"boolean"===n?Boolean(e):e}(e)}runtimeKeepalivePush();var _=a&&a.async;return Asyncify.currData?Asyncify.whenDone().then(f):(d=f(d),_?Promise.resolve(d):d)}function cwrap(e,n,r,t){var a=(r=r||[]).every((function(e){return"number"===e}));return"string"!==n&&a&&!t?getCFunc(e):function(){return ccall(e,n,r,arguments,t)}}var UTF8Decoder="undefined"!=typeof TextDecoder?new TextDecoder("utf8"):void 0;function UTF8ArrayToString(e,n,r){for(var t=n+r,a=n;e[a]&&!(a>=t);)++a;if(a-n>16&&e.subarray&&UTF8Decoder)return UTF8Decoder.decode(e.subarray(n,a));for(var i="";n<a;){var o=e[n++];if(128&o){var u=63&e[n++];if(192!=(224&o)){var l=63&e[n++];if((o=224==(240&o)?(15&o)<<12|u<<6|l:(7&o)<<18|u<<12|l<<6|63&e[n++])<65536)i+=String.fromCharCode(o);else{var s=o-65536;i+=String.fromCharCode(55296|s>>10,56320|1023&s)}}else i+=String.fromCharCode((31&o)<<6|u)}else i+=String.fromCharCode(o)}return i}function UTF8ToString(e,n){return e?UTF8ArrayToString(HEAPU8,e,n):""}function stringToUTF8Array(e,n,r,t){if(!(t>0))return 0;for(var a=r,i=r+t-1,o=0;o<e.length;++o){var u=e.charCodeAt(o);if(u>=55296&&u<=57343)u=65536+((1023&u)<<10)|1023&e.charCodeAt(++o);if(u<=127){if(r>=i)break;n[r++]=u}else if(u<=2047){if(r+1>=i)break;n[r++]=192|u>>6,n[r++]=128|63&u}else if(u<=65535){if(r+2>=i)break;n[r++]=224|u>>12,n[r++]=128|u>>6&63,n[r++]=128|63&u}else{if(r+3>=i)break;n[r++]=240|u>>18,n[r++]=128|u>>12&63,n[r++]=128|u>>6&63,n[r++]=128|63&u}}return n[r]=0,r-a}function stringToUTF8(e,n,r){return stringToUTF8Array(e,HEAPU8,n,r)}function lengthBytesUTF8(e){for(var n=0,r=0;r<e.length;++r){var t=e.charCodeAt(r);t>=55296&&t<=57343&&(t=65536+((1023&t)<<10)|1023&e.charCodeAt(++r)),t<=127?++n:n+=t<=2047?2:t<=65535?3:4}return n}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64,UTF16Decoder="undefined"!=typeof TextDecoder?new TextDecoder("utf-16le"):void 0;function UTF16ToString(e,n){for(var r=e,t=r>>1,a=t+n/2;!(t>=a)&&HEAPU16[t];)++t;if((r=t<<1)-e>32&&UTF16Decoder)return UTF16Decoder.decode(HEAPU8.subarray(e,r));for(var i="",o=0;!(o>=n/2);++o){var u=HEAP16[e+2*o>>1];if(0==u)break;i+=String.fromCharCode(u)}return i}function stringToUTF16(e,n,r){if(void 0===r&&(r=2147483647),r<2)return 0;for(var t=n,a=(r-=2)<2*e.length?r/2:e.length,i=0;i<a;++i){var o=e.charCodeAt(i);HEAP16[n>>1]=o,n+=2}return HEAP16[n>>1]=0,n-t}function lengthBytesUTF16(e){return 2*e.length}function UTF32ToString(e,n){for(var r=0,t="";!(r>=n/4);){var a=HEAP32[e+4*r>>2];if(0==a)break;if(++r,a>=65536){var i=a-65536;t+=String.fromCharCode(55296|i>>10,56320|1023&i)}else t+=String.fromCharCode(a)}return t}function stringToUTF32(e,n,r){if(void 0===r&&(r=2147483647),r<4)return 0;for(var t=n,a=t+r-4,i=0;i<e.length;++i){var o=e.charCodeAt(i);if(o>=55296&&o<=57343)o=65536+((1023&o)<<10)|1023&e.charCodeAt(++i);if(HEAP32[n>>2]=o,(n+=4)+4>a)break}return HEAP32[n>>2]=0,n-t}function lengthBytesUTF32(e){for(var n=0,r=0;r<e.length;++r){var t=e.charCodeAt(r);t>=55296&&t<=57343&&++r,n+=4}return n}function writeArrayToMemory(e,n){HEAP8.set(e,n)}function alignUp(e,n){return e%n>0&&(e+=n-e%n),e}function updateGlobalBufferAndViews(e){buffer=e,Module.HEAP8=HEAP8=new Int8Array(e),Module.HEAP16=HEAP16=new Int16Array(e),Module.HEAP32=HEAP32=new Int32Array(e),Module.HEAPU8=HEAPU8=new Uint8Array(e),Module.HEAPU16=HEAPU16=new Uint16Array(e),Module.HEAPU32=HEAPU32=new Uint32Array(e),Module.HEAPF32=HEAPF32=new Float32Array(e),Module.HEAPF64=HEAPF64=new Float64Array(e)}var wasmTable,INITIAL_MEMORY=Module.INITIAL_MEMORY||16777216,__ATPRERUN__=[],__ATINIT__=[],__ATPOSTRUN__=[],runtimeInitialized=!1,runtimeExited=!1,runtimeKeepaliveCounter=0;function keepRuntimeAlive(){return noExitRuntime||runtimeKeepaliveCounter>0}function preRun(){if(Module.preRun)for("function"==typeof Module.preRun&&(Module.preRun=[Module.preRun]);Module.preRun.length;)addOnPreRun(Module.preRun.shift());callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=!0,callRuntimeCallbacks(__ATINIT__)}function exitRuntime(){runtimeExited=!0}function postRun(){if(Module.postRun)for("function"==typeof Module.postRun&&(Module.postRun=[Module.postRun]);Module.postRun.length;)addOnPostRun(Module.postRun.shift());callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(e){__ATPRERUN__.unshift(e)}function addOnInit(e){__ATINIT__.unshift(e)}function addOnPostRun(e){__ATPOSTRUN__.unshift(e)}var runDependencies=0,runDependencyWatcher=null,dependenciesFulfilled=null;function addRunDependency(e){runDependencies++,Module.monitorRunDependencies&&Module.monitorRunDependencies(runDependencies)}function removeRunDependency(e){if(runDependencies--,Module.monitorRunDependencies&&Module.monitorRunDependencies(runDependencies),0==runDependencies&&(null!==runDependencyWatcher&&(clearInterval(runDependencyWatcher),runDependencyWatcher=null),dependenciesFulfilled)){var n=dependenciesFulfilled;dependenciesFulfilled=null,n()}}function abort(e){throw Module.onAbort&&Module.onAbort(e),err(e="Aborted("+e+")"),ABORT=!0,EXITSTATUS=1,e+=". Build with -s ASSERTIONS=1 for more info.",new WebAssembly.RuntimeError(e)}Module.preloadedImages={},Module.preloadedAudios={};var wasmBinaryFile,dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(e){return e.startsWith(dataURIPrefix)}function isFileURI(e){return e.startsWith("file://")}function getBinary(e){try{if(e==wasmBinaryFile&&wasmBinary)return new Uint8Array(wasmBinary);if(readBinary)return readBinary(e);throw"both async and sync fetching of the wasm failed"}catch(e){abort(e)}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if("function"==typeof fetch&&!isFileURI(wasmBinaryFile))return fetch(wasmBinaryFile,{credentials:"same-origin"}).then((function(e){if(!e.ok)throw"failed to load wasm binary file at '"+wasmBinaryFile+"'";return e.arrayBuffer()})).catch((function(){return getBinary(wasmBinaryFile)}));if(readAsync)return new Promise((function(e,n){readAsync(wasmBinaryFile,(function(n){e(new Uint8Array(n))}),n)}))}return Promise.resolve().then((function(){return getBinary(wasmBinaryFile)}))}function createWasm(){var e={a:asmLibraryArg};function n(e,n){var r=e.exports;r=Asyncify.instrumentWasmExports(r),Module.asm=r,updateGlobalBufferAndViews((wasmMemory=Module.asm.I).buffer),wasmTable=Module.asm.M,addOnInit(Module.asm.J),removeRunDependency("wasm-instantiate")}function r(e){n(e.instance)}function t(n){return getBinaryPromise().then((function(n){return WebAssembly.instantiate(n,e)})).then((function(e){return e})).then(n,(function(e){err("failed to asynchronously prepare wasm: "+e),abort(e)}))}if(addRunDependency("wasm-instantiate"),Module.instantiateWasm)try{var a=Module.instantiateWasm(e,n);return a=Asyncify.instrumentWasmExports(a)}catch(e){return err("Module.instantiateWasm callback failed with error: "+e),!1}return wasmBinary||"function"!=typeof WebAssembly.instantiateStreaming||isDataURI(wasmBinaryFile)||isFileURI(wasmBinaryFile)||"function"!=typeof fetch?t(r):fetch(wasmBinaryFile,{credentials:"same-origin"}).then((function(n){return WebAssembly.instantiateStreaming(n,e).then(r,(function(e){return err("wasm streaming compile failed: "+e),err("falling back to ArrayBuffer instantiation"),t(r)}))})),{}}function callRuntimeCallbacks(e){for(;e.length>0;){var n=e.shift();if("function"!=typeof n){var r=n.func;"number"==typeof r?void 0===n.arg?dynCall_v.call(null,r):(t=n.arg,dynCall_vi.apply(null,[r,t])):r(void 0===n.arg?null:n.arg)}else n(Module)}var t}function handleException(e){if(e instanceof ExitStatus||"unwind"==e)return EXITSTATUS;quit_(1,e)}function ___cxa_allocate_exception(e){return _malloc(e+16)+16}function ExceptionInfo(e){this.excPtr=e,this.ptr=e-16,this.set_type=function(e){HEAP32[this.ptr+4>>2]=e},this.get_type=function(){return HEAP32[this.ptr+4>>2]},this.set_destructor=function(e){HEAP32[this.ptr+8>>2]=e},this.get_destructor=function(){return HEAP32[this.ptr+8>>2]},this.set_refcount=function(e){HEAP32[this.ptr>>2]=e},this.set_caught=function(e){e=e?1:0,HEAP8[this.ptr+12>>0]=e},this.get_caught=function(){return 0!=HEAP8[this.ptr+12>>0]},this.set_rethrown=function(e){e=e?1:0,HEAP8[this.ptr+13>>0]=e},this.get_rethrown=function(){return 0!=HEAP8[this.ptr+13>>0]},this.init=function(e,n){this.set_type(e),this.set_destructor(n),this.set_refcount(0),this.set_caught(!1),this.set_rethrown(!1)},this.add_ref=function(){var e=HEAP32[this.ptr>>2];HEAP32[this.ptr>>2]=e+1},this.release_ref=function(){var e=HEAP32[this.ptr>>2];return HEAP32[this.ptr>>2]=e-1,1===e}}isDataURI(wasmBinaryFile="sigx.wasm")||(wasmBinaryFile=locateFile(wasmBinaryFile));var exceptionLast=0,uncaughtExceptionCount=0;function ___cxa_throw(e,n,r){throw new ExceptionInfo(e).init(n,r),exceptionLast=e,uncaughtExceptionCount++,e}function __embind_register_bigint(e,n,r,t,a){}function getShiftFromSize(e){switch(e){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+e)}}function embind_init_charCodes(){for(var e=new Array(256),n=0;n<256;++n)e[n]=String.fromCharCode(n);embind_charCodes=e}var embind_charCodes=void 0;function readLatin1String(e){for(var n="",r=e;HEAPU8[r];)n+=embind_charCodes[HEAPU8[r++]];return n}var awaitingDependencies={},registeredTypes={},typeDependencies={},char_0=48,char_9=57;function makeLegalFunctionName(e){if(void 0===e)return"_unknown";var n=(e=e.replace(/[^a-zA-Z0-9_]/g,"$")).charCodeAt(0);return n>=char_0&&n<=char_9?"_"+e:e}function createNamedFunction(e,n){return e=makeLegalFunctionName(e),function(){return n.apply(this,arguments)}}function extendError(e,n){var r=createNamedFunction(n,(function(e){this.name=n,this.message=e;var r=new Error(e).stack;void 0!==r&&(this.stack=this.toString()+"\n"+r.replace(/^Error(:[^\n]*)?\n/,""))}));return r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.prototype.toString=function(){return void 0===this.message?this.name:this.name+": "+this.message},r}var BindingError=void 0;function throwBindingError(e){throw new BindingError(e)}var InternalError=void 0;function registerType(e,n,r){if(r=r||{},!("argPackAdvance"in n))throw new TypeError("registerType registeredInstance requires argPackAdvance");var t=n.name;if(e||throwBindingError('type "'+t+'" must have a positive integer typeid pointer'),registeredTypes.hasOwnProperty(e)){if(r.ignoreDuplicateRegistrations)return;throwBindingError("Cannot register type '"+t+"' twice")}if(registeredTypes[e]=n,delete typeDependencies[e],awaitingDependencies.hasOwnProperty(e)){var a=awaitingDependencies[e];delete awaitingDependencies[e],a.forEach((function(e){e()}))}}function __embind_register_bool(e,n,r,t,a){var i=getShiftFromSize(r);registerType(e,{name:n=readLatin1String(n),fromWireType:function(e){return!!e},toWireType:function(e,n){return n?t:a},argPackAdvance:8,readValueFromPointer:function(e){var t;if(1===r)t=HEAP8;else if(2===r)t=HEAP16;else{if(4!==r)throw new TypeError("Unknown boolean type size: "+n);t=HEAP32}return this.fromWireType(t[e>>i])},destructorFunction:null})}var emval_free_list=[],emval_handle_array=[{},{value:void 0},{value:null},{value:!0},{value:!1}];function __emval_decref(e){e>4&&0==--emval_handle_array[e].refcount&&(emval_handle_array[e]=void 0,emval_free_list.push(e))}function count_emval_handles(){for(var e=0,n=5;n<emval_handle_array.length;++n)void 0!==emval_handle_array[n]&&++e;return e}function get_first_emval(){for(var e=5;e<emval_handle_array.length;++e)if(void 0!==emval_handle_array[e])return emval_handle_array[e];return null}function init_emval(){Module.count_emval_handles=count_emval_handles,Module.get_first_emval=get_first_emval}var Emval={toValue:function(e){return e||throwBindingError("Cannot use deleted val. handle = "+e),emval_handle_array[e].value},toHandle:function(e){switch(e){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:var n=emval_free_list.length?emval_free_list.pop():emval_handle_array.length;return emval_handle_array[n]={refcount:1,value:e},n}}};function simpleReadValueFromPointer(e){return this.fromWireType(HEAPU32[e>>2])}function __embind_register_emval(e,n){registerType(e,{name:n=readLatin1String(n),fromWireType:function(e){var n=Emval.toValue(e);return __emval_decref(e),n},toWireType:function(e,n){return Emval.toHandle(n)},argPackAdvance:8,readValueFromPointer:simpleReadValueFromPointer,destructorFunction:null})}function floatReadValueFromPointer(e,n){switch(n){case 2:return function(e){return this.fromWireType(HEAPF32[e>>2])};case 3:return function(e){return this.fromWireType(HEAPF64[e>>3])};default:throw new TypeError("Unknown float type: "+e)}}function __embind_register_float(e,n,r){var t=getShiftFromSize(r);registerType(e,{name:n=readLatin1String(n),fromWireType:function(e){return e},toWireType:function(e,n){return n},argPackAdvance:8,readValueFromPointer:floatReadValueFromPointer(n,t),destructorFunction:null})}function integerReadValueFromPointer(e,n,r){switch(n){case 0:return r?function(e){return HEAP8[e]}:function(e){return HEAPU8[e]};case 1:return r?function(e){return HEAP16[e>>1]}:function(e){return HEAPU16[e>>1]};case 2:return r?function(e){return HEAP32[e>>2]}:function(e){return HEAPU32[e>>2]};default:throw new TypeError("Unknown integer type: "+e)}}function __embind_register_integer(e,n,r,t,a){n=readLatin1String(n),-1===a&&(a=4294967295);var i=getShiftFromSize(r),o=function(e){return e};if(0===t){var u=32-8*r;o=function(e){return e<<u>>>u}}var l=n.includes("unsigned");registerType(e,{name:n,fromWireType:o,toWireType:l?function(e,n){return this.name,n>>>0}:function(e,n){return this.name,n},argPackAdvance:8,readValueFromPointer:integerReadValueFromPointer(n,i,0!==t),destructorFunction:null})}function __embind_register_memory_view(e,n,r){var t=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][n];function a(e){var n=HEAPU32,r=n[e>>=2],a=n[e+1];return new t(buffer,a,r)}registerType(e,{name:r=readLatin1String(r),fromWireType:a,argPackAdvance:8,readValueFromPointer:a},{ignoreDuplicateRegistrations:!0})}function __embind_register_std_string(e,n){var r="std::string"===(n=readLatin1String(n));registerType(e,{name:n,fromWireType:function(e){var n,t=HEAPU32[e>>2];if(r)for(var a=e+4,i=0;i<=t;++i){var o=e+4+i;if(i==t||0==HEAPU8[o]){var u=UTF8ToString(a,o-a);void 0===n?n=u:(n+=String.fromCharCode(0),n+=u),a=o+1}}else{var l=new Array(t);for(i=0;i<t;++i)l[i]=String.fromCharCode(HEAPU8[e+4+i]);n=l.join("")}return _free(e),n},toWireType:function(e,n){n instanceof ArrayBuffer&&(n=new Uint8Array(n));var t="string"==typeof n;t||n instanceof Uint8Array||n instanceof Uint8ClampedArray||n instanceof Int8Array||throwBindingError("Cannot pass non-string to std::string");var a=(r&&t?function(){return lengthBytesUTF8(n)}:function(){return n.length})(),i=_malloc(4+a+1);if(HEAPU32[i>>2]=a,r&&t)stringToUTF8(n,i+4,a+1);else if(t)for(var o=0;o<a;++o){var u=n.charCodeAt(o);u>255&&(_free(i),throwBindingError("String has UTF-16 code units that do not fit in 8 bits")),HEAPU8[i+4+o]=u}else for(o=0;o<a;++o)HEAPU8[i+4+o]=n[o];return null!==e&&e.push(_free,i),i},argPackAdvance:8,readValueFromPointer:simpleReadValueFromPointer,destructorFunction:function(e){_free(e)}})}function __embind_register_std_wstring(e,n,r){var t,a,i,o,u;r=readLatin1String(r),2===n?(t=UTF16ToString,a=stringToUTF16,o=lengthBytesUTF16,i=function(){return HEAPU16},u=1):4===n&&(t=UTF32ToString,a=stringToUTF32,o=lengthBytesUTF32,i=function(){return HEAPU32},u=2),registerType(e,{name:r,fromWireType:function(e){for(var r,a=HEAPU32[e>>2],o=i(),l=e+4,s=0;s<=a;++s){var c=e+4+s*n;if(s==a||0==o[c>>u]){var d=t(l,c-l);void 0===r?r=d:(r+=String.fromCharCode(0),r+=d),l=c+n}}return _free(e),r},toWireType:function(e,t){"string"!=typeof t&&throwBindingError("Cannot pass non-string to C++ string type "+r);var i=o(t),l=_malloc(4+i+n);return HEAPU32[l>>2]=i>>u,a(t,l+4,i+n),null!==e&&e.push(_free,l),l},argPackAdvance:8,readValueFromPointer:simpleReadValueFromPointer,destructorFunction:function(e){_free(e)}})}function __embind_register_void(e,n){registerType(e,{isVoid:!0,name:n=readLatin1String(n),argPackAdvance:0,fromWireType:function(){},toWireType:function(e,n){}})}function getTypeName(e){var n=___getTypeName(e),r=readLatin1String(n);return _free(n),r}function requireRegisteredType(e,n){var r=registeredTypes[e];return void 0===r&&throwBindingError(n+" has unknown type "+getTypeName(e)),r}function __emval_as(e,n,r){e=Emval.toValue(e),n=requireRegisteredType(n,"emval::as");var t=[],a=Emval.toHandle(t);return HEAP32[r>>2]=a,n.toWireType(t,e)}function runAndAbortIfError(e){try{return e()}catch(e){abort(e)}}function callUserCallback(e,n){if(!runtimeExited&&!ABORT)if(n)e();else try{e()}catch(e){handleException(e)}}function runtimeKeepalivePush(){runtimeKeepaliveCounter+=1}function runtimeKeepalivePop(){runtimeKeepaliveCounter-=1}var Asyncify={State:{Normal:0,Unwinding:1,Rewinding:2,Disabled:3},state:0,StackSize:4096,currData:null,handleSleepReturnValue:0,exportCallStack:[],callStackNameToId:{},callStackIdToName:{},callStackId:0,asyncPromiseHandlers:null,sleepCallbacks:[],getCallStackId:function(e){var n=Asyncify.callStackNameToId[e];return void 0===n&&(n=Asyncify.callStackId++,Asyncify.callStackNameToId[e]=n,Asyncify.callStackIdToName[n]=e),n},instrumentWasmExports:function(e){var n={};for(var r in e)!function(r){var t=e[r];n[r]="function"==typeof t?function(){Asyncify.exportCallStack.push(r);try{return t.apply(null,arguments)}finally{if(!ABORT){var e=Asyncify.exportCallStack.pop();assert(e===r),Asyncify.maybeStopUnwind()}}}:t}(r);return n},maybeStopUnwind:function(){Asyncify.currData&&Asyncify.state===Asyncify.State.Unwinding&&0===Asyncify.exportCallStack.length&&(Asyncify.state=Asyncify.State.Normal,runAndAbortIfError(Module._asyncify_stop_unwind),"undefined"!=typeof Fibers&&Fibers.trampoline())},whenDone:function(){return new Promise((function(e,n){Asyncify.asyncPromiseHandlers={resolve:e,reject:n}}))},allocateData:function(){var e=_malloc(12+Asyncify.StackSize);return Asyncify.setDataHeader(e,e+12,Asyncify.StackSize),Asyncify.setDataRewindFunc(e),e},setDataHeader:function(e,n,r){HEAP32[e>>2]=n,HEAP32[e+4>>2]=n+r},setDataRewindFunc:function(e){var n=Asyncify.exportCallStack[0],r=Asyncify.getCallStackId(n);HEAP32[e+8>>2]=r},getDataRewindFunc:function(e){var n=HEAP32[e+8>>2],r=Asyncify.callStackIdToName[n];return Module.asm[r]},doRewind:function(e){return Asyncify.getDataRewindFunc(e)()},handleSleep:function(e){if(!ABORT){if(Asyncify.state===Asyncify.State.Normal){var n=!1,r=!1;e((function(e){if(!ABORT&&(Asyncify.handleSleepReturnValue=e||0,n=!0,r)){Asyncify.state=Asyncify.State.Rewinding,runAndAbortIfError((function(){Module._asyncify_start_rewind(Asyncify.currData)})),"undefined"!=typeof Browser&&Browser.mainLoop.func&&Browser.mainLoop.resume();var t,a=!1;try{t=Asyncify.doRewind(Asyncify.currData)}catch(e){t=e,a=!0}var i=!1;if(!Asyncify.currData){var o=Asyncify.asyncPromiseHandlers;o&&(Asyncify.asyncPromiseHandlers=null,(a?o.reject:o.resolve)(t),i=!0)}if(a&&!i)throw t}})),r=!0,n||(Asyncify.state=Asyncify.State.Unwinding,Asyncify.currData=Asyncify.allocateData(),runAndAbortIfError((function(){Module._asyncify_start_unwind(Asyncify.currData)})),"undefined"!=typeof Browser&&Browser.mainLoop.func&&Browser.mainLoop.pause())}else Asyncify.state===Asyncify.State.Rewinding?(Asyncify.state=Asyncify.State.Normal,runAndAbortIfError(Module._asyncify_stop_rewind),_free(Asyncify.currData),Asyncify.currData=null,Asyncify.sleepCallbacks.forEach((function(e){callUserCallback(e)}))):abort("invalid state: "+Asyncify.state);return Asyncify.handleSleepReturnValue}},handleAsync:function(e){return Asyncify.handleSleep((function(n){e().then(n)}))}};function __emval_await(e){return Asyncify.handleAsync((function(){return(e=Emval.toValue(e)).then(Emval.toHandle)}))}function __emval_allocateDestructors(e){var n=[];return HEAP32[e>>2]=Emval.toHandle(n),n}var emval_symbols={};function getStringOrSymbol(e){var n=emval_symbols[e];return void 0===n?readLatin1String(e):n}var emval_methodCallers=[];function __emval_call_method(e,n,r,t,a){return(e=emval_methodCallers[e])(n=Emval.toValue(n),r=getStringOrSymbol(r),__emval_allocateDestructors(t),a)}function __emval_call_void_method(e,n,r,t){(e=emval_methodCallers[e])(n=Emval.toValue(n),r=getStringOrSymbol(r),null,t)}function emval_get_global(){if("object"==typeof globalThis)return globalThis;function e(e){e.$$$embind_global$$$=e;var n="object"==typeof $$$embind_global$$$&&e.$$$embind_global$$$===e;return n||delete e.$$$embind_global$$$,n}if("object"==typeof $$$embind_global$$$)return $$$embind_global$$$;if("object"==typeof global&&e(global)?$$$embind_global$$$=global:"object"==typeof self&&e(self)&&($$$embind_global$$$=self),"object"==typeof $$$embind_global$$$)return $$$embind_global$$$;throw Error("unable to get global object.")}function __emval_get_global(e){return 0===e?Emval.toHandle(emval_get_global()):(e=getStringOrSymbol(e),Emval.toHandle(emval_get_global()[e]))}function __emval_addMethodCaller(e){var n=emval_methodCallers.length;return emval_methodCallers.push(e),n}function __emval_lookupTypes(e,n){for(var r=new Array(e),t=0;t<e;++t)r[t]=requireRegisteredType(HEAP32[(n>>2)+t],"parameter "+t);return r}var emval_registeredMethods=[];function __emval_get_method_caller(e,n){var r=__emval_lookupTypes(e,n),t=r[0],a=t.name+"_$"+r.slice(1).map((function(e){return e.name})).join("_")+"$",i=emval_registeredMethods[a];if(void 0!==i)return i;var o=new Array(e-1);return i=__emval_addMethodCaller((function(n,a,i,u){for(var l=0,s=0;s<e-1;++s)o[s]=r[s+1].readValueFromPointer(u+l),l+=r[s+1].argPackAdvance;var c=n[a].apply(n,o);for(s=0;s<e-1;++s)r[s+1].deleteObject&&r[s+1].deleteObject(o[s]);if(!t.isVoid)return t.toWireType(i,c)})),emval_registeredMethods[a]=i,i}function __emval_get_property(e,n){return e=Emval.toValue(e),n=Emval.toValue(n),Emval.toHandle(e[n])}function __emval_incref(e){e>4&&(emval_handle_array[e].refcount+=1)}function __emval_new_array(){return Emval.toHandle([])}function __emval_new_cstring(e){return Emval.toHandle(getStringOrSymbol(e))}function __emval_new_object(){return Emval.toHandle({})}function runDestructors(e){for(;e.length;){var n=e.pop();e.pop()(n)}}function __emval_run_destructors(e){runDestructors(Emval.toValue(e)),__emval_decref(e)}function __emval_set_property(e,n,r){e=Emval.toValue(e),n=Emval.toValue(n),r=Emval.toValue(r),e[n]=r}function __emval_take_value(e,n){var r=(e=requireRegisteredType(e,"_emval_take_value")).readValueFromPointer(n);return Emval.toHandle(r)}function _abort(){abort("")}function _emscripten_memcpy_big(e,n,r){HEAPU8.copyWithin(e,n,n+r)}function emscripten_realloc_buffer(e){try{return wasmMemory.grow(e-buffer.byteLength+65535>>>16),updateGlobalBufferAndViews(wasmMemory.buffer),1}catch(e){}}function _emscripten_resize_heap(e){var n=HEAPU8.length,r=2147483648;if((e>>>=0)>r)return!1;for(var t=1;t<=4;t*=2){var a=n*(1+.2/t);if(a=Math.min(a,e+100663296),emscripten_realloc_buffer(Math.min(r,alignUp(Math.max(e,a),65536))))return!0}return!1}function _exit(e){exit(e)}var SYSCALLS={mappings:{},buffers:[null,[],[]],printChar:function(e,n){var r=SYSCALLS.buffers[e];0===n||10===n?((1===e?out:err)(UTF8ArrayToString(r,0)),r.length=0):r.push(n)},varargs:void 0,get:function(){return SYSCALLS.varargs+=4,HEAP32[SYSCALLS.varargs-4>>2]},getStr:function(e){return UTF8ToString(e)},get64:function(e,n){return e}};function _fd_close(e){return 0}function _fd_seek(e,n,r,t,a){}function _fd_write(e,n,r,t){for(var a=0,i=0;i<r;i++){var o=HEAP32[n>>2],u=HEAP32[n+4>>2];n+=8;for(var l=0;l<u;l++)SYSCALLS.printChar(e,HEAPU8[o+l]);a+=u}return HEAP32[t>>2]=a,0}const onSignatureReady=function(e,n,r){var t=new Int8Array(r);t.set(Module.HEAP8.subarray(n,n+r)),self.postMessage({type:"sigready",index:e,signatureArray:t})};function _onSignatureReadyImpl(e,n,r){onSignatureReady(e,n,r)}embind_init_charCodes(),BindingError=Module.BindingError=extendError(Error,"BindingError"),InternalError=Module.InternalError=extendError(Error,"InternalError"),init_emval();var calledRun,asmLibraryArg={e:___cxa_allocate_exception,g:___cxa_throw,z:__embind_register_bigint,E:__embind_register_bool,D:__embind_register_emval,v:__embind_register_float,i:__embind_register_integer,c:__embind_register_memory_view,u:__embind_register_std_string,p:__embind_register_std_wstring,G:__embind_register_void,q:__emval_as,n:__emval_await,m:__emval_call_method,o:__emval_call_void_method,a:__emval_decref,x:__emval_get_global,h:__emval_get_method_caller,F:__emval_get_property,f:__emval_incref,r:__emval_new_array,b:__emval_new_cstring,l:__emval_new_object,j:__emval_run_destructors,d:__emval_set_property,k:__emval_take_value,s:_abort,A:_emscripten_memcpy_big,B:_emscripten_resize_heap,w:_exit,C:_fd_close,y:_fd_seek,t:_fd_write,H:_onSignatureReadyImpl},asm=createWasm(),___wasm_call_ctors=Module.___wasm_call_ctors=function(){return(___wasm_call_ctors=Module.___wasm_call_ctors=Module.asm.J).apply(null,arguments)},_extract_signature=Module._extract_signature=function(){return(_extract_signature=Module._extract_signature=Module.asm.K).apply(null,arguments)},_malloc=Module._malloc=function(){return(_malloc=Module._malloc=Module.asm.L).apply(null,arguments)},_free=Module._free=function(){return(_free=Module._free=Module.asm.N).apply(null,arguments)},___getTypeName=Module.___getTypeName=function(){return(___getTypeName=Module.___getTypeName=Module.asm.O).apply(null,arguments)},___embind_register_native_and_builtin_types=Module.___embind_register_native_and_builtin_types=function(){return(___embind_register_native_and_builtin_types=Module.___embind_register_native_and_builtin_types=Module.asm.P).apply(null,arguments)},stackSave=Module.stackSave=function(){return(stackSave=Module.stackSave=Module.asm.Q).apply(null,arguments)},stackRestore=Module.stackRestore=function(){return(stackRestore=Module.stackRestore=Module.asm.R).apply(null,arguments)},stackAlloc=Module.stackAlloc=function(){return(stackAlloc=Module.stackAlloc=Module.asm.S).apply(null,arguments)},dynCall_vi=Module.dynCall_vi=function(){return(dynCall_vi=Module.dynCall_vi=Module.asm.T).apply(null,arguments)},dynCall_v=Module.dynCall_v=function(){return(dynCall_v=Module.dynCall_v=Module.asm.U).apply(null,arguments)},_asyncify_start_unwind=Module._asyncify_start_unwind=function(){return(_asyncify_start_unwind=Module._asyncify_start_unwind=Module.asm.V).apply(null,arguments)},_asyncify_stop_unwind=Module._asyncify_stop_unwind=function(){return(_asyncify_stop_unwind=Module._asyncify_stop_unwind=Module.asm.W).apply(null,arguments)},_asyncify_start_rewind=Module._asyncify_start_rewind=function(){return(_asyncify_start_rewind=Module._asyncify_start_rewind=Module.asm.X).apply(null,arguments)},_asyncify_stop_rewind=Module._asyncify_stop_rewind=function(){return(_asyncify_stop_rewind=Module._asyncify_stop_rewind=Module.asm.Y).apply(null,arguments)};function ExitStatus(e){this.name="ExitStatus",this.message="Program terminated with exit("+e+")",this.status=e}function run(e){function n(){calledRun||(calledRun=!0,Module.calledRun=!0,ABORT||(initRuntime(),Module.onRuntimeInitialized&&Module.onRuntimeInitialized(),postRun()))}e=e||arguments_,runDependencies>0||(preRun(),runDependencies>0||(Module.setStatus?(Module.setStatus("Running..."),setTimeout((function(){setTimeout((function(){Module.setStatus("")}),1),n()}),1)):n()))}function exit(e,n){EXITSTATUS=e,keepRuntimeAlive()||exitRuntime(),procExit(e)}function procExit(e){EXITSTATUS=e,keepRuntimeAlive()||(Module.onExit&&Module.onExit(e),ABORT=!0),quit_(e,new ExitStatus(e))}if(Module.ccall=ccall,Module.cwrap=cwrap,dependenciesFulfilled=function e(){calledRun||run(),calledRun||(dependenciesFulfilled=e)},Module.run=run,Module.preInit)for("function"==typeof Module.preInit&&(Module.preInit=[Module.preInit]);Module.preInit.length>0;)Module.preInit.pop()();run();