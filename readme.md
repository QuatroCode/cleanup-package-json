cleanup-package-json
=====================

## Get started
```sh
$ npm install cleanup-package-json -g
```

## Features
- Removes unnecessary parts of `package.json`.

## Usage
```sh
$ cleanup-package-json -h
```

### Examples
_Default config:_

Default config name is `cpj.config.json`.

```sh
$ cleanup-package-json
```

_With custom file config:_
```sh
$ cleanup-package-json -c custom-config.json
```

## Config example
```json
{
    "include": {
        "scripts": ["test"]
    },
    "exclude": {
        "keywords": ["*"],
        "scripts": ["*"]
    },
    "backup": true
}
```

| Argument     | Type                           | Default | Description                                               |
|--------------|--------------------------------|---------|-----------------------------------------------------------|
| include      | [arg: string]: Array\<string\> | none    | Parts that must be included.                              |
| exclude      | [arg: string]: Array\<string\> | none    | Parts that will be removed (Lower priority then include). |
| backup       | boolean                        | false   | Backups `package.json` to `package.bak.json`.             |
| writeChanges | boolean                        | true    | Writes changes to `package.json`.                         |

## License
Released under the [PGL-3.0 license](LICENSE).