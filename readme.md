cleanup-package-json
=====================

## Get started
```sh
$ npm install cpj -g
```

## Features
- Removes unnecessary parts of `package.json`.

## Usage
```sh
$ cpj --help
```

### Examples
_Default config:_

Default config name is `cpj.config.json`.

```sh
$ cpj
```

_With custom file config:_
```sh
$ cpj -c custom-config.json
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
| backup       | boolean                        | true    | Backups `package.json` to `package.bak.json`.             |
| writeChanges | boolean                        | true    | Writes changes to `package.json`.                         |

## License
Released under the [PGL-3.0 license](LICENSE).