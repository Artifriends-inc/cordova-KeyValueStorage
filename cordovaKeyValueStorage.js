'use strict';

import {GetPlatformId} from "./util/getPlatformId.js";
import {CordovaFileUtil} from "./util/cordovaFileUtil.js";

export class CordovaKeyValueStorage {
    static _instance = null;
    constructor() {
        if (CordovaKeyValueStorage._instance) return CordovaKeyValueStorage._instance;
        CordovaKeyValueStorage._instance = this;
    }

    #dir = null;
    #platformId = '';
    #cordovaFileUtil = new CordovaFileUtil();

    async getStorageDirEntry() {
        try{
            return this.#dir;
        } catch (e){
            throw e;
        }
    }

    async load(storageFolderName = 'cordovaKeyValueStorage') {
        try{
            this.#platformId = GetPlatformId.getId();

            if(this.#platformId !== 'browser' && this.#platformId !== 'electron') {
                this.#dir = await this.#cordovaFileUtil.getDirEntry(cordova.file.dataDirectory, storageFolderName);
            }
        } catch (e){
            throw e;
        }
    }

    async writeJson(fileEntry, jsonData) {
        return new Promise(async (resolve, reject) => {
            try{
                let readData = '';

                // read file
                readData = await this.#cordovaFileUtil.read(fileEntry);
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
                await this.#cordovaFileUtil.write(fileEntry, readData);

                resolve();
            } catch(e) {
                reject(e);
            }
        });
    }

    async getItem(key, fileName = key) {
        try{
            // check type
            if(typeof key !== 'string') throw 'key is not string';
            if(typeof fileName !== 'string') throw 'file name is not string';

            // if browser
            if(this.#platformId === 'browser'){
                let value = localStorage.getItem(key);
                if(value === null) value = undefined;
                return value;
            }

            // get file entry
            const fileEntry = await this.#cordovaFileUtil.getFileEntry(fileName, this.#dir);

            // read file
            const fileData = await this.#cordovaFileUtil.read(fileEntry);

            // get value
            let result = undefined;
            if(fileData.length > 1) result = JSON.parse(fileData)[key];
            if(result !== undefined) result = String(result);

            return result;
        } catch (e) {
            throw e;
        }
    }

    async setItem(key, value, fileName = key) {
        try{
            // check type
            if(typeof key !== 'string') throw 'key is not string';
            if(typeof value !== 'string') throw 'value is not string';
            if(typeof fileName !== 'string') throw 'file name is not string';

            // if browser
            if(this.#platformId === 'browser'){
                localStorage.setItem(key, value);
                return;
            }

            // get file entry
            const fileEntry = await this.#cordovaFileUtil.getFileEntry(fileName, this.#dir);

            // write file
            await this.writeJson(fileEntry, { [key]: value });
        } catch (e) {
            throw e;
        }
    }
}
