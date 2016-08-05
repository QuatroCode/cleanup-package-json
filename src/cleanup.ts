import * as fs from 'fs';
import * as Contracts from './contracts';
import * as Helpers from './helpers';

export default class Cleanup {

    constructor(private config: Contracts.Config) { }

    public Clean() {
        let packageJSON = this.readPackageJSON();
        let modifiedPackageJSON = Helpers.Clone(packageJSON);
        let excluded = false;

        if (this.config.exclude != null) {
            modifiedPackageJSON = this.exclude(modifiedPackageJSON);
            excluded = true;
        }
        if (this.config.include != null) {
            modifiedPackageJSON = this.include(packageJSON, modifiedPackageJSON, excluded);
        }

        if (this.config.backup != null && this.config.backup) {
            this.writePackageJSON(packageJSON, 'package.bak.json');
        }

        if (this.config.writeChanges != null && this.config.writeChanges || this.config.writeChanges == null) {
            this.writePackageJSON(modifiedPackageJSON, 'package.json');
        }

        return modifiedPackageJSON;
    }

    private exclude(packageJSON: Contracts.PackageJSONSkeleton) {
        let excludeConfig = this.config.exclude!;
        for (let key in excludeConfig) {
            if (this.configItemAll(excludeConfig[key])) {
                delete packageJSON[key];
            } else {
                excludeConfig[key].forEach((value) => {
                    let item = packageJSON[key];

                    if (Array.isArray(item)) {
                        item = item as Array<string>;
                        packageJSON[key] = item.filter(x => x !== value);
                    } else if (typeof item === 'object') {
                        item = item as Contracts.PackageJSONSkeletonDictionary;
                        for (let pkey in item) {
                            if (pkey === value) {
                                delete item[pkey];
                            }
                        }
                    } else {
                        console.warn(`[Warning] ${key} is not found in package.json.`);
                    }
                });
            }
        }

        return packageJSON;
    }

    private include(packageJSON: Contracts.PackageJSONSkeleton, modifiedPackageJSON: Contracts.PackageJSONSkeleton, excluded: boolean) {
        let includeConfig = this.config.include!;
        // Include only listed in Config.
        if (!excluded) {
            modifiedPackageJSON = {}
        }
        for (let key in includeConfig) {

            if (this.configItemAll(includeConfig[key])) {
                modifiedPackageJSON[key] = packageJSON[key];
            } else {
                includeConfig[key].forEach((value) => {
                    let item = packageJSON[key];
                    if (Array.isArray(item)) {
                        item = item as Array<string>;
                        let modifiedItem = modifiedPackageJSON[key] as Array<string>;
                        if (modifiedItem == null) {
                            modifiedItem = new Array<string>();
                        }
                        if (modifiedItem.indexOf(value) === -1) {
                            modifiedItem.push(value);
                        }

                        modifiedPackageJSON[key] = modifiedItem;
                    } else if (typeof item === 'object') {
                        item = item as Contracts.PackageJSONSkeletonDictionary;

                        if (packageJSON[key][value] != null) {
                            modifiedPackageJSON[key][value] = packageJSON[key][value];
                        }
                    } else {
                        console.warn(`[Warning] ${key} is not found in package.json.`);
                    }
                });
            }
        }

        return modifiedPackageJSON;
    }

    private configItemAll(itemSettings: Array<string>): boolean {
        return (itemSettings.length > 0 && itemSettings[0] === '*');
    }

    private readPackageJSON(fileName: string = 'package.json'): Contracts.PackageJSONSkeleton {
        return JSON.parse(fs.readFileSync(fileName, 'utf8'));
    }

    private writePackageJSON(packageJSON: Contracts.PackageJSONSkeleton, file: string) {
        let data = JSON.stringify(packageJSON, null, 4);
        fs.writeFileSync(file, data);
    }
}