import * as yargs from 'yargs';
import * as Contracts from './contracts';

export default yargs
    .help('help', 'Show help.')
    .version(() => {
        return `Current version: ${require('../package.json').version}.`;
    })
    .option('config', {
        alias: 'c',
        describe: 'Path to config file.',
        type: 'string'
    })
    .argv as Contracts.Arguments;