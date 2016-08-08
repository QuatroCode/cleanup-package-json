#!/usr/bin/env node
import * as Contracts from './contracts';
import * as fs from 'fs';
import * as path from 'path';
import Cleanup from './cleanup';
import Arguments from './arguments';

const DEFAULT_CONFIG_NAME = 'cpj.config.json';

class Cli {
    constructor(args: Contracts.Arguments) {
        let configName = args.config || DEFAULT_CONFIG_NAME;
        this.main(configName);
    }

    private async main(configFileName: string) {
        let fullPath = path.join(process.cwd(), configFileName);
        let configExists = await this.checkConfigIsExist(fullPath);

        if (configExists) {
            let config = await this.readConfigFile(configFileName).catch((err) => {
                this.throwError(`[Error] Config file ${DEFAULT_CONFIG_NAME} is not valid.`);
            }) as Contracts.ConfigItems;

            try {
                let cleanup = new Cleanup(config);
                cleanup.Clean();
                console.info('[Success] Done cleaning up');
            } catch (e) {
                this.throwError(`[Failed] ${e}`);
            }
        } else {
            this.throwError(`[Error] Config file ${DEFAULT_CONFIG_NAME} was not found.`);
        }

    }

    private throwError(text: string) {
        console.error(text);
        process.exit(1);
    }

    private async checkConfigIsExist(fullPath: string) {
        return new Promise<boolean>((resolve, reject) => {
            let fullPath = path.join(process.cwd(), DEFAULT_CONFIG_NAME);
            fs.access(fullPath, fs.F_OK, async (err) => {
                if (!err) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }

    private async readConfigFile(fullPath: string) {
        return new Promise<Contracts.Config>((resolve, reject) => {
            fs.readFile(fullPath, 'utf8', (err, data) => {
                if (!err) {
                    let configData: Contracts.Config;
                    try {
                        configData = JSON.parse(data);
                        resolve(configData);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(err);
                }
            });
        });
    }
}

new Cli(Arguments);