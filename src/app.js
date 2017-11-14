import program from 'commander';
import crypto from 'crypto';
import path from 'path';
import config from 'config';
import _ from 'lodash';
import Logger from './logger';

const verifyGenesisBlock = (scope, block) => {
  try {
    const payloadHash = crypto.createHash('sha256');
    let payloadLength = 0;

    // for(let i = 0; i < block.tra)
  } catch (e) {

  }
};

process.stdin.resume();

const version = 'v0.0.1';
program
  .version(version)
  .option('-c, --config <path>', 'Config file path')
  .option('-s, --host <host>', 'Listening host name or ip')
  .option('-p, --port <port>', 'Listening port number')
  .option('-x, --peers [peers...]', 'Peers list')
  .option('-d, --daemon', 'Run as daemon mode')
  .option('--log <level>', 'Log level')
  .option('--chain <path>', 'Specify the blockchain type. [default: mainnet]')
  .parse(process.argv);

if (program.config) {
  const userConfig = require(program.config);
  _.extends(config, userConfig);
}

config.chain = program.chain || 'testnet';

const baseDir = './';
const logger = new Logger({
  filename: path.join(baseDir, 'logs', 'debug.log'),
  echo: program.deamon ? null : config.get('log.level'),
  errorLevel: config.get('log.level'),
});

logger.log(config);
