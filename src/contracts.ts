export interface Arguments {
    [arg: string]: string | boolean;
    config: string;
    help: boolean;
}

export interface ConfigItems {
    [id: string]: Array<string>;
}

export interface Config {
    include?: ConfigItems;
    exclude?: ConfigItems;
    backup?: string;
    writeChanges?: boolean;
}

export interface PackageJSONSkeletonDictionary {
    [id: string]: string;
}

export type PackageJSONSKeletonItem = PackageJSONSkeletonDictionary | Array<string>;

export interface PackageJSONSkeleton {
    [id: string]: PackageJSONSKeletonItem;
}