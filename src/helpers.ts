export function Clone<T>(obj: T) {
    var target: any = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            target[key] = (<any>obj)[key];
        }
    }
    return target;
}