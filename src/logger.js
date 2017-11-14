import strftime from 'strftime';
import fs from 'fs';
import 'colors';

let i = 1;
Object.defineProperty(global, '__stack', {
  get() {
    const { prepareStackTrace, captureStackTrace } = Error;
    Error.prepareStackTrace = (_, stack) => {
      console.log(i ++ );
      return stack;
    }
    let err = new Error();
    console.log('11');
    captureStackTrace(err);
    console.log('22');
    let stack = err.stack;
    console.log('33');
    Error.prepareStackTrace = prepareStackTrace;
    return stack;
  },
});

const stack_level = 2;

Object.defineProperties(global, {
  __line: { get: () => __stack[stack_level].getLineNumber() },
  __function: { get: () => __stack[stack_level].getFunctionName() },
  __file: { get: () => __stack[stack_level].getFileName().split('/').slice(-1)[0] },
});

export default config => {
  config = config || {};
  config.levels = config.levels || {
    "trace": 0,
    "debug": 1,
    "log": 2,
    "info": 3,
    "warn": 4,
    "error": 5,
    "fatal": 6,
  };
  config.filename = config.filename || './debug.log';
  config.errorLevel = config.errorLevel || "log";

  const log_file = fs.createWriteStream(config.filename, {flags: 'a'});
  const exports = {};
  exports.setLevel = errorLevel => {
    config.errorLevel = errorLevel;
  };

  Object.keys(config.levels).forEach(name => {
    exports[name] = (caption, data) => {
      const log = {
        "level": name,
        "message": caption,
        "timestamp": strftime.utc()('%F %T %L', new Date()),
      };

      data && (log["data"] = data);

      if (config.levels[config.errorLevel] <= config.levels[log.level]) {
        log_file.write(JSON.stringify(log) + '\n');
      }
      if (config.echo && config.levels[config.echo] <= config.levels[log.level]) {
        try {
          console.log(
            log.level.bgYellow.black,
            log.timestamp.grey,
            // `[${__file}:${__line}]`,
            log.message,
            log.data ? log.data : ''
          );
        }catch (e){
          console.log(e)
        }
      }
    };
  });

  return exports;
}
