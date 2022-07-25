# cordova-KeyValueStorage

This package allows you to easily save data in a key-value manner in cordova

[![NPM Version][npm-version-image]][npm-url]

[![NPM Install Size][npm-install-size-image]][npm-install-size-url]

[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

```javascript
import {CordovaKeyValueStorage} from "../../browser_modules/cordova-keyvaluestorage/cordovaKeyValueStorage.js";


// get instance
const cordovaKeyValueStorage = new CordovaKeyValueStorage();

// load storage
await cordovaKeyValueStorage.load();

// get storage directory entry
const storageDirEntry = await cordovaKeyValueStorage.getStorageDirEntry();
console.log(storageDirEntry);

// save data
await cordovaKeyValueStorage.setItem('test', '123');

// get data
const result = await cordovaKeyValueStorage.getItem('test');
console.log(result); // 123
```



## Installation

**How to install from Frontle**

```shell
$ frontle install cordova-keyvaluestorage
```



**How to install from Web**

For typical web projects, copy and use the below repository

https://github.com/Artifriends-inc/cordova-KeyValueStorage



## Function

#### new CordovaKeyValueStorage()

Get "CordovaKeyValueStorage" object. only one object is created using a single-tone pattern

```javascript
// get instance
const cordovaKeyValueStorage = new CordovaKeyValueStorage();
```



#### load(storageFolderName = 'cordovaKeyValueStorage')

Load storage, You must run this function before you can use any of the other functions

```javascript
// load storage
cordovaKeyValueStorage.load();
```



#### getStorageDirEntry()

Get Storage directory entry

```javascript
// get storage directory entry
const storageDirEntry = await cordovaKeyValueStorage.getStorageDirEntry();
console.log(storageDirEntry);
```



#### setItem(key, value, fileName = key)

Save Value

```javascript
// save data
cordovaKeyValueStorage.setItem('test', '123');
```



#### getItem(key, fileName = key)

Get Value

```javascript
// get data
const result = await cordovaKeyValueStorage.getItem('test');
console.log(result); // 123
```



## People

The original author of cordova-keyvaluestorage is [MushStory](https://github.com/MushStory)



## License

[MIT](LICENSE)



[npm-downloads-image]: https://badgen.net/npm/dm/cordova-keyvaluestorage
[npm-downloads-url]: https://npmcharts.com/compare/cordova-keyvaluestorage?minimal=true
[npm-install-size-image]: https://badgen.net/packagephobia/install/cordova-keyvaluestorage
[npm-install-size-url]: https://packagephobia.com/result?p=cordova-keyvaluestorage
[npm-url]: https://npmjs.org/package/cordova-keyvaluestorage
[npm-version-image]: https://badgen.net/npm/v/cordova-keyvaluestorage
