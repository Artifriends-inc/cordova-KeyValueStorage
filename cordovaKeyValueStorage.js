'use strict';

import {GetPlatformId} from "../cordova-getplatformid/getPlatformId.js";
import {CordovaFileUtil} from "../cordova-fileutil/cordovaFileUtil.js";

export class CordovaKeyValueStorage {
    static _instance = null;
    constructor() {
        if (CordovaKeyValueStorage._instance) return CordovaKeyValueStorage._instance;
        CordovaKeyValueStorage._instance = this;
    }

    dir = null;
    platformId = '';
    cordovaFileUtil = new CordovaFileUtil();

    async load() {
        this.platformId = GetPlatformId.getId();

        if(this.platformId !== 'browser' && this.platformId !== 'electron' && this.dir === null) {
            this.dir = await this.cordovaFileUtil.getDirEntry(cordova.file.dataDirectory, 'cordovaKeyValueStorage');
        }
    }

    async writeJson(fileEntry, jsonData) {
        return new Promise(async (resolve, reject) => {
            try{
                let readData = '';

                // read file
                readData = await this.cordovaFileUtil.read(fileEntry);
                if(readData !== '') readData = JSON.parse(readData) || {};
                else readData = {};

                // modify data
                let keys = Object.keys(jsonData);
                for(let i = 0; i < keys.length; i++){
                    let key = keys[i];
                    readData[key] = jsonData[key];
                }
                readData = JSON.stringify(readData);

                // write file
                await this.cordovaFileUtil.write(fileEntry, readData);

                resolve();
            } catch(e) {
                reject(e);
            }
        });
    }

    async getItem(key) {
        try{
            // set default file name
            const fileName = key;

            // check type
            if(typeof key !== 'string') throw 'key is not string';

            // if browser
            if(this.platformId === 'browser'){
                let value = localStorage.getItem(key);
                if(value === null) value = undefined;
                return value;
            }

            // get file entry
            let fileEntry = await this.cordovaFileUtil.getFileEntry(fileName, this.dir);

            // read file
            let fileData = await this.cordovaFileUtil.read(fileEntry);

            // get value
            let result = undefined;
            if(fileData.length > 1) result = JSON.parse(fileData)[key];
            if(result !== undefined) result = String(result);

            return result;
        } catch (e) {
            throw e;
        }
    }

    async setItem(key, value) {
        try{
            // set default file name
            const fileName = key;

            // check type
            if(typeof key !== 'string') throw 'key is not string';
            if(typeof value !== 'string') throw 'value is not string';

            // if browser
            if(this.platformId === 'browser'){
                localStorage.setItem(key, value);
                return;
            }

            // get file entry
            const fileEntry = await this.cordovaFileUtil.getFileEntry(fileName, this.dir);

            // write file
            await this.writeJson(fileEntry, { [key]: value });
        } catch (e) {
            throw e;
        }
    }
}
