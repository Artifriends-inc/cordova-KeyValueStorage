# cordova-FileUtil

This package allows you to easily save data in a key-value manner in cordova



[![NPM Version][npm-version-image]][npm-url]

[![NPM Install Size][npm-install-size-image]][npm-install-size-url]

[![NPM Downloads][npm-downloads-image]][npm-downloads-url]

```javascript
// get storage instance
const cordovaKeyValueStorage = CordovaKeyValueStorage.getInstance();

// load storage
await cordovaKeyValueStorage.load();

// save data
await cordovaKeyValueStorage.setItem('test', '123');

// get data
const result = await cordovaKeyValueStorage.getItem('test');
console.log(result); // 123
```



## Installation

For typical cordova projects, copy and use the code at cordovaKeyValueStorage.js, getPlatformId.js, cordovaFileUtil.js in below repositorys

https://github.com/Artifriends-inc/cordova-KeyValueStorage (cordovaKeyValueStorage.js)

https://github.com/Artifriends-inc/cordova-getPlatformId (getPlatformId.js)

https://github.com/Artifriends-inc/cordova-FileUtil (cordovaFileUtil.js)



How to install with Frontle

```shell
$ frontle install-original cordova-keyvaluestorage
```



## Function

#### getInstance()

Get "CordovaKeyValueStorage" object

Only one object is created using a single-tone pattern

```javascript
const cordovaKeyValueStorage = CordovaKeyValueStorage.getInstance();
```



#### load()

Load storage, You must run this function before you can use any of the other functions

```javascript
// load storage
cordovaKeyValueStorage.load();
```



#### setItem(key, value)

Save Value

```javascript
// save data
cordovaKeyValueStorage.setItem('test', '123');
```



#### getItem(key)

Get Value

```javascript
// get data
const result = await cordovaKeyValueStorage.getItem('test');
console.log(result); // 123
```



## People

The original author of cordova-fileutil is [MushStory](https://github.com/MushStory)



## License

[MIT](LICENSE)



[npm-downloads-image]: https://badgen.net/npm/dm/cordova-keyvaluestorage
[npm-downloads-url]: https://npmcharts.com/compare/cordova-keyvaluestorage?minimal=true
[npm-install-size-image]: https://badgen.net/packagephobia/install/cordova-keyvaluestorage
[npm-install-size-url]: https://packagephobia.com/result?p=cordova-keyvaluestorage
[npm-url]: https://npmjs.org/package/cordova-keyvaluestorage
[npm-version-image]: https://badgen.net/npm/v/cordova-keyvaluestorage
